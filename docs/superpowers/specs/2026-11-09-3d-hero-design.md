# 3D bestseller hero, premium polish and live on Vercel

Date: 2026-11-09 · Status: approved by the user. Their emphasis at approval: "don't forget about premiumness & positions of features."

## Intent

Make the Magic Perfumery site feel premium and memorable to win over the
client, without slowing it down. The user's words: a "3D animated website"
that is "user friendly", shows "premium looks", with features "smartly
positioned" and still useful. Speed is non-negotiable: "it should not get
slow … others' websites are fast with animations, we are in a competition era."

The centrepiece is **Soft Dove, the client's best-selling perfume**, as a
real-time 3D bottle in the hero. The site goes **live on Vercel** so the client
gets a real link.

Reference for premium feel and product presentation: bombayperfumery.com
(gifting collection). Inspiration only: no copying of their branding,
content or layout. Their site could not be fetched for this design (rate
limited), so the reference is the user's description plus an earlier read
of their home page: clean product shots, quick add on hover, uppercase names.

## Current state (what exists)

- Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4. All
  pages are static. The rules in `AGENTS.md` and the tokens in `DESIGN.md` apply.
- The hero (`src/components/home/hero.tsx`) draws the lotus, and the whole range
  rises in a row of SVG bottles. Soft Dove is drawn by `src/components/product/bottle.tsx`
  (frosted cylinder, white pump, clear overcap, printed label).
- Features already built and kept: quick add on cards, shop for
  him/her/unisex, shop by occasion, gift guide, announcement bar, trust
  strip, floating WhatsApp button, the bag ordering on WhatsApp, and the real
  tester photo.
- Not a git repository yet. Nothing has been deployed.

## Goals

1. **Hero:** Soft Dove as a real-time 3D bottle. It turns slowly, leans
   toward the pointer, and rotates further as the visitor scrolls through
   the hero. Next to it: "Our bestseller", the name, the tagline, an
   **Add 50 ml** button that adds to the bag directly, and "Shop all perfumes".
2. **Premium polish** on the rest of the page, kept lighter: a subtle 3D
   tilt on product cards on hover, and refined spacing and order of the
   sections.
3. **Fast:** the performance budget below is met and checked.
4. **Live on Vercel** as a public demo link, hidden from search engines.

## Non-goals

- 3D anywhere except the hero, such as product pages or a bottle travelling
  through the page. Drag-to-rotate on product pages might come later.
- Online payment, accounts or a CMS.
- New products, new copy claims, or "bestseller" badges on cards. The
  user declined badges earlier. "Our bestseller" appears only in the hero,
  as the user's own fact about Soft Dove.

## Anti-goals (would count as failure even if it works)

- The page feels slower than today, or the hero shows an empty box or a
  spinner while the 3D loads.
- The 3D stutters on a mid-range Android phone, or drains battery while
  off-screen.
- The 3D bottle looks less like the real bottle than the current drawing does.
- Features become harder to reach: bag, quick add, filters and WhatsApp
  must stay one tap away.

## Constraints

**Performance budget, measured on the production build:**

- Lighthouse mobile performance of 90 or more on `/`.
- LCP under 2.5 s, CLS under 0.05, INP under 200 ms.
- 3D code at most about 300 KB gzipped. It is loaded after first paint and
  is not in the initial JS for `/`. Other pages ship no 3D code.
- The hero holds about 60 fps on desktop and stays smooth on a mid-range
  phone. The render loop stops when the hero is off-screen or the tab is hidden.

**Fallback (no 3D), showing the current SVG Soft Dove bottle instead:**

- `prefers-reduced-motion: reduce`
- no WebGL, or creating a WebGL context fails
- low-power signals: `navigator.connection.saveData`, a 2g or 3g
  `effectiveType`, or `navigator.hardwareConcurrency` of 4 or less
  together with `deviceMemory` of 4 or less, where available

**Other constraints:**

- The SVG bottle is also the first paint. The 3D canvas fades in over it in
  the same position and size, so the layout never moves.
- Architecture rules from `AGENTS.md`:
  - Server Components by default; the 3D is a small client leaf.
  - Data comes through `src/lib/catalog.ts`.
  - Prices go through `formatPrice`.
  - The brand name comes from `siteConfig`.
- Accessibility: the canvas is decorative (`aria-hidden`). The hero text and
  buttons are real HTML, and keyboard focus works as before.
- Pinned exact dependency versions, per `.npmrc`.

## Approaches considered

| Approach                                                                    | Trade-off                                                                                                   | Decision                |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------- |
| **1. Real-time 3D (React Three Fiber + three.js)**, bottle modelled in code | Interactive and the most premium. Costs about 250 KB of JS, handled by lazy loading and the fallback rules. | **Chosen by the user.** |
| 2. Pre-rendered spin (image sequence scrubbed by scroll)                    | Light on every phone, but not interactive, and re-rendered for any change.                                  | Not chosen.             |
| 3. CSS 3D (layered flat images)                                             | Very light, but a round bottle exposes the trick when it turns. Looks cheap.                                | Ruled out.              |

Placement options were: hero only, hero plus product pages, or 3D throughout.
**The user chose hero only.**

## Design decisions

### The 3D bottle

- Built from code (no `.glb` download). Its proportions match `bottle.tsx`
  and the client's photo:
  - body: a cylinder with rounded edges in frosted translucent plastic
    (transmission/roughness material)
  - pump collar and actuator in white
  - overcap: a clear plastic cylinder
- The label is a texture made from the Soft Dove label artwork (the same
  colours, lotus and name as `bottle.tsx`), wrapped around the body. It is
  generated at runtime from the existing SVG, so no new image files are needed.
- Lighting: a soft studio environment (a small baked or procedural one; no
  large HDR download), with a contact shadow under the bottle.
- Motion:
  - an idle slow turn
  - an eased lean toward the pointer (desktop only)
  - scroll through the hero adds rotation
  - entrance: the bottle rises and settles once
- All motion is driven by the same `--ease-magic` feel as the rest of the site.

### Hero layout

- Desktop: text on the left, bottle on the right.
- Mobile: bottle above the text, at a smaller size.
- The lotus line art stays as a faint backdrop behind the bottle.
- The row of 9 bottles moves out of the hero. The full range already appears
  in "All 9 perfumes" and in the shop-for tiles.
- Hero copy:
  - eyebrow: "Our bestseller"
  - name: Soft Dove
  - tagline: from the catalogue
  - prices: from the catalogue via `formatPrice`
  - primary button: "Add 50 ml — ₹599", which adds to the bag and opens it
  - secondary link: "Shop all perfumes"
- _(Builder's call, made in review)_ The page `h1` stays the brand line
  "Perfume that stays with you.", and "Magic Perfumery" stays as the top
  eyebrow, so the brand still leads the first screen and search results.
  The Soft Dove block (eyebrow "Our bestseller", the name as `h2`, the tagline
  and the add button) sits directly under it, beside the bottle. The range
  line ("9 long-lasting perfumes … ₹599 / ₹1,199") moves into the trust strip.
- Which perfume the hero features is a setting (a slug in the catalogue
  layer), not hard-coded in the component.

### Rest of the page

- Product cards get a gentle pointer-driven 3D tilt with a sheen. This is
  CSS transforms with a few lines of JS, and nothing runs on touch devices.
- Section order:
  1. hero (bestseller)
  2. trust strip
  3. shop for him/her/unisex
  4. all perfumes
  5. occasions
  6. gift guide
  7. the real bottles photo
  8. how ordering works
- The announcement bar and the floating WhatsApp button stay as they are.

### Phone polish (added by the user in plan review)

The user's words: "mostly the client will check this in phone, and mostly
the targeted audience would be using phone." Phones must feel as premium as
desktop. All four items below were approved:

1. **Cards come alive on scroll.** As each product card enters the viewport,
   the bottle rises into place and a light sweep crosses the label once.
   This uses CSS scroll-driven animations (`animation-timeline: view()`) and
   runs on the GPU with no JS. Browsers without support keep the existing
   `Reveal` fade.
2. **Touch feedback.**
   - Cards and buttons press in slightly (scale about 0.98) under a finger.
   - Quick add shows "Added ✓" briefly before the bag slides in.
3. **Features within thumb reach.**
   - On product pages, phones get a sticky bottom bar "Add to bag — ₹599"
     once the main add button scrolls out of view. It uses the same
     selected size.
   - The floating WhatsApp button moves up so it never covers the bar.
   - Collection filters become one swipeable row per group on phones,
     instead of wrapping rows.
4. **Hero on phones.**
   - The 3D bottle auto-turns and rotates with scroll.
   - No finger-drag, because it would fight page scrolling.
   - No motion-sensor tilt, because iOS shows a permission popup for it.

The desktop card tilt still applies to desktop only (pointer-based).

### Vercel

- Deploy the production build to Vercel with a public `*.vercel.app` URL.
- Set the environment variables:
  - `NEXT_PUBLIC_SITE_URL` = the Vercel URL
  - `NEXT_PUBLIC_WHATSAPP_NUMBER=917769968361`
- Requires the user to log in to Vercel once (`npx vercel login`). Claude
  cannot create the account.
- Initialise git first (Vercel and CI expect it):
  - branch `main` with an initial commit of the current work
  - the feature work goes on a branch, per `AGENTS.md`
- Turn on Vercel Speed Insights so real-visitor speed is visible to the
  user and the client (the free plan's limits are fine for a demo).

**Decided by the user in review:**

- **Account:** the user's own free (Hobby) Vercel account, because this is a
  demo. It moves to the client's account or a paid plan if it becomes the
  real shop; see TODOS.md.
- **Visibility:** public link that anyone with it can open, kept out of search engines:
  - `robots.ts` disallows everything
  - pages carry `noindex, nofollow`
  - both are controlled by one env flag (`NEXT_PUBLIC_ALLOW_INDEXING`, default
    off) so launch is a one-line change
- **Timing:** the link is shared only once the 3D hero is finished and
  verified. The first deploy happens at the end of this work, not before.
- **Deploy method:** the Vercel command-line tool from this machine
  (`vercel` for previews, `vercel --prod` for the shared link). No GitHub
  repo is required. Connecting one later would add automatic preview links.

## Verification

- `npm run verify -- --build` passes.
- New unit tests cover the fallback decision logic (the low-power rules) and
  the hero product lookup.
- E2E tests:
  - **Hero add to bag:** "Add 50 ml" on the hero adds Soft Dove to the bag.
  - **Fallback:** with reduced motion emulated, no WebGL canvas is created
    and the SVG bottle shows.
  - **Phone layout:** the existing 320/360px no-overflow test still passes.
  - **3D code stays out of other pages:** `/fragrances` does not load the
    3D chunk.
- Lighthouse mobile run on the production build, against the budget above.
  Results are recorded in `DESIGN.md`'s review log.
- Screenshots: desktop and phone, the 3D state and the fallback state.
- _(Builder's call, made in review)_ Phone smoothness check:
  - Open the dev or preview URL on the user's own phone and look for stutter.
  - Record the frame rate in Chrome DevTools with 4x CPU throttling on a
    mid-tier mobile profile.
  - If either shows stutter, tighten the low-power fallback rule rather than
    shipping a stuttering hero.

## Left to the builder

- Exact library versions (React Three Fiber, drei, three) compatible with
  React 19.3 and Next 16.
- Material and lighting values, and the texture resolution of the label.
- How the canvas is lazy-loaded (`next/dynamic` with `ssr: false`, or
  loading after idle).
- Exact thresholds for the low-power rule, within the spirit above.
- Whether Speed Insights is added through its package or the Vercel
  dashboard.
