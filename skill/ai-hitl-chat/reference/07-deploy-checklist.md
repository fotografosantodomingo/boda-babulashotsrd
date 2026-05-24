# Deploy / activation checklist

Per-channel activation steps. Run the Tier-1 list before launch; add subsequent tiers once Tier-1 is stable.

## Tier 1 — web chat

- [ ] Migrations applied: `ai_conversations`, `ai_conversation_messages`, `ai_generation_log`, `ai_conversation_events`, `ai_daily_stats`. RLS policies + paired tests passing.
- [ ] API routes deployed: `POST /api/ai-chat`, `GET /api/ai-chat/poll`, `POST /api/dashboard/ai-inbox/{approve,reject}`, `POST /api/chat-transcript/email`.
- [ ] LLM provider key set as Worker secret (`ANTHROPIC_API_KEY` or equivalent). NEVER commit to repo.
- [ ] Transactional ESP key set (`BREVO_API_KEY` etc.) — needed for the transcript email feature.
- [ ] `CHAT_TRANSCRIPT_TO` env set (operator inbox email).
- [ ] Widget mounted on pages where you want chat (use `<ConditionalAhoAssistant>` pattern with per-page opt-in).
- [ ] Feature flag or per-org toggle if running side-by-side with an existing widget (Tawk, etc.).
- [ ] `/dashboard/ai-inbox` page deployed + accessible to operators (RLS reads → `is_admin()` or per-org member).
- [ ] Cron deployed for daily rollup (`/api/cron/ai-daily-rollup` at 02:00 UTC) with `CRON_SECRET`.
- [ ] Honeypot + rate-limit on the chat endpoint (KV-backed: ~30 messages/hour per IP).
- [ ] Smoke test: open incognito → click chat → enter name+email → send "Hi" → see "(awaiting agent review)" badge → switch to dashboard → approve → original tab sees the response after next poll.

## Tier 2 — email channel

- [ ] DNS: MX records for `reply.yourdomain.com` → email-routing provider (Cloudflare Email Routing 3 records: priority 10/20/30, or AWS SES inbound).
- [ ] DNS: SPF (`v=spf1 include:_spf.brevo.com include:_spf.mx.cloudflare.net ~all`) + DMARC (`v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com`).
- [ ] DKIM configured on the SENDING domain (Brevo / SendGrid console) — without it your replies hit Gmail spam.
- [ ] Cloudflare Email Routing catch-all rule enabled → routes to inbound worker.
- [ ] `workers/inbound-email` deployed. Secrets: `INBOUND_SECRET`, `APP_BASE`, `LEADS_TOKEN_SECRET`.
- [ ] App route `/api/inbound/email`: HMAC verifies forward, dedup on `messageId`, threading via `In-Reply-To`.
- [ ] Migrations: `email_threads`, `email_messages`.
- [ ] Smoke test: send to `agent-slug@reply.yourdomain.com` → check `ai_conversations` + `email_threads` + `email_messages` rows appear → approve in dashboard → outbound email lands with proper `References:` chain.

## Tier 3 — WhatsApp

The PO-side gates are the long pole, NOT the code.

- [ ] Meta Business Verification (~3-5 business days).
- [ ] BSP account (360dialog / Twilio for WA / Meta Cloud direct). 360dialog gives best per-message margins; setup ~24-48h.
- [ ] Per-number WABA + phone certification (per-agent, ~24h each).
- [ ] DNS: nothing (BSP handles).
- [ ] Webhook URL registered in BSP console: `https://your-whatsapp-webhook.workers.dev/`. Verify-token set on both sides.
- [ ] `workers/whatsapp-webhook` deployed. Secrets: `WHATSAPP_WEBHOOK_SECRET`, `INBOUND_SECRET`, `APP_BASE`.
- [ ] App routes: `/api/inbound/whatsapp` (messages) + `/api/inbound/whatsapp/status` (delivery callbacks).
- [ ] Migrations: `whatsapp_numbers`, `whatsapp_templates`, `whatsapp_messages`.
- [ ] **Pre-submit `service_reply` template** to Meta for approval (~15min - 48h) so day-1 outbound works outside the 24h service window.
- [ ] Per-agent monthly_template_budget_cents set (default $50/mo).
- [ ] Smoke test: from personal phone, click `wa.me/<test-number>` → send "test" → see ai_conversations + whatsapp_messages rows appear → approve in dashboard → reply lands on WhatsApp.

## Tier 4 — voice (Twilio phone)

- [ ] Twilio account + ConversationRelay access (~48h approval request).
- [ ] Phone number purchased per agent (US local ~$1.15/mo).
- [ ] Insert row into `agent_phone_numbers` with twilio_sid + `forward_to_phone` (mobile for warm-transfer).
- [ ] `workers/voice-conversationrelay` deployed. Secrets: `TWILIO_AUTH_TOKEN`, `INBOUND_SECRET`, `APP_BASE`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
- [ ] App route `/api/voice/twiml`: returns `<Connect><ConversationRelay url="wss://...">` TwiML.
- [ ] Twilio console: configure the number's "When a call comes in" webhook → `/api/voice/twiml` (GET).
- [ ] Migrations: `agent_phone_numbers`, `voice_calls`.
- [ ] Per-agent monthly_minute_budget set (default 500 min/mo).
- [ ] Smoke test: call the Twilio number → AI greets → say "What's the price of 123 Main?" → AI responds via TTS → both hang up → check `voice_calls` row with duration + cost.

## Tier 5 (optional) — in-browser voice mode

If you want voice as a UI MODE inside the web-chat widget (no phone provider, just browser STT/TTS), no extra infra needed:

- [ ] Browser-native: `SpeechRecognition` (Chrome/Edge/Safari) + `SpeechSynthesis` (all major). Firefox = no SR; fall back to text.
- [ ] Mode picker after pre-chat gate: "Chat" or "Voice".
- [ ] Mic permission handling (graceful denial → fall back to text + show "voice unavailable" hint).
- [ ] HTTPS-only origin required (browsers refuse SR on http://).
- [ ] iOS Safari quirk: SR session must START in response to a user gesture; can't auto-start.

No DB schema change — voice mode uses the same `/api/ai-chat` endpoint; the STT transcription IS the `userMessage`, and the AI's text reply IS what gets TTS'd.

## Cross-channel (all tiers)

- [ ] Cost observability: `/admin/audit-costs` page (or equivalent) reads `ai_generation_log` to show $/day across all channels.
- [ ] NPS / completion-rate tracking before + after launch (so you can measure the new chat vs the old widget).
- [ ] Operator training: 30-minute walkthrough of `/dashboard/ai-inbox` for the team that'll tend the queue. Reject/edit/approve buttons should be muscle-memory within a week.
- [ ] On-call rotation if voice is enabled: someone needs to answer the warm-transfer if the AI escalates outside business hours OR the call routes to voicemail and queues a callback task.
- [ ] Retire third-party widget (Tawk/Intercom) only AFTER 1-2 weeks of clean metrics. Keep the component file on disk for 1-line revert.
