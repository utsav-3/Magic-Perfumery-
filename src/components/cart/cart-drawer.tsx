"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { Bottle } from "@/components/product/bottle";
import { labelTint } from "@/components/product/tint";
import { MAX_QTY } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

/** Slide-in bag built on <dialog>: focus trap, Escape and inert page come free. */
export function CartDrawer() {
  const cart = useCart();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (cart.isOpen && !dialog.open) dialog.showModal();
    if (!cart.isOpen && dialog.open) dialog.close();
  }, [cart.isOpen]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="bag-title"
      onClose={cart.close}
      onClick={(e) => e.target === e.currentTarget && cart.close()}
      className="bag-dialog bg-paper text-ink m-0 ml-auto h-dvh max-h-dvh w-full max-w-md p-0"
    >
      <div className="flex h-full flex-col">
        <header className="border-night/10 flex items-center justify-between border-b px-6 py-5">
          <h2 id="bag-title" className="text-3xl">
            Your bag
          </h2>
          <button type="button" onClick={cart.close} className="eyebrow text-haze hover:text-ink">
            Close
          </button>
        </header>

        {cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="font-display text-2xl">Your bag is empty.</p>
            <Link href="/fragrances" onClick={cart.close} className="btn-primary">
              Shop all perfumes
            </Link>
          </div>
        ) : (
          <>
            <ul className="divide-night/10 flex-1 divide-y overflow-y-auto px-6">
              {cart.lines.map((line) => (
                <li key={`${line.slug}-${line.sizeMl}`} className="flex gap-4 py-5">
                  <div
                    className="grid h-24 w-20 shrink-0 place-items-center"
                    style={{ background: labelTint(line.fragrance.label) }}
                  >
                    <Bottle
                      id={`bag-${line.slug}`}
                      name={line.fragrance.name}
                      label={line.fragrance.label}
                      className="h-20"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-baseline justify-between gap-3">
                      <Link
                        href={`/fragrances/${line.slug}`}
                        onClick={cart.close}
                        className="font-display text-lg font-semibold hover:underline"
                      >
                        {line.fragrance.name}
                      </Link>
                      <span className="text-sm">{formatPrice(line.lineTotal)}</span>
                    </div>
                    <p className="text-haze text-sm">{line.sizeMl} ml</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QtyStepper
                        label={line.fragrance.name}
                        qty={line.qty}
                        onChange={(q) => cart.setQty(line.slug, line.sizeMl, q)}
                      />
                      <button
                        type="button"
                        onClick={() => cart.remove(line.slug, line.sizeMl)}
                        className="text-haze hover:text-ink text-xs underline-offset-4 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-night/10 space-y-4 border-t px-6 py-6">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow">Subtotal</span>
                <span className="text-xl font-medium tabular-nums">
                  {formatPrice(cart.subtotal)}
                </span>
              </div>
              <p className="text-haze text-sm">
                Your order opens in WhatsApp, written out and ready to send. We reply to confirm
                stock, delivery and payment.
              </p>
              <a
                href={cart.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                Order on WhatsApp
              </a>
            </footer>
          </>
        )}
      </div>
    </dialog>
  );
}

export function QtyStepper({
  qty,
  label,
  onChange,
  min = 0,
}: {
  qty: number;
  label: string;
  onChange: (qty: number) => void;
  min?: number;
}) {
  const btn =
    "grid h-8 w-8 place-items-center rounded-full text-lg leading-none transition-colors hover:bg-night/5 disabled:opacity-30 disabled:hover:bg-transparent";
  return (
    <div className="ring-night/20 inline-flex items-center rounded-full px-1 ring-1">
      <button
        type="button"
        className={btn}
        onClick={() => onChange(qty - 1)}
        disabled={qty <= min}
        aria-label={`Decrease quantity of ${label}`}
      >
        −
      </button>
      <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(qty + 1)}
        disabled={qty >= MAX_QTY}
        aria-label={`Increase quantity of ${label}`}
      >
        +
      </button>
    </div>
  );
}
