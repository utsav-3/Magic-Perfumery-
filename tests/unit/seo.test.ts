import { describe, expect, it } from "vitest";
import { robotsMeta, robotsRules } from "@/lib/seo";

describe("robotsRules", () => {
  it("lets crawlers in and points to the sitemap when indexing is on", () => {
    expect(robotsRules(true)).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: expect.stringMatching(/\/sitemap\.xml$/),
    });
  });

  it("blocks every crawler when indexing is off", () => {
    expect(robotsRules(false)).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });
});

describe("robotsMeta", () => {
  it("asks search engines to index when on", () => {
    expect(robotsMeta(true)).toEqual({ index: true, follow: true });
  });

  it("asks search engines to stay away when off", () => {
    expect(robotsMeta(false)).toEqual({ index: false, follow: false });
  });
});
