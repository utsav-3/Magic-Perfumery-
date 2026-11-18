import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { robotsRules } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return robotsRules(env.NEXT_PUBLIC_ALLOW_INDEXING);
}
