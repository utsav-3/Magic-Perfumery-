import { fragrances } from "@/content/fragrances";
import { giftPicks } from "@/content/gift-guide";
import type { Audience, Fragrance, FragranceFamily, Occasion, Variant } from "@/types/fragrance";

/**
 * Single data-access boundary for products. Pages and components call these
 * functions; swapping to a CMS or commerce API only changes this file.
 * Page-level reads are async so that swap needs no call-site changes.
 */

export async function getAllFragrances(): Promise<readonly Fragrance[]> {
  return fragrances;
}

export async function getFragranceBySlug(slug: string): Promise<Fragrance | undefined> {
  return findFragrance(slug);
}

/** Up to `limit` other fragrances: same family first, then same audience. */
export async function getRelatedFragrances(slug: string, limit = 3): Promise<readonly Fragrance[]> {
  const current = findFragrance(slug);
  if (!current) return [];
  const score = (f: Fragrance) =>
    (f.family === current.family ? 2 : 0) + (f.audience === current.audience ? 1 : 0);
  return fragrances
    .filter((f) => f.slug !== slug)
    .map((f, i) => ({ f, i, s: score(f) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, limit)
    .map(({ f }) => f);
}

/** Synchronous lookup, for client code such as the bag. */
export function findFragrance(slug: string): Fragrance | undefined {
  return fragrances.find((f) => f.slug === slug);
}

export interface FragranceFilter {
  audience?: Audience;
  occasion?: Occasion;
  family?: FragranceFamily;
}

/**
 * Unisex perfumes show under both "For him" and "For her", since they're
 * made for either.
 */
export function matchesFilter(f: Fragrance, filter: FragranceFilter): boolean {
  if (filter.audience && f.audience !== filter.audience && f.audience !== "unisex") return false;
  if (filter.occasion && !f.occasions.includes(filter.occasion)) return false;
  if (filter.family && f.family !== filter.family) return false;
  return true;
}

export function filterFragrances(list: readonly Fragrance[], filter: FragranceFilter) {
  return list.filter((f) => matchesFilter(f, filter));
}

/** Families in catalog order, each listed once. */
export function familiesOf(list: readonly Fragrance[]): FragranceFamily[] {
  return [...new Set(list.map((f) => f.family))];
}

/** Lowest price across a fragrance's variants, in minor units. */
export function startingPrice(fragrance: Fragrance): number {
  return Math.min(...fragrance.variants.map((v) => v.priceMinor));
}

/**
 * The sizes and prices shared by every fragrance, or undefined once any
 * perfume is priced differently. Lets copy say "every perfume is ₹599"
 * without that ever going stale.
 */
export function sharedVariants(list: readonly Fragrance[]): readonly Variant[] | undefined {
  const first = list[0];
  if (!first) return undefined;
  const key = (f: Fragrance) => JSON.stringify(f.variants);
  return list.every((f) => key(f) === key(first)) ? first.variants : undefined;
}

export interface ResolvedGiftPick {
  title: string;
  reason: string;
  fragrance: Fragrance;
}

/** Gift guide picks with their products attached; picks for missing products are dropped. */
export async function getGiftPicks(): Promise<readonly ResolvedGiftPick[]> {
  return giftPicks.flatMap(({ slug, ...pick }) => {
    const fragrance = findFragrance(slug);
    return fragrance ? [{ ...pick, fragrance }] : [];
  });
}
