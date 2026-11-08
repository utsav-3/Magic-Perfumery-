"use client";

import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import type { Variant } from "@/types/fragrance";

/** One button per size: adds one bottle and opens the bag. */
export function QuickAdd({
  slug,
  name,
  variants,
  className = "",
}: {
  slug: string;
  name: string;
  variants: readonly Variant[];
  className?: string;
}) {
  const cart = useCart();
  return (
    <div role="group" aria-label={`Quick add ${name}`} className={`flex gap-1.5 ${className}`}>
      {variants.map((v) => (
        <button
          key={v.sizeMl}
          type="button"
          aria-label={`Add ${name}, ${v.sizeMl} ml, ${formatPrice(v.priceMinor)} to bag`}
          onClick={() => {
            cart.add(slug, v.sizeMl, 1);
            cart.open();
          }}
          className="bg-paper/95 text-ink hover:bg-night hover:text-paper flex-1 px-2 py-2.5 text-[0.7rem] leading-tight font-medium tracking-wide shadow-sm backdrop-blur transition-colors"
        >
          + {v.sizeMl} ml
          <span className="block font-normal opacity-70">{formatPrice(v.priceMinor)}</span>
        </button>
      ))}
    </div>
  );
}
