# Generic DB schema

Drop-in PostgreSQL migrations for the HITL AI chat system. Generic — no domain-specific column names. Adapt the `org_id` / `agent_id` references to your own multi-tenancy model.

## Tier 1 — required for web chat

### `ai_conversations` (the cross-channel spine)

```sql
create table public.ai_conversations (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  agent_id uuid references public.profiles(id) on delete set null,

  -- The CHANNEL of CREATION. Later turns on a different channel still
  -- belong to this conversation (cross-channel context). Don't UPDATE
  -- this on channel-switches — track per-turn channel on the message.
  channel text not null check (channel in ('web_chat', 'email', 'whatsapp', 'voice')),

  status text not null default 'open'
    check (status in ('open', 'escalated', 'resolved', 'abandoned')),

  -- Buyer-side identity. ALL nullable: web chat starts anon; email
  -- starts with just the from-address; etc. Progressive enrichment as
  -- the buyer reveals more.
  buyer_session_token text,           -- web chat anon (random uuid stored in localStorage)
  buyer_email text,
  buyer_phone text,
  buyer_locale text default 'en',     -- BCP-47

  -- Optional pin: the conversation is ABOUT this specific entity
  -- (product, listing, ticket, etc.). NULL = generic inquiry.
  context_entity_type text,           -- 'listing' | 'product' | 'order' | ...
  context_entity_id uuid,

  -- Snapshot the agent's billing tier at CREATION so analytics
  -- rollups don't re-attribute when the agent upgrades later.
  tier_at_creation text,

  first_message_at timestamptz not null default now(),
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_ai_conversations_org_agent on public.ai_conversations(org_id, agent_id, last_message_at desc);
create index idx_ai_conversations_session_token on public.ai_conversations(buyer_session_token)
  where buyer_session_token is not null;
create index idx_ai_conversations_status on public.ai_conversations(status, last_message_at desc);

alter table public.ai_conversations enable row level security;

-- Org members can read their org's conversations.
create policy ai_conversations_member_select on public.ai_conversations
  for select to authenticated
  using (org_id in (
    select org_id from public.organization_members where user_id = auth.uid()
  ));

-- Service-role bypasses for all writes; no INSERT policy for anon/authenticated.
revoke insert, update, delete on public.ai_conversations from anon, authenticated;
```

### `ai_conversation_messages` (the spine)

```sql
create table public.ai_conversation_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.ai_conversations(id) on delete cascade,

  role text not null check (role in ('user', 'assistant', 'system', 'tool')),

  -- THIS TURN's channel. May differ from conversation.channel.
  channel text not null check (channel in ('web_chat', 'email', 'whatsapp', 'voice')),

  body text not null,                  -- raw text body (or escaped HTML for email outbound)

  -- Channel-specific blob — keeps the spine clean.
  attachments jsonb not null default '{}'::jsonb,

  -- Tool calls (for LLM tool-use). Both are null for plain text turns.
  tool_call jsonb,
  tool_result jsonb,

  -- HITL gate fields. All NULL for user turns.
  confidence numeric(3,2),             -- 0.00..1.00, classifier output
  intent text,                         -- domain-specific enum
  risk_flags text[] not null default '{}',  -- e.g. ['legal', 'financial', 'discrimination']

  approval_status text not null default 'pending'
    check (approval_status in ('pending', 'approved', 'rejected', 'auto_sent')),
  approved_by uuid references public.profiles(id),
  approved_at timestamptz,
  sent_at timestamptz,                 -- ← buyer-discoverable iff sent_at IS NOT NULL

  -- Optional edited body — operator may tweak the AI's draft before approval.
  edited_body text,                    -- non-null = operator changed the draft

  ai_generation_log_id uuid references public.ai_generation_log(id) on delete set null,

  created_at timestamptz not null default now()
);

create index idx_ai_conversation_messages_conv on public.ai_conversation_messages(conversation_id, created_at);
create index idx_ai_conversation_messages_pending on public.ai_conversation_messages(approval_status, created_at)
  where approval_status = 'pending';

alter table public.ai_conversation_messages enable row level security;

create policy ai_conversation_messages_member_select on public.ai_conversation_messages
  for select to authenticated
  using (conversation_id in (
    select id from public.ai_conversations where org_id in (
      select org_id from public.organization_members where user_id = auth.uid()
    )
  ));

revoke insert, update, delete on public.ai_conversation_messages from anon, authenticated;
```

### `ai_generation_log` (per-LLM-call cost tracking)

```sql
create table public.ai_generation_log (
  id uuid primary key default gen_random_uuid(),

  -- What was this call for?  E.g. 'chat_draft', 'classifier', 'translation'.
  purpose text not null,

  -- Org attribution (so per-tenant cost rollups work).
  org_id uuid references public.organizations(id) on delete set null,

  -- The model ID verbatim — survives model deprecation.
  model text not null,

  -- Market dimension for per-market cost rollups (optional).
  market text,

  -- Anthropic / OpenAI / etc. token counts.
  input_tokens int not null default 0,
  output_tokens int not null default 0,

  -- SNAPSHOT pricing at call time → historical rollups survive vendor price changes.
  estimated_cost_usd_cents int not null default 0,

  latency_ms int not null default 0,
  error_code text,                     -- NULL on success

  created_at timestamptz not null default now()
);

create index idx_ai_generation_log_org_day on public.ai_generation_log(org_id, created_at desc);
create index idx_ai_generation_log_model on public.ai_generation_log(model, created_at desc);

alter table public.ai_generation_log enable row level security;
-- No policies = no reads except service-role. Admin-only via service-role API.
revoke all on public.ai_generation_log from anon, authenticated;
```

### `ai_conversation_events` (funnel stream)

```sql
create table public.ai_conversation_events (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.ai_conversations(id) on delete cascade,
  org_id uuid not null,                -- denormalized for hot-path rollup
  agent_id uuid,                       -- denormalized
  channel text not null,

  kind text not null check (kind in (
    'started',          -- new conversation row created
    'message_user',     -- buyer sent a message
    'draft_pending',    -- LLM drafted; awaits approval
    'approved',         -- operator approved without edits
    'edited',           -- operator edited then approved
    'auto_sent',        -- (v2) sent without human review
    'rejected',         -- operator rejected the draft
    'escalated',        -- escalate tool fired (warm-transfer for voice)
    'lead_captured',    -- buyer revealed contact info
    'viewing_booked',   -- domain-specific success event
    'abandoned'         -- buyer left without resolution
  )),

  payload jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now()
);

create index idx_ai_conversation_events_org_day on public.ai_conversation_events(org_id, created_at desc);
create index idx_ai_conversation_events_kind on public.ai_conversation_events(kind, created_at desc);

alter table public.ai_conversation_events enable row level security;
create policy ai_conversation_events_member_select on public.ai_conversation_events
  for select to authenticated
  using (org_id in (
    select org_id from public.organization_members where user_id = auth.uid()
  ));
revoke insert, update, delete on public.ai_conversation_events from anon, authenticated;
```

### `ai_daily_stats` (pre-aggregated rollup)

```sql
create table public.ai_daily_stats (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  agent_id uuid references public.profiles(id) on delete cascade,  -- NULL = org-level totals
  day date not null,

  conversations int not null default 0,
  user_messages int not null default 0,
  drafts_pending int not null default 0,
  drafts_approved int not null default 0,
  drafts_edited int not null default 0,
  drafts_auto_sent int not null default 0,
  drafts_rejected int not null default 0,
  escalations int not null default 0,
  leads_captured int not null default 0,
  viewings_booked int not null default 0,

  cost_usd_cents bigint,  -- sum from ai_generation_log

  intent_counts jsonb not null default '{}'::jsonb,
  risk_flag_counts jsonb not null default '{}'::jsonb,
  channel_counts jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- UPSERT key. coalesce() because UNIQUE doesn't treat NULLs as equal.
create unique index uq_ai_daily_stats_org_agent_day
  on public.ai_daily_stats(org_id, coalesce(agent_id, '00000000-0000-0000-0000-000000000000'::uuid), day);

alter table public.ai_daily_stats enable row level security;
create policy ai_daily_stats_member_select on public.ai_daily_stats
  for select to authenticated
  using (org_id in (
    select org_id from public.organization_members where user_id = auth.uid()
  ));
revoke insert, update, delete on public.ai_daily_stats from anon, authenticated;
```

## Tier 2 — email channel

### `email_threads` (RFC-5322 anchor)

```sql
create table public.email_threads (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.ai_conversations(id) on delete cascade,

  -- Globally unique per RFC-5322. The root message_id of this thread.
  -- Used by the inbound worker to find an existing thread when a new
  -- email's In-Reply-To matches a known message_id in this thread.
  root_message_id text not null unique,

  -- Fallback threading: when In-Reply-To is missing (gmail truncations,
  -- forward chains), match on normalized subject + buyer email pair.
  subject_normalized text,

  created_at timestamptz not null default now()
);

create index idx_email_threads_conv on public.email_threads(conversation_id);
alter table public.email_threads enable row level security;
-- Inherit policy via conversation join (defined per-app).
```

### `email_messages` (per-email twin)

```sql
create table public.email_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.email_threads(id) on delete cascade,
  conversation_message_id uuid not null references public.ai_conversation_messages(id) on delete cascade,

  -- THIS email's RFC-5322 Message-ID (globally unique).
  message_id text not null unique,
  in_reply_to text,                    -- prior message_id in the thread
  references_chain text[],             -- ordered list for outbound References: header

  direction text not null check (direction in ('inbound', 'outbound')),

  from_addr text not null,
  to_addr text[] not null,
  cc_addr text[],
  raw_headers jsonb,                   -- postal-mime parse output

  dkim_pass boolean,
  spf_pass boolean,
  dmarc_pass boolean,
  spam_score numeric(4,2),             -- MailChannels Shield or similar

  created_at timestamptz not null default now()
);
```

## Tier 3 — WhatsApp

```sql
create table public.whatsapp_numbers (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references public.profiles(id) on delete cascade,
  org_id uuid not null references public.organizations(id) on delete cascade,
  phone_e164 text not null unique,
  waba_id text not null,
  display_name text,
  verified_at timestamptz,
  bsp_provider text not null check (bsp_provider in ('360dialog', 'twilio', 'meta_direct')),
  bsp_account_id text,
  monthly_template_budget_cents int default 5000,
  status text not null default 'pending' check (status in ('pending', 'active', 'suspended')),
  created_at timestamptz not null default now()
);

create table public.whatsapp_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  language text not null,
  category text not null check (category in ('marketing', 'utility', 'authentication', 'service')),
  body_template text not null,
  meta_template_id text,
  approval_status text not null default 'pending'
    check (approval_status in ('pending', 'approved', 'rejected', 'paused', 'disabled')),
  unique (name, language)
);

create table public.whatsapp_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_message_id uuid not null references public.ai_conversation_messages(id) on delete cascade,
  wa_number_id uuid not null references public.whatsapp_numbers(id),
  wa_message_id text not null unique,  -- ← idempotency dedup
  direction text not null check (direction in ('inbound', 'outbound')),
  template_id uuid references public.whatsapp_templates(id),
  in_service_window boolean not null default true,
  cost_cents int not null default 0,
  delivery_status text not null default 'sent'
    check (delivery_status in ('sent', 'delivered', 'read', 'failed')),
  created_at timestamptz not null default now()
);
```

## Tier 4 — voice

```sql
create table public.agent_phone_numbers (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references public.profiles(id) on delete cascade,
  org_id uuid not null references public.organizations(id) on delete cascade,
  phone_e164 text not null unique,
  twilio_sid text not null,
  monthly_minute_budget int default 500,
  forward_to_phone text,               -- warm-transfer destination (mobile)
  voicemail_recording_url text,
  status text not null default 'pending' check (status in ('pending', 'active', 'suspended')),
  created_at timestamptz not null default now()
);

create table public.voice_calls (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.ai_conversations(id) on delete cascade,
  agent_phone_id uuid not null references public.agent_phone_numbers(id),
  twilio_call_sid text not null unique,  -- ← idempotency dedup
  direction text not null check (direction in ('inbound', 'outbound')),
  from_phone text,
  duration_seconds int,
  recording_r2_key text,
  recording_consent boolean not null default true,
  warm_transfer_attempted boolean not null default false,
  warm_transfer_succeeded boolean not null default false,
  cost_cents int,
  created_at timestamptz not null default now()
);
```

## Adapt to your platform

Replace:
- `organizations` / `organization_members` → your tenancy model
- `profiles` → your users table
- `context_entity_type` enum values → your domain entities (`product`, `order`, `ticket`, ...)
- `intent` text values → your domain intents

The shape stays.
