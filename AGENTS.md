# AGENTS.md

Operational context for coding agents working in this repo. Keep this file short.
Rationale lives in `docs/DECISIONS.md`. Priorities and known debt live in `docs/ROADMAP.md`.
Read both before changing behavior.

## What this is

**What the Sketch?** (category: AI Pictionary). Live at https://whatthesketch.io.
Player draws a prompt on a canvas, the image goes to a Gemini model via OpenRouter,
the model guesses in a chosen "personality" voice. Five rounds per game. No accounts.

Stack: Next.js 16 (app router) · React 19 · TypeScript · Tailwind 4 · Zustand · Supabase (Postgres) · Vercel.

## Commands

Node version is pinned in `.nvmrc`. Use it.

```
npm run dev          # local dev server (turbopack)
npm test             # vitest, watch mode
npx vitest run       # vitest, single run (what CI does)
npm run coverage     # vitest + v8 coverage
npm run lint         # eslint
npm run build        # next build; CI runs this, keep it green
npm run update-types # regenerate src/utils/supabase/database.types.ts from the linked project
```

CI (`.github/workflows/node.js.yml`) runs lint, build, then tests on every PR to `main`.

## Environment

`.env.local` (gitignored) needs: `OPENROUTER_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. `GEMINI_API_KEY` is legacy and unused by the route.

`.env.test` is loaded by vitest. **The rate-limit tests run against the live Supabase project
in a separate `test` schema and delete every row of `ip_rate_limits` after each test.**
Never point `.env.test` at the `public` schema.

## Layout

```
src/app/                      routes; page.tsx is a client component that swaps Lobby/Game/Results
src/app/api/generate-response route.ts is the ONLY server endpoint (rate limit → zod → OpenRouter)
src/components/               UI; Sketchpad wraps react-sketch-canvas
src/store/gameStore.ts        all game state (Zustand); round flow lives here, not in components
src/utils/                    pure helpers, each with a colocated __tests__/ file
src/utils/supabase/           server client + generated types (do not hand-edit database.types.ts)
```

Things that are easy to get wrong:
- Rate limit is 50 requests per IP per 24h, in `src/utils/check-rate-limit.ts`. Model string is in `route.ts`.
- Personalities and categories are `as const` arrays in `src/utils/types.ts`; the prompt text for each
  personality is in `src/utils/ai-personality-prompts.ts`; drawing prompts are in `src/utils/drawing-prompts.ts`.
  Adding either means touching the array, the prompt map, and the tests.
- Correctness is a case-insensitive substring match in `check-guess.ts`. It is known to be too lenient.
- `src/utils/gemini-api-call.ts` is misnamed: it is the browser-side `fetch` wrapper for `/api/generate-response`.
  It never talks to Gemini directly. The server does that via OpenRouter in `route.ts`.
- `supabase/.temp` is gitignored CLI state. Leave it alone.

## Conventions

- Branches: `type/kebab-name` (`feat/`, `fix/`, `chore/`, `docs/`, `test/`, `refactor/`, `style/`). PRs target `main`.
- Commits: `type: imperative summary`. Say why, not what. **No `Co-Authored-By` or session trailers.**
- Mechanical churn (reformat, rename sweep, lockfile bump) is its own commit, never mixed with a semantic change.
- New util or component → new colocated test. Coverage badge in README is expected to stay in the 90s.
- Do not add dependencies without a reason in the commit message.
- Do not commit `.env*` files.
