import { describe, expect, it } from "vitest";
import { fragrances } from "@/content/fragrances";
import { giftPicks } from "@/content/gift-guide";
import {
  familiesOf,
  findFragrance,
  getFeaturedFragrance,
  getFragranceBySlug,
  filterFragrances,
  getRelatedFragrances,
  sharedVariants,
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

  it("only picks gifts that exist", () => {
    for (const p of giftPicks) expect(findFragrance(p.slug)).toBeDefined();
  });

  it("gives every perfume at least one occasion", () => {
    for (const f of fragrances) expect(f.occasions.length).toBeGreaterThan(0);
  });
});

describe("catalog access", () => {
  it("features the bestseller", async () => {
    expect((await getFeaturedFragrance()).slug).toBe("soft-dove");
  });

  it("finds a product by slug and returns undefined for unknown slugs", async () => {
    const first = fragrances[0]!;
    expect(await getFragranceBySlug(first.slug)).toEqual(first);
    expect(await getFragranceBySlug("does-not-exist")).toBeUndefined();
  });

  it("returns related products without the current one, same family first", async () => {
    const related = await getRelatedFragrances("the-boss", 3);
    expect(related).toHaveLength(3);
    expect(related.some((f) => f.slug === "the-boss")).toBe(false);
    expect(related[0]!.slug).toBe("z-classics");
  });

  it("shows unisex perfumes under him and her", () => {
    const forHer = filterFragrances(fragrances, { audience: "her" }).map((f) => f.slug);
    expect(forHer).toEqual(["molten-caramel", "soft-dove", "no-5"]);
    const unisex = filterFragrances(fragrances, { audience: "unisex" }).map((f) => f.slug);
    expect(unisex).toEqual(["molten-caramel"]);
  });

  it("combines filters", () => {
    const list = filterFragrances(fragrances, { audience: "him", occasion: "evening" });
    expect(list.map((f) => f.slug)).toEqual(["black-j", "molten-caramel"]);
  });

  it("reports shared prices only while every perfume costs the same", () => {
    expect(sharedVariants(fragrances)?.map((v) => v.priceMinor)).toEqual([59_900, 1_19_900]);
    const odd: Fragrance = { ...fragrances[0]!, variants: [{ sizeMl: 50, priceMinor: 1 }] };
    expect(sharedVariants([...fragrances, odd])).toBeUndefined();
    expect(sharedVariants([])).toBeUndefined();
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
