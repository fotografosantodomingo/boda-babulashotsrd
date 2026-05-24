# Channel adapters — per-channel patterns

Each non-web channel needs:
1. **Inbound adapter** (worker/webhook that turns a provider message into a row in your spine)
2. **Outbound adapter** (when the operator approves, send via the right provider)
3. **Side table** for channel-specific metadata
4. **Idempotency key** (so retries don't double-insert)

## Email

**Provider options:** Cloudflare Email Routing (~free; what AHO uses), AWS SES inbound, Postmark Inbound, Mailgun Routes.

### Inbound flow

```
Buyer sends to → agent-slug@reply.yourdomain.com
                  OR leads+<token>@reply.yourdomain.com (token-based)
                  ↓
Email Routing catch-all rule → Cloudflare Email Worker
                  ↓
Worker parses RFC-5322 via postal-mime
verifies DKIM/SPF/DMARC headers
HMAC-signs the forward payload
                  ↓
POST /api/inbound/email on Pages app
                  ↓
App resolves agent-slug → agent_id
finds existing thread via In-Reply-To match
  OR creates new email_threads + ai_conversations
inserts ai_conversation_messages + email_messages
enqueues async draft job
```

### Inbound worker pseudo-code

```ts
// workers/inbound-email/src/index.ts (Cloudflare Email Worker)
import PostalMime from 'postal-mime';

export default {
  async email(message: ForwardableEmailMessage, env: Env) {
    const raw = await new Response(message.raw).text();
    const parsed = await PostalMime.parse(raw);

    const payload = {
      to: message.to,                       // 'agent-slug@reply.yourdomain.com'
      from: message.from,
      messageId: parsed.messageId,          // RFC-5322 globally unique
      inReplyTo: parsed.inReplyTo ?? null,
      references: parsed.references ?? [],
      subject: parsed.subject,
      bodyText: parsed.text ?? '',
      bodyHtml: parsed.html ?? '',
      headers: parsed.headers,
      dkim: parsed.dkimPass,
      spf: parsed.spfPass,
      dmarc: parsed.dmarcPass,
    };

    // HMAC the payload so the app can verify Worker provenance.
    const sig = await hmacSha256(JSON.stringify(payload), env.INBOUND_SECRET);

    const res = await fetch(`${env.APP_BASE}/api/inbound/email`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-aho-signature': sig,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error('[inbound-email] app rejected', { status: res.status });
      // Re-throw so Cloudflare retries.
      throw new Error(`app HTTP ${res.status}`);
    }
  },
};
```

### App's inbound route (idempotency check)

```ts
// /api/inbound/email
// 1. Verify HMAC.
// 2. Idempotency: if messageId already exists in email_messages, return 200 no-op.
// 3. Resolve agent from to-address (regex agent-slug pattern OR leads+token).
// 4. Threading: SELECT email_threads JOIN email_messages WHERE message_id = inReplyTo.
//    If found → use that thread's conversation. Else → new thread + new conversation.
// 5. Insert ai_conversation_messages (channel='email', role='user', auto_sent + sent_at=now).
// 6. Insert email_messages (direction='inbound', linked via conversation_message_id).
// 7. Enqueue async draft job (queue / scheduled function / inline-fire-and-forget).
// 8. Return 200.
```

### Outbound flow

```
Operator approves draft in /dashboard/ai-inbox
                  ↓
POST /api/dashboard/ai-inbox/approve writes approval_status='approved' + sent_at=now
                  ↓
Triggers outbound send job (queue OR sync if you can budget the latency)
                  ↓
Build the outbound email:
  - To: original from-address
  - From: agent-slug@reply.yourdomain.com (consistent reply address)
  - References: [...all prior message_ids in thread, root first]
  - In-Reply-To: parent message_id
  - Subject: "Re: <original subject>" (deduped — don't stack "Re: Re: Re:")
  - Body HTML: edited_body || body, with [[COMPLIANCE_FOOTER]] substituted
                  ↓
Brevo / SendGrid / Postmark API call
                  ↓
Insert email_messages row (direction='outbound', message_id from API response)
```

### Gotchas

- **Subject de-duplication.** "Re: Re: Re: Your inquiry" looks unprofessional. Strip "Re:" prefixes before re-adding one.
- **In-Reply-To missing.** Some buyers' clients (especially mobile) drop the header. Fall back to subject_normalized + from-address matching.
- **DKIM on outbound.** Configure your sending domain (`reply.yourdomain.com`) with DKIM + SPF + DMARC. Without DKIM, your replies hit Gmail spam.
- **Catch-all in production only.** During dev, use a unique inbox per developer (`leads+devname+token@reply.yourdomain.com`) so dev traffic doesn't poison prod conversations.

## WhatsApp

**Provider options:** 360dialog (BSP — what AHO uses), Twilio for WhatsApp, Meta Cloud API direct. 360dialog gives best margins + Meta-approved templates; Twilio gives easier setup but higher per-message cost.

### Inbound flow

```
Buyer messages your WhatsApp Business number
                  ↓
Meta → 360dialog → POST webhook URL with signed payload
                  ↓
Worker verifies X-Hub-Signature-256 HMAC
                  ↓
POST /api/inbound/whatsapp on app
                  ↓
App resolves phone_number_id → whatsapp_numbers.wa_number_id → agent_id
finds existing conversation by (buyer_phone, agent_id, status='open')
  OR creates new ai_conversations
inserts ai_conversation_messages + whatsapp_messages (wa_message_id unique → dedup)
enqueues async draft job
```

### App inbound route (key bits)

```ts
// Idempotency on Meta's wa_message_id.
const { data: existing } = await admin
  .from('whatsapp_messages')
  .select('id')
  .eq('wa_message_id', payload.message_id)
  .maybeSingle();
if (existing) return new Response('duplicate, ok', { status: 200 });

// Resolve agent.
const { data: waNumber } = await admin
  .from('whatsapp_numbers')
  .select('id, agent_id, org_id')
  .eq('phone_e164', payload.to)   // your number
  .maybeSingle();
if (!waNumber) return new Response('unknown number', { status: 404 });

// Find or create conversation (24h service-window logic).
// ...
```

### Outbound flow

Two paths:
1. **Free-form (within 24h service window).** Just send the body via 360dialog API. Zero cost.
2. **Template (outside service window).** Pick a pre-approved template + variables, send via 360dialog. Per-message cost (varies by market — Brazil ~$0.05, US ~$0.025).

```ts
// 1. Check service window
const { data: lastInbound } = await admin
  .from('whatsapp_messages')
  .select('created_at')
  .eq('conversation_id', conversationId)
  .eq('direction', 'inbound')
  .order('created_at', { ascending: false })
  .limit(1)
  .maybeSingle();

const inServiceWindow = lastInbound &&
  (Date.now() - new Date(lastInbound.created_at).getTime()) < 24 * 3600 * 1000;

if (inServiceWindow) {
  await sendFreeForm(buyerPhone, draftBody);
} else {
  // Pick a pre-approved template. AHO uses 'viewing_reminder_v1' / 'price_change_v1' / etc.
  await sendTemplate(buyerPhone, 'service_reply', { '{{1}}': draftBody });
}
```

### Gotchas

- **Template approval is slow (15min - 48h)** — pre-submit a generic "service_reply" template before launch so the outbound path works on day 1.
- **Buyer must have YOUR number saved OR initiated the convo.** Cold WhatsApp messages = banned account. Always start from a `wa.me/<your-phone>?text=...` link the buyer clicks.
- **Per-market cost varies wildly** — track `cost_cents` per message + sum into `whatsapp_messages.cost_cents` so per-agent budgets can enforce.
- **Phone certification per number** — each agent's number needs Meta verification (~24-48h). The BSP usually walks the agent through Embedded Signup.

## Voice

**Provider:** Twilio ConversationRelay (real-time WebSocket bridge with built-in STT + TTS).

### Inbound flow

```
Caller dials your Twilio number
                  ↓
Twilio answers, GETs /api/voice/twiml from your app
                  ↓
Your /api/voice/twiml returns:
  <Response>
    <Connect>
      <ConversationRelay
        url="wss://your-worker.workers.dev/voice"
        welcomeGreeting="Hi, you've reached {agentName}, this is the AI assistant..."
        language="en-US"
        voice="Polly.Joanna-Neural"
      />
    </Connect>
  </Response>
                  ↓
Twilio opens WebSocket to your Worker
                  ↓
Per turn:
  - Twilio sends { type: 'prompt', voicePrompt: '<STT text>' }
  - Worker calls converse() (Sonnet)
  - Worker classifies risk
  - If risk flag → respond with TwiML to warm-transfer to agent's mobile
  - Else → send { type: 'text', token: '<assistant text>', last: true }
  - Twilio TTS plays back
                  ↓
Both hang up → Worker logs voice_calls (duration, cost, recording_r2_key if consent)
```

### Worker pseudo-code (voice bridge)

```ts
// workers/voice-conversationrelay/src/index.ts
export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (req.headers.get('upgrade') !== 'websocket') {
      return new Response('expected WebSocket', { status: 400 });
    }

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    server.accept();

    let conversationId: string | null = null;

    server.addEventListener('message', async (msg) => {
      const data = JSON.parse(msg.data as string);

      if (data.type === 'setup') {
        // Twilio sends setup info: callSid, from, to, etc.
        // Resolve agent + create voice_calls + ai_conversations rows.
        conversationId = await initCall(env, data);
        return;
      }

      if (data.type === 'prompt') {
        // STT'd user speech
        const userText = data.voicePrompt as string;
        const assistantText = await callLLM(env, conversationId!, userText);
        server.send(JSON.stringify({ type: 'text', token: assistantText, last: true }));
      }

      if (data.type === 'end') {
        // Twilio call hung up.
        await finalizeCall(env, conversationId!, data);
        server.close();
      }
    });

    return new Response(null, { status: 101, webSocket: client });
  },
};
```

### Gotchas

- **No HITL.** Voice is real-time. Don't try to insert human approval. Compensate with:
  - Stricter risk gating (auto-refuse on `legal | financial | discrimination`)
  - Escalate tool → warm-transfer to agent's mobile via Twilio `<Conference>`
  - Recording (with consent disclosure) for after-the-fact review
- **Cost adds up.** Twilio call (~$0.015/min US) + Anthropic ($0.05/turn) + STT + TTS = ~$0.10-$0.20 per minute. Budget per agent and shut off at cap.
- **Latency budget is brutal.** From caller speech end → AI TTS start should be < 2s for natural feel. Use Haiku for fast classification + Sonnet only for the actual reply.
- **STT confidence matters.** Twilio gives a confidence score per transcription; if < 0.6, the assistant should ask the caller to repeat ("I didn't catch that — could you say it again?") rather than guess.
