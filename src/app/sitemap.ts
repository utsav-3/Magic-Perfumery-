import type { MetadataRoute } from "next";
import { getAllFragrances } from "@/lib/catalog";
import { env } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.NEXT_PUBLIC_SITE_URL;
  const fragrances = await getAllFragrances();
  return [
    { url: base, priority: 1 },
    { url: `${base}/fragrances`, priority: 0.8 },
    ...fragrances.map((f) => ({ url: `${base}/fragrances/${f.slug}`, priority: 0.6 })),
  ];
}
