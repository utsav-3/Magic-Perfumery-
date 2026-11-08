"use client";

import { useState } from "react";
import { QtyStepper } from "@/components/cart/cart-drawer";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/format";
import type { Variant } from "@/types/fragrance";

export function AddToCart({
  slug,
  name,
  variants,
}: {
  slug: string;
  name: string;
  variants: readonly Variant[];
}) {
  const cart = useCart();
  const [sizeMl, setSizeMl] = useState(variants[0]?.sizeMl ?? 0);
  const [qty, setQty] = useState(1);
  const variant = variants.find((v) => v.sizeMl === sizeMl) ?? variants[0];
  if (!variant) return null;

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="eyebrow text-haze mb-3">Size</legend>
        <div className="flex flex-wrap gap-3">
          {variants.map((v) => (
            <label
              key={v.sizeMl}
              className="has-[:checked]:bg-night has-[:checked]:text-paper has-[:focus-visible]:outline-night ring-night/25 hover:ring-night cursor-pointer rounded-full px-5 py-3 text-sm ring-1 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2"
            >
              <input
                type="radio"
                name={`size-${slug}`}
                value={v.sizeMl}
                checked={v.sizeMl === sizeMl}
                onChange={() => setSizeMl(v.sizeMl)}
                className="sr-only"
              />
              {v.sizeMl} ml <span className="opacity-60">· {formatPrice(v.priceMinor)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-4">
        <QtyStepper label={name} qty={qty} onChange={setQty} min={1} />
        <button
          type="button"
          className="btn-primary flex-1"
          onClick={() => {
            cart.add(slug, variant.sizeMl, qty);
            setQty(1);
            cart.open();
          }}
        >
          Add to bag — {formatPrice(variant.priceMinor * qty)}
        </button>
      </div>
    </div>
  );
}
