import { JSDOM } from "jsdom";
import {
  assetRoutes,
  approvedAssetSchema,
  draftMarker,
} from "../src/lib/publication-schema.ts";

// Inspect rendered HTML, excluding framework scripts and inert templates.
export function renderedReleaseBlockers(html, route, status) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const blockers = [];
  document
    .querySelectorAll("script, style, template, noscript")
    .forEach((node) => node.remove());
  const text = document.body.textContent.replace(/\s+/g, " ");
  if (draftMarker.test(text)) blockers.push(`Draft marker rendered: ${route}`);
  if (
    document.querySelector(
      ".draft-notice, .draft-field, .project-placeholder, .preview-label",
    )
  )
    blockers.push(`Preview fallback rendered: ${route}`);
  if (
    !document.querySelector("h1") ||
    document.querySelectorAll("h1").length !== 1
  )
    blockers.push(`Expected one page heading: ${route}`);
  if (
    [...document.querySelectorAll('meta[name="robots"]')].some((meta) =>
      /noindex/.test(meta.content),
    )
  )
    blockers.push(`Preview indexing policy still active: ${route}`);
  for (const [key, routes] of Object.entries(assetRoutes)) {
    if (!routes.includes(route)) continue;
    const result = approvedAssetSchema.safeParse(status.assets[key]);
    const figure = document.querySelector(`[data-publication-asset="${key}"]`);
    if (!result.success || !figure) {
      blockers.push(`Approved asset not rendered: ${route} ${key}`);
      continue;
    }
    const asset = result.data;
    if (asset.path) {
      const image = figure.querySelector("img");
      const source = new URL(
        image?.getAttribute("src") || "/missing",
        "https://www.sgautier.dev",
      );
      const path = source.searchParams.get("url") || source.pathname;
      const expectedPath = asset.path.replace(/^public/, "");
      const matches =
        asset.path === "src/images/portrait-sebastien.jpg"
          ? /^\/_next\/static\/media\/portrait-sebastien\.[\w-]+\.jpg$/.test(
              path,
            )
          : path === expectedPath;
      if (
        !image ||
        !matches ||
        image.getAttribute("alt") !== asset.alt ||
        Number(image.getAttribute("width")) !== asset.width ||
        Number(image.getAttribute("height")) !== asset.height
      )
        blockers.push(
          `Approved image source or description mismatch: ${route} ${key}`,
        );
    } else if (!figure.textContent.includes(asset.alternative)) {
      blockers.push(`Approved alternative not rendered: ${route} ${key}`);
    }
  }
  if (
    ["/mentions-legales", "/confidentialite"].includes(route) &&
    !document.querySelector('[data-publication-document="final"]')
  )
    blockers.push(`Final legal document not rendered: ${route}`);
  dom.window.close();
  return blockers;
}
