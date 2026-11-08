export type FragranceFamily = "floral" | "woody" | "amber" | "fresh" | "citrus" | "gourmand";

/** Who a perfume is made for. */
export type Audience = "him" | "her" | "unisex";

/** When it's worn best. Used for "Shop by occasion". */
export type Occasion = "everyday" | "evening" | "gifting";

export const audienceLabels: Record<Audience, string> = {
  him: "For him",
  her: "For her",
  unisex: "Unisex",
};

export const occasionLabels: Record<Occasion, string> = {
  everyday: "Everyday",
  evening: "Evening",
  gifting: "Gifting",
};

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

/** Colours of the printed bottle label, used to draw the bottle. */
export interface Label {
  /** Top and bottom of the label's background gradient. */
  from: string;
  to: string;
  /** Text colour on the label. */
  ink: string;
  /** Colour of the lotus printed on the label. */
  mark: string;
}

export interface Fragrance {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  family: FragranceFamily;
  audience: Audience;
  occasions: Occasion[];
  notes: NotePyramid;
  variants: [Variant, ...Variant[]];
  label: Label;
}
