---
name: Bombay Perfume
memorable: "The moment Marine Drive's lights come on — Bombay's evening is the brand."
colors:
  dusk: "#1f2142"
  dusk-deep: "#14152b"
  mauve: "#6e4a68"
  sodium: "#f2a93b"
  plaster: "#eceeea"
  mint: "#bcd3c6"
  ink: "#1a1b2e"
  haze: "#5c5e74"
fonts:
  display: Italiana
  body: Jost
---

# Bombay Perfume — design system

Tokens live in `src/app/globals.css` (`@theme`); this file explains them.
Produced following gstack's `/design-consultation` → `/design-review` workflow.

## The one thing to remember

Every decision serves one idea: **Bombay at dusk, as the Queen's Necklace lights
up.** The memorable thing was chosen on the client's behalf for the pitch, so
change it here first if they see the brand differently.

## Colour

| Token      | Hex                   | Role                                                      | Why                                                                             |
| ---------- | --------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------- |
| dusk       | `#1f2142`             | Header, primary buttons, text on light                    | The sky over the bay after sunset — night, not black.                           |
| dusk-deep  | `#14152b`             | Footer, water                                             | The sea at night.                                                               |
| mauve      | `#6e4a68`             | Horizon glow, step numbers                                | The last light behind the skyline.                                              |
| sodium     | `#f2a93b`             | **Light only:** lamps, hero CTA, bag count, focus on dark | Marine Drive's sodium-vapour lamps. Never used as a fill colour on light pages. |
| plaster    | `#eceeea`             | Page background                                           | Cool Art Deco facade plaster — deliberately not warm cream.                     |
| mint       | `#bcd3c6`             | Section tint                                              | Pastel Deco facades along Marine Drive and Oval Maidan.                         |
| ink / haze | `#1a1b2e` / `#5c5e74` | Text / secondary text                                     | AA on plaster (5.4:1) and on the mint section (≈4.8:1).                         |

Product panels tint plaster with each perfume's own liquid colour
(`color-mix(in oklab, liquid 22%, plaster)`), so the catalogue gets colour
from the products, not from decoration.

## Type

- **Italiana** (display): thin, high-contrast, 1920s-flavoured. Used large and
  sparingly: hero, headings, product names, wordmark. Never for prices or
  numbers in UI — its numerals are hard to read at small sizes.
- **Jost** (body + UI): geometric, in the Futura family that defined Deco-era
  signage. Uppercase with 0.2em tracking for eyebrows and buttons (`.eyebrow`, `.btn`).

## Signature: the Queen's Necklace

`src/components/home/necklace-scene.tsx` draws the bay as a hanging curve with
44 lamps. They flicker on left to right the way sodium lamps warm up, and
their reflections shimmer in the water. It's pure SVG + CSS rendered on the
server, so it ships no JavaScript, and it shows fully lit straight away under
`prefers-reduced-motion`.

## Motion (kept deliberately small)

| Where         | What                                          | Why                               |
| ------------- | --------------------------------------------- | --------------------------------- |
| Hero          | Text rises, then the lamps switch on          | The one orchestrated moment.      |
| Product cards | Bottle lifts; a glint sweeps across the glass | Feels like glass, costs nothing.  |
| Sections      | Fade up once on scroll (`Reveal`)             | Paces the long home page.         |
| Bag           | Slides in from the right                      | Confirms "added" without a toast. |

## Bottles

Products are drawn as Deco flacons (`bottle.tsx`): a stepped cap with a sodium
band for perfumes, and a round flask with a faceted stopper for attars. They
stand in for photography; swap for `next/image` once shoots exist.

## Words

Sentence case. Actions say what happens: "Add to bag", "Order on WhatsApp".
"Bag" is used everywhere (never "cart" in the UI).

## Design review log

| Finding                                            | Impact | Status                  |
| -------------------------------------------------- | ------ | ----------------------- |
| Bag subtotal in Italiana numerals was hard to read | High   | Fixed — prices use Jost |
| Wordmark wrapped to two lines on phones            | High   | Fixed                   |
| Header/cards overflowed at 360px                   | High   | Fixed + regression test |
| Reflections read as lamp posts                     | Medium | Fixed — wider, softer   |
| Amber step numbers had low contrast on plaster     | Medium | Fixed — mauve           |
