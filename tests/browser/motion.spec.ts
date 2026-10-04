import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";

test("hero signal is finite and leaves all content visible", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const path = page.locator(".signal-horizontal path");
  expect(
    await path.evaluate((element) => ({
      name: getComputedStyle(element).animationName,
      iterations: getComputedStyle(element).animationIterationCount,
    })),
  ).toEqual({ name: "workflow-pass", iterations: "1" });
  await expect
    .poll(() =>
      path.evaluate((element) =>
        element
          .getAnimations()
          .every((animation) => animation.playState === "finished"),
      ),
    )
    .toBe(true);
  await expect(page.locator(".flow-center strong")).toBeVisible();
  await expect(path).toHaveCSS("opacity", "0");
  await mkdir("artifacts/v2/batch-2", { recursive: true });
  await page.screenshot({ path: "artifacts/v2/batch-2/hero-normal-final.png" });
  await page.locator(".hero-actions .button").focus();
  await expect
    .poll(() =>
      page
        .locator(".hero-actions .button svg")
        .evaluate((element) => getComputedStyle(element).transform),
    )
    .toBe("matrix(1, 0, 0, 1, 3, 0)");
});

test("reduced motion removes the signal and arrow movement", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".signal-horizontal path")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".workflow-map")).toBeVisible();
  await page.locator(".hero-actions .button").focus();
  await expect(page.locator(".hero-actions .button svg")).toHaveCSS(
    "transform",
    "none",
  );
});

test("automation branches place human approval before action", async ({
  page,
}) => {
  await page.goto("/services/automatisation-processus");
  await expect(page.locator(".automation-trunk li")).toHaveText([
    "Entrée",
    "Traitement",
    "Condition",
  ]);
  await expect(
    page
      .getByRole("list", { name: "Parcours automatisable", exact: true })
      .locator("li"),
  ).toHaveText(["Action"]);
  await expect(
    page
      .getByRole("list", { name: "Parcours avec validation", exact: true })
      .locator("li"),
  ).toHaveText(["Validation humaine", "Action"]);
  await page
    .locator(".automation-diagram")
    .screenshot({ path: "artifacts/v2/batch-2/automation-branches.png" });
  await page.goto("/realisations/aqua-dance-flow");
  await expect(page.locator(".dual-flow figure")).toHaveCount(2);
  await expect(page.locator(".dual-flow figure").first()).toContainText(
    "Lecture API",
  );
  await expect(page.locator(".dual-flow figure").last()).toContainText(
    "Revalidation de /events",
  );
});
