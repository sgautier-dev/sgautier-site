import { describe, expect, it } from "vitest";
import { renderedReleaseBlockers } from "../../scripts/rendered-release.mjs";
import { approvedAssetSchema } from "../../src/lib/publication-schema.ts";

const asset = {
  approved: true,
  evidence: "Synthetic unit fixture only",
  path: "public/images/test.svg",
  alternative: "",
  alt: "Synthetic test image",
  width: 800,
  height: 500,
};
const status = { assets: { comptaProOverview: asset, comptaProReview: asset } };
const image =
  '<img src="/images/test.svg" alt="Synthetic test image" width="800" height="500">';
const html = `<h1>Test</h1><figure data-publication-asset="comptaProOverview">${image}</figure><figure data-publication-asset="comptaProReview">${image}</figure>`;
const route = "/realisations/compta-pro";

describe("rendered publication gate", () => {
  it("does not mistake ordinary editorial language for a draft instruction", () => {
    expect(
      renderedReleaseBlockers(
        `${html}<p>Je vous aide à déterminer la solution.</p>`,
        route,
        status,
      ),
    ).toEqual([]);
  });
  it("accepts actual approved image bindings", () => {
    expect(renderedReleaseBlockers(html, route, status)).toEqual([]);
  });
  it("rejects approved flags when the page does not render the assets", () => {
    expect(renderedReleaseBlockers("<h1>Test</h1>", route, status)).toContain(
      `Approved asset not rendered: ${route} comptaProOverview`,
    );
  });
  it("rejects a different image source despite an approved manifest", () => {
    expect(
      renderedReleaseBlockers(
        html.replaceAll("/images/test.svg", "/images/wrong.svg"),
        route,
        status,
      ),
    ).toContain(
      `Approved image source or description mismatch: ${route} comptaProOverview`,
    );
  });
  it.each([
    "Document de travail",
    "À compléter",
    "À confirmer",
    "Capture du projet à intégrer avant publication",
    "Portrait existant · sélection à valider avant publication",
  ])("rejects the rendered draft marker %s", (marker) => {
    expect(
      renderedReleaseBlockers(`${html}<p>${marker}</p>`, route, status),
    ).toContain(`Draft marker rendered: ${route}`);
  });
  it("ignores inert framework scripts when checking visible draft copy", () => {
    expect(
      renderedReleaseBlockers(
        `${html}<script>"Document de travail"</script>`,
        route,
        status,
      ),
    ).toEqual([]);
  });
  it("supports an explicitly approved truthful alternative", () => {
    const alternative = {
      ...asset,
      path: "",
      alternative: "Synthetic alternative for this test only.",
    };
    const markup =
      '<h1>Test</h1><figure data-publication-asset="comptaProOverview"><p>Synthetic alternative for this test only.</p></figure>';
    const result = renderedReleaseBlockers(markup, route, {
      assets: { comptaProOverview: alternative, comptaProReview: asset },
    });
    expect(result).not.toContain(
      `Approved alternative not rendered: ${route} comptaProOverview`,
    );
    expect(result).toContain(
      `Approved asset not rendered: ${route} comptaProReview`,
    );
  });
  it("rejects missing final legal content and preview SEO", () => {
    expect(
      renderedReleaseBlockers(
        '<meta name="robots" content="noindex"><h1>Test</h1>',
        "/mentions-legales",
        status,
      ),
    ).toEqual([
      "Preview indexing policy still active: /mentions-legales",
      "Final legal document not rendered: /mentions-legales",
    ]);
  });
  it("requires usable image metadata and safe paths", () => {
    expect(approvedAssetSchema.safeParse({ ...asset, alt: "" }).success).toBe(
      false,
    );
    expect(approvedAssetSchema.safeParse({ ...asset, width: 0 }).success).toBe(
      false,
    );
    expect(
      approvedAssetSchema.safeParse({
        ...asset,
        path: "public/images/../../private.png",
      }).success,
    ).toBe(false);
    expect(
      approvedAssetSchema.safeParse({ ...asset, approved: false }).success,
    ).toBe(false);
  });
});
