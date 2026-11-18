import { describe, expect, it } from "vitest";
import { tiltFromPointer } from "@/components/product/tilt-math";

describe("tiltFromPointer", () => {
  it("is flat at the centre", () => {
    const { rx, ry } = tiltFromPointer(50, 50, 100, 100);
    expect(rx).toBeCloseTo(0);
    expect(ry).toBeCloseTo(0);
  });

  it("leans right at the right edge and up at the top edge", () => {
    expect(tiltFromPointer(100, 50, 100, 100).ry).toBeCloseTo(6);
    expect(tiltFromPointer(50, 0, 100, 100).rx).toBeCloseTo(6);
  });

  it("clamps to the maximum", () => {
    expect(tiltFromPointer(500, 50, 100, 100).ry).toBeCloseTo(6);
    expect(tiltFromPointer(-500, 50, 100, 100).ry).toBeCloseTo(-6);
  });

  it("never divides by an empty box", () => {
    expect(tiltFromPointer(10, 10, 0, 0)).toEqual({ rx: 0, ry: 0 });
  });
});
