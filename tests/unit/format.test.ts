import { describe, expect, it } from "vitest";
import { formatPrice, formatSizes } from "@/lib/format";

describe("formatPrice", () => {
  it("formats paise as whole rupees with Indian digit grouping", () => {
    expect(formatPrice(59_900)).toBe("₹599");
    expect(formatPrice(11500000)).toBe("₹1,15,000");
  });
});

describe("formatSizes", () => {
  it("lists sizes as a sentence", () => {
    expect(
      formatSizes([
        { sizeMl: 50, priceMinor: 59_900 },
        { sizeMl: 100, priceMinor: 1_19_900 },
      ]),
    ).toBe("₹599 for 50 ml or ₹1,199 for 100 ml");
    expect(formatSizes([{ sizeMl: 50, priceMinor: 59_900 }])).toBe("₹599 for 50 ml");
    expect(formatSizes([])).toBe("");
  });
});
