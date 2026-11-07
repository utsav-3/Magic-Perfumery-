import { describe, expect, it } from "vitest";
import {
  addLine,
  itemCount,
  MAX_QTY,
  orderMessage,
  parseCart,
  removeLine,
  resolveLines,
  setLineQty,
  subtotal,
  whatsappUrl,
} from "@/lib/cart";
import { findFragrance } from "@/lib/catalog";

describe("bag lines", () => {
  it("merges the same product and size into one line", () => {
    let lines = addLine([], "marine-drive", 50);
    lines = addLine(lines, "marine-drive", 50, 2);
    lines = addLine(lines, "marine-drive", 100);
    expect(lines).toEqual([
      { slug: "marine-drive", sizeMl: 50, qty: 3 },
      { slug: "marine-drive", sizeMl: 100, qty: 1 },
    ]);
    expect(itemCount(lines)).toBe(4);
  });

  it("caps quantity and removes a line at zero", () => {
    const lines = addLine([], "alphonso", 50, 99);
    expect(lines[0]!.qty).toBe(MAX_QTY);
    expect(setLineQty(lines, "alphonso", 50, 0)).toEqual([]);
    expect(removeLine(lines, "alphonso", 50)).toEqual([]);
  });
});

describe("parseCart", () => {
  it("drops malformed storage instead of crashing", () => {
    expect(parseCart(null)).toEqual([]);
    expect(parseCart("not json")).toEqual([]);
    expect(parseCart('{"slug":"x"}')).toEqual([]);
    expect(
      parseCart(
        '[{"slug":"alphonso","sizeMl":50,"qty":2},{"slug":1},{"slug":"x","sizeMl":5,"qty":0}]',
      ),
    ).toEqual([{ slug: "alphonso", sizeMl: 50, qty: 2 }]);
  });
});

describe("pricing and order message", () => {
  const lines = resolveLines(
    [
      { slug: "marine-drive", sizeMl: 50, qty: 2 },
      { slug: "bhendi-bazaar", sizeMl: 12, qty: 1 },
      { slug: "discontinued", sizeMl: 50, qty: 1 },
      { slug: "alphonso", sizeMl: 999, qty: 1 },
    ],
    findFragrance,
  );

  it("drops products or sizes that no longer exist and totals the rest", () => {
    expect(lines.map((l) => l.slug)).toEqual(["marine-drive", "bhendi-bazaar"]);
    expect(subtotal(lines)).toBe(480000 * 2 + 650000);
  });

  it("writes a readable WhatsApp order", () => {
    const msg = orderMessage(lines, "Bombay Perfume");
    expect(msg).toContain("Hello Bombay Perfume");
    expect(msg).toContain("Marine Drive — Eau de Parfum, 50 ml × 2 — ₹9,600");
    expect(msg).toContain("Subtotal: ₹16,100");
  });

  it("builds wa.me links with and without a shop number", () => {
    expect(whatsappUrl("Hi & bye", "919876543210")).toBe(
      "https://wa.me/919876543210?text=Hi%20%26%20bye",
    );
    expect(whatsappUrl("Hi")).toBe("https://wa.me/?text=Hi");
  });
});
