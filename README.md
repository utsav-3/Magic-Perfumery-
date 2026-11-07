# Bombay Perfume

Storefront for Bombay Perfume. Design system: [DESIGN.md](DESIGN.md). Next.js (App Router) · TypeScript strict ·
Tailwind CSS v4 · Vitest · Playwright.

## Quick start

```bash
./setup          # macOS / Linux / Git Bash
.\setup.ps1      # Windows PowerShell
npm run dev      # http://localhost:3000
```

Requires Node ≥ 22.12 (see `.nvmrc`). Setup is idempotent: re-run it any time.

## Everyday commands

| Command                      | What it does                                                             |
| ---------------------------- | ------------------------------------------------------------------------ |
| `npm run dev`                | Dev server with Turbopack                                                |
| `npm run verify`             | Typecheck, lint, format and unit tests in parallel — run before every PR |
| `npm run test:e2e`           | Browser smoke tests (`npm run setup -- --e2e` installs Chromium once)    |
| `npm run build && npm start` | Production build and server                                              |
| `npm run doctor`             | Diagnose your environment                                                |

## Docs

- [AGENTS.md](AGENTS.md) — conventions and rules (for people and AI agents)
- [ARCHITECTURE.md](ARCHITECTURE.md) — layers, performance choices, decisions
- [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) — annotated tree, where new code goes
- [CONTRIBUTING.md](CONTRIBUTING.md) · [SECURITY.md](SECURITY.md) · [CHANGELOG.md](CHANGELOG.md)
