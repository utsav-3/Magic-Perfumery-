"use client";

import { createContext, use, useMemo, useState, useSyncExternalStore } from "react";
import { cartStore } from "@/components/cart/cart-store";
import {
  addLine,
  itemCount,
  orderMessage,
  removeLine,
  resolveLines,
  setLineQty,
  subtotal,
  whatsappUrl,
  type ResolvedLine,
} from "@/lib/cart";
import { findFragrance } from "@/lib/catalog";

interface CartContextValue {
  lines: ResolvedLine[];
  count: number;
  subtotal: number;
  orderUrl: string;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, sizeMl: number, qty: number) => void;
  setQty: (slug: string, sizeMl: number, qty: number) => void;
  remove: (slug: string, sizeMl: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  children,
  brand,
  whatsappNumber,
}: {
  children: React.ReactNode;
  brand: string;
  whatsappNumber?: string;
}) {
  const raw = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<CartContextValue>(() => {
    const lines = resolveLines(raw, findFragrance);
    return {
      lines,
      count: itemCount(lines),
      subtotal: subtotal(lines),
      orderUrl: whatsappUrl(orderMessage(lines, brand), whatsappNumber),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add: (slug, sizeMl, qty) =>
        cartStore.set(addLine(cartStore.getSnapshot(), slug, sizeMl, qty)),
      setQty: (slug, sizeMl, qty) =>
        cartStore.set(setLineQty(cartStore.getSnapshot(), slug, sizeMl, qty)),
      remove: (slug, sizeMl) => cartStore.set(removeLine(cartStore.getSnapshot(), slug, sizeMl)),
    };
  }, [raw, isOpen, brand, whatsappNumber]);

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const ctx = use(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
