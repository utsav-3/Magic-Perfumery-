"use client";

import { useEffect, useRef, useState } from "react";
import { QtyStepper } from "@/components/cart/cart-drawer";
import { useCart } from "@/components/cart/cart-provider";
import { StickyAddBar } from "@/components/product/sticky-add-bar";
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
  const mainButton = useRef<HTMLButtonElement>(null);
  const [pastButton, setPastButton] = useState(false);
  const variant = variants.find((v) => v.sizeMl === sizeMl) ?? variants[0];
  useEffect(() => {
    const el = mainButton.current;
    if (!el) return;
    // Show the bar once the button has scrolled up out of view (not while it is still below the fold).
    // A scroll check, not an IntersectionObserver: that misses jumps such as restored scroll positions.
    const check = () => setPastButton(el.getBoundingClientRect().bottom < 0);
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  if (!variant) return null;

  const addToBag = () => {
    cart.add(slug, variant.sizeMl, qty);
    setQty(1);
    cart.open();
  };

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
        <button ref={mainButton} type="button" className="btn-primary flex-1" onClick={addToBag}>
          Add to bag — {formatPrice(variant.priceMinor * qty)}
        </button>
      </div>
      <StickyAddBar
        name={name}
        priceLabel={formatPrice(variant.priceMinor * qty)}
        onAdd={addToBag}
        visible={pastButton}
      />
    </div>
  );
}
