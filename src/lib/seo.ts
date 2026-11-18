import type { Metadata, MetadataRoute } from "next";
import { env } from "@/lib/env";

/** robots.txt: closed to every crawler unless indexing is switched on. */
export function robotsRules(allowIndexing: boolean): MetadataRoute.Robots {
  return allowIndexing
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${env.NEXT_PUBLIC_SITE_URL}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}

/** The `robots` meta tag every page carries, from the same flag. */
export function robotsMeta(allowIndexing: boolean): Metadata["robots"] {
  return { index: allowIndexing, follow: allowIndexing };
}
