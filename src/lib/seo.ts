import type { Metadata } from "next";
import { pageMetadata, type PageRoute } from "@/data/metadata";
import { z } from "zod";

const origin = z
  .url()
  .transform((value) => new URL(value))
  .refine(
    (url) =>
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash,
    "SITE_URL must be a clean HTTPS origin.",
  )
  .parse(process.env.SITE_URL || "https://www.sgautier.dev");
export const canonicalOrigin = origin.origin;
export const isPublicRelease = process.env.SITE_RELEASE === "approved";
export function getMetadata(route: PageRoute): Metadata {
  const entry = pageMetadata.find((page) => page.route === route);
  if (!entry) throw new Error("Unknown metadata route.");
  return {
    title: { absolute: entry.title },
    description: entry.description,
    alternates: { canonical: `${canonicalOrigin}${route}` },
    robots: { index: isPublicRelease, follow: isPublicRelease },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: "Sébastien Gautier",
      title: entry.title,
      description: entry.description,
      url: `${canonicalOrigin}${route}`,
      images: [
        {
          url: "/og/brand.png",
          width: 1200,
          height: 630,
          alt: "Sébastien Gautier — Concevoir. Connecter. Automatiser.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
      images: ["/og/brand.png"],
    },
  };
}
