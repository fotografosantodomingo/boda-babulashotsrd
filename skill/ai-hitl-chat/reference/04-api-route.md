# Main chat API route — pattern

The endpoint that the web-chat widget POSTs to. Single file, edge-runtime, ~300-500 LOC in practice. Pattern (TypeScript / Next.js App Router, but the shape transfers to any framework):

```ts
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/admin';
import { buildAgentSystemPrompt } from '@/lib/ai/agent-prompts';
import { converse } from '@/lib/ai/converse';
import { classifyAssistantTurn } from '@/lib/ai/gating';
import { fetchKnowledge } from '@/lib/ai/knowledge';
import { mapBillingTierToAgentTier } from '@/lib/ai/agent-tier';
import { countryToMarket } from '@/lib/ai/country-to-market';
import { recordEvent } from '@/lib/ai/conversation-events';
import { logAiCall } from '@/lib/ai/log';

export const runtime = 'edge';

const RequestSchema = z.object({
  conversationId: z.string().uuid().nullable(),
  agentId: z.string().uuid(),
  contextEntityId: z.string().uuid().optional().nullable(),
  contextEntityType: z.enum(['listing', 'product', 'order']).optional().nullable(),
  userMessage: z.string().min(1).max(4000),
  sessionToken: z.string().min(16).max(128),  // anon buyer identity
  locale: z.enum(['en', 'es', 'pl', 'pt', 'de', 'fr', 'it']).default('en'),
});

export async function POST(req: NextRequest): Promise<Response> {
  // 1. PARSE + VALIDATE
  const body = await req.json().catch(() => null);
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'invalid_request', details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const admin = createAdminClient();

  // 2. RESOLVE AGENT'S ORG (and tier snapshot)
  const { data: agent } = await admin
    .from('profiles')
    .select('id, org_id, organizations!inner(id, headquarters_country, current_plan_id, manual_plan_id, manual_plan_expires_at)')
    .eq('id', data.agentId)
    .maybeSingle();
  if (!agent) {
    return NextResponse.json({ error: 'agent_not_found' }, { status: 404 });
  }
  const orgId = (agent.organizations as any).id as string;
  const market = countryToMarket((agent.organizations as any).headquarters_country);
  const tier = await mapBillingTierToAgentTier(admin, orgId);

  // 3. RESOLVE OR CREATE CONVERSATION
  let conversationId: string;
  if (data.conversationId) {
    // Verify it exists + the session token matches (auth for anon buyer)
    const { data: conv } = await admin
      .from('ai_conversations')
      .select('id, buyer_session_token, tier_at_creation')
      .eq('id', data.conversationId)
      .maybeSingle();
    if (!conv || conv.buyer_session_token !== data.sessionToken) {
      return NextResponse.json({ error: 'conversation_not_found' }, { status: 404 });
    }
    conversationId = conv.id;
  } else {
    // New conversation — snapshot the tier at creation for analytics.
    const { data: newConv, error: insertErr } = await admin
      .from('ai_conversations')
      .insert({
        org_id: orgId,
        agent_id: data.agentId,
        channel: 'web_chat',
        buyer_session_token: data.sessionToken,
        buyer_locale: data.locale,
        context_entity_id: data.contextEntityId ?? null,
        context_entity_type: data.contextEntityType ?? null,
        tier_at_creation: tier,
      })
      .select('id')
      .single();
    if (insertErr || !newConv) {
      return NextResponse.json({ error: 'create_failed' }, { status: 500 });
    }
    conversationId = newConv.id;
    await recordEvent(admin, {
      conversationId, orgId, agentId: data.agentId,
      channel: 'web_chat', kind: 'started', payload: {},
    });
  }

  // 4. PERSIST USER TURN
  const { error: userInsertErr } = await admin
    .from('ai_conversation_messages')
    .insert({
      conversation_id: conversationId,
      role: 'user',
      channel: 'web_chat',
      body: data.userMessage,
      approval_status: 'auto_sent',  // user messages are always "sent"
      sent_at: new Date().toISOString(),
    });
  if (userInsertErr) {
    console.error('[ai-chat] user turn insert failed', userInsertErr);
    return NextResponse.json({ error: 'insert_failed' }, { status: 500 });
  }
  await recordEvent(admin, {
    conversationId, orgId, agentId: data.agentId,
    channel: 'web_chat', kind: 'message_user', payload: { length: data.userMessage.length },
  });

  // 5. PULL TURN HISTORY for the LLM context (last N turns)
  const { data: history } = await admin
    .from('ai_conversation_messages')
    .select('role, body, approval_status')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
    .limit(40);

  // Convert to Anthropic message format. Skip pending/rejected drafts.
  const messages = (history ?? [])
    .filter((m) => m.role === 'user' || (m.role === 'assistant' && m.approval_status !== 'rejected'))
    .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.body }));

  // 6. BUILD PROMPT + KNOWLEDGE
  const agentProfile = await fetchAgentProfile(admin, data.agentId);  // helper
  const focusEntity = data.contextEntityId
    ? await fetchFocusEntity(admin, data.contextEntityType!, data.contextEntityId)
    : undefined;
  const systemPrompt = buildAgentSystemPrompt({
    market, buyerLocale: data.locale, channel: 'web_chat', tier,
    agent: agentProfile, focusEntity,
  });
  const knowledge = await fetchKnowledge(admin, { orgId, agentId: data.agentId, focusEntityId: data.contextEntityId });

  // 7. STREAM THE LLM CALL
  const encoder = new TextEncoder();
  let fullDraft = '';
  let inputTokens = 0;
  let outputTokens = 0;
  const startedAt = Date.now();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of converse({
          model: 'claude-sonnet-4-6',
          system: systemPrompt,
          knowledge,  // injected as a second system message inside converse()
          messages,
          maxTokens: 1024,
        })) {
          if (event.type === 'text-delta') {
            fullDraft += event.text;
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: 'text-delta', text: event.text })}\n\n`),
            );
          } else if (event.type === 'done') {
            inputTokens = event.usage.input_tokens;
            outputTokens = event.usage.output_tokens;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
          }
        }
        controller.close();
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: 'error', error: msg })}\n\n`),
        );
        controller.close();
      }
    },
  });

  // 8. ON STREAM END — persist assistant turn (pending) + classify + log + event
  // The standard pattern is to do this AFTER the stream closes. With Edge
  // runtime + SSE this is tricky — you need to ensure the after-write
  // promises are awaited. Pattern: use a TransformStream OR a `tee()` to
  // observe the stream + run post-processing in parallel.

  // For brevity, the EASIEST pattern: do post-processing in the controller
  // close handler, awaited explicitly.

  // ... or use the route's response wrapper to chain a `.then(postProcess)`
  // that calls await on:
  //   a) classify intent + risk
  //   b) insert assistant turn (approval_status='pending')
  //   c) write ai_generation_log row (cost)
  //   d) recordEvent (kind='draft_pending')

  return new Response(stream, {
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-cache',
      'x-conversation-id': conversationId,  // header so widget knows the ID even on new convs
    },
  });
}
```

## Post-stream processing (the critical bit Edge runtimes get wrong)

The above shows the happy path. The actual production pattern is:

1. Stream tokens to the widget for UX (buyer sees the text "typing")
2. AFTER the stream closes, do the persist + classify + log + event work
3. Crucially, ALL OF #2 must be awaited inside the request handler — Cloudflare Workers + Pages cancel unawaited promises when the response completes

The trick: stream IN, persist OUT, all in the same request lifecycle.

```ts
// Pattern: tee the stream, one branch to the client, one branch consumed
// internally to capture the full body, then await persist.

const [clientStream, capture] = stream.tee();

// Spawn the capture-then-persist promise BEFORE returning the response,
// so the runtime knows about it.
const persistPromise = (async () => {
  let captured = '';
  const reader = capture.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    // Parse SSE chunks if needed; here we just track the assistant text
    // by re-reading our own buffer (`fullDraft` already has it).
  }
  // Now do the post-stream work.
  const classification = classifyAssistantTurn({
    userText: data.userMessage,
    assistantDraft: fullDraft,
    market,
  });
  await admin.from('ai_conversation_messages').insert({
    conversation_id: conversationId,
    role: 'assistant',
    channel: 'web_chat',
    body: fullDraft,
    approval_status: 'pending',
    confidence: classification.confidence,
    intent: classification.intent,
    risk_flags: classification.riskFlags,
  });
  await logAiCall(admin, {
    purpose: 'chat_draft',
    orgId,
    model: 'claude-sonnet-4-6',
    market,
    inputTokens,
    outputTokens,
    latencyMs: Date.now() - startedAt,
  });
  await recordEvent(admin, {
    conversationId, orgId, agentId: data.agentId,
    channel: 'web_chat', kind: 'draft_pending',
    payload: { intent: classification.intent, risk_flags: classification.riskFlags },
  });
})();

// In Cloudflare Pages, you'd use ctx.waitUntil(persistPromise) here
// if you have access to ctx. Otherwise just await it before returning:
// (but that DELAYS the response — only OK if persist is fast.)

return new Response(clientStream, { ... });
```

## Polling endpoint (companion)

```ts
// GET /api/ai-chat/poll?conversationId=...&sessionToken=...
//
// Returns assistant turns with sent_at IS NOT NULL that the widget
// hasn't seen yet (client passes a `since` cursor = the last message
// ID it has). Auth: session token must match conversation row.

export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const conversationId = url.searchParams.get('conversationId');
  const sessionToken = url.searchParams.get('sessionToken');
  const since = url.searchParams.get('since');  // optional cursor

  if (!conversationId || !sessionToken) {
    return NextResponse.json({ error: 'missing_params' }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: conv } = await admin
    .from('ai_conversations')
    .select('id, buyer_session_token')
    .eq('id', conversationId)
    .maybeSingle();
  if (!conv || conv.buyer_session_token !== sessionToken) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  let query = admin
    .from('ai_conversation_messages')
    .select('id, role, body, edited_body, sent_at, created_at')
    .eq('conversation_id', conversationId)
    .eq('role', 'assistant')
    .not('sent_at', 'is', null)
    .order('created_at', { ascending: true });

  if (since) query = query.gt('id', since);

  const { data: messages } = await query.limit(20);

  return NextResponse.json({
    messages: (messages ?? []).map((m) => ({
      id: m.id,
      body: m.edited_body ?? m.body,  // operator edits override raw draft
      sent_at: m.sent_at,
    })),
  });
}
```

## Approve / reject endpoints (admin inbox)

```ts
// POST /api/dashboard/ai-inbox/approve
//   body: { messageId, editedBody?: string }
//   auth: must be a member of the org that owns the conversation
//
// Sets approval_status='approved' (or 'edited' if editedBody supplied),
// approved_by=auth.uid, approved_at=now, sent_at=now.
// Writes ai_conversation_events row.
```

```ts
// POST /api/dashboard/ai-inbox/reject
//   body: { messageId, reason?: string }
//
// Sets approval_status='rejected'. No sent_at. The widget's poll
// filters out rejected turns, so the buyer never sees them.
// Writes ai_conversation_events row.
```

Both routes do the admin/member check against the conversation's org_id BEFORE writing. Service-role client used for the write itself.

## Critical edge-runtime gotchas

1. **Every DB write must be `await`ed.** Cloudflare Workers/Pages kill unawaited promises when the response handler returns. The AHO team lost ~8 hours debugging "logs not appearing" before realizing `void admin.from(...).insert(...)` was being dropped.
2. **`supabase-js` doesn't throw on row-level errors.** RLS denials, CHECK violations, schema mismatches — all surface on the resolved value, NOT as a rejected promise. ALWAYS destructure `const { error } = await ...; if (error) console.error(...)`.
3. **`console.log` is unreliable in tail; `console.error` works.** Use `console.error` for instrumentation you actually want to read in `wrangler tail`.
4. **No Node `fs`, no DOM, no `setTimeout` past 30s** in the request lifecycle. If you need durable async work, use a queue.
