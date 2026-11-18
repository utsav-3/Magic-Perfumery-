# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Version is in `VERSION`.

## Unreleased

### Changed

- Rebranded to **Magic Perfumery**: lotus logo, violet-to-saffron palette from the client's poster, Cinzel + Jost type.
- Real range of 9 perfumes at ₹599 (50 ml) / ₹1,199 (100 ml), drawn as the client's frosted spray bottles.
- New hero: Soft Dove, the bestseller, as a real-time 3D bottle beside Add 50 ml and Shop all perfumes (the drawn bottle is the first paint and the fallback).
- The home page range line moved into the trust strip.

### Added

- Quick add (50 ml / 100 ml) on every product card.
- Shop by who it's for (him / her / unisex) and by occasion (everyday / evening / gifting); filters live in the URL.
- Announcement bar, trust strip, gift guide, the client's real bottle photo.
- Floating "Chat with us" WhatsApp button.
- 3D hero loads only when the device suits it (not reduced motion, GPU-backed WebGL, not low-power or slow network); 3D bundle budget check in `verify -- --build`.
- Desktop: pointer tilt and sheen on product cards.
- Phones: cards rise in with a light sweep as they scroll, press feedback, quick add shows Added, sticky Add to bag bar on product pages, swipeable filter rows, WhatsApp button lifts above the bar.
- `NEXT_PUBLIC_ALLOW_INDEXING` (default off): robots.txt and the robots meta tag keep the demo out of search; Vercel Speed Insights.

### Removed

- Bombay-specific content: Queen's Necklace hero, "Where the notes come from".

## 0.2.0 — 2026-11-06

### Added

- Bombay Perfume brand: design system in `DESIGN.md` (dusk palette, Italiana + Jost).
- Animated "Queen's Necklace" hero: Marine Drive's lamps switch on at dusk.
- Eight-perfume catalogue in INR with drawn Art Deco bottles and attar flasks.
- Collection page with scent-family filters; product pages with size and quantity.
- Bag drawer saved on the device, ending in "Order on WhatsApp" with the order written out.
- "Where the notes come from" and "How ordering works" sections.
- Tests: bag logic unit tests; end-to-end shopping journey and small-phone layout.

## 0.1.0 — 2026-11-06

### Added

- Project scaffold: Next.js App Router, TypeScript strict, Tailwind v4.
- Tooling: `setup`/`setup.ps1`, `doctor`, parallel `verify` gate, CI, Dependabot.
