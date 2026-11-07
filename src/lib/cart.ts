import { formatPrice } from "@/lib/format";
import type { Fragrance, Variant } from "@/types/fragrance";

/** Pure bag logic. No React, no storage — easy to test and reuse. */

export interface CartLine {
  slug: string;
  sizeMl: number;
  qty: number;
}

export interface ResolvedLine extends CartLine {
  fragrance: Fragrance;
  variant: Variant;
  lineTotal: number;
}

export const MAX_QTY = 10;

const clamp = (qty: number) => Math.min(MAX_QTY, Math.max(0, Math.floor(qty)));
const same = (l: CartLine, slug: string, sizeMl: number) => l.slug === slug && l.sizeMl === sizeMl;

export function addLine(lines: readonly CartLine[], slug: string, sizeMl: number, qty = 1) {
  const existing = lines.find((l) => same(l, slug, sizeMl));
  if (!existing) return [...lines, { slug, sizeMl, qty: clamp(qty) }].filter((l) => l.qty > 0);
  return setLineQty(lines, slug, sizeMl, existing.qty + qty);
}

/** Set a line's quantity; 0 or less removes it. Capped at MAX_QTY. */
export function setLineQty(lines: readonly CartLine[], slug: string, sizeMl: number, qty: number) {
  const next = clamp(qty);
  return lines
    .map((l) => (same(l, slug, sizeMl) ? { ...l, qty: next } : l))
    .filter((l) => l.qty > 0);
}

export function removeLine(lines: readonly CartLine[], slug: string, sizeMl: number) {
  return lines.filter((l) => !same(l, slug, sizeMl));
}

export function itemCount(lines: readonly CartLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}

/** Parse stored JSON defensively; anything malformed is dropped. */
export function parseCart(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.flatMap((d) => {
      if (typeof d !== "object" || d === null) return [];
      const { slug, sizeMl, qty } = d as Record<string, unknown>;
      if (typeof slug !== "string" || typeof sizeMl !== "number" || typeof qty !== "number")
        return [];
      const q = clamp(qty);
      return q > 0 ? [{ slug, sizeMl, qty: q }] : [];
    });
  } catch {
    return [];
  }
}

/** Attach product data; lines for products or sizes that no longer exist are dropped. */
export function resolveLines(
  lines: readonly CartLine[],
  lookup: (slug: string) => Fragrance | undefined,
): ResolvedLine[] {
  return lines.flatMap((line) => {
    const fragrance = lookup(line.slug);
    const variant = fragrance?.variants.find((v) => v.sizeMl === line.sizeMl);
    if (!fragrance || !variant) return [];
    return [{ ...line, fragrance, variant, lineTotal: variant.priceMinor * line.qty }];
  });
}

export function subtotal(lines: readonly ResolvedLine[]) {
  return lines.reduce((sum, l) => sum + l.lineTotal, 0);
}

export function orderMessage(lines: readonly ResolvedLine[], brand: string) {
  const items = lines.map(
    (l) =>
      `• ${l.fragrance.name} — ${l.fragrance.concentration}, ${l.sizeMl} ml × ${l.qty} — ${formatPrice(l.lineTotal)}`,
  );
  return [
    `Hello ${brand}, I'd like to order:`,
    "",
    ...items,
    "",
    `Subtotal: ${formatPrice(subtotal(lines))}`,
  ].join("\n");
}

/** wa.me link. With no number, WhatsApp asks the customer to pick a chat. */
export function whatsappUrl(message: string, number?: string) {
  return `https://wa.me/${number ?? ""}?text=${encodeURIComponent(message)}`;
}
