# TODOs

## Confirm with the client before launch

- [ ] Taglines, descriptions and notes in `src/content/fragrances.ts` are draft copy written from the scent names
- [ ] Who each perfume is for (him / her / unisex) and its occasions are drafts; today 6 are "for him", 2 "for her", 1 unisex
- [ ] Gift guide picks in `src/content/gift-guide.ts`
- [ ] Product names: the site shows "No. 5" and "Molten Caramel"; the bottle labels also say "by Chanell" and "Paris Corner". Using another brand's name on the site is a trademark risk — client to decide
- [ ] Are the 30 ml testers for sale? If so, at what price (add as a size)
- [ ] Delivery areas, charges and payment methods, to state on the site
- [ ] Vector logo file (SVG/AI/PDF) to replace the redrawn lotus in `src/components/brand/lotus-mark.tsx`
- [ ] Individual product photos → `public/images/products/`; could replace the drawn bottles
- [ ] Open Graph share image (`src/app/opengraph-image.tsx`)
- [ ] Move the Vercel project to the client's account or a paid plan before going commercial (the demo runs on the Hobby plan)
- [ ] At launch set `NEXT_PUBLIC_ALLOW_INDEXING=true` and `NEXT_PUBLIC_SITE_URL` to the real domain
- [ ] Re-run Lighthouse mobile on the deployed URL (local runs here were limited by a GPU-less headless Chromium) and check the 3D hero on a real mid-range phone

## Later

- [ ] Online payment (Stripe / Razorpay) behind the same bag → design doc in `docs/designs/`
- [ ] Content-Security-Policy once third-party scripts are known
- [ ] Analytics and Core Web Vitals monitoring
- [ ] Upgrade to ESLint 10 once eslint-config-next's plugins declare support (peer warnings today)
