# Gotchas — the war stories

Bugs the AHO team hit that took multiple iterations to root-cause.

## 1. Markdown links: bold-wrapped URLs break the parser
AI drafts with `**https://example.com**` render bold but not clickable. Bold parser matches first, swallows the URL. **Fix:** prompt the AI to never bold-wrap URLs; use `[label](url)` syntax.

## 2. Set-Cookie kills the CDN cache
`next-intl` emits `Set-Cookie: NEXT_LOCALE` even with `localeDetection: false`. CDN treats Set-Cookie as personalized → cache off. **Fix:** strip the cookie in middleware on anon cacheable requests; persist locale in localStorage.

## 3. supabase-js silently swallows row-level errors
`await admin.from('x').insert({...})` resolves successfully even when rejected by RLS / CHECK / schema mismatch. The error is on the RESOLVED value. **Fix:** always destructure `const { error } = await ...; if (error) console.error(...)`. A try/catch only catches network failures.

## 4. Edge-runtime kills unawaited promises
Cloudflare Workers / Pages cancel unawaited promises when the handler returns. `void admin.from(...).insert(...)` silently disappears. **Fix:** always `await`. For non-blocking work, use `ctx.waitUntil(promise)` via `getRequestContext()`.

## 5. wrangler tail shows console.error, not console.log
Default `--format pretty` filters out `console.log`. Use `console.error` for instrumentation you want to read in tail.

## 6. RLS-deny-all tables still grant CRUD to anon
Supabase auto-grants INSERT/UPDATE/DELETE to anon + authenticated on every new table. Always end migrations with `revoke insert, update, delete on public.<table> from anon, authenticated`.

## 7. Tier snapshot at conversation creation
Agent upgrades Plus → Pro; analytics now re-attributes all prior conversations to Pro, killing "adoption by tier" signal. **Fix:** capture `tier_at_creation` on the conversation row at insert; never UPDATE it. Analytics queries `GROUP BY tier_at_creation`.

## 8. Tawk retirement timing
Don't kill the old widget on launch day. Run new + old side-by-side for 1-2 weeks (different corners so they don't overlap). Retire old once stable; keep its component file on disk for 1-line revert. Watch NPS for 30 days post-retirement; roll back if NPS drops > 5 points.

## 9. Email transcript: anon-callable + sendBeacon on tear-down
The widget POSTs the full transcript to `/api/chat-transcript/email` when the user closes the chat (× button) AND via `navigator.sendBeacon` on `pagehide`/`beforeunload`. Endpoint is anon-callable (visitors close chat before being "authenticated to anything"). Defenses:
- Empty-conversation guard (no user messages → drop silently)
- Per-message cap (16 KB), total cap (256 KB), message-count cap (200)
- Brevo rate-limit on outbound send
- Client-side `sent` + `sendingDone` refs guard against double-fire

Idempotency is NOT enforced server-side. A duplicate slips through occasionally — operator gets a duplicate email, annoying not destructive.

**Why sendBeacon and not fetch:** `fetch` calls are cancelled when the page unloads. `sendBeacon` is designed for this exact case — guaranteed delivery on unload (POST only, no response read).

## 10. RFC-5322 In-Reply-To missing on mobile email clients
Older Outlook iOS / Mail.app drop the header on replies. Fallback: match on `(subject_normalized, from_address)` against existing threads in the same org. Normalize subjects: strip `Re:`/`Fwd:` prefixes + collapse whitespace.

## 11. Voice STT confidence handling
"Is the driveway included?" → STT hears "Is the dryer included?" → AI confidently answers about the dryer. **Fix:** if STT confidence < 0.6, ask the caller to repeat. Use 0.8 threshold for high-stakes intents (price, viewing booking).

## 12. Webhook signature verification: timing-safe compare
Never `===` or `==` for HMAC comparison — timing attacks extract the secret. Use `crypto.subtle.timingSafeEqual` or `crypto.timingSafeEqual`.

## 13. WhatsApp 24h service window
Free-form messages only work within 24h of buyer's last message. Outside that window: pre-approved template only (costs per market). Always check `last_inbound_at` before composing outbound. Pre-submit a generic `service_reply` template so day-1 outbound works.

## 14. The "AI never says the agent's name" trap
Drafts read robotic: "We have a 3-bedroom available..." — no "I", no name. **Root cause:** prompts saying "you are an AI assistant" make the AI talk like an AI. **Fix:** prompt as *"you are the assistant FOR {agentName} — they review every reply."* Drafts then read: "Maria here — yes, 123 Main is still available..."

## 15. Cron UPSERT idempotency
Daily rollup uses delete-then-insert (or true `ON CONFLICT ... DO UPDATE`). Re-running the same day's cron must not double-count. Cheap insurance against missed-night recoveries.

## 16. **AI KB drift from business logic** — the most expensive bug pattern

**Symptom:** the AI confidently quotes a fact (price, duration, feature) that contradicts what the system actually does. Customer sees "60-day listing window"; system gives them 60 days; marketing page promises 90; billing handler does 60. The AI isn't wrong — it's faithfully reading from a stale knowledge base.

**Real incident (AHO 2026-05-24):** customer screenshot showed the AHO Assistant saying "$5 one-time listing — 60-day publication window." Five days earlier (commit `ab3997f` 2026-05-19) the marketing copy had been bumped from 60 → 90 days across messages/*.json + the /sell page + JSON-LD. The change DID NOT cascade to:
- The billing handler (`SIXTY_DAYS_MS = 60 * 24 * 60 * 60 * 1000`)
- The AI knowledge base (`'60-day publication window'` literal in EN + ES strings)
- The Stripe product description (`'AHO — Private listing (60 days)'`)
- The unit test that asserted `expect(expiresAt - paidAt).toBe(60 * 24 * 60 * 60 * 1000)` — the test enshrined the bug

Customers who paid the $5 expecting 90 days would have received 60. **Consumer-protection grade breach-of-promise.** Caught only because zero real customers had purchased in the affected window (TEST mode + no soft-beta yet).

**Root cause:** the AI's KB is just inert strings. The marketing copy is inert strings. The billing math is inert numbers. None imports from a shared source of truth. When the value changes, the "change it everywhere" rule depends on human discipline. Discipline breaks.

**Fix — single source of truth + drift-guard test:**

1. Create a constants module that owns the fact:
   ```ts
   // src/lib/billing/private-listing-constants.ts
   export const PRIVATE_LISTING_DURATION_DAYS = 90;
   export const PRIVATE_LISTING_DURATION_MS =
     PRIVATE_LISTING_DURATION_DAYS * 24 * 60 * 60 * 1000;
   export const PRIVATE_LISTING_PRICE_USD = 5;
   export const PRIVATE_LISTING_PRICE_CENTS = PRIVATE_LISTING_PRICE_USD * 100;
   ```

2. Every caller imports from the module:
   ```ts
   // billing handler:
   import { PRIVATE_LISTING_DURATION_MS } from '../private-listing-constants';
   const expiresAt = new Date(paidAtMs + PRIVATE_LISTING_DURATION_MS).toISOString();
   ```

3. Add a drift-guard test that asserts the KB strings CONTAIN the constant value:
   ```ts
   // tests/unit/private-listing-constants.test.ts
   import { PRIVATE_LISTING_DURATION_DAYS } from '@/lib/billing/private-listing-constants';
   import { ahoPlatformKb } from '@/lib/ai/aho-platform-kb';

   it('English KB cites the same duration the constant declares', () => {
     const kb = ahoPlatformKb('en');
     const privateOwner = kb.tiers.find(t => /private[- ]?owner/i.test(t.name));
     expect(privateOwner!.description).toContain(`${PRIVATE_LISTING_DURATION_DAYS}-day`);
     const featureLine = privateOwner!.keyFeatures.find(f => /active listing/i.test(f));
     expect(featureLine!).toContain(`${PRIVATE_LISTING_DURATION_DAYS} days`);
   });

   it('English KB does NOT mention the old 60-day duration', () => {
     // Guard against the original drift recurring.
     const kb = ahoPlatformKb('en');
     const privateOwner = kb.tiers.find(t => /private[- ]?owner/i.test(t.name));
     expect(privateOwner!.description).not.toContain('60-day');
   });
   ```

4. Update the EXISTING test that was asserting the wrong value (the one that "enshrined the bug"):
   ```ts
   // Before:
   expect(expiresAt - paidAt).toBe(60 * 24 * 60 * 60 * 1000);  // hardcoded; if billing changes to 90, this still asserts 60 = bug stays
   // After:
   import { PRIVATE_LISTING_DURATION_MS } from '@/lib/billing/private-listing-constants';
   expect(expiresAt - paidAt).toBe(PRIVATE_LISTING_DURATION_MS);  // moves with the constant
   ```

**Why this matters more than other bugs:** an unescaped JSX entity (gotcha #1 / #2) breaks the build and you find out in 30 seconds. A KB-drift bug ships silently, sits in production for days/weeks, and you find out when a customer screenshots the AI lying to them. It's the bug class that erodes trust fastest.

**General principle:** every FACT the AI quotes should map to a constant in your codebase that's also used by the system that ENFORCES that fact. Marketing copy, AI knowledge base, billing handler, Stripe products, unit tests — all reading from the same module. Drift becomes impossible by construction, not by discipline.

## 17. Browser Web Speech API quirks (voice channel — in-browser)
- Chrome / Edge / Safari support; Firefox = partial (no SpeechRecognition).
- iOS Safari requires the SpeechRecognition session to start in response to a user gesture — can't auto-start on page load.
- SpeechSynthesis utterances queue but can be `cancel()`'d. Always cancel before starting a new utterance.
- Some voices (`speechSynthesis.getVoices()`) load async — listen for the `voiceschanged` event.
- Always provide a fallback to text mode when neither `SpeechRecognition` nor `webkitSpeechRecognition` is in `window`.
