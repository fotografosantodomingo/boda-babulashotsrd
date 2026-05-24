# Architecture overview

## System in one paragraph

A customer message arrives via one of N channels (web chat / email / WhatsApp / voice). A thin **channel adapter** normalizes it into a row in the shared `ai_conversations` + `ai_conversation_messages` tables. The **agent system prompt** is composed fresh per-call from the agent's profile + market + locale + tier + (optional) focus listing/product. An LLM call produces a draft response, which is **classified** for intent + risk and persisted as `approval_status='pending'`. Operators see pending drafts in `/dashboard/ai-inbox`, edit/approve/reject, and approval sets `sent_at=now()`. The buyer's widget (or the email/WhatsApp/voice channel adapter) discovers the approved message via polling (web) or queue (email/WA) or real-time pipe (voice) and delivers it. Every meaningful event lands in `ai_conversation_events`; nightly cron rolls into `ai_daily_stats` for the dashboard.

## Entity-relationship diagram (conceptual)

```
                  ┌─────────────────────┐
                  │  ai_conversations   │   one row per (buyer × agent × maybe product/listing)
                  │  ─────────────────  │   spans ALL channels — buyer who emails THEN chats
                  │  id PK              │   shares one conversation row + history.
                  │  org_id             │
                  │  agent_id           │
                  │  channel (initial)  │   The CHANNEL field is the channel of CREATION;
                  │  status (open|...)  │   later turns on a DIFFERENT channel still go here.
                  │  buyer_locale       │
                  │  tier_at_creation   │   ← snapshot so tier-change post-conversation
                  └──────────┬──────────┘     doesn't re-attribute the data.
                             │ 1
                             │
                             │ N
            ┌────────────────┴────────────────┐
            │  ai_conversation_messages       │
            │  ───────────────────────────    │   the SPINE table — every turn goes here
            │  id PK                          │   regardless of which channel it came from
            │  conversation_id FK             │
            │  role (user|assistant|system    │
            │       |tool)                    │
            │  channel (this turn's channel)  │   ← may differ from conversation.channel
            │  body (text)                    │
            │  attachments (jsonb)            │   channel-specific blob: email headers,
            │  tool_call / tool_result        │     WhatsApp media IDs, voice STT confidence
            │  confidence (0.0..1.0)          │
            │  intent (enum)                  │
            │  risk_flags (text[])            │
            │  approval_status                │   ← THE HITL GATE
            │      (pending|approved|         │
            │       rejected|auto_sent)       │
            │  approved_by FK                 │
            │  approved_at / sent_at          │
            │  ai_generation_log_id FK        │
            └─────────────────────────────────┘
                   │                ↑
                   │ many-1         │ many-1
                   ↓                │
   ┌─────────────────────┐    ┌─────────────────┐
   │ email_messages      │    │ whatsapp_messages│   per-channel SIDE tables capture the
   │ (RFC-5322 envelope) │    │ (cost + wamid)   │   things the spine doesn't care about.
   │                     │    │                  │   1-to-1 with the spine row for that turn.
   │ + email_threads     │    │ + whatsapp_      │
   │   (root msg id +    │    │   numbers (per-  │
   │    in_reply_to chain│    │   agent line)    │
   │    for threading)   │    │ + whatsapp_      │
   └─────────────────────┘    │   templates      │
                              │   (pre-approved) │
                              └──────────────────┘

                       ┌─────────────────────┐
                       │ agent_phone_numbers │ ←—— voice channel
                       │ + voice_calls       │
                       │   (twilio_sid uniq) │
                       └─────────────────────┘

      ┌────────────────────────┐         ┌──────────────────────┐
      │ ai_conversation_events │ ──cron→ │ ai_daily_stats       │
      │ (funnel checkpoints —  │         │ (pre-aggregated      │
      │  started / draft_      │         │  per (org, day),     │
      │  pending / approved /  │         │  per (agent, day) —  │
      │  edited / sent / etc.) │         │  dashboard reads     │
      └────────────────────────┘         │  here, NOT raw)      │
                                         └──────────────────────┘

      ┌────────────────────────┐
      │ ai_generation_log      │ ←—— per-LLM-call cost + token tracking
      │ (purpose, model,       │     SNAPSHOT pricing at call time so
      │  input_tokens,         │     historical rollups survive vendor
      │  output_tokens,        │     pricing changes.
      │  estimated_cost_cents) │
      └────────────────────────┘
```

## Why the spine + side-table pattern

Most "chat" products tightly couple channel + message — separate `email_messages`, `chat_messages`, `sms_messages` tables, each with their own conversation thread. That makes "buyer who emailed last week then opens chat" a hard problem (no shared thread).

The AHO pattern: ONE spine table (`ai_conversations` + `ai_conversation_messages`) for the cross-channel thread; side tables for channel-specific metadata (RFC-5322 headers for email, cost + wamid for WhatsApp, STT confidence for voice). The spine never grows new fields per-channel.

Result: cross-channel context is free. A query for "all messages with this buyer" returns email + chat + WhatsApp in one ordered list.

## Request flow — web chat (the simplest path)

```
1.  Buyer types in widget                        client
2.  POST /api/ai-chat                            server
       { conversationId | null,
         userMessage, sessionToken (anon),
         agentId, locale, propertyId? }
3.  Create conversation row if null              service-role write
4.  Insert user turn into ai_conversation_       service-role write
       messages (channel='web_chat')
5.  Fetch knowledge (RAG-lite)                   service-role read
       — agent's top listings + FAQs + bio
6.  Build system prompt                          pure function
7.  Stream converseStream() back as SSE          LLM API (Sonnet)
       — text-delta + tool-call + done events
8.  After stream complete:                       service-role write
       — classify intent + risk
       — insert assistant turn with
         approval_status='pending'
       — write ai_generation_log row (cost)
       — write ai_conversation_events row
         (kind='draft_pending')
9.  Widget shows assistant message               client
       with "(awaiting agent review)" badge
       — NO body shown yet
10. Widget polls GET /api/ai-chat/poll           every ~5s
       ?conversationId&sessionToken
11. Operator opens /dashboard/ai-inbox           dashboard
12. Sees pending draft → edits → approves        POST /api/dashboard/ai-inbox/approve
       — sets approval_status='approved'
       — sets sent_at=now()
       — writes ai_conversation_events row
         (kind='approved' or 'edited')
13. Buyer's next poll returns approved body      client
14. Widget removes badge, renders message        client
```

## Request flow — email (async batched)

```
1.  Buyer emails agent-slug@reply.yourdomain.com
2.  Email provider (Cloudflare Email Routing /
    AWS SES / Postmark) catches via catch-all
    rule → invokes Worker
3.  Worker:
    - postal-mime parse the RFC-5322
    - verify DKIM/SPF/DMARC
    - HMAC-sign the forward
    - POST /api/inbound/email on Pages app
4.  Pages app:
    - resolve agent-slug → agent_id
    - find existing thread via In-Reply-To
      OR create new
    - insert email_threads row (if new)
    - insert email_messages + ai_conversation_
      messages (channel='email') row pair
    - enqueue async draft job
5.  Async worker picks up job:
    - same knowledge + prompt + LLM call
      as web chat
    - inserts assistant turn with
      approval_status='pending'
6.  Operator reviews in /dashboard/ai-inbox
   (same UI as web chat)
7.  Approve → outbound send via transactional
    ESP, preserving References + In-Reply-To
8.  Buyer receives the email; reply lands
    back at step 1 via In-Reply-To match
```

## Request flow — voice (real-time, no HITL)

```
1.  Caller dials agent's Twilio number
2.  Twilio answers, fetches TwiML from
    /api/voice/twiml
3.  TwiML upgrades to WebSocket → Worker
4.  Worker:
    - log call to voice_calls (twilio_sid)
    - greet caller via TTS
5.  Per turn:
    - Twilio sends STT'd user text
    - Worker calls converse() (Sonnet)
    - Worker classifies risk
    - IF risk_flags non-empty → warm-transfer
      to agent's mobile via Twilio Conference
    - ELSE return assistant text for TTS
6.  Both sides hang up → Worker writes
    voice_calls.duration + cost
```

## What this architecture is good at

- Cross-channel context for free (the spine)
- Honest cost attribution (per-call log → daily rollup)
- HITL enforcement that's hard to bypass (frontend can't approve; the API route runs admin auth check + writes the timestamp)
- Channel-by-channel deploy (Tier 1 web chat ships independently; Tier 2-4 each add a slice)

## What it's NOT good at

- Sub-second latency for HITL channels (HITL implies human wait time; only voice can be real-time and voice gives up HITL)
- High-concurrency multi-agent collaboration (one agent per conversation; no real-time edits)
- Conversation branching / forking (linear thread; no Git-style alternates)

If those are your requirements, this architecture is the wrong starting point.
