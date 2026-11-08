---
name: Magic Perfumery
memorable: "A lotus that blooms, then the whole range lines up beneath it."
colors:
  night: "#241640"
  night-deep: "#160d2a"
  orchid: "#8e3f86"
  saffron: "#f59a5b"
  paper: "#f6f2f8"
  lilac: "#e9e0f3"
  ink: "#1e1530"
  haze: "#5a5170"
fonts:
  display: Cinzel
  body: Jost
---

# Magic Perfumery — design system

Tokens live in `src/app/globals.css` (`@theme`); this file explains them.
Built from the client's own material: their lotus logo, the violet-to-orange
gradient on their poster, and their real spray bottles.

## The one thing to remember

**The lotus blooms, then the bottles line up.** The hero draws the logo petal
by petal and the full range rises beneath it, the way the bottles stand in
the client's tester photo.

## Colour

| Token      | Hex                   | Role                                         | Why                                                     |
| ---------- | --------------------- | -------------------------------------------- | ------------------------------------------------------- |
| night      | `#241640`             | Header, primary buttons, dark sections       | The violet end of the poster, deepened for text.        |
| night-deep | `#160d2a`             | Announcement bar, footer                     | Deeper still, to frame the page.                        |
| orchid     | `#8e3f86`             | Eyebrows, step numbers, accents on light     | The poster's middle pink-violet; AA on paper and lilac. |
| saffron    | `#f59a5b`             | **On dark only:** logo, hero CTA, highlights | The orange end of the poster.                           |
| paper      | `#f6f2f8`             | Page background                              | A lilac-white, not warm cream.                          |
| lilac      | `#e9e0f3`             | Section tint (trust strip, occasions)        | Quiet bands that pace the long home page.               |
| ink / haze | `#1e1530` / `#5a5170` | Text / secondary text                        | Haze is 6.7:1 on paper, 5.8:1 on lilac.                 |

Product panels tint paper with each bottle's label colour
(`labelTint`, `color-mix(in oklab, label 20%, paper)`), so colour comes from
the products. "Shop for" tiles use darker gradients so white text stays AA.

## Type

- **Cinzel** (display): classical capitals that echo the arched serif
  wordmark on the client's logo. Headings and product names only. Never for
  prices — those use Jost.
- **Jost** (body + UI): geometric and clean. Uppercase with tracking for
  eyebrows and buttons (`.eyebrow`, `.btn`). Buttons and chips are pill-shaped.

## Bottles

`bottle.tsx` draws the real bottle: a frosted cylinder, white pump, clear
overcap and a printed label in each perfume's colours with the lotus and the
name. Drawn rather than photographed so every card is crisp and consistent;
the client's real photo appears in "The real bottles" section as proof.

## Motion (kept small)

| Where         | What                                                | Why                               |
| ------------- | --------------------------------------------------- | --------------------------------- |
| Hero          | Lotus draws itself, then the 9 bottles rise in turn | The one orchestrated moment.      |
| Product cards | Bottle lifts, a shimmer sweeps; quick add slides up | Feels tactile, costs nothing.     |
| Sections      | Fade up once on scroll (`Reveal`)                   | Paces the long home page.         |
| Bag           | Slides in from the right                            | Confirms "added" without a toast. |

All of it is CSS; `prefers-reduced-motion` shows the finished state.

## Words

Sentence case. Actions say what happens: "Add to bag", "Order on WhatsApp",
"Chat with us". "Bag" everywhere (never "cart"). Claims are only the client's
own: high projection, long-lasting, one price.

## Design review log

| Finding                                             | Impact | Status                         |
| --------------------------------------------------- | ------ | ------------------------------ |
| Header overflowed at 320px (empty nav list had gap) | High   | Fixed + regression test        |
| Gift guide bottles rendered at full panel width     | High   | Fixed — fixed bottle height    |
| 9 products left an orphan in a 4-column grid        | Medium | Fixed — 3 columns              |
| Lotus fought the headline on phones                 | Medium | Fixed — lower opacity on small |
| White text on light tile gradient ends < 4.5:1      | Medium | Fixed — darker gradient ends   |
