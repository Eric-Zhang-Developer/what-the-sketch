# Roadmap

Themes, not tasks. Individual work items are GitHub issues; this file says which ones matter and why.
Last reviewed: 2026-09-03.

Operating rule: **no new gameplay feature until analytics shows 50 distinct sessions.** Everything in
"Later" waits behind that number.

## Now: Launch

The game has been live and playable since mid-2026 but has never been promoted. This milestone is
the minimum needed to promote it and know whether anyone showed up.

- **SEO and metadata.** Title/description/OG/Twitter, favicon (#100), robots, sitemap, canonical.
  Homepage currently exposes almost no crawlable text; add an h1, tagline, how-it-works, and the
  personality list below the fold on the lobby. No separate landing page (see DECISIONS).
- **Analytics.** Vercel Web Analytics plus events: game started, drawing submitted, game completed,
  share clicked. Without this the launch is blind.
- **Share card.** Wordle-style copy-to-clipboard result. The AI's response is the shareable asset.
- **Database hardening.** Enable RLS on `ip_rate_limits`, move the route to a server-only secret key,
  replace select-then-update with one atomic Postgres function. See Known Debt.
- **Cost controls.** Hard spend limit on the OpenRouter key. Evaluate `gemini-3.5-flash-lite` against
  the current preview model on ~20 drawings; keep whichever guesses better. Stop using a `-preview` model.
- **Guess check.** Word-boundary match so "Java" no longer matches "Javascript" (#74).

## Next: First feedback

- Launch video and posts (r/InternetIsBeautiful, Show HN, r/SideProject, r/WebGames, X/Bluesky).
- Improve default selector UX (#103), grammar fix on prompt display (#90), submit debouncing if
  analytics or logs show double-submits (#37).
- Revisit lobby → first-submit dropoff. If bad, consider putting the canvas on the homepage.

## Later: Only if people play

- Confetti on correct guess (#92), dark mode (#91).
- Playwright E2E (#94). Worth it once the game loop changes more than once a quarter.
- Accounts / leaderboard (#76). Only if retention data says people come back.
- Supabase anonymous sign-ins + `auth.uid()` rate limiting. Superseded for now by RLS + atomic RPC.

## Known debt

| Item | Why it exists | Fix when |
|---|---|---|
| `ip_rate_limits` has no RLS; the browser-exposed publishable key can read/update/delete any row, so the rate limit is bypassable. | Fastest path to a working MVP. | Now. Cheap, and it bounds cost exposure before promotion. |
| Rate-limit check is select-then-update, not atomic. Concurrent requests can exceed the cap. | Same as above. | Same migration as the RLS fix (one Postgres function). |
| `check-guess.ts` uses substring match; false positives on partial words. | Good enough for a demo. | Now (#74). Ten minutes. |
| Model pinned to `google/gemini-3-flash-preview`. | Was the newest flash model at the time. | Now. Preview models get deprecated without notice. |
| `install`, `npm`, and `@google/genai` are runtime dependencies in `package.json` but nothing imports them. | First two arrived with the zustand install (`b8719a4`); the SDK predates the OpenRouter switch. | Next dependency PR. Remove all three. |
| `GEMINI_API_KEY` still in env files but unused since the OpenRouter switch. | Leftover. | Next env cleanup. |
| `GuessState` and `TurnCycleState` overlap (noted in `types.ts`). | Grew organically. | Only if the game loop is being refactored anyway. |
| Rate-limit tests depend on a live Supabase project. | No local Supabase setup. | If CI flakes on it, or if a second contributor appears. |
| No cleanup of stale `ip_rate_limits` rows. | Table is tiny (~40 rows). | If it ever exceeds a few thousand rows. pg_cron delete older than 24h. |
