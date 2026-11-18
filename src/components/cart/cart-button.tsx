"use client";

import { useCart } from "@/components/cart/cart-provider";

export function CartButton() {
  const { count, open } = useCart();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
      className="eyebrow hover:text-saffron inline-flex items-center gap-2 py-2 transition-colors"
    >
      Bag
      <span
        aria-hidden
        className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[0.65rem] tracking-normal transition-colors ${
          count > 0 ? "bg-saffron text-night-deep" : "ring-1 ring-current/40"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
