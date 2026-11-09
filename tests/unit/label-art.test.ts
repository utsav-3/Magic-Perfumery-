import { describe, expect, it } from "vitest";
import { LABEL_ASPECT, labelSvg } from "@/components/product/label-art";
import { findFragrance } from "@/lib/catalog";

const softDove = findFragrance("soft-dove")!;

describe("labelSvg", () => {
  it("draws Soft Dove's label flat, in its own colours", () => {
    const svg = labelSvg(softDove);
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain('viewBox="0 0 1024 512"');
    expect(svg).toContain("SOFT DOVE");
    expect(svg).toContain("#fcfbfd");
    expect(svg).toContain("#c25fc0");
    expect(LABEL_ASPECT).toBe(2);
  });

  it("escapes names so the SVG stays valid", () => {
    expect(labelSvg({ ...softDove, name: "A & B" })).toContain("A &amp; B");
  });
});
