# Project structure

```
.
├── .github/
│   ├── workflows/ci.yml        verify → build + e2e; read-only token, no secrets
│   ├── dependabot.yml          weekly grouped npm + actions updates
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
├── .vscode/                    shared editor settings + recommended extensions
├── docs/
│   ├── PROJECT_STRUCTURE.md    this file
│   └── designs/                one doc per significant decision
├── public/                     static assets served at /
│   └── images/products/        product photography (when available)
├── scripts/                    Node tooling (cross-platform)
│   ├── lib/run.mjs             shared process runner + colors
│   ├── setup.mjs               idempotent setup (called by ./setup, setup.ps1)
│   ├── doctor.mjs              environment health check
│   ├── verify.mjs              parallel quality gate
│   └── clean.mjs               remove build output and caches
├── src/
│   ├── app/                    routes (App Router)
│   │   ├── layout.tsx          fonts, metadata, header/footer shell
│   │   ├── page.tsx            home
│   │   ├── fragrances/         collection + [slug] product pages (static)
│   │   ├── sitemap.ts, robots.ts
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── cart/               bag store, provider, drawer, header button (client)
│   │   ├── home/               hero (lotus + bottle line-up), shop-for, occasions, gift guide, ordering
│   │   ├── layout/             site-wide chrome
│   │   ├── product/            bottle, card, grid, filter, add-to-bag, note pyramid
│   │   └── ui/                 shared primitives (scroll reveal)
│   ├── config/site.ts          brand name, locale, currency, nav
│   ├── content/                seed data (read only by lib/catalog.ts)
│   ├── lib/                    catalog access, env, formatting
│   └── types/                  domain types
├── tests/
│   ├── unit/                   Vitest
│   └── e2e/                    Playwright smoke tests
├── setup, setup.ps1            one-command setup for Unix / Windows
├── AGENTS.md                   rules for agents and humans (CLAUDE.md imports it)
├── ARCHITECTURE.md             layers, performance choices, decisions
└── CHANGELOG.md, TODOS.md, VERSION, SECURITY.md, CONTRIBUTING.md
```

## Where new things go

| Adding…                     | Put it in                                         |
| --------------------------- | ------------------------------------------------- |
| A page                      | `src/app/<route>/page.tsx`                        |
| A reusable UI piece         | `src/components/<area>/<name>.tsx`                |
| Business logic / data fetch | `src/lib/<name>.ts` + `tests/unit/<name>.test.ts` |
| An API endpoint             | `src/app/api/<name>/route.ts`                     |
| An env var                  | `src/lib/env.ts` + `.env.example`                 |
| A dev script                | `scripts/<name>.mjs` + `package.json` script      |
