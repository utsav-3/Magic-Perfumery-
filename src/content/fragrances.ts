import type { Fragrance } from "@/types/fragrance";

/**
 * Catalog. Names, notes and prices are draft copy for the client demo —
 * confirm with Bombay Perfume before launch. Only src/lib/catalog.ts may
 * import this file.
 */
export const fragrances: readonly Fragrance[] = [
  {
    slug: "marine-drive",
    name: "Marine Drive",
    place: "Marine Drive",
    tagline: "Salt air and sodium light along the bay.",
    description:
      "The walk from Chowpatty to Nariman Point after sunset: sea spray on the parapet, a bright cut of grapefruit, and a warm ambergris trail that stays on the skin long after the lights go out.",
    family: "fresh",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Sea salt", "Bergamot", "Pink grapefruit"],
      heart: ["Ambergris accord", "Violet leaf"],
      base: ["Driftwood", "White musk"],
    },
    variants: [
      { sizeMl: 50, priceMinor: 480000 },
      { sizeMl: 100, priceMinor: 720000 },
    ],
    liquid: "#8fb3bf",
  },
  {
    slug: "dadar-mogra",
    name: "Dadar Mogra",
    place: "Dadar flower market",
    tagline: "A string of jasmine, bought at dawn.",
    description:
      "Mogra sold by the hand-length before the city wakes. Heady jasmine sambac and creamy tuberose, softened with sandalwood so it wears close and lasts all day.",
    family: "floral",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Green leaves", "Mandarin"],
      heart: ["Mogra (jasmine sambac)", "Tuberose"],
      base: ["Sandalwood", "White musk"],
    },
    variants: [
      { sizeMl: 50, priceMinor: 450000 },
      { sizeMl: 100, priceMinor: 680000 },
    ],
    liquid: "#efe0a8",
  },
  {
    slug: "bhendi-bazaar",
    name: "Bhendi Bazaar",
    place: "the attar lanes of Bhendi Bazaar",
    tagline: "Oud and saffron from the old attar shops.",
    description:
      "A pure perfume oil in the tradition of the attar sellers off Mohammed Ali Road. Saffron and Taif rose over dark, resinous oud. One drop at the wrist is enough.",
    family: "amber",
    concentration: "Attar",
    notes: {
      top: ["Saffron"],
      heart: ["Taif rose", "Oud"],
      base: ["Amber", "Labdanum"],
    },
    variants: [
      { sizeMl: 12, priceMinor: 650000 },
      { sizeMl: 24, priceMinor: 1150000 },
    ],
    liquid: "#7a3420",
  },
  {
    slug: "first-rain",
    name: "First Rain",
    place: "the first monsoon shower",
    tagline: "Hot stone and wet earth, the hour the monsoon breaks.",
    description:
      "Built around mitti — earth baked and distilled the way Kannauj perfumers have for centuries. Green cardamom and geranium on top, cool vetiver underneath.",
    family: "woody",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Green cardamom", "Petrichor accord"],
      heart: ["Mitti (baked earth)", "Geranium"],
      base: ["Vetiver", "Cedar"],
    },
    variants: [
      { sizeMl: 50, priceMinor: 520000 },
      { sizeMl: 100, priceMinor: 780000 },
    ],
    liquid: "#a3926d",
  },
  {
    slug: "irani-cafe",
    name: "Irani Café",
    place: "the Irani cafés",
    tagline: "Cutting chai, bun maska, a marble-top table.",
    description:
      "Strong black tea with cardamom and ginger, a little milk, and the warm sweetness of tonka and cocoa. Comforting without being sugary.",
    family: "gourmand",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Cardamom", "Ginger"],
      heart: ["Black tea", "Milk accord"],
      base: ["Tonka bean", "Vanilla", "Cocoa"],
    },
    variants: [
      { sizeMl: 50, priceMinor: 450000 },
      { sizeMl: 100, priceMinor: 680000 },
    ],
    liquid: "#b5804f",
  },
  {
    slug: "malabar-hill",
    name: "Malabar Hill",
    place: "Malabar Hill",
    tagline: "Sandalwood and iris, high above the bay.",
    description:
      "Our richest concentration. Creamy Mysore sandalwood and powdery orris, lifted with pink pepper. Quiet in the room, unforgettable up close.",
    family: "woody",
    concentration: "Extrait de Parfum",
    notes: {
      top: ["Bergamot", "Pink pepper"],
      heart: ["Orris", "Rose"],
      base: ["Mysore sandalwood", "Cashmeran"],
    },
    variants: [{ sizeMl: 50, priceMinor: 860000 }],
    liquid: "#d8b996",
  },
  {
    slug: "kala-ghoda",
    name: "Kala Ghoda",
    place: "Kala Ghoda",
    tagline: "Leather, incense and the galleries after closing.",
    description:
      "Smoky leather and frankincense with a crack of black pepper — the art district at night, when the openings end and the streets go quiet.",
    family: "woody",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Black pepper", "Elemi"],
      heart: ["Leather", "Frankincense"],
      base: ["Vetiver", "Birch tar"],
    },
    variants: [
      { sizeMl: 50, priceMinor: 520000 },
      { sizeMl: 100, priceMinor: 780000 },
    ],
    liquid: "#3d3545",
  },
  {
    slug: "alphonso",
    name: "Alphonso",
    place: "Crawford Market in May",
    tagline: "The first mangoes of the season, sliced cold.",
    description:
      "Juicy Alphonso mango and lime over orange blossom, grounded with a little vetiver so it reads as perfume, not fruit salad. Made for Bombay summers.",
    family: "citrus",
    concentration: "Eau de Parfum",
    notes: {
      top: ["Alphonso mango", "Lime"],
      heart: ["Neroli", "Orange blossom"],
      base: ["Vetiver", "Musk"],
    },
    variants: [
      { sizeMl: 50, priceMinor: 450000 },
      { sizeMl: 100, priceMinor: 680000 },
    ],
    liquid: "#e6b04e",
  },
];
