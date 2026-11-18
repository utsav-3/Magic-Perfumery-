# Architecture

## Shape

```
Request ─▶ src/app (routes, Server Components)
              │
              ├─▶ src/components (presentational, mostly server)
              │
              └─▶ src/lib/catalog.ts ─▶ src/content/fragrances.ts   (today)
                                     └▶ CMS / commerce API           (later)
```

Three layers, dependencies point one way:

| Layer      | Path                                    | May import                                |
| ---------- | --------------------------------------- | ----------------------------------------- |
| Routes     | `src/app/`                              | components, lib, config, types            |
| Components | `src/components/`                       | other components, lib, config, types      |
| Domain     | `src/lib/`, `src/config/`, `src/types/` | each other, `src/content/` (catalog only) |

## Why it's fast

- **Static by default.** Product pages use `generateStaticParams` with
  `dynamicParams = false`, so every page is pre-rendered HTML at build time.
- **Client JS only where it is needed.** Content is Server Components; only the bag
  (`components/cart/`), size picker, family filter and scroll reveal are client
  components. The hero animation is SVG + CSS with no JavaScript.
- **Self-hosted fonts** via `next/font` (no layout shift, no third-party request).
- **Images** are served as AVIF/WebP through `next/image` once real photos exist
  (the drawn `Bottle` SVG stands in until then).
- **Tooling caches:** incremental `tsc`, ESLint and Prettier caches, Turbopack
  in dev, `.next/cache` restored in CI, and `npm run verify` runs checks in parallel.

## Decisions

| Decision                                       | Why                                                                                                                                                               |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Next.js App Router                             | SEO-friendly static product pages now; room for cart, checkout, auth and route handlers later.                                                                    |
| `src/lib/catalog.ts` as the only data boundary | The data source will change (CMS, Shopify, DB); call sites shouldn't.                                                                                             |
| Integer minor units (paise) for money          | Float math misprices products.                                                                                                                                    |
| Bag in localStorage, order via WhatsApp        | Client chose browse + bag; no payment data touches the site. Pure logic in `lib/cart.ts`.                                                                         |
| 3D hero as a lazy leaf in `home/hero-3d/`      | Client-only three.js loads after the page, behind `lib/three-policy.ts`; the drawn bottle stays the first paint and fallback. `npm run check:3d` guards the size. |
| zod-validated env                              | Misconfiguration fails at boot, not on a customer's request.                                                                                                      |
| Node scripts behind `setup`/`setup.ps1`        | One implementation that works the same on Windows and Unix.                                                                                                       |
| TypeScript 6.0 (not 7)                         | typescript-eslint supports `<6.1`. Revisit when it supports TS 7.                                                                                                 |

Larger decisions get their own doc in [docs/designs/](docs/designs/).
