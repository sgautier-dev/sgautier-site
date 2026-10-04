import type { MetadataRoute } from "next";
import { pageMetadata } from "@/data/metadata";
import { canonicalOrigin, isPublicRelease } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return isPublicRelease
    ? pageMetadata.map((page) => ({ url: `${canonicalOrigin}${page.route}` }))
    : [];
}
