import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const evidence = process.env.EVIDENCE_DIRECTORY || "artifacts/refinement";

test("desktop services disclosure uses ordinary links and keyboard dismissal", async ({
  page,
}) => {
  await page.goto("/");
  const navigation = page.getByRole("navigation", {
    name: "Navigation principale",
  });
  await expect(
    navigation.getByRole("link", { name: "Services", exact: true }),
  ).toHaveAttribute("href", "/services");
  await expect(navigation.locator('a[href="/contact"]')).toHaveCount(0);
  const trigger = page.locator(".services-disclosure summary");
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Tous les services", exact: true }),
  ).toBeFocused();
  await mkdir(evidence, { recursive: true });
  await page.screenshot({ path: `${evidence}/desktop-submenu.png` });
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await page
    .locator(".services-submenu")
    .getByRole("link", { name: "Intégration d’outils & API" })
    .click();
  await expect(page).toHaveURL(/\/services\/integration-outils-api$/);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("mobile services remain discoverable with one contact entry", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator(".mobile-nav summary").click();
  const navigation = page.getByRole("navigation", {
    name: "Navigation mobile",
  });
  await expect(navigation.locator('a[href="/contact"]')).toHaveCount(1);
  await expect(navigation.locator('a[href^="/services/"]')).toHaveCount(3);
  await mkdir(evidence, { recursive: true });
  await page.screenshot({ path: `${evidence}/mobile-menu.png` });
});

test("external destinations announce new tabs and footer restores general navigation", async ({
  page,
}) => {
  for (const route of ["/", "/realisations", "/contact"]) {
    await page.goto(route);
    for (const link of await page.locator('a[href^="https://"]').all()) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener");
      await expect(link).toContainText("ouvre un nouvel onglet");
    }
    await expect(
      page.locator('a[href^="/"][target], a[href^="mailto:"][target]'),
    ).toHaveCount(0);
    await expect(
      page
        .getByRole("navigation", { name: "Navigation de pied de page" })
        .getByRole("link"),
    ).toHaveCount(3);
  }
});

test("anchor targets stay just below the sticky header", async ({ page }) => {
  for (const width of [390, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [route, id] of [
      ["/#realisations", "realisations"],
      ["/a-propos#outils", "outils"],
      ["/contact?intent=diagnostic#formulaire", "formulaire"],
    ]) {
      await page.goto(route);
      await expect
        .poll(async () =>
          page.locator(`#${id}`).evaluate((element) => {
            const header = document.querySelector(".site-header");
            return (
              element.getBoundingClientRect().top -
              (header?.getBoundingClientRect().bottom ?? 0)
            );
          }),
        )
        .toBeGreaterThanOrEqual(0);
      const gap = await page
        .locator(`#${id}`)
        .evaluate(
          (element) =>
            element.getBoundingClientRect().top -
            (document.querySelector(".site-header")?.getBoundingClientRect()
              .bottom ?? 0),
        );
      expect(gap, `${width} ${route}`).toBeLessThanOrEqual(48);
    }
  }
});

test("desktop disclosure works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/");
  await page.locator(".services-disclosure summary").click();
  await page
    .getByRole("link", { name: "Tous les services", exact: true })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await context.close();
});

test("refined editorial copy preserves project boundaries", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: "Vos outils devraient alléger votre travail, pas le compliquer.",
    }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Tout ce qui peut être automatisé ne mérite pas forcément de l’être.",
      { exact: true },
    ),
  ).toHaveCount(1);
  await page.goto("/realisations/compta-pro");
  await expect(page.locator("h1")).toHaveText(
    "Simplifier la gestion financière sans perdre le contrôle.",
  );
  await expect(
    page.getByText(/Projet personnel · Cas pilote · Application métier/),
  ).toBeVisible();
  await expect(
    page.getByText(/Cette mise en place reste à venir/),
  ).toBeVisible();
  await expect(
    page.getByText(/Visual Budget, utilisée en lecture seule/),
  ).toBeVisible();
  await expect(
    page.getByText(
      /commande client présentée artificiellement|gain de temps chiffré/,
    ),
  ).toHaveCount(0);
  await page.goto("/realisations/aqua-dance-flow");
  await expect(
    page.getByText(/non de la promesse d’une synchronisation instantanée/),
  ).toBeVisible();
  await expect(page.getByText(/événements personnalisés/)).toBeVisible();
  await page.goto("/realisations/holistis");
  await expect(
    page.getByText(/L’intégration livrée pour Holistis/),
  ).toBeVisible();
  await expect(
    page.getByText(/aucun envoi automatique aux abonnés n’est déclenché/),
  ).toBeVisible();
  await expect(
    page.getByText(/doivent être vérifiées séparément|gain de temps chiffré/),
  ).toHaveCount(0);
});
