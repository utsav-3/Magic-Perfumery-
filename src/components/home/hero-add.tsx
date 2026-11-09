"use client";

import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import type { Variant } from "@/types/fragrance";

/** Adds one of the featured size straight to the bag and opens it. */
export function HeroAdd({ slug, name, variant }: { slug: string; name: string; variant: Variant }) {
  const cart = useCart();
  return (
    <button
      type="button"
      className="btn-light"
      aria-label={`Add ${name}, ${variant.sizeMl} ml, ${formatPrice(variant.priceMinor)} to bag`}
      onClick={() => {
        cart.add(slug, variant.sizeMl, 1);
        cart.open();
      }}
    >
      Add {variant.sizeMl} ml — {formatPrice(variant.priceMinor)}
    </button>
  );
}
