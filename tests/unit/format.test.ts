import { describe, expect, it } from "vitest";
import { formatPrice } from "@/lib/format";

describe("formatPrice", () => {
  it("formats paise as whole rupees with Indian digit grouping", () => {
    expect(formatPrice(480000)).toBe("₹4,800");
    expect(formatPrice(11500000)).toBe("₹1,15,000");
  });
});
