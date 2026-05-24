# Testing strategy

How to test a HITL AI chat system at multiple layers. The LLM itself is a black box; the system around it is testable.

## The testing pyramid for HITL chat

```
              ┌──────────────────┐
              │   E2E smoke      │  ← slowest, manual
              │   (post-deploy)  │     1-5 cases
              ├──────────────────┤
              │   Integration    │  ← real DB, mocked LLM
              │   (HITL flows)   │     10-20 cases
              ├──────────────────┤
              │   RLS tests      │  ← real DB + Supabase Auth
              │   (every policy) │     paired w/ every policy
              ├──────────────────┤
              │   Pure units     │  ← fast, deterministic
              │   (functions,    │     50-200 cases
              │    classifiers)  │
              └──────────────────┘
```

Spend the most test-LOC at the bottom; the least at the top. The pyramid inverts when teams try to "test the AI" — they end up with brittle E2E that breaks on every prompt tweak. Don't do that.

## 1. Pure unit testing patterns

Fast, deterministic, no mocks of external services.

### System prompt builder
Assert the built prompt contains the agent's name, market vocabulary, channel constraints, refusal templates.

```ts
// tests/unit/agent-prompts.test.ts
import { buildAgentSystemPrompt } from '@/lib/ai/agent-prompts';

it('US prompt contains US vocabulary', () => {
  const p = buildAgentSystemPrompt({ market: 'us', /* ... */ });
  expect(p).toContain('sq ft');
  expect(p).toContain('HOA');
  expect(p).not.toContain('metros cuadrados');
});

it('voice channel prompt forbids URLs in replies', () => {
  const p = buildAgentSystemPrompt({ channel: 'voice', /* ... */ });
  expect(p).toMatch(/no URLs/i);
});
```

### Intent classifier
Each regex catches its target without false-positives on adjacent benign phrasings.

```ts
// tests/unit/agent-gating.test.ts
import { classifyAssistantTurn } from '@/lib/ai/gating';

it('flags Fair Housing risk on exclusionary phrasing', () => {
  const r = classifyAssistantTurn({ userText: 'show me houses with only white neighbors' });
  expect(r.riskFlags).toContain('discrimination');
});

it('does NOT flag "I want a house near my white-painted school"', () => {
  const r = classifyAssistantTurn({ userText: 'I want a house near my white-painted school' });
  expect(r.riskFlags).not.toContain('discrimination');
});
```

### Knowledge base drift-guard (CRITICAL — see gotchas §16)
Lock KB strings to source-of-truth constants. Catches AI-quoted-fact regressions at PR time.

```ts
// tests/unit/private-listing-constants.test.ts
import { PRIVATE_LISTING_DURATION_DAYS } from '@/lib/billing/private-listing-constants';
import { ahoPlatformKb } from '@/lib/ai/aho-platform-kb';

it('KB description contains the current duration', () => {
  const kb = ahoPlatformKb('en');
  const tier = kb.tiers.find(t => /private[- ]?owner/i.test(t.name));
  expect(tier!.description).toContain(`${PRIVATE_LISTING_DURATION_DAYS}-day`);
});

it('KB does NOT mention the OLD 60-day value (drift regression)', () => {
  const kb = ahoPlatformKb('en');
  const tier = kb.tiers.find(t => /private[- ]?owner/i.test(t.name));
  expect(tier!.description).not.toContain('60-day');
});
```

### Cost calculator
Per-model snapshot pricing arithmetic.

```ts
// tests/unit/ai-cost.test.ts
import { estimateCostUsdCents } from '@/lib/ai/cost';

it('Sonnet 4.6: 1000 in + 500 out = 1.05 cents', () => {
  expect(estimateCostUsdCents('claude-sonnet-4-6', 1000, 500)).toBe(105);
  // 1000 * $3/MTok * 100¢/$ = 0.3¢ ;  500 * $15/MTok * 100¢ = 0.75¢ ; total 1.05¢
});
```

### Markdown sanitizer
Prevent bold-wrapped URLs from breaking the chat renderer.

```ts
import { sanitizeChatMarkdown } from '@/components/chat/render-message';

it('strips bold around URL tokens', () => {
  expect(sanitizeChatMarkdown('see **https://example.com/x**')).toBe('see https://example.com/x');
});
```

## 2. RLS test patterns

Every RLS policy ships with a paired test exercising it from each affected tier (anon, registered non-member, org member, admin) with positive AND negative cases. Hard rule.

### Harness shape
AHO's `tests/rls/_setup.ts` provides:
- Fixture users: `anon`, `registered_a`, `registered_b`, `agent_a_owner`, `agent_a_agent`, `agent_b_owner`, `admin`
- `clientFor(tier)` factory returning an authenticated Supabase client
- `admin()` service-role client for setup

### Per-table test shape

```ts
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { admin, clientFor } from './_setup';

const FIXTURE_EMAIL = 'fixture-conv@aho.test';

beforeAll(async () => {
  // Seed via service role (bypasses RLS).
  await admin().from('ai_conversations').delete().eq('buyer_email', FIXTURE_EMAIL);
  await admin().from('ai_conversations').insert({
    org_id: ORG_A_ID,
    agent_id: AGENT_A_OWNER_ID,
    channel: 'web_chat',
    buyer_email: FIXTURE_EMAIL,
    /* ... */
  });
});

afterAll(async () => {
  await admin().from('ai_conversations').delete().eq('buyer_email', FIXTURE_EMAIL);
});

describe('ai_conversations RLS', () => {
  it('anon CANNOT select', async () => {
    const c = await clientFor('anon');
    const { data, error } = await c.from('ai_conversations').select('*');
    expect(error).toBeNull();           // PostgREST returns empty array on RLS denial
    expect(data).toEqual([]);
  });

  it('registered_a (non-member of org A) CANNOT select', async () => {
    const c = await clientFor('registered_a');
    const { data } = await c.from('ai_conversations').select('*');
    expect(data).toEqual([]);
  });

  it('agent_a_owner CAN select their org conversations', async () => {
    const c = await clientFor('agent_a_owner');
    const { data } = await c.from('ai_conversations').select('*').eq('buyer_email', FIXTURE_EMAIL);
    expect(data?.length).toBe(1);
  });

  it('agent_b_owner CANNOT select org A conversations', async () => {
    const c = await clientFor('agent_b_owner');
    const { data } = await c.from('ai_conversations').select('*').eq('buyer_email', FIXTURE_EMAIL);
    expect(data).toEqual([]);
  });

  it('admin CAN select everything', async () => {
    const c = await clientFor('admin');
    const { data } = await c.from('ai_conversations').select('*').eq('buyer_email', FIXTURE_EMAIL);
    expect(data?.length).toBe(1);
  });

  it('anon CANNOT insert (REVOKE blocks even before RLS check)', async () => {
    const c = await clientFor('anon');
    const { error } = await c.from('ai_conversations').insert({ /* ... */ });
    expect(error).not.toBeNull();
    expect(error?.message).toMatch(/permission|policy|denied|insufficient/i);
  });
});
```

### Key RLS-test gotchas

- **PostgREST returns `data: []` on RLS denial, NOT an error.** Test for empty array, not for error.
- **Destructive writes that fail under RLS often resolve without error.** Verify the row was NOT changed by re-querying via service role.
- **supabase-js doesn't throw on row-level errors.** Same pattern — destructure `{ data, error }`, check both.

## 3. Integration testing — the HITL flow

Real DB, mocked LLM. Walks the full request flow.

```ts
import { describe, expect, it, vi } from 'vitest';
import { POST as chatPost } from '@/app/api/ai-chat/route';
import { admin } from '../rls/_setup';

it('full HITL: user msg → draft pending → operator approves → buyer poll sees reply', async () => {
  // Mock the LLM call to return a deterministic response.
  vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => {
    if (url.toString().includes('api.anthropic.com')) {
      return new Response(JSON.stringify({
        content: [{ type: 'text', text: 'Yes, the property is still available.' }],
        usage: { input_tokens: 1200, output_tokens: 50 },
      }), { status: 200 });
    }
    throw new Error('unexpected fetch in test');
  });

  // 1. POST /api/ai-chat with user message
  const req = new Request('http://test/api/ai-chat', {
    method: 'POST',
    body: JSON.stringify({
      conversationId: null,
      agentId: AGENT_A_ID,
      userMessage: 'Is this still available?',
      sessionToken: 'fixture-token-abc',
      locale: 'en',
    }),
  });
  const res = await chatPost(req as any);
  const conversationId = res.headers.get('x-conversation-id');
  expect(conversationId).toBeTruthy();

  // Drain the stream so post-processing completes.
  await res.text();

  // 2. Assert DB state
  const { data: conv } = await admin().from('ai_conversations').select('*').eq('id', conversationId).single();
  expect(conv.status).toBe('open');

  const { data: messages } = await admin().from('ai_conversation_messages')
    .select('*').eq('conversation_id', conversationId).order('created_at');
  expect(messages?.length).toBe(2);
  expect(messages?.[0]?.role).toBe('user');
  expect(messages?.[0]?.sent_at).toBeTruthy();
  expect(messages?.[1]?.role).toBe('assistant');
  expect(messages?.[1]?.approval_status).toBe('pending');
  expect(messages?.[1]?.sent_at).toBeNull();
  expect(messages?.[1]?.body).toContain('still available');

  // 3. Operator approves
  // ... POST /api/dashboard/ai-inbox/approve as admin client

  // 4. Buyer polls
  const pollRes = await fetch(`/api/ai-chat/poll?conversationId=${conversationId}&sessionToken=fixture-token-abc`);
  const pollJson = await pollRes.json();
  expect(pollJson.messages?.length).toBeGreaterThan(0);
  expect(pollJson.messages[0].body).toContain('still available');
});
```

### Idempotency tests

```ts
it('approve twice returns 200 the second time, doesn\'t double-stamp sent_at', async () => {
  // First approve
  const r1 = await approvePost(messageId);
  expect(r1.status).toBe(200);
  const { data: m1 } = await admin().from('ai_conversation_messages').select('sent_at').eq('id', messageId).single();
  const firstSentAt = m1.sent_at;

  // Second approve
  const r2 = await approvePost(messageId);
  expect(r2.status).toBe(200);
  const { data: m2 } = await admin().from('ai_conversation_messages').select('sent_at').eq('id', messageId).single();
  expect(m2.sent_at).toBe(firstSentAt);  // unchanged
});
```

## 4. The hardest things to test (and how to handle them)

### LLM nondeterminism
Don't test that the LLM said X. Test that the SYSTEM responded correctly to a KNOWN LLM output via mock. The LLM is a black box; the system around it is fully testable.

### SSE streaming
Capture the stream into a buffer in the test, parse SSE events, assert ordered:

```ts
const reader = res.body!.getReader();
const decoder = new TextDecoder();
const events: string[] = [];
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  events.push(...decoder.decode(value).split('\n\n').filter(Boolean));
}
expect(events.some(e => e.includes('"type":"text-delta"'))).toBe(true);
expect(events.some(e => e.includes('"type":"done"'))).toBe(true);
```

### Multi-channel context
Insert messages on different channels into the SAME conversation; assert reading returns the full ordered timeline.

### Webhook signature verification
Generate expected HMAC in the test; send correct header → assert 200; send wrong → assert 403. Use `crypto.subtle.timingSafeEqual` in production code.

### Edge runtime quirks
Most caught at the unit-test layer because tests run in Node + use the same mocked supabase-js behavior. Edge-specific behavior (no fs, no DOM) is caught at build time (`@cloudflare/next-on-pages` build will fail).

## 5. What to NOT test

- **Exact LLM output strings** — brittle, breaks on every prompt tweak
- **UI animations** — hard, low ROI
- **Real email delivery in CI** — use Brevo/SendGrid sandbox; don't email yourself
- **Real WhatsApp messages in CI** — Meta dev sandbox is gated; mock the BSP HTTP API
- **Real voice calls in CI** — Twilio test credentials; mock the WebSocket bridge

## 6. Pre-push hook + CI matrix

Local pre-push hook (AHO's `.githooks/pre-push`):
```bash
#!/bin/bash
set -e
echo "[pre-push] running pnpm test:unit (skip with --no-verify if you must)…"
pnpm test:unit
echo "[pre-push] ✓ unit tests passed."
```

**Strong recommendation: also run `pnpm typecheck` AND `pnpm lint` in pre-push.** AHO learned this twice in one day:
- `pnpm typecheck` only runs `tsc --noEmit`. The deploy build runs ESLint too. A `react/no-unescaped-entities` error in JSX failed two deploys because `pnpm typecheck` said all-clear.
- Piping `pnpm typecheck` through `tail -3` in a `&&` chain loses the exit code — the chain continues even on failure.

Updated pre-push:
```bash
#!/bin/bash
set -e -o pipefail   # ← pipefail catches piped failures
pnpm typecheck
pnpm lint
pnpm test:unit
```

CI on PR: typecheck + lint + unit + RLS tests against ephemeral Supabase.

CI on push to main: same + deploy + post-deploy smoke. AHO's `.github/workflows/post-deploy-smoke.yml` checks homepage HTTP 200, sitemap.xml, og-image bytes, cron auth — each ~1 line, 30s total. Catches build-output regressions that survive typecheck.

## 7. Manual verification cadence

- **First deploy of any HITL endpoint** — walk through the gate → mode picker → text mode → voice mode → operator inbox approve flow in incognito
- **Stripe / billing changes** — walk through checkout end-to-end against Stripe test mode
- **Multi-locale features** — verify EN + ES (primary markets); others fall back to EN by design
- **KB updated** — ask the AI a question exercising the updated fact, verify the new value

## 8. Test fixture hygiene

Don't poison prod with test data.

AHO's CLAUDE.md R11: every public surface filters `aho-test-org-%` slugs + `aho-fixture-%` listing slugs. Defensive in-loop slug check IN ADDITION to PostgREST `.not('organizations.slug', 'like', 'aho-test-org-%')`. The `.not()` is the first line; the in-loop check is belt-and-suspenders against a typo in the filter.

Test fixtures live in `tests/` only. No seed scripts hit deployed DBs. No fake conversations in dashboards. Empty inbox = honest empty state.

## 9. The smoke-test golden path

5 minutes of manual testing post-deploy that catches 80% of regressions:

1. Open the chat widget in incognito
2. Pass the pre-chat gate (name + email)
3. Pick text mode
4. Send "Hi, is this still available?"
5. Verify:
   - Message appears with "(awaiting review)" badge
   - `ai_conversations` row exists (check via service-role admin client)
   - `ai_conversation_messages` has user + assistant rows
   - `/dashboard/ai-inbox` shows the pending draft
6. Approve from `/dashboard/ai-inbox`
7. Wait ~5s for widget poll; verify badge disappears, message becomes approved
8. Close chat with × button
9. Verify operator inbox got the transcript email

If all 9 pass in 5 minutes, the system is healthy. Run after every notable deploy.
