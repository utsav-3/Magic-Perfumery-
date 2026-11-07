import { fragrances } from "@/content/fragrances";
import { origins, type Origin } from "@/content/origins";
import type { Fragrance, FragranceFamily } from "@/types/fragrance";

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

/** Up to `limit` other fragrances, same family first. */
export async function getRelatedFragrances(slug: string, limit = 3): Promise<readonly Fragrance[]> {
  const current = findFragrance(slug);
  if (!current) return [];
  const others = fragrances.filter((f) => f.slug !== slug);
  const sameFamily = others.filter((f) => f.family === current.family);
  const rest = others.filter((f) => f.family !== current.family);
  return [...sameFamily, ...rest].slice(0, limit);
}

export async function getOrigins(): Promise<readonly Origin[]> {
  return origins;
}

/** Synchronous lookup, for client code such as the bag. */
export function findFragrance(slug: string): Fragrance | undefined {
  return fragrances.find((f) => f.slug === slug);
}

/** Families in catalog order, each listed once. */
export function familiesOf(list: readonly Fragrance[]): FragranceFamily[] {
  return [...new Set(list.map((f) => f.family))];
}

/** Lowest price across a fragrance's variants, in minor units. */
export function startingPrice(fragrance: Fragrance): number {
  return Math.min(...fragrance.variants.map((v) => v.priceMinor));
}
