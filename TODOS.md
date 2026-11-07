# TODOs

## Before showing the client

- [ ] Set `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` (and on the host) so orders reach the shop. Until then, "Order on WhatsApp" asks the customer to pick a chat.

## Before launch (confirm with client)

- [ ] Product names, notes, sizes and prices in `src/content/fragrances.ts` are draft copy
- [ ] Sourcing claims in `src/content/origins.ts` are draft copy
- [ ] Product photography → `public/images/products/`, then swap `Bottle` for `next/image`
- [ ] Open Graph share image (`src/app/opengraph-image.tsx`)
- [ ] Pick a deployment target and set `NEXT_PUBLIC_SITE_URL` there

## Later

- [ ] Online payment (Stripe / Razorpay) behind the same bag → design doc in `docs/designs/`
- [ ] Content-Security-Policy once third-party scripts are known
- [ ] Analytics and Core Web Vitals monitoring
- [ ] Upgrade to ESLint 10 once eslint-config-next's plugins declare support (peer warnings today)
