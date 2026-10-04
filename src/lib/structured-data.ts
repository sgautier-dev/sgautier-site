import { site } from "@/data/site";
import { canonicalOrigin } from "./seo";

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
export const identityGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${canonicalOrigin}/#person`,
      name: site.name,
      url: canonicalOrigin,
      sameAs: site.profiles.map((profile) => profile.href),
    },
    {
      "@type": "WebSite",
      "@id": `${canonicalOrigin}/#website`,
      name: site.name,
      url: canonicalOrigin,
      inLanguage: "fr-FR",
      publisher: { "@id": `${canonicalOrigin}/#person` },
    },
  ],
};
