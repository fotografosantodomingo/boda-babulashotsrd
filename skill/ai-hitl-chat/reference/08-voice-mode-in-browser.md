# Voice mode — in-browser (Web Speech API)

Optional 5th tier. Adds a **voice mode** to the web chat widget itself — visitor speaks, AI speaks back — without provisioning a phone number or a voice provider account. Uses the browser-native Web Speech API (`SpeechRecognition` + `SpeechSynthesis`). Free, no API key, works on Chrome / Edge / Safari + mobile Safari.

This is **not the same as Tier 4 voice (Twilio phone calls).** Tier 4 = "buyer dials a phone number, AI answers." This tier = "buyer opens the chat widget on the website and clicks a Voice tab instead of typing." Different channel, different infra, different UX.

## When this tier is worth shipping

✅ Ship voice mode when:
- Your buyers skew mobile + accessibility-conscious (visually-impaired users, drivers, parents holding babies, anyone whose hands are full)
- Your industry has a voice-friendly conversational pattern (real estate inquiries, restaurant bookings, customer support, intake forms)
- You want a differentiator vs Intercom/Drift/Tawk (none of those have native browser-voice today)

⛔ Don't bother when:
- Your buyers are desk-bound + comfortable typing
- Your conversations involve a lot of URLs, codes, account numbers (voice is bad at exact strings)
- You can't get HTTPS on every page where the widget mounts (Web Speech API refuses on `http://`)

## What you don't need

- No STT provider (Deepgram, AssemblyAI, OpenAI Whisper)
- No TTS provider (ElevenLabs, Polly, Azure Speech)
- No new DB schema
- No new API endpoint — voice transcriptions go through the SAME `/api/ai-chat` endpoint as text messages. The STT output IS the userMessage; the AI's text reply IS what gets TTS'd.

## The 4-phase state machine

```
                ┌─────────┐
                │  idle   │  ←──────────────────────┐
                │ (mic    │                          │
                │  ready) │                          │
                └────┬────┘                          │
                     │ user taps                     │
                     ↓                                │
                ┌─────────┐                          │
                │listening│  red pulsing ring        │
                │ (SR     │  interim transcript      │
                │  active)│  shows live              │
                └────┬────┘                          │
                     │ final transcript captured     │
                     ↓                                │
                ┌─────────┐                          │
                │thinking │  white spinner            │
                │ (sent to│  POST /api/ai-chat        │
                │  /chat) │  waits for HTTP reply     │
                └────┬────┘                          │
                     │ approved assistant message     │
                     │ arrives via poll              │
                     ↓                                │
                ┌─────────┐                          │
                │speaking │  green breathing ring     │
                │ (TTS    │  waveform icon            │
                │  active)│  tap interrupts          │
                └────┬────┘                          │
                     │ TTS finishes (or interrupted)  │
                     └───────────────────────────────┘
```

## Reference implementation (AHO)

Three files. ~775 LOC total. Commit `5de8eb1` (broke due to lint; fixed in `e3d367d`).

### `src/components/chat/voice-controls.tsx` (~330 LOC)

The voice UI itself. Owns the 4-phase state machine + the animated mic button + SR + TTS lifecycle.

```tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function isVoiceSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const hasSR = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  const hasTTS = 'speechSynthesis' in window;
  return hasSR && hasTTS;
}

type Phase = 'idle' | 'listening' | 'thinking' | 'speaking';

export function VoiceControls({
  voiceLocale,         // BCP-47 e.g. 'en-US', 'es-DO', 'de-DE'
  onUserTranscript,    // (text) => void — sends to /api/ai-chat as if typed
  speakText,           // string — when this changes, TTS plays it
  onSpeakDone,         // () => void — mark speech consumed
  disabled,            // bool — true while parent has an in-flight request
  onUnrecoverable,     // (reason) => void — 'unsupported' | 'permission_denied' → parent switches to text mode
  copy,                // localized strings (tapToSpeak, listening, etc.)
}: Props) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [interim, setInterim] = useState<string>('');
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const lastSpokenRef = useRef<string>('');

  // 1. Initialize SR
  useEffect(() => {
    if (!isVoiceSupported()) { onUnrecoverable?.('unsupported'); return; }
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    const rec = new SR();
    rec.continuous = false;       // one utterance per session — easier UX
    rec.interimResults = true;    // show live transcript as user speaks
    rec.maxAlternatives = 1;
    rec.lang = voiceLocale;
    rec.onresult = (e) => { /* accumulate interim, on isFinal → onUserTranscript + setPhase('thinking') */ };
    rec.onerror = (e) => {
      if (e.error === 'not-allowed') onUnrecoverable?.('permission_denied');
      setPhase('idle');
    };
    rec.onend = () => setPhase(p => p === 'listening' ? 'idle' : p);
    recognitionRef.current = rec;
    return () => { try { rec.stop(); } catch {} };
  }, [voiceLocale]);

  // 2. TTS when speakText changes
  useEffect(() => {
    if (!speakText || speakText === lastSpokenRef.current) return;
    lastSpokenRef.current = speakText;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(speakText);
    u.lang = voiceLocale;
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find(v => v.lang.toLowerCase().startsWith(voiceLocale.slice(0, 2)));
    if (match) u.voice = match;
    u.onstart = () => setPhase('speaking');
    u.onend = () => { setPhase('idle'); onSpeakDone?.(); };
    window.speechSynthesis.speak(u);
  }, [speakText, voiceLocale]);

  // 3. Tap handler — multi-purpose based on current phase
  const handleTap = () => {
    if (phase === 'speaking') {
      // Tap interrupts speech
      window.speechSynthesis.cancel();
      setPhase('idle');
      return;
    }
    if (phase === 'listening') {
      recognitionRef.current?.stop();
      setPhase('idle');
      return;
    }
    if (phase === 'thinking') return;  // don't allow re-listen mid-reply
    // idle → start a new listening session
    recognitionRef.current?.start();
    setPhase('listening');
  };

  // 4. Render — big animated round mic button + phase label + interim transcript
  // (full styling in the AHO file)
}
```

### `src/components/chat/chat-mode-picker.tsx` (~100 LOC)

Shown post-gate, pre-chat. Two tiles: **Text** and **Voice**. The Voice tile renders disabled with "not supported in this browser" when `isVoiceSupported() === false` (graceful degradation for Firefox).

### `src/components/chat/aho-assistant-widget.tsx` integration (~340 LOC of edits)

Adds:
- `chatMode: 'text' | 'voice' | null` state (null = picker showing)
- `chatModeInitialized` flag (localStorage probe complete)
- `voicePendingText` + `voiceSpokenIds` for TTS coordination
- `pickMode()` callback that persists to `localStorage['aho:assistant-mode:v1']`
- Render branch: gate not done → PreChatGate; gate done + mode null → ChatModePicker; gate done + mode set → existing chat UI
- Conditional composer: voice mode renders `<VoiceControls>` instead of `<input> + <button>`
- Mode-switch pill toggle in the header (Text ⇄ Voice) for in-session switching
- Effect: when newest assistant message lands + mode === 'voice' + not in spokenIds → set voicePendingText (triggers TTS)

## BCP-47 voice locale mapping

The Web Speech API needs a BCP-47 language tag (`en-US`, not `en`). Map your app locale → regional voice:

```ts
const USER_LOCALE_TO_BCP47: Record<string, string> = {
  en: 'en-US',
  es: 'es-DO',  // Spanish (Dominican Republic) — falls back to es-ES on Mac/Win
  pl: 'pl-PL',
  pt: 'pt-PT',
  de: 'de-DE',
  fr: 'fr-FR',
  it: 'it-IT',
};
```

The OS picks the closest available voice if the exact tag isn't installed. iOS Safari + Mac voices are excellent; Android Chrome voices are passable; Windows Edge varies by Windows version.

## Browser support matrix (2026-05)

| Browser | SpeechRecognition | SpeechSynthesis | Notes |
|---|---|---|---|
| Chrome (desktop + Android) | ✅ | ✅ | Best-in-class |
| Edge | ✅ | ✅ | Same engine as Chrome |
| Safari (Mac + iOS) | ✅ | ✅ | iOS requires user-gesture to start SR |
| Firefox | ❌ | ✅ | No SR support — fall back to text |
| Samsung Internet | ✅ | ✅ | Works |

The picker hides Voice as disabled when `isVoiceSupported() === false` (which is just Firefox + ancient browsers). No need to maintain a polyfill — falling back to text mode is fine for the <5% of visitors on unsupported browsers.

## iOS Safari quirks (real)

- **SR must start in response to a user gesture.** You CAN'T auto-start on page load. The current pattern (user taps the mic button → `rec.start()`) satisfies this.
- **`getVoices()` is async on iOS.** The first call may return `[]`. Listen for the `voiceschanged` event if your voice-locale matching is critical. AHO's implementation degrades gracefully — if no exact match, the OS default voice plays.
- **Background tab pause** — Safari pauses both SR and TTS when the tab is backgrounded. State recovers on resume but you may lose the current utterance. UI should show a "speech paused" state on `visibilitychange` if you care; AHO doesn't.

## Mic permission flow

First tap on the mic button → browser prompts for mic permission. Three outcomes:
- **Granted** → SR works
- **Denied** → SR fires `onerror` with `error === 'not-allowed'` → call `onUnrecoverable('permission_denied')` → parent switches to text mode
- **Dismissed** (user closed the prompt without choosing) → no event fires, but `rec.start()` returns immediately. UI should time out after ~10s of no `onstart` and fall back.

## Mode switching mid-conversation

The pill toggle in the header lets the user switch any time. Switching from voice → text:
- Cancel any in-flight TTS (`window.speechSynthesis.cancel()`)
- Cancel any in-flight SR (`recognitionRef.current?.stop()`)
- Render the text input

Switching from text → voice:
- Render `<VoiceControls>` with phase = `idle`
- User taps to start listening; new messages from this point speak via TTS

The conversation history is shared — the message list above the composer renders the same regardless of mode. A turn that came in via voice and a turn that came in via text look identical.

## What changes on the BACKEND for voice mode

**Nothing.** The voice mode is purely a UI tier on top of the existing `/api/ai-chat` endpoint. The endpoint doesn't know or care whether the user typed or spoke. The transcribed text becomes the `userMessage`; the AI's reply is text either way.

Why this matters: you can roll out voice mode without any DB migration, any RLS change, any worker deploy. Pure frontend addition.

## Cost analysis

| Item | Cost per voice turn | Note |
|---|---|---|
| STT (Web Speech API) | **$0** | Browser-native |
| TTS (Web Speech API) | **$0** | Browser-native |
| LLM call (Claude Sonnet) | $0.005-0.02 | Same as text-mode turn |
| **Total** | **~$0.01/turn** | Equal to text mode |

Compare to Tier 4 phone voice (Twilio + ConversationRelay): ~$0.10-0.20/min. In-browser voice is **10-20x cheaper** because the browser owns STT + TTS.

## Localization considerations

The TTS voice catalog varies wildly per OS + locale. Some real examples from AHO testing:

- **Mac, en-US** → Samantha (excellent, natural)
- **Mac, es-DO** → falls back to es-ES (Mónica or Jorge, Castilian register — acceptable for Dominican buyers but a tell)
- **iOS, en-US** → Samantha (same as Mac)
- **Android, pl-PL** → varies wildly by OEM; some devices have no Polish voice → garbled English-with-Polish-accent
- **Windows, fr-FR** → Hortense (older Microsoft TTS, mechanical sound)

If voice quality in a specific market matters for your business, **test on a real device in that market** before shipping. Don't trust desktop Chrome on en-US as a proxy.

## Accessibility considerations

Voice mode is a HUGE accessibility win — visually-impaired users, motor-impaired users, anyone whose hands are full can now chat with your site. But:

- The button needs `aria-label` that announces its current state (`tapToSpeak` / `tapToStop` / `tapToInterrupt`)
- The interim transcript needs to be in a `role="status"` region so screen readers announce updates
- The mode picker needs visible focus rings (already in the AHO pattern)
- DON'T auto-play TTS without the user opting into voice mode first — sudden speech is jarring + violates accessibility expectations

## Fallback chain (what to do when voice fails)

The implementation should degrade gracefully through these layers:

1. **Browser doesn't support Web Speech API** (Firefox) → Voice tile shows disabled in the mode picker. User picks text.
2. **User picks voice + mic permission denied** → `onUnrecoverable('permission_denied')` fires → parent calls `pickMode('text')`. User lands in text mode with a one-time toast: "mic permission denied, switching to text" (optional).
3. **SR/TTS error mid-session** → `setPhase('idle')`. User can tap again to retry, or use the header pill to switch to text.
4. **HTTPS unavailable** → Web Speech API throws on insecure context. Practical impact: dev environment (http://localhost) won't work; production (HTTPS) does. Document this in the README so devs don't think it's broken.

## What this skill recommends

If your platform's buyers skew mobile + your conversations are voice-friendly, **add voice mode** — the marginal cost is one weekend of work and zero infra overhead. The competitive differentiation is real (no major chat widget has this in 2026).

If your platform is desktop-heavy B2B SaaS where buyers are at a keyboard anyway, skip this tier. Tier 1-4 cover the use case fully.
