import { describe, expect, it } from "vitest";
import { fragrances } from "@/content/fragrances";
import { origins } from "@/content/origins";
import {
  familiesOf,
  findFragrance,
  getFragranceBySlug,
  getRelatedFragrances,
  startingPrice,
} from "@/lib/catalog";
import type { Fragrance } from "@/types/fragrance";

describe("catalog data integrity", () => {
  it("has unique, URL-safe slugs", () => {
    const slugs = fragrances.map((f) => f.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("has positive integer prices and unique sizes per product", () => {
    for (const f of fragrances) {
      for (const v of f.variants)
        expect(Number.isInteger(v.priceMinor) && v.priceMinor > 0).toBe(true);
      const sizes = f.variants.map((v) => v.sizeMl);
      expect(new Set(sizes).size).toBe(sizes.length);
    }
  });

  it("only links origins to fragrances that exist", () => {
    for (const o of origins) for (const slug of o.usedIn) expect(findFragrance(slug)).toBeDefined();
  });
});

describe("catalog access", () => {
  it("finds a product by slug and returns undefined for unknown slugs", async () => {
    const first = fragrances[0]!;
    expect(await getFragranceBySlug(first.slug)).toEqual(first);
    expect(await getFragranceBySlug("does-not-exist")).toBeUndefined();
  });

  it("returns related products without the current one, same family first", async () => {
    const related = await getRelatedFragrances("first-rain", 3);
    expect(related).toHaveLength(3);
    expect(related.some((f) => f.slug === "first-rain")).toBe(false);
    expect(related[0]!.family).toBe("woody");
  });

  it("lists each family once", () => {
    const families = familiesOf(fragrances);
    expect(new Set(families).size).toBe(families.length);
  });

  it("computes the lowest variant price", () => {
    const f: Fragrance = {
      ...fragrances[0]!,
      variants: [
        { sizeMl: 100, priceMinor: 900 },
        { sizeMl: 30, priceMinor: 300 },
      ],
    };
    expect(startingPrice(f)).toBe(300);
  });
});
