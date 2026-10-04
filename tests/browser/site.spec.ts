import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import { pageMetadata } from "../../src/data/metadata";
import { testimonials } from "../../src/data/testimonials";
import { contactMessages } from "../../src/lib/contact-messages";

const headings = [
  "Moins de tâches répétitives. Plus de temps pour votre métier.",
  "Améliorer vos outils sans ajouter de complexité.",
  "Un outil web adapté à votre façon de travailler.",
  "Faites travailler vos outils ensemble.",
  "Automatisez ce qui vous éloigne de votre métier.",
  "Des solutions construites pour des problèmes réels.",
  "Simplifier la gestion financière sans perdre le contrôle.",
  "Connecter la gestion des événements au site sans maintenir deux fois les mêmes données.",
  "Automatiser la préparation d’une campagne sans automatiser la décision d’envoi.",
  "Ingénieur, développeur et entrepreneur.",
  "Parlez-moi de ce qui vous fait perdre du temps.",
  "Mentions légales",
  "Confidentialité et données personnelles",
];
const representativeRoutes = [
  "/",
  "/services/integration-outils-api",
  "/realisations/compta-pro",
  "/realisations/aqua-dance-flow",
  "/realisations/holistis",
  "/contact",
];

for (const [index, entry] of pageMetadata.entries()) {
  test(`page and SEO: ${entry.route}`, async ({ page }) => {
    const response = await page.goto(entry.route);
    expect(response?.status()).toBe(200);
    expect(response?.headers()["x-robots-tag"]).toContain("noindex");
    expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("[data-reveal] [data-reveal]")).toHaveCount(0);
    await expect(
      page.locator(
        ".breadcrumbs[data-reveal], footer [data-reveal], input[data-reveal]",
      ),
    ).toHaveCount(0);
    await expect(page.locator("h1")).toHaveText(headings[index]);
    await expect(page).toHaveTitle(entry.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      entry.description,
    );
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(new URL(canonical || "invalid").href).toBe(
      new URL(`https://www.sgautier.dev${entry.route}`).href,
    );
    await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute(
      "content",
      /noindex/,
    );
    const graphs = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(graphs.length).toBeGreaterThan(0);
    const data: unknown[] = graphs.map((graph) => JSON.parse(graph));
    expect(JSON.stringify(data)).toContain("https://www.sgautier.dev/#person");
    expect(JSON.stringify(data)).not.toMatch(/aggregateRating|LocalBusiness/);
    expect(await page.locator('a[href="#"]').count()).toBe(0);
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      expect(
        await image.evaluate(
          (element) =>
            element instanceof HTMLImageElement && element.naturalWidth > 0,
        ),
      ).toBe(true);
    }
  });
}

test("home editorial content, anchors and project restrictions", async ({
  page,
}) => {
  await page.goto("/");
  for (const id of [
    "contenu",
    "services",
    "realisations",
    "methode",
    "diagnostic",
    "temoignages",
    "contact",
  ])
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  for (const item of testimonials) {
    await expect(page.getByText(item.quote, { exact: true })).toBeVisible();
    await expect(page.getByText(item.name, { exact: true })).toBeVisible();
  }
  await expect(
    page.getByText("Projet personnel · Cas pilote", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Voir mes réalisations", exact: true })
    .click();
  await expect(page).toHaveURL(/#realisations$/);
  expect(
    await page
      .locator("#realisations")
      .evaluate((element) => element.getBoundingClientRect().top),
  ).toBeGreaterThan(80);
  await page.goto("/realisations");
  await expect(
    page.getByText("Refonte en cours de mise en ligne", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText(/Les Papangues|DAF974|ZenCare/)).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: /Voir le site refondu/ }),
  ).toHaveCount(0);
});

test("redirects, retired URLs, sitemap and robots", async ({ request }) => {
  for (const [old, destination] of [
    ["/about", "/a-propos"],
    ["/projects", "/realisations"],
    ["/uses", "/a-propos#outils"],
    ["/speaking", "/#temoignages"],
  ]) {
    const response = await request.get(old, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(destination);
  }
  for (const route of [
    "/articles",
    "/articles/meditation-framework-universel",
    "/feed.xml",
    "/thank-you",
    "/unknown-page",
    "/realisations/gestion-pro",
  ])
    expect((await request.get(route)).status()).toBe(404);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain(
    "<loc>",
  );
});

test("keyboard navigation and mobile disclosure", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Aller au contenu" }),
  ).toBeFocused();
  expect(
    await page
      .getByRole("link", { name: "Aller au contenu" })
      .evaluate((element) => getComputedStyle(element).outlineStyle),
  ).not.toBe("none");
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const menu = page.locator(".mobile-nav > summary");
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(
    page
      .getByRole("navigation", { name: "Navigation mobile" })
      .getByRole("link", { name: "Services", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Enter");
  await page
    .getByRole("navigation", { name: "Navigation mobile" })
    .getByRole("link", { name: "Parler de mon besoin" })
    .click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("real credential-free action validates and preserves fields", async ({
  page,
}) => {
  await page.goto("/contact?intent=diagnostic#formulaire");
  await expect(
    page.getByText("Votre demande · Diagnostic automatisation"),
  ).toBeVisible();
  await expect(page.getByLabel("Parlez-moi de votre besoin")).toHaveValue("");
  await page.getByRole("button", { name: /Envoyer ma demande/ }).click();
  const form = page.getByRole("form", { name: "Formulaire de contact" });
  await expect(form.getByRole("alert")).toContainText("Vérifiez");
  await expect(page.getByLabel("Nom", { exact: true })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await page.getByLabel("Nom", { exact: true }).fill("Test Person");
  await page.getByLabel("Email", { exact: true }).fill("test@example.com");
  await page
    .getByLabel("Parlez-moi de votre besoin")
    .fill("Synthetic local test, no delivery requested.");
  await page.getByRole("button", { name: /Envoyer ma demande/ }).click();
  await expect(form.getByRole("alert")).toHaveText(contactMessages.unavailable);
  await expect(page.getByLabel("Nom", { exact: true })).toHaveValue(
    "Test Person",
  );
  await expect(page.getByLabel("Parlez-moi de votre besoin")).toHaveValue(
    "Synthetic local test, no delivery requested.",
  );
  await expect(
    page.getByRole("link", { name: "contact@sgautier.dev", exact: true }),
  ).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
      "wcag22a",
      "wcag22aa",
    ])
    .options({ rules: { "label-content-name-mismatch": { enabled: true } } })
    .analyze();
  expect(results.violations).toEqual([]);
  await page.goto("/contact?intent=unsupported");
  await expect(
    page.getByText("Votre demande · Diagnostic automatisation"),
  ).toHaveCount(0);
});

test("no-JS content, native menu and safe form fallback", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(
    page.getByText(testimonials[0].quote, { exact: true }),
  ).toBeVisible();
  await page.locator(".mobile-nav > summary").click();
  await expect(
    page.getByRole("navigation", { name: "Navigation mobile" }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Navigation mobile" })
    .getByRole("link", { name: "Parler de mon besoin" })
    .click();
  await expect(
    page.getByText(/Le formulaire nécessite JavaScript/),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Envoyer ma demande/ }),
  ).toBeDisabled();
  await expect(page.getByLabel("Nom", { exact: true })).toBeDisabled();
  await expect(
    page.locator('a[href="mailto:contact@sgautier.dev"]').first(),
  ).toBeVisible();
  await context.close();
});

for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
  test(`responsive layouts and captures at ${width}px`, async ({ page }) => {
    await mkdir("artifacts/screenshots", { recursive: true });
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of representativeRoutes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      for (const image of await page.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveJSProperty("complete", true);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      await expect(page.locator("h1")).toBeVisible();
      const hiddenContent = await page
        .locator("h1, h2, h3, main p")
        .evaluateAll(
          (elements) =>
            elements.filter(
              (element) => getComputedStyle(element).opacity === "0",
            ).length,
        );
      expect(hiddenContent).toBe(0);
      const path = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
      await page.screenshot({
        path: `artifacts/screenshots/${path}-${width}.png`,
        fullPage: true,
      });
      if (width === 390 || width === 1440) {
        const result = await new AxeBuilder({ page })
          .withTags([
            "wcag2a",
            "wcag2aa",
            "wcag21a",
            "wcag21aa",
            "wcag22a",
            "wcag22aa",
          ])
          .options({
            rules: { "label-content-name-mismatch": { enabled: true } },
          })
          .analyze();
        expect(result.violations, JSON.stringify(result.violations)).toEqual(
          [],
        );
      }
    }
  });
}

test("200 percent text enlargement and reflow", async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 900 });
  for (const route of ["/", "/contact", "/realisations/compta-pro"]) {
    await page.goto(route);
    await page.addStyleTag({ content: "html { font-size: 200%; }" });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator("h1")).toBeVisible();
  }
});
