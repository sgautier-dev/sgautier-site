import { test, expect } from "@playwright/test";

test("enlarged content remains readable and form/navigation remain usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 640, height: 900 });
  for (const route of [
    "/",
    "/services/automatisation-processus",
    "/contact",
    "/realisations/compta-pro",
  ]) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    const selector =
      route === "/contact" ? "label" : route === "/" ? ".flow-node" : "main p";
    const before = await page
      .locator(selector)
      .first()
      .evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
    await page.addStyleTag({ content: "html { font-size: 200%; }" });
    const after = await page
      .locator(selector)
      .first()
      .evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
    expect(after).toBeCloseTo(before * 2, 1);
    const clipped = await page.locator("main").evaluate((main) => {
      const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
      const failures: string[] = [];
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const parent = node.parentElement;
        if (
          !node.textContent?.trim() ||
          !parent ||
          parent.closest('[aria-hidden="true"], .sr-only, script, style')
        )
          continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const rect of range.getClientRects()) {
          if (!rect.width || !rect.height) continue;
          if (rect.left < -1 || rect.right > innerWidth + 1)
            failures.push(node.textContent.trim());
          for (
            let ancestor: HTMLElement | null = parent;
            ancestor && ancestor !== main;
            ancestor = ancestor.parentElement
          ) {
            const style = getComputedStyle(ancestor);
            const bounds = ancestor.getBoundingClientRect();
            if (
              ["hidden", "clip"].includes(style.overflowX) &&
              (rect.left < bounds.left - 1 || rect.right > bounds.right + 1)
            )
              failures.push(node.textContent.trim());
            if (
              ["hidden", "clip"].includes(style.overflowY) &&
              (rect.top < bounds.top - 1 || rect.bottom > bounds.bottom + 1)
            )
              failures.push(node.textContent.trim());
          }
        }
      }
      return [...new Set(failures)];
    });
    expect(clipped, route).toEqual([]);
  }
  await page.goto("/contact");
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  await page.getByLabel("Nom", { exact: true }).fill("Synthetic resize test");
  await page
    .getByLabel("Parlez-moi de votre besoin")
    .fill("Synthetic local resize verification only.");
  await page.getByRole("button", { name: /Envoyer ma demande/ }).click();
  await expect(
    page
      .getByRole("form", { name: "Formulaire de contact" })
      .getByRole("alert"),
  ).toBeFocused();
  await expect(page.getByLabel("Email", { exact: true })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await expect(page.getByLabel("Nom", { exact: true })).toHaveValue(
    "Synthetic resize test",
  );
  const trigger = page.locator(".mobile-nav summary");
  await trigger.click();
  await page
    .getByRole("navigation", { name: "Navigation mobile" })
    .getByRole("link", { name: "Développement web sur mesure" })
    .click();
  await expect(page).toHaveURL(/\/services\/developpement-web$/);
});
