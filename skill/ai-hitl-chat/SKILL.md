---
name: ai-hitl-chat
description: Replace a third-party chat widget (Tawk/Intercom/Drift) with an in-house HITL (human-in-the-loop) AI chat that drafts responses for human approval before sending — scales from web-only to 4 channels (web + email + WhatsApp + voice)
---

# When to use this skill

Use when you want to **replace a third-party customer-service chat widget** (Tawk.to, Intercom, Drift, Tidio, Zendesk Chat, etc.) with an in-house AI agent that:

- Drafts every reply with an LLM (Claude, GPT, whatever)
- Routes every draft through a human-approval gate before it reaches the customer (HITL)
- Persists conversations + messages in your own DB so you own the data
- Scales to email / WhatsApp / voice channels without re-architecting

**Do NOT use** when:
- You just need a passive "leave us a message" form — too heavyweight; ship a Brevo/HubSpot form.
- You want fully-autonomous AI replies with no human gate — different design (no HITL means no inbox, no approval queue, no per-tier gating; the whole skill changes shape).
- Your team isn't ready for the inbox-tending workload — HITL puts work on humans. If nobody will tend the queue, drafts pile up and the chat dies.

# Reference implementation

This skill was extracted from AHO (Advertise Homes Online), where the full system replaced Tawk in ~3-5 days of focused engineering (across multiple sessions). Reference commits in `github.com/fotografosantodomingo/AHO`:

| Commit | What |
|---|---|
| `c1f5b10` | Phase 1 foundation (DB schema + base libs) |
| `4d44dbc` | Phases 2-5 — 4 channels shipped via parallel sub-agents |
| `309cc9f` | Polish round (tier lookup + poll endpoint + dashboard wiring) |
| `cdfe1de` | Tawk retired |

If you have access to the AHO repo, the code is a working reference. This skill is the **portable architecture** — generic enough to drop into a different product (SaaS support, e-commerce, healthcare intake, etc.).

# How to use this skill

This is a **multi-day project**, not a one-shot task. Sequence it in 4 tiers; each tier is independently shippable + valuable. Don't try to ship all 4 channels at once unless you've already built Tier 1 elsewhere.

**Tier 1 — Web chat HITL** (~2-3 days)
The wedge. Replaces the third-party widget; no external BSP creds needed. Ship this first and learn the inbox tending workload before committing to more channels.

**Tier 2 — Email channel** (~1-2 days after Tier 1)
Buyer emails `agent@reply.yourdomain.com` → catch-all → worker → same conversation thread. Needs DNS + email-routing (Cloudflare Email Routing or AWS SES) + transactional ESP for outbound.

**Tier 3 — WhatsApp channel** (~1 day after Tier 2 + WhatsApp Business approval which is the long pole)
Needs a BSP (360dialog, Twilio for WA, or Meta Cloud API direct) + Meta Business Verification + per-number certification. The BSP/Meta approval is the actual wait, not the code.

**Tier 4 — Voice channel via phone** (~2-3 days after Tier 3, plus 1-2 week PO action for Twilio approval)
Twilio ConversationRelay or similar. Voice is real-time so it CANNOT be HITL (humans can't approve at conversation speed) — design decision: voice gets heuristic gating + warm-transfer to human on escalation, no draft queue.

**Tier 5 — In-browser voice mode** (~1-2 days, optional, no provider deps)
Adds a Voice tab to the web chat widget itself — visitor speaks, AI speaks back — using the browser-native Web Speech API. No STT/TTS provider, no API key, no DB schema change. Costs the same as text mode (~$0.01/turn, 10-20x cheaper than Tier 4 phone voice). Falls back to text on Firefox + mic-permission denial. See `reference/08-voice-mode-in-browser.md`. Worth shipping if your buyers skew mobile or accessibility-conscious.

# Required reading before starting

These cover the architecture + the gotchas the AHO team hit. They're inside this skill folder:

**Core architecture (read first, in order):**
- `reference/01-architecture.md` — system overview + entity-relationship diagram
- `reference/02-schema.md` — generic DB schema (drop into your migration tool)
- `reference/03-system-prompt.md` — agent prompt builder pattern (per-locale, per-channel, per-tier)
- `reference/04-api-route.md` — main chat endpoint shape (SSE streaming + HITL gate)
- `reference/05-channel-adapters.md` — per-channel inbound/outbound patterns
- `reference/06-gotchas.md` — the war-story list (17 bugs that took multiple iterations to root-cause, including the AI-KB-drift pattern that ships consumer-protection-grade bugs)
- `reference/07-deploy-checklist.md` — what to install / configure / DNS per channel before each one goes live

**Optional channel + ops (read when relevant):**
- `reference/08-voice-mode-in-browser.md` — Tier 5: in-browser voice mode via Web Speech API (no STT/TTS provider needed; 10-20x cheaper than Tier 4 phone voice)
- `reference/09-costs-observability.md` — token cost math per channel, what to log, dashboards worth building, per-org budget enforcement
- `reference/10-testing-strategy.md` — unit / RLS / integration / E2E patterns for HITL flows; the testing pyramid for AI systems
- `reference/11-operator-workflows.md` — the HUMAN side of HITL: training operators, inbox UX rules, KPIs, escalation playbook, the "is the AI helping or hurting?" 30-day audit

# Slice 1 — Web chat HITL (the wedge)

The day's order of operations. Every step is shippable on its own.

1. **DB schema** — apply migrations for `ai_conversations`, `ai_conversation_messages`, `ai_conversation_events`, `ai_generation_log`, `ai_daily_stats`. See `reference/02-schema.md`. Keep RLS deny-by-default; service-role bypasses. Don't add channel-specific tables yet (defer to Tier 2+).

2. **LLM call wrapper** — single function `converse({ system, messages, model, maxTokens, tools? })` that wraps your LLM provider. Returns a TypedReader/AsyncIterator yielding `text-delta` / `tool-call` / `done` events. The streaming shape matters for Tier 1 web chat UX.

3. **System prompt builder** — `buildAgentSystemPrompt({ market, locale, channel, tier, agent, focusListing? })`. See `reference/03-system-prompt.md` for the structure. Hardcode the templates per-locale at first; the file can be 200-300 LOC and it's fine.

4. **Knowledge retrieval (RAG-lite)** — `fetchKnowledge({ orgId, agentId, focusListingId? })` returns the agent's top N listings + FAQs + bio as a JSON blob. Inject into the prompt as a `<knowledge>...</knowledge>` system message. No vector DB needed for v1 — keyword fetch from your existing tables is fine. **AHO-specific:** swap "listings" for whatever the agent's domain is (products / services / docs / inventory).

5. **Intent + risk classification (heuristic)** — `classifyAssistantTurn({ userText, assistantDraft, market })` returns `{ intent, confidence, riskFlags }`. v1 is regex-based (no second LLM call). For your domain, define ~5-10 risk patterns (compliance phrases your industry must avoid). AHO's set is real-estate Fair Housing language. Yours might be HIPAA, SEC, FTC, etc.

6. **Main chat endpoint** — POST `/api/ai-chat` with `{ conversationId | null, userMessage, sessionToken (anon), agentId, locale, propertyId? }`. See `reference/04-api-route.md`. Streams SSE back. Persists user turn, calls LLM, classifies, persists assistant turn as `approval_status='pending'`. **Does NOT return the draft to the buyer immediately** — that's the HITL gate.

7. **Polling endpoint** — GET `/api/ai-chat/poll?conversationId=X&sessionToken=Y` returns approved assistant turns the widget hasn't seen yet. Session-token auth for anon buyers. Widget polls every ~5s.

8. **Web chat widget** — client component. Renders message list + input + polling loop. Handle markdown carefully (see gotcha: bold-wrapped URLs break the markdown parser). Pre-chat gate (optional — email/WhatsApp capture before chat starts) is a nice-to-have for lead capture.

9. **Operator inbox** — `/dashboard/ai-inbox` page (admin/agent only). Lists pending drafts, allows approve/edit/reject. Approve sets `approval_status='approved'` + `sent_at=now()` so the buyer's next poll sees it.

10. **Funnel events + rollup** — every meaningful moment writes to `ai_conversation_events` (started, message_user, draft_pending, approved, edited, rejected, escalated, lead_captured). Nightly cron rolls into `ai_daily_stats` for the dashboard analytics tab.

11. **Tier-based gating** — `getAgentTier(orgId)` returns the org's billing tier; the system prompt + tool availability vary by tier. v1 = HITL always (regardless of tier); v2 unlocks auto-send for top tier.

12. **Retire the old widget** — once 1-2 weeks of the new chat is stable, remove the old widget mount. Keep the old widget code on disk for fast rollback (1-line revert). Track NPS before/after; if NPS drops > 5 points, roll back and diagnose.

# Slice 2 — Email channel

13. DNS: MX records for `reply.yourdomain.com` → email routing service (Cloudflare Email Routing for ~free; AWS SES inbound; Postmark; Mailgun route).
14. Inbound worker: receives the raw RFC-5322, parses with `postal-mime`, verifies DKIM/SPF/DMARC, forwards to your app. See `reference/05-channel-adapters.md` § Email.
15. Schema: add `email_threads` (root_message_id + In-Reply-To threading) + `email_messages` (per-email twin of `ai_conversation_messages`).
16. Async draft pipeline: email replies don't need to be sub-second; queue the draft generation. Sonnet drafts; lands as `approval_status='pending'` same as web chat.
17. Outbound: approved draft sends via your transactional ESP (Brevo, SendGrid, Postmark). Preserves `References:` + `In-Reply-To:` headers for proper threading.

# Slice 3 — WhatsApp

18. PO action (multi-week): Meta Business Verification → 360dialog/BSP account → per-agent WABA phone number certification.
19. Webhook worker: receives Meta payload, verifies `X-Hub-Signature-256` HMAC, forwards to app. See `reference/05-channel-adapters.md` § WhatsApp.
20. Schema: `whatsapp_numbers` (per-agent), `whatsapp_templates` (pre-approved templates), `whatsapp_messages` (cost tracking).
21. Free-form (24h service window) vs template messages: free-form is zero-cost within 24h of buyer's last message; outside that window, must use a pre-approved template. Track in_service_window for cost reporting.
22. Approval flow: same as email — agent reviews in inbox, picks free-form OR template, approve sends.

# Slice 4 — Voice

23. PO action: Twilio (or Vonage / SignalWire) account + ConversationRelay access (~48h approval) + per-agent phone number purchase.
24. TwiML endpoint: returns the WebSocket URL for Twilio to bridge speech ↔ Worker.
25. Worker: WebSocket bridge that receives speech frames, sends transcribed text to your LLM via `converse()`, returns assistant text for TTS.
26. **No HITL on voice** — humans can't approve at conversation speed. Compensate with stricter risk gating (refuse on legal/financial/discrimination automatically) + warm-transfer to human via Twilio Conference on escalate tool.
27. Schema: `agent_phone_numbers` + `voice_calls` (per-call telemetry, recording URLs if consent).

# Critical operating principle — single source of truth for AI facts

The most expensive class of bug in HITL AI chat is **knowledge-base drift**: the AI quotes a fact (price, duration, feature, policy) that contradicts what the system actually does. The AI isn't hallucinating — it's faithfully reading from a stale string in its knowledge base. Customers see the wrong fact, expect the wrong outcome, get the wrong outcome. Consumer-protection grade.

**Pattern:** every fact the AI quotes must map to a single shared constant in your codebase that's ALSO used by the system that enforces that fact. Marketing copy, AI knowledge base, billing handler, third-party product setup (Stripe / etc.), unit tests — all reading from the same module. A drift-guard test asserts the KB strings literally contain the constant value.

```ts
// src/lib/billing/private-listing-constants.ts — single source
export const PRIVATE_LISTING_DURATION_DAYS = 90;
export const PRIVATE_LISTING_DURATION_MS = PRIVATE_LISTING_DURATION_DAYS * 24 * 60 * 60 * 1000;
```

```ts
// billing handler — uses the constant for actual math
import { PRIVATE_LISTING_DURATION_MS } from './private-listing-constants';
const expiresAt = new Date(paidAtMs + PRIVATE_LISTING_DURATION_MS).toISOString();
```

```ts
// drift-guard test — locks AI KB strings to the constant
it('KB cites the same duration the constant declares', () => {
  const kb = ahoPlatformKb('en');
  const privateOwner = kb.tiers.find(t => /private[- ]?owner/i.test(t.name));
  expect(privateOwner.description).toContain(`${PRIVATE_LISTING_DURATION_DAYS}-day`);
  expect(privateOwner.description).not.toContain('60-day');  // catch regression to the OLD value
});
```

See `reference/06-gotchas.md` §16 for the full incident write-up (AHO shipped a 60→90 day drift on 2026-05-19; the AI faithfully told customers "60 days" for 5 days before a screenshot caught it). The fix wasn't to tune the prompt — it was to make the drift mechanically impossible.

**Apply this to every fact in your KB:** prices, durations, tier names, feature flags, refund policies, response-time SLAs. If the AI says it, the test should enforce it.

# Critical design decisions (lock these BEFORE coding)

- **HITL always vs tier-gated auto-send?** AHO chose HITL-always v1, auto-send-for-top-tier v2. Lower tier always gates; higher tier unlocks when confidence > 0.8 AND risk_flags is empty. Picking "auto-send for everyone" makes v1 much riskier — the first bad reply that gets sent kills trust.
- **Voice = HITL or autonomous?** AHO chose autonomous (real-time constraint) with strict gating + warm-transfer. Voice can't reasonably be HITL.
- **Single LLM call vs router + specialist?** AHO uses Sonnet for everything in v1 (~$0.05-0.10 per chat). For high-volume products, consider a cheap Haiku classifier first → only escalate to Sonnet if confidence < threshold. AHO's v2 plan.
- **Markdown / link rendering** in chat widget — use `[label](url)` ONLY. Bold-wrapping URLs (`**https://...**`) breaks the markdown parser; the bold matches first and swallows the URL. AHO hit this bug and fixed via instruction-tuning the prompt (NEVER bold URLs) + safe-link extraction in `tool_result`.
- **Pre-chat gate (newsletter capture)?** Optional but a high-leverage lead capture. AHO's `pre-chat-gate.tsx` collects email + locale before the chat starts; gate is per-conversation (once they've started, no more gates).
- **Cookie / cache interaction** — if your CDN caches the widget mount points, ensure NO Set-Cookie on those pages (CDN treats Set-Cookie as personalized → cache off). Persist session via localStorage, not cookie.

# Caveats + Hard rules

- **Every RLS policy ships with a paired test.** AHO's pattern: per-table test file under `tests/rls/` that exercises every policy from every tier (anon, registered, agent, admin) with both positive (allowed) and negative (denied) cases.
- **Anything that writes to DB during a request must be `await`ed** on edge runtimes. Promises-not-awaited get killed when the handler returns. No `void admin.from(...).insert(...)` patterns.
- **supabase-js does NOT throw on row-level errors.** Destructure every response: `const { error } = await admin.from(...); if (error) console.error(...)`. RLS denials, CHECK violations, schema mismatches all surface on the resolved value, not as a rejected promise.
- **Idempotency on webhook retries.** Every inbound channel (email message_id, WhatsApp wamid, voice call_sid) has a globally-unique provider ID. Use it as a unique index on the channel-specific table to dedup retries.
- **No fake data in user-facing slots.** Empty inbox = honest empty state, not seeded fake conversations.
