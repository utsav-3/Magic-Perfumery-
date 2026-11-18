"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import type { Variant } from "@/types/fragrance";

const CONFIRM_MS = 900;
const OPEN_DELAY_MS = 350;

/** One button per size: adds one bottle, confirms the tap, then opens the bag. */
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
  const [added, setAdded] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const onAdd = (sizeMl: number) => {
    cart.add(slug, sizeMl, 1);
    setAdded(sizeMl);
    timers.current.forEach(clearTimeout);
    timers.current = [
      setTimeout(() => cart.open(), OPEN_DELAY_MS),
      setTimeout(() => setAdded(null), CONFIRM_MS),
    ];
  };

  return (
    <div role="group" aria-label={`Quick add ${name}`} className={`flex gap-1.5 ${className}`}>
      {variants.map((v) => (
        <button
          key={v.sizeMl}
          type="button"
          aria-label={`Add ${name}, ${v.sizeMl} ml, ${formatPrice(v.priceMinor)} to bag`}
          onClick={() => onAdd(v.sizeMl)}
          className="bg-paper/95 text-ink hover:bg-night hover:text-paper flex-1 px-2 py-2.5 text-[0.7rem] leading-tight font-medium tracking-wide shadow-sm backdrop-blur transition-[color,background-color,transform] active:scale-[0.97]"
        >
          {added === v.sizeMl ? (
            <span className="block py-1.5 text-xs">Added ✓</span>
          ) : (
            <>
              + {v.sizeMl} ml
              <span className="block font-normal opacity-70">{formatPrice(v.priceMinor)}</span>
            </>
          )}
        </button>
      ))}
    </div>
  );
}
