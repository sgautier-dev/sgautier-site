import type { MetadataRoute } from "next";
import { canonicalOrigin, isPublicRelease } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  return isPublicRelease
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${canonicalOrigin}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
