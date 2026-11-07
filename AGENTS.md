# Agent guide

Rules for any coding agent (Claude Code, Codex, Cursor, …) and for humans.

## Commands

```bash
npm run setup          # idempotent: install deps, seed .env.local, run doctor (--e2e adds Chromium)
npm run doctor         # read-only environment check with a fix for each failure
npm run dev            # dev server (Turbopack) at http://localhost:3000
npm run verify         # THE gate: typecheck + lint + format + unit tests, in parallel
npm run verify -- --build   # same, then a production build
npm run test:watch     # unit tests in watch mode
npm run test:e2e       # Playwright smoke tests (needs `npm run setup -- --e2e` once)
npm run lint:fix && npm run format   # auto-fix style
npm run clean          # remove build output and caches
```

## Validation discipline

1. While iterating, run the narrowest check that proves the change
   (`npx vitest run tests/unit/<file>`, `npm run typecheck`).
2. Before saying work is done, run `npm run verify` once on the final code and
   report its real result. A UI change also needs a look in the browser.
3. Never weaken a check (disable a lint rule, loosen `tsconfig`, skip a test)
   to get green. Fix the cause or say why it can't be fixed.

## Architecture rules

Full map: [ARCHITECTURE.md](ARCHITECTURE.md) · tree: [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md).

- **Server Components by default.** Add `"use client"` only to the smallest
  leaf that needs state, effects or browser APIs.
- **Data goes through `src/lib/catalog.ts`.** Nothing else imports
  `src/content/*`. Swapping to a CMS/commerce API changes only that file.
- **Env goes through `src/lib/env.ts`.** No raw `process.env` elsewhere. New
  key → add to the zod schema and `.env.example`.
- **Money is integer cents**, formatted only via `formatPrice`.
- **Brand settings live in `src/config/site.ts`.** Don't hard-code the name.
- Imports use the `@/` alias; types-only imports use `import type`.
- File names are kebab-case; components are named exports.

## Tests

Unit tests in `tests/unit/` (Vitest, node env) cover `src/lib` logic and
catalog data integrity. E2E in `tests/e2e/` (Playwright) covers critical user
paths only — keep it a small, fast smoke suite. Each test should protect
behavior a real regression would break.

## Git

Branch from `main`; never commit to it directly. Never commit `.env*` files
(except `.env.example`). Note user-facing changes in `CHANGELOG.md` under
**Unreleased**.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
