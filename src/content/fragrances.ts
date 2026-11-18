import type { Fragrance, Variant } from "@/types/fragrance";

/**
 * Magic Perfumery's range, from the client's tester photo.
 * Names and prices are the client's. Taglines, descriptions, notes, audience
 * and occasions are drafts to confirm with the client (see TODOS.md).
 */

/** Every perfume costs the same: ₹599 for 50 ml, ₹1,199 for 100 ml. */
const sizes: [Variant, ...Variant[]] = [
  { sizeMl: 50, priceMinor: 59_900 },
  { sizeMl: 100, priceMinor: 1_19_900 },
];

export const fragrances: readonly Fragrance[] = [
  {
    slug: "cold-water",
    name: "Cold Water",
    tagline: "Cool, clean and aquatic.",
    description:
      "A splash of mint and lavender over sea notes, settling into soft cedar. Fresh enough for a humid morning and it still lasts into the evening.",
    family: "fresh",
    audience: "him",
    occasions: ["everyday"],
    notes: {
      top: ["Mint", "Lavender", "Green notes"],
      heart: ["Sea notes", "Geranium", "Jasmine"],
      base: ["Cedar", "Musk", "Amber"],
    },
    variants: sizes,
    label: { from: "#eef7fb", to: "#3a9fd0", ink: "#1d4a63", mark: "#d4589c" },
  },
  {
    slug: "the-boss",
    name: "The Boss",
    tagline: "Polished and spicy, made for work.",
    description:
      "Crisp apple and bergamot open onto warm cinnamon and clove, then dry down to sandalwood. Confident without shouting across the room.",
    family: "woody",
    audience: "him",
    occasions: ["everyday", "gifting"],
    notes: {
      top: ["Apple", "Bergamot"],
      heart: ["Cinnamon", "Clove"],
      base: ["Sandalwood", "Vetiver"],
    },
    variants: sizes,
    label: { from: "#fbfbfd", to: "#eceaf1", ink: "#3d3a46", mark: "#b45fc8" },
  },
  {
    slug: "p-sport",
    name: "P. Sport",
    tagline: "Bright citrus for hot days.",
    description:
      "Lemon and grapefruit with a cold hit of mint. Light, energetic and easy to wear to the gym, on the road or anywhere the day takes you.",
    family: "citrus",
    audience: "him",
    occasions: ["everyday"],
    notes: {
      top: ["Lemon", "Grapefruit"],
      heart: ["Mint", "Green notes"],
      base: ["Musk", "Light woods"],
    },
    variants: sizes,
    label: { from: "#3b86de", to: "#79c6f0", ink: "#ffffff", mark: "#ffffff" },
  },
  {
    slug: "black-j",
    name: "Black J",
    tagline: "Dark and warm, for nights out.",
    description:
      "Black pepper and mandarin over a heart of leather and lavender, finished with amber and tonka. Strong projection that holds through a long evening.",
    family: "amber",
    audience: "him",
    occasions: ["evening"],
    notes: {
      top: ["Black pepper", "Mandarin"],
      heart: ["Leather", "Lavender"],
      base: ["Amber", "Tonka"],
    },
    variants: sizes,
    label: { from: "#3149a4", to: "#f2a072", ink: "#14121c", mark: "#ffffff" },
  },
  {
    slug: "z-classics",
    name: "Z Classics",
    tagline: "Smooth woods with a citrus edge.",
    description:
      "Bergamot and neroli lead into iris and violet leaf, resting on vetiver and cedar. A refined everyday scent that works with a suit or a kurta.",
    family: "woody",
    audience: "him",
    occasions: ["everyday", "gifting"],
    notes: {
      top: ["Bergamot", "Neroli"],
      heart: ["Iris", "Violet leaf"],
      base: ["Vetiver", "Cedar"],
    },
    variants: sizes,
    label: { from: "#2b2c9e", to: "#5a3fc6", ink: "#ffffff", mark: "#ffffff" },
  },
  {
    slug: "molten-caramel",
    name: "Molten Caramel",
    tagline: "Warm caramel and vanilla.",
    description:
      "Golden caramel and a pinch of pink pepper melt into praline and coffee over a vanilla base. Sweet, cosy and noticed when you walk in.",
    family: "gourmand",
    audience: "unisex",
    occasions: ["evening", "gifting"],
    notes: {
      top: ["Caramel", "Pink pepper"],
      heart: ["Praline", "Coffee"],
      base: ["Vanilla", "Tonka", "Musk"],
    },
    variants: sizes,
    label: { from: "#7e3226", to: "#c8684c", ink: "#ffffff", mark: "#ffffff" },
  },
  {
    slug: "soft-dove",
    name: "Soft Dove",
    tagline: "Soft, powdery and clean.",
    description:
      "Juicy pear and rose with a cloud of powder, resting on white musk. Gentle and close to the skin, like freshly laundered cotton.",
    family: "floral",
    audience: "her",
    occasions: ["everyday"],
    notes: {
      top: ["Pear", "Bergamot"],
      heart: ["Rose", "Lily", "Powder notes"],
      base: ["White musk", "Sandalwood"],
    },
    variants: sizes,
    label: { from: "#fcfbfd", to: "#efeaf4", ink: "#3d3a46", mark: "#c25fc0" },
  },
  {
    slug: "brut-musk",
    name: "Brut Musk",
    tagline: "A classic barbershop musk.",
    description:
      "Lavender and geranium over warm musk and tonka. The clean, familiar smell of a fresh shave, made to last all day.",
    family: "fresh",
    audience: "him",
    occasions: ["everyday"],
    notes: {
      top: ["Lavender", "Bergamot"],
      heart: ["Geranium", "Musk"],
      base: ["Tonka", "Oakmoss"],
    },
    variants: sizes,
    label: { from: "#b9def3", to: "#8ac0e6", ink: "#23305e", mark: "#23305e" },
  },
  {
    slug: "no-5",
    name: "No. 5",
    tagline: "A timeless floral.",
    description:
      "Sparkling aldehydes and neroli open onto rose, jasmine and ylang-ylang, warmed by sandalwood and vanilla. Elegant for evenings and special days.",
    family: "floral",
    audience: "her",
    occasions: ["evening", "gifting"],
    notes: {
      top: ["Aldehydes", "Neroli"],
      heart: ["Rose", "Jasmine", "Ylang-ylang"],
      base: ["Sandalwood", "Vanilla", "Vetiver"],
    },
    variants: sizes,
    label: { from: "#2a3aa8", to: "#d62b2b", ink: "#ffffff", mark: "#ffffff" },
  },
];
