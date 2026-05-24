# Costs + observability

Token economics, per-channel cost shape, what to log, what dashboards to build.

## Per-LLM-call cost math (as of 2026-05)

Snapshot pricing — store cost at call time, never recompute. Historical rollups survive vendor price changes. Reference: AHO's `src/lib/ai/cost.ts`.

| Model | Input ($/MTok) | Output ($/MTok) | Sample call cost* |
|---|---|---|---|
| Claude Haiku 4.5 | $1.00 | $5.00 | $0.0033 |
| Claude Sonnet 4.6 | $3.00 | $15.00 | $0.0098 |
| Claude Opus 4.7 | $15.00 | $75.00 | $0.0488 |
| GPT-4o-mini | $0.15 | $0.60 | $0.0005 |
| GPT-4o | $2.50 | $10.00 | $0.0073 |
| Gemini Flash 2.0 | $0.075 | $0.30 | $0.0002 |

*Sample = 1500-token system prompt + 400-token user message + 350-token assistant reply.

## Per-channel cost shape

Each channel has different cost components:

### Web chat
```
LLM call:    $0.005-0.020 per buyer turn  (Sonnet)
Total:       ~$0.01/turn
```

### Email
```
LLM call:    $0.005-0.020 per draft       (Sonnet)
ESP send:    $0.0001 per outbound         (Brevo / SendGrid)
Total:       ~$0.01/draft + $0.0001/sent
```

### WhatsApp
```
LLM call:    $0.005-0.020                  (Sonnet)
In-window:   $0.00                         (24h service window after buyer's last msg)
Out-window:  $0.005-0.10 per template      (varies by market — BR ~$0.05, US ~$0.025, IN ~$0.005)
Total:       ~$0.01 in-window / ~$0.04-0.11 out-window per turn
```

### Voice (phone — Tier 4)
```
LLM call:     $0.005-0.020 per turn        (Sonnet)
Twilio call:  $0.015 per min               (PSTN US)
STT:          $0.025 per min               (Deepgram OR Twilio bundled)
TTS:          $0.075 per min               (ElevenLabs OR Twilio bundled)
Total:        ~$0.10-0.20 per minute
```
Voice is **10-20x more expensive per minute** than text channels.

### Voice (in-browser — Tier 5)
```
LLM call:  $0.01/turn  (same as text)
STT:       $0.00       (browser-native)
TTS:       $0.00       (browser-native)
Total:     ~$0.01/turn (equal to text mode)
```

## 100-conversation example

Average conversation = 8 buyer turns + 8 AI drafts. Per channel:

| Channel | Per conv | 100 conv |
|---|---|---|
| Web chat | $0.08 | **$8** |
| Email | $0.09 | **$9** |
| WhatsApp (in-window) | $0.08 | **$8** |
| WhatsApp (out-window, US) | $0.40 | **$40** |
| Voice phone (5 min avg) | $0.75 | **$75** |
| Voice browser | $0.08 | **$8** |

Plan capacity accordingly. Web + browser-voice + in-window-WhatsApp are cheap enough that "AI for everyone" works. Phone-voice and out-window-template-WhatsApp need budget enforcement.

## Token-saving patterns (5-10x reductions, real)

### Prompt caching (Anthropic)
Mark the static portion of your system prompt with `cache_control: { type: 'ephemeral' }`. Anthropic caches the prefix for 5 minutes. Cache hits cost **10% of full input** for the cached portion.

```ts
const resp = await anthropic.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  system: [
    {
      type: 'text',
      text: STATIC_SYSTEM_PROMPT + KNOWLEDGE_BLOB,  // ~3000 tokens
      cache_control: { type: 'ephemeral' },
    },
    { type: 'text', text: PER_REQUEST_DYNAMIC_PORTION },  // ~200 tokens, NOT cached
  ],
  messages: [...turnHistory, { role: 'user', content: latestUserMessage }],
});
```

For a chat with 10 turns over 3 minutes, this saves ~80% of total input cost.

### Haiku classifier first
For high-volume chats, gate Sonnet behind a cheap Haiku classifier:
```
1. Haiku reads the user message + intent labels: { intent, confidence, needs_sonnet }
2. If confidence > 0.9 AND intent ∈ ['greeting', 'thanks', 'goodbye'] → respond with a templated answer (~$0.0002)
3. Otherwise → Sonnet drafts the real reply (~$0.01)
```
Cuts cost ~50-70% on chats with lots of small-talk turns.

### Knowledge base injection cap
Don't dump 50 listings into context every turn. Pick top 10 by relevance (focus entity first, then proximity). AHO's `src/lib/ai/knowledge.ts` caps at 20 listings + 10 FAQs.

### Per-turn history truncation
Last 20 turns max. For long conversations, summarize older turns into a single "earlier context" block — preserves continuity at fixed token cost.

### Streaming abort on reject
If the operator marks "reject" mid-stream, abort the LLM call (close the SSE controller). Saves the remaining output tokens. Net savings depend on average reject rate × tokens-per-reply.

### JSON-mode tool calling
For structured tool calls, request JSON output via tool-use API (not "respond in JSON format" prose). Outputs are tighter — fewer tokens of "Sure, here's the JSON: ..." preamble.

### max_tokens cap
Always cap `max_tokens` to your actual budget. 1024 is plenty for a chat turn. Default of 4096 = customers occasionally get walls of text + you pay for tokens nobody reads.

## What to log

### REQUIRED — every LLM call

```sql
create table public.ai_generation_log (
  id uuid primary key default gen_random_uuid(),
  purpose text not null,                    -- 'chat_draft' | 'classifier' | 'audit_import' | ...
  org_id uuid references public.organizations(id) on delete set null,
  model text not null,                       -- 'claude-sonnet-4-6' literal
  market text,                               -- 'us' | 'es' | 'pl' | ... for per-market rollups
  input_tokens int not null default 0,
  output_tokens int not null default 0,
  estimated_cost_usd_cents int not null default 0,  -- snapshot pricing at call time
  latency_ms int not null default 0,
  error_code text,                           -- NULL on success
  created_at timestamptz not null default now()
);
create index idx_ai_generation_log_org_day on public.ai_generation_log(org_id, created_at desc);
```

### REQUIRED — funnel events

Every meaningful moment in a conversation. AHO's `ai_conversation_events` shape: see `02-schema.md`. Kinds:
- `started` (conversation row created)
- `message_user` (buyer sent)
- `draft_pending` (LLM drafted; awaits approval)
- `approved` / `edited` / `auto_sent` / `rejected`
- `escalated` (escalate tool fired or warm-transfer)
- `lead_captured` (buyer revealed contact)
- `viewing_booked` (or your domain's success event)
- `abandoned` (no response in N hours after operator approved)

### NICE — per-tool-call latency
If you have tool-use, log per-tool latency separately. Useful for spotting slow tools (DB query in lookup_listing tool taking 1.5s = bottleneck).

### NICE — classifier confidence histogram
If your gating uses confidence scores, log them. Plot a histogram daily. Bimodal distribution (lots of 0.5s) = classifier is uncertain too often; tune.

### NICE — time-to-approval
From `draft_pending` event → `approved`/`edited`/`rejected`. Tracks operator response time. Target: P50 < 5 min business hours.

### NICE — draft-edit ratio
% of approved drafts that the operator edited vs took as-is. > 30% edits = AI tone is off; tune the prompt.

## Cost attribution at the right grain

The `org_id` on `ai_generation_log` is load-bearing. Without it, you can't say "this org consumed $40 of AI last month." Pre-2026-05 AHO didn't have `org_id` on the log, and per-org cost queries returned platform-wide totals — useless.

When to roll up:
- **Nightly cron is enough for v1.** Roll the previous day's events into `ai_daily_stats` (one row per org per agent per day; UPSERT keyed on coalesce(agent_id, '00000000…'::uuid)).
- **Real-time** (Materialized Views, stream processing) is overkill until the dashboard is doing per-second queries.

AHO's pattern in `src/app/api/cron/ai-daily-rollup/route.ts`: runs at 02:00 UTC, reads previous day's events + messages, aggregates in JS (in-memory rollup at <100k rows is fine), upserts.

## Dashboards worth building (ordered by ROI)

### 1. Per-day total spend (line chart, last 30 days)
Spike detection is obvious. AHO's `/admin/audit-costs` does this. The 30-day baseline + a "today" marker = instant anomaly detection. If today is 2x rolling 7-day average, something's wrong.

### 2. Per-org spend (table, sorted desc)
Concentration risk. If 80% of cost is one org, you have a single-customer dependency.

### 3. Per-model breakdown
Which models are hot vs underused. If Opus is 30% of cost and you're not using it for high-stakes tasks, you're overpaying.

### 4. Cost per outcome
Connect cost to revenue. AHO target: < $0.30 per audit, < $1.00 per video. Your equivalents: cost per lead captured, cost per viewing booked, cost per ticket resolved. If cost-per-outcome > revenue-per-outcome, the AI is unprofitable.

### 5. Cost-per-operator-minute
How much AI time vs operator time per resolution. If operators take 8 minutes to review a 30-second AI draft, the AI isn't actually saving anything.

## Per-org budget enforcement

When you have free + paid tiers, free-tier orgs need spend caps so a runaway loop can't drain you.

```sql
alter table public.organizations
  add column monthly_ai_budget_cents int not null default 1000;  -- $10/mo default
```

**Soft cap** (warn at 80%):
```ts
// In the chat endpoint, before the LLM call:
const monthSpend = await getOrgSpendThisMonth(orgId);
if (monthSpend > org.monthly_ai_budget_cents * 0.8) {
  // Log a warning event; email operator. Don't block yet.
  await recordEvent(admin, { ... kind: 'budget_warn', payload: { monthSpend, cap: org.monthly_ai_budget_cents } });
}
```

**Hard cap** (block at 100%):
```ts
if (monthSpend > org.monthly_ai_budget_cents) {
  return NextResponse.json({ error: 'budget_exceeded' }, { status: 429 });
  // OR: degrade gracefully — accept the message, queue it, draft on next budget reset.
}
```

**Nightly cron** checks rollups against budgets, emails operator on orgs nearing cap.

## Cost-anomaly alerts

AHO ships these in `workers/ai-cost-alert/`. Cron at 05:00 UTC. Sends email when:

| Trigger | Threshold | Likely cause |
|---|---|---|
| Daily total spend | > 2x rolling 7-day average | Runaway loop, prompt regression, traffic spike |
| Avg cost per audit/conversation | > 1.5x baseline | Model upgrade, prompt got longer, KB grew |
| Per-org spend | > 5x typical for that org | Abuse, scripted attack, viral moment |
| Error rate | > 5% LLM calls erroring | Provider degraded, network issue, API key expired |
| Latency P95 | > 10s | Provider slow, prompt too long |

Email body includes: yesterday's number, baseline, % change, top contributing orgs, link to dashboard.

## Common cost mistakes (lessons from AHO)

1. **`void admin.from('ai_generation_log').insert(...)` silently drops the log on Edge runtime.** Always `await`. Unawaited promises are killed when the response handler returns.
2. **Forgetting to set `org_id` on the log row.** Per-tenant rollups break silently. Add a test that the rollup-by-org returns non-zero for any active org.
3. **Including the full per-org knowledge base on every turn.** Token bloat. Cache the knowledge blob hash; only re-fetch if listings/FAQs changed.
4. **Letting the AI call tools recursively without a max-depth cap.** AHO caps at 3 tool loops per turn. Without a cap, a confused model can burn $1+ in one buyer message.
5. **Not capping `max_tokens` on the assistant response.** Some buyers get 4000-token replies on simple questions. Cap at 1024 for chat, 2048 for email, 256 for voice (TTS-friendly).
6. **Logging without `purpose` discrimination.** When you can't separate "blog generation" cost from "chat draft" cost from "audit import" cost, you can't tune the right one.
7. **Pricing TTL not respected.** If you cache the system prompt with Anthropic's `cache_control`, you save 90% — but only if turns are within 5 min of each other. For sparse chats, you're paying full price every time. Worth running a 30-day analysis to see if your traffic pattern benefits.
