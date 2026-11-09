"use client";

import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import type { Variant } from "@/types/fragrance";

/** Adds one of the featured size straight to the bag and opens it. */
export function HeroAdd({ slug, variant }: { slug: string; name: string; variant: Variant }) {
  const cart = useCart();
  return (
    <button
      type="button"
      className="btn-light"
      onClick={() => {
        cart.add(slug, variant.sizeMl, 1);
        cart.open();
      }}
    >
      Add {variant.sizeMl} ml — {formatPrice(variant.priceMinor)}
    </button>
  );
}
