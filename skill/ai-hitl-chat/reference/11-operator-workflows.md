# Operator workflows

The HUMAN side of HITL. The skill so far is about building the system; this is about running it once it's live. Without the operator workflow, the system rots.

## Who tends the queue?

Three operator models. Trade-offs differ; pick by team shape.

### Agent self-service (AHO's choice for v1)
The agent whose listings get questions reviews their own AI drafts.

✅ Domain expert · no extra hire · agent's voice preserved
❌ Agent's bottleneck = chat bottleneck · stale drafts when agent's distracted · no 24/7 coverage

### Centralized support team
1-5 ops people review across all agents' inboxes.

✅ Predictable response time · deep AI-pattern expertise · 24/7 via shifts
❌ Loses agent voice (genericizes) · needs careful per-agent context · headcount cost

### Hybrid
Agents tend their own inbox during business hours; support team covers nights/weekends.

✅ Best of both
❌ Handoff state non-trivial — who saw it last? UI needs "claimed by" + "released" states.

**Recommended starting path:** agent self-service. Add support overlay once any single agent exceeds 50 pending drafts/day. Don't over-build until usage forces it.

## Inbox UX design rules

What makes the operator queue lovable vs hated:

- **Pending count badge in nav** — operator knows there's work without checking
- **One-click approve.** One-click reject. Edit-then-approve is two clicks.
- **Visual chips** for AI confidence + intent + risk_flags — operator knows at a glance what needs scrutiny vs what's safe to rubber-stamp
- **Context above the draft** — show the buyer's full last message + listing/product context so operators don't dig
- **Auto-refresh / poll ~10s** — new drafts appear without manual refresh
- **Keyboard shortcuts** — `a` = approve, `r` = reject, `e` = edit. Power operators handle hundreds of drafts/day; clicks cost seconds each.
- **Last 5 turns visible** — context for the latest draft, not just the draft in isolation

## Context above the draft — the operator's "is this OK?" stack

Every pending draft renders with this metadata visible:

| Field | Why |
|---|---|
| Buyer name + email + locale | Set by the pre-chat gate; tells operator who they're "talking to" |
| Conversation channel | Web chat / email / WhatsApp / voice — affects tone expectations |
| Conversation age (first/last message, time-to-this-draft) | Old conversation = high cost of dropped context |
| AI confidence score (0.00-1.00) | Visual: green > 0.85, yellow 0.6-0.85, red < 0.6 |
| Intent classification | viewing-request / price-question / availability / etc. |
| Risk flags (RED badges if any) | discrimination / legal / financial / commission — auto-flag = needs human eyes |
| Specific listing/product/order | Deep link to the entity so operator can verify facts |
| Prior approved/rejected drafts in thread | Pattern visibility — is this a repeat issue? |

## 30-minute operator training playbook

Onboarding script for a new operator. Walk through with them live.

**0-5 min: what HITL is + why it matters**
The AI is a junior teammate; you're the editor-in-chief. Every reply that ships is YOUR voice (the buyer never sees "this came from AI" — it goes out as if the agent typed it). Your name is on the result.

**5-10 min: walk the inbox live**
Click approve. Click reject. Click edit-then-approve. Show the keyboard shortcuts (`a`/`r`/`e`).

**10-15 min: when to approve vs edit vs reject**
- **Approve when:** AI got the facts right AND the tone matches your voice
- **Edit when:** facts right, voice off — polish before approving
- **Reject when:** AI got facts wrong OR ventured into territory it shouldn't (legal advice, price negotiation, anything risky)

**15-20 min: the refusal patterns**
When the AI correctly refused, the draft will say something like "let me connect you with {agent} for that." Approve these as-is — they're working as designed. Don't try to be "more helpful" by writing a full answer to a question the AI declined.

**20-25 min: what NOT to do**
- DON'T approve a draft about listing X if it's actually about listing Y. Cross-check before sending.
- DON'T auto-approve everything. Operator = safety net. Rubber-stamping defeats the purpose.
- DON'T edit drafts into walls of text. Keep replies short — the buyer is on mobile.
- DON'T leave drafts pending overnight. Median time-to-approval should be < 5 min business hours.

**25-30 min: escalation**
When a buyer asks something the AI can't handle (complex legal, full negotiation), the operator should reply themselves OR mark for escalation. Keep the operator IN the conversation; AI does the easy 80%, operator does the messy 20%.

## KPIs to track per operator

Don't measure things that don't matter. These five do:

| Metric | Target | What out-of-range means |
|---|---|---|
| Median time-to-approval | < 5 min business hours, < 30 min off-hours | P95 > 30 min = chat UX broken |
| Approve / edit / reject ratio | ~70 / 25 / 5 | > 30% reject → prompt needs tuning. > 30% edit → AI voice is off. |
| Conversations resolved per operator-hour | 20-40 | Below 20 = workflow friction. Above 50 = rubber-stamping risk. |
| NPS / CSAT post-conversation | At or above pre-HITL baseline | -5 points = AI is hurting CX, consider rollback |
| Lead capture rate | 5-15% (real-estate baseline) | Track per-operator; outliers show technique differences |

## When the AI is wrong — incident playbook

Severity matters. Triage by what reached the buyer.

### Single bad draft caught at the gate (operator rejected)
**Normal operation.** HITL worked. Nothing to do unless the pattern repeats.

### Multiple bad drafts on the same topic
**Pattern.** Update the prompt or KB. Example: AI keeps quoting wrong pricing → check the KB for stale data, update, redeploy. (AHO had this 2026-05-24 — a 60→90 day duration drift surfaced via a customer screenshot; see `06-gotchas.md` §16.)

### A bad draft slipped through (operator approved; buyer saw it)
**Post-incident:**
1. Tag the draft for the prompt-tuning review queue
2. Measure customer impact (did they bounce? leave a negative review?)
3. Personally reply to the buyer with a correction. Don't let a bad draft sit.
4. Root-cause: what made the operator approve it? Was the surface unclear? Was the operator rushed?

### Discrimination / Fair Housing risk
**IMMEDIATE attention.** The AI should refuse + flag; if it slipped, operator must NOT approve. Hand off to the agent for a personal reply. Document the incident; review the prompt's refusal templates. This is the highest-stakes category — a single approved discrimination-coded reply can trigger regulatory action.

### Buyer angry about a wrong reply
**Operator personally writes a correction**, ideally with a phone call. Don't let AI handle anger — it makes it worse. The personal touch repairs trust.

## The "is the AI helping or hurting?" 30-day audit

At day 30 post-launch, do this audit. Compare to pre-AI baseline:

| Dimension | If WORSE than baseline | Action |
|---|---|---|
| NPS / CSAT | -5 pts or more | Roll back. The AI net-negative. |
| Median time-to-first-response | Slower than human-only | Diagnose: drafts pending too long? Operator overloaded? Add operators. |
| Conversations per operator-hour | Lower than human-only | Workflow friction. Audit the inbox UX. |
| "AI was wrong" incidents | > 5% of approved drafts | Prompt + KB tuning sprint. |

AHO's pattern: keep the old chat widget (Tawk) component on disk for **1-line revert** for 30 days. If audit fails, revert is fast.

## Inbox burnout — the human factor

HITL puts a SPECIFIC kind of work on operators (reviewing AI output) which has its own fatigue patterns:

- **Rubber-stamping risk** when drafts all "look right." Counter: vary the surface — sometimes show the user's full message above, sometimes hide it to force re-read.
- **All-draft-no-escalation loops dehumanize operators** — give them a "hand-write reply" button so they can break the AI loop when they want to.
- **> 2 hours of continuous HITL** causes attention drift. Rotate operators or build in 10-min breaks every hour.
- **Operators need to know they're making a difference** — surface "you saved 3 hours of typing this week" stats on their dashboard. The AI gets credit; the operator deserves to see it.

## Escalation tools / escape hatches

The system needs ways for the operator to break out of HITL when needed:

| Tool | When | How |
|---|---|---|
| Manual handoff | Conversation is beyond AI's scope | Mark "needs agent" → AI stops drafting → agent gets notified to take over personally |
| Voice warm-transfer | Live phone caller hits a hard intent | Twilio `<Conference>` bridges caller to agent's mobile mid-call. Real-time. |
| "Reply as agent personally" | AI drafts on this thread are all bad | Operator types a reply that bypasses the AI entirely |
| Pause AI for this conversation | One-off bad thread | Flag in DB; future user messages don't trigger drafts, just notify operator |

## The hardest operator conversation — "is this AI?"

When a buyer directly asks "am I talking to a real person?"

- **Don't lie.** Saying "yes, real person" is short-term comfort, long-term disaster. If they discover later, trust is destroyed.
- **Don't lead with it.** Don't volunteer "I'm an AI assistant" — it changes the buyer's behavior. They start testing the AI instead of asking real questions.
- **The right answer:** *"{Agent name} reviews every reply before it sends. Drafts are AI-assisted to keep response times fast, but {Agent name} approves each one."*
  - This is TRUE (HITL is real)
  - And reassuring (a human IS involved)

AHO's system prompt explicitly instructs the AI to NOT claim to BE the agent. Operators should follow the same line. The accurate framing is "AI-assisted, human-approved" — that's the actual architecture.

## Daily, weekly, monthly operator rituals

### Daily (5 min)
- Glance at pending count — over 20? Triage before lunch.
- Approve / edit / reject the queue
- Check for any red-badge (risk-flagged) drafts — those need extra scrutiny

### Weekly (30 min)
- Review the week's metrics dashboard (time-to-approval, reject ratio)
- Skim 5-10 random approved drafts — are operators still reviewing or rubber-stamping?
- Note any patterns: same kind of wrong draft 3+ times = prompt-tuning ticket

### Monthly (1 hour)
- Run the 30-day audit (NPS, time-to-response, productivity, incidents)
- Decide: continue / tune / roll back
- Update the system prompt or KB based on the month's patterns
- Operator retro: what was annoying? Fix the UX.

## Common failure modes

1. **No one tends the queue.** Drafts pile up. Buyers wait hours. Chat dies. **Fix:** assign clear ownership; if no agent is available, hide the chat widget until an operator is online.
2. **Operators approve everything.** Rubber-stamping. Bad drafts ship. **Fix:** show edit-or-reject rate per operator; if approve > 95%, they're not reviewing.
3. **Operators reject everything.** AI loses value. **Fix:** prompt tuning — the AI's drafts aren't useful enough to take as-is.
4. **One operator becomes the bottleneck.** Everyone defers to "Maria — you handle it." **Fix:** train more operators; require a backup per shift.
5. **The escalation tools are buried.** Operators don't know they can hand off. AI keeps drafting on threads that should go to a human. **Fix:** training + a prominent "escalate" button on every draft.
