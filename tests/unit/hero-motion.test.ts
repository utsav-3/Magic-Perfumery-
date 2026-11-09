import { describe, expect, it } from "vitest";
import { bottleRotation, fallbackAfterContextLoss } from "@/components/home/hero-3d/hero-motion";

const still = { x: 0, y: 0 };

describe("bottleRotation", () => {
  it("is at rest at time zero with no scroll or pointer", () => {
    expect(bottleRotation(0, 0, still)).toEqual({ x: 0, y: 0 });
  });

  it("turns half way round after a full scroll through the hero", () => {
    expect(bottleRotation(0, 1, still).y).toBeCloseTo(Math.PI);
  });

  it("clamps scroll above 1", () => {
    expect(bottleRotation(0, 2, still)).toEqual(bottleRotation(0, 1, still));
  });

  it("clamps the pointer to [-1, 1]", () => {
    const r = bottleRotation(0, 0, { x: 5, y: -5 });
    expect(r.x).toBeCloseTo(-0.12);
    expect(r.y).toBeCloseTo(0.25);
  });

  it("idles at 0.35 rad per second", () => {
    expect(bottleRotation(2, 0, still).y).toBeCloseTo(0.7);
  });
});

describe("fallbackAfterContextLoss", () => {
  it("always returns to the drawn bottle", () => {
    expect(fallbackAfterContextLoss("3d", "lost")).toBe("svg");
    expect(fallbackAfterContextLoss("3d", "error")).toBe("svg");
    expect(fallbackAfterContextLoss("svg", "lost")).toBe("svg");
  });
});
