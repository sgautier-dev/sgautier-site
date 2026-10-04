import { afterEach, describe, expect, it, vi } from "vitest";
import { pageMetadata } from "@/data/metadata";
import { releaseBlockers } from "@/lib/release-readiness";
import releaseStatus from "../../docs/release-status.json";
import { featuredProjects, secondaryProjects } from "@/data/projects";
afterEach(() => vi.resetModules());

describe("SEO environment policy", () => {
  it("defaults to noindex and an empty sitemap", async () => {
    vi.stubEnv("SITE_RELEASE", "preview");
    const { getMetadata, canonicalOrigin } = await import("@/lib/seo");
    const sitemap = (await import("@/app/sitemap")).default;
    const robots = (await import("@/app/robots")).default;
    expect(canonicalOrigin).toBe("https://www.sgautier.dev");
    expect(getMetadata("/contact").robots).toEqual({
      index: false,
      follow: false,
    });
    expect(sitemap()).toEqual([]);
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });
  it("contains exactly thirteen canonical routes when release is approved", async () => {
    vi.stubEnv("SITE_RELEASE", "approved");
    const { getMetadata } = await import("@/lib/seo");
    const sitemap = (await import("@/app/sitemap")).default;
    const robots = (await import("@/app/robots")).default;
    expect(sitemap().map((page) => page.url)).toEqual(
      pageMetadata.map((page) => `https://www.sgautier.dev${page.route}`),
    );
    expect(sitemap()).toHaveLength(13);
    expect(sitemap().some((page) => "lastModified" in page)).toBe(false);
    expect(getMetadata("/").robots).toEqual({ index: true, follow: true });
    expect(robots().sitemap).toBe("https://www.sgautier.dev/sitemap.xml");
    expect(new Set(pageMetadata.map((page) => page.title)).size).toBe(13);
    expect(new Set(pageMetadata.map((page) => page.description)).size).toBe(13);
  });
  it("refuses an unsafe canonical origin", async () => {
    vi.stubEnv("SITE_URL", "https://user:password@example.com/path?preview=1");
    await expect(import("@/lib/seo")).rejects.toThrow();
  });
  it("escapes JSON-LD script terminators", async () => {
    const { serializeJsonLd } = await import("@/lib/structured-data");
    const malicious = { name: "</script><script>alert(1)</script>" };
    const encoded = serializeJsonLd(malicious);
    expect(encoded).not.toContain("<");
    expect(JSON.parse(encoded)).toEqual(malicious);
  });
});
it("keeps every known publication blocker active", () => {
  const blockers = releaseBlockers(releaseStatus, {}, () => true);
  expect(blockers).toContain(
    "Approval required: ownerPublicationAuthorization",
  );
  expect(blockers).toContain("Approval required: legalIdentityAndNotices");
  expect(blockers).toContain("Asset approval required: comptaProOverview");
  expect(blockers).toContain("Server configuration required: ARCJET_KEY");
});
it("requires approval evidence and actual assets, not a boolean alone", () => {
  const blockers = releaseBlockers(
    {
      approvals: { legal: { approved: true, evidence: "" } },
      assets: {
        portrait: {
          approved: true,
          evidence: "Owner approval pending verification",
          path: "src/images/missing.jpg",
          alternative: "",
        },
      },
    },
    {},
    () => false,
  );
  expect(blockers).toContain("Approval required: legal");
  expect(blockers).toContain("Missing or unsafe asset path: portrait");
});
it("keeps presentation, pilot and delivery status independent", () => {
  expect(featuredProjects).toHaveLength(3);
  expect(secondaryProjects).toHaveLength(4);
  expect(featuredProjects[0]).toMatchObject({
    kind: "personal-pilot",
    deliveryStatus: "pilot",
    featured: true,
    publicationApproved: false,
  });
  expect(secondaryProjects[0]).toMatchObject({
    deliveryStatus: "upcoming",
  });
  expect(secondaryProjects[0]?.externalUrl).toBeUndefined();
  expect(
    [...featuredProjects, ...secondaryProjects].some((project) =>
      /papangues|daf974|zencare/.test(project.slug),
    ),
  ).toBe(false);
});
