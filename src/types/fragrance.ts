export type FragranceFamily = "floral" | "woody" | "amber" | "fresh" | "citrus" | "gourmand";

export type Concentration = "Attar" | "Eau de Parfum" | "Extrait de Parfum";

export interface NotePyramid {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Variant {
  sizeMl: number;
  /** Price in minor units (paise for INR) to avoid float rounding. */
  priceMinor: number;
}

export interface Fragrance {
  slug: string;
  name: string;
  /** The corner of Bombay the scent is named for. */
  place: string;
  tagline: string;
  description: string;
  family: FragranceFamily;
  concentration: Concentration;
  notes: NotePyramid;
  variants: [Variant, ...Variant[]];
  /** Colour of the juice, used to draw the bottle. */
  liquid: string;
}
