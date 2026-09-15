# Decisions

Short log of choices that are not obvious from the code, so nobody (human or agent) undoes them
without knowing the tradeoff. Newest first. Add an entry when you make a call that a future
reader would question. Hashes are on `main`.

## 2026-09-15: Plan streaming around a validated response contract (#106)

Stream commentary first and reveal the complete guess only after successful final validation.
Separate `commentary` and `guess` so display and scoring no longer interpret the same prose differently.
Use plain-text commentary with preserved newlines and app-owned guess formatting: Markdown and
model-specific line-break habits make the current output brittle. This trades inline Markdown styling
for predictable legibility and incremental display. Structured output constrains shape, not humor or
guess accuracy; provider support still needs verification and completed output still needs validation.

Keep this focused on the existing submit-to-result flow. Implementation scope and acceptance criteria
live in [#106](https://github.com/Eric-Zhang-Developer/what-the-sketch/issues/106). This is an agreed plan,
not shipped behavior; it will supersede the closing-line and Markdown contracts below when implemented.
Work collaboratively in small, explained steps; planning approval does not authorize autonomous
implementation. The current setup task changes documentation only.

## 2026-09-03: No separate landing page; the lobby is the landing page
Casual browser games convert on zero clicks between arrival and play (Wordle, Quick Draw, skribbl).
Marketing content goes below the fold on the lobby, not on a separate route. Revisit only if
analytics shows a large dropoff between page load and Start.

## 2026-09-03: Brand vs. category naming
"What the Sketch?" is the brand (banner, h1, share card). "AI Pictionary" is the searchable
category (title tag, tagline, meta description). Use both; never drop the category term from the
title tag in favor of the brand.

## 2026-09-03: Harden rate limiting with RLS + atomic RPC, not anonymous auth
Earlier plan was Supabase anonymous sign-ins with `auth.uid()`-keyed limits. That adds auth
plumbing to a game with no accounts. RLS with zero anon policies, a server-only secret key in the
route, and one Postgres function for check+increment closes the same holes with less surface.

## 2026-09-03: Roadmap in markdown, work items in GitHub issues
Issues hold atomic, closeable work and get linked from PRs. `docs/` holds themes, priorities,
debt, and rationale, because agents read the repo at session start and do not read the tracker.
The same fact must not live in both places.

## 2026-05-22: The AI is told to hype or roast, and to end with `My guess is **WORD**` (`6d5ed60`)
The output contract has two parts: free-form commentary (≤100 words) and a fixed closing line.
Personality prompts are appended after these base instructions and only change the voice.
Note: `check-guess.ts` does not parse the `**WORD**` line; it substring-matches the whole response.
That is why "Java" matches "Javascript" (#74). The fix is to parse the closing line.

## 2026-01-06: Personalities and categories are `as const` string arrays, not enums (`479a758`)
The dropdown renders the values directly and zod validates the request body with `z.enum(...)`.
Adding a value is one array entry plus one prompt-map entry. Enums were tried first and reverted.

## 2026-01-01: OpenRouter instead of the Gemini SDK directly (`417247c`)
One client, model swaps are a string change, provider outages can be routed around. Cost is a
small markup per request. `@google/genai` is still in `package.json` and unused.

## 2025-12-31: Auto-scroll to the result after submit (`1ec14d9`)
On mobile the result renders below the canvas and off screen. The wrapper div around the
turn-cycle section exists only to hold the scroll ref.

## 2025-12-30: Zustand devtools middleware (`25cfc1d`)
Store is wrapped in `devtools` so the Redux DevTools extension shows state transitions. No
runtime cost worth removing; keep it.

## 2025-12-19: Client fetch wrapper returns a typed result instead of throwing (`bc78d07`)
`GeminiAPICall` returns `{ success, data | error }`. Sketchpad branches on `success` and the
error text goes to `TurnErrorSection` (added `7cb175e`). Server error messages are deliberately
generic ("AI API service unavailable") so provider details never reach the client.

## 2025-11-27: Validate the request body with zod (`e20916d`)
Base64 regex plus a 5,000,000-character cap. Invalid JSON or schema → 400. Model failure → 500.
Only `choices[0].message.content` is returned; all other provider metadata is dropped on purpose.

## 2025-11-20: Rename from "AI Pictionary" to "What the Sketch?" (`f7cc420`)
Banner image replaced the h1 text. The `<title>` was never updated, which is why the live site
still says "AI Pictionary" and why the SEO branch exists. Same PR set the neo-brutalist look,
Patrick Hand font, and graph-paper background (`4d2f48b`, `7d8ab6e`).

## 2025-11-16: License is All Rights Reserved, portfolio read-only (`8eed0d4`)
Public for viewing and forking only. Not open source. Do not add "help wanted" or contribution
docs that imply otherwise.

## 2025-11-10: Rate-limit window is fixed 24h from the first request, not sliding (`77a89f9`)
Simpler to reason about and to test. Column renamed to `rate_limit_window_start` (`0bef90f`).
50 per window = 10 full games. An off-by-one that allowed the 51st request was fixed in `97d44c7`.

## 2025-11-07: `import "server-only"` removed from the rate limiter (`aaa629a`)
Added the day before, removed because vitest cannot import it. The route is the only caller,
so the module is still server-only in practice. Do not re-add without fixing the test setup.

## 2025-11-07: Rate-limit tests run against the live Supabase project in a `test` schema (`aaa629a`)
No local Supabase. Tests wipe `ip_rate_limits` in the `test` schema after each case. CI gets the
URL and publishable key as secrets (`b372a67`).

## 2025-11: IP-based rate limiting in Postgres, no accounts (`ecbf880`)
Cap model spend from a public endpoint without asking players to sign up. Known weaknesses are in
ROADMAP Known Debt.

## 2025-09-25: Canvas is disabled by a wrapper div, not the library (`719f931`)
`react-sketch-canvas` has no reliable freeze. The `readOnly` prop was tried (`5311f4e`) and
replaced by a wrapper that blocks input while `isCanvasDisabled` is true.

## 2025-09-23: CI runs lint, build, then tests on every PR (`72e5425`)
Build is in the pipeline because Next type errors only surface at build time.

## 2025-09-20: AI response rendered as markdown (`a79a3b0`)
The prompt asks for `**WORD**`, so the result box uses `react-markdown` to render the bold.

## 2025-09-17: Zustand replaced prop-drilled `useState` in `page.tsx` (`041a2e5`)
Eight pieces of state were being threaded through Lobby, Sketchpad, and Results. After the
store landed, game logic moved out of `page.tsx` into `Game.tsx` (`8706c54`). Tests reset the
store between cases instead of the earlier `initialRoundNumber` prop hook (`226e0f2`), which
is now dead.

## 2025-09-08: `install` and `npm` in dependencies (`b8719a4`)
Came in with `chore: install zustand`. Accidental. Listed in Known Debt for removal.

## 2025-08-26: Substring false-positive test skipped on purpose (`b8e31af`)
"Minor rare quirk, back burner." Became #74. Un-skip it when fixing the guess check.

## 2025-08-14: Five rounds per game, hardcoded (`f8fcebc`)
Short enough to finish in one sitting, long enough for a score to mean something.

## 2025-08-04: Static prompt list, with categories and difficulty as future ideas (`9ce4b18`)
Started as 100 prompts. Categories shipped 2026-01-05 (`31e6df4`). Difficulty tiers never did.

## 2025-07-25: `react-sketch-canvas` for the drawing surface (`ca94943`)
The commit gives no rationale. What the app relies on: export-to-PNG, undo, and eraser mode.
Its lack of a freeze mode is the one known cost (see 2025-09-25).

## 2025-07-24: Next.js app router, Node 22.17.1 pinned (`9e81b1d`, `fc8f7e4`)
App router so the API route and the page live in one deploy on Vercel.
