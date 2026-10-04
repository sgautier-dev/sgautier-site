import { test, expect, type Page, type Locator } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const evidence = process.env.EVIDENCE_DIRECTORY || "artifacts/reveal";

declare global {
  interface Window {
    revealAudit: {
      element: Element;
      animation: Animation;
      finishedAt: number | null;
    }[];
    signalAudit: { element: Element; startedAt: number; iterations: string }[];
  }
}

async function auditMotion(page: Page) {
  await page.addInitScript(() => {
    window.revealAudit = [];
    window.signalAudit = [];
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (frames, options) {
      const animation = animate.call(this, frames, options);
      if (animation.id === "block-reveal") {
        const record: Window["revealAudit"][number] = {
          element: this,
          animation,
          finishedAt: null,
        };
        window.revealAudit.push(record);
        animation.addEventListener("finish", () => {
          record.finishedAt = performance.now();
        });
      }
      return animation;
    };
    document.addEventListener("animationstart", (event) => {
      if (
        event.animationName === "workflow-pass" &&
        event.target instanceof Element
      )
        window.signalAudit.push({
          element: event.target,
          startedAt: performance.now(),
          iterations: getComputedStyle(event.target).animationIterationCount,
        });
    });
  });
}

async function settle(page: Page) {
  await page.evaluate(async () => {
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
    await Promise.all(
      document
        .getAnimations()
        .map((animation) => animation.finished.catch(() => {})),
    );
  });
}

async function visibleFinal(element: Locator) {
  await expect(element).toBeVisible();
  await expect(element).toHaveCSS("opacity", "1");
  await expect(element).toHaveCSS("transform", "none");
}

async function captureBlock(page: Page, selector: string, path: string) {
  // Capture at document coordinates so the sticky header cannot cover a block.
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  const clip = await page.locator(selector).evaluate((element) => {
    const { x, y, width, height } = element.getBoundingClientRect();
    return { x, y, width, height };
  });
  await page.screenshot({ path, fullPage: true, clip });
}

test("reveals are finite, staggered, released to CSS and never replay on scrolling", async ({
  page,
}) => {
  await auditMotion(page);
  await page.goto("/");
  await page
    .locator(".plus-grid")
    .evaluate((element) =>
      element.scrollIntoView({ block: "center", behavior: "instant" }),
    );
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          window.revealAudit.filter(
            ({ element, finishedAt }) =>
              element.matches(".plus-grid > article") && finishedAt !== null,
          ).length,
      ),
    )
    .toBe(4);
  const timings = await page.evaluate(() =>
    window.revealAudit
      .filter(({ element }) => element.matches(".plus-grid > article"))
      .map(({ animation }) => animation.effect?.getTiming()),
  );
  expect(timings.map((timing) => timing?.delay)).toEqual([0, 100, 200, 300]);
  for (const timing of timings)
    expect(timing).toMatchObject({
      duration: 500,
      iterations: 1,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    });
  for (const card of await page.locator(".plus-grid > article").all())
    await visibleFinal(card);
  expect(
    await page
      .locator(".plus-grid")
      .evaluate((element) => element.getAnimations({ subtree: true }).length),
  ).toBe(0);
  await page
    .locator(".hero")
    .evaluate((element) => element.scrollIntoView({ behavior: "instant" }));
  await settle(page);
  await page
    .locator(".plus-grid")
    .evaluate((element) => element.scrollIntoView({ behavior: "instant" }));
  await settle(page);
  expect(
    await page.evaluate(
      () =>
        window.revealAudit.filter(({ element }) =>
          element.matches(".plus-grid > article"),
        ).length,
    ),
  ).toBe(4);
  await expect(page.locator("#contact h2")).toHaveText(
    "Qu’aimeriez-vous créer, connecter ou automatiser ?",
  );
  await expect(page.getByLabel("Parlez-moi de votre besoin")).toBeVisible();
});

for (const width of [1440, 390]) {
  test(`hero copy stays opaque and the signal waits for the diagram at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    await auditMotion(page);
    await page.goto("/");
    await expect
      .poll(() =>
        page.evaluate(() =>
          window.revealAudit.some(({ element }) =>
            element.matches(".hero-copy"),
          ),
        ),
      )
      .toBe(true);
    expect(
      await page.evaluate(() =>
        window.revealAudit
          .find(({ element }) => element.matches(".hero-copy"))
          ?.animation.effect?.getTiming(),
      ),
    ).toMatchObject({ duration: 220, delay: 0, iterations: 1 });
    expect(
      await page.evaluate(() => {
        const effect = window.revealAudit.find(({ element }) =>
          element.matches(".hero-copy"),
        )?.animation.effect;
        return (
          effect instanceof KeyframeEffect &&
          effect.getKeyframes().every((frame) => frame.opacity === undefined)
        );
      }),
    ).toBe(true);
    await expect(page.locator(".hero-copy")).toHaveCSS("opacity", "1");
    if (width === 390) {
      expect(await page.evaluate(() => window.signalAudit.length)).toBe(0);
      await page.locator(".hero-diagram").scrollIntoViewIfNeeded();
    }
    await expect
      .poll(() => page.evaluate(() => window.signalAudit.length))
      .toBe(1);
    const sequence = await page.evaluate(() => {
      const diagram = window.revealAudit.find(({ element }) =>
        element.matches(".hero-diagram"),
      );
      return {
        finishedAt: diagram?.finishedAt,
        timing: diagram?.animation.effect?.getTiming(),
        signal: window.signalAudit.map(({ startedAt, iterations }) => ({
          startedAt,
          iterations,
        })),
      };
    });
    expect(sequence.timing).toMatchObject({
      duration: 500,
      delay: 100,
      iterations: 1,
    });
    expect(sequence.finishedAt).toEqual(expect.any(Number));
    expect(sequence.signal[0].iterations).toBe("1");
    expect(
      sequence.signal[0].startedAt - Number(sequence.finishedAt),
    ).toBeGreaterThanOrEqual(60);
    expect(
      sequence.signal[0].startedAt - Number(sequence.finishedAt),
    ).toBeLessThan(250);
    await settle(page);
    await visibleFinal(page.locator(".hero-diagram"));
    await page.locator("#services").scrollIntoViewIfNeeded();
    await page.locator(".hero-diagram").scrollIntoViewIfNeeded();
    await settle(page);
    expect(await page.evaluate(() => window.signalAudit.length)).toBe(1);
    await captureBlock(page, ".hero", `${evidence}/hero-${width}-after.png`);
  });
}

test("reduced motion and preference changes leave visible, static content", async ({
  page,
}) => {
  await auditMotion(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const selector of [
    ".hero-copy",
    ".hero-diagram",
    ".service-card",
    ".contact-copy",
  ]) {
    const element = page.locator(selector).first();
    await element.scrollIntoViewIfNeeded();
    await visibleFinal(element);
  }
  expect(await page.evaluate(() => window.revealAudit.length)).toBe(0);
  expect(await page.evaluate(() => window.signalAudit.length)).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect
    .poll(() => page.evaluate(() => window.revealAudit.length))
    .toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await visibleFinal(page.locator(".hero-copy"));
  await visibleFinal(page.locator(".hero-diagram"));
  await expect
    .poll(() => page.evaluate(() => document.getAnimations().length))
    .toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".signal-horizontal path")).toHaveCSS(
    "animation-name",
    "none",
  );
});

test("SSR reveals and native navigation remain visible without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/");
  for (const element of await page.locator("[data-reveal]").all())
    await visibleFinal(element);
  await page.locator(".service-connect .text-link").click();
  await expect(page).toHaveURL(/\/services\/integration-outils-api$/);
  for (const element of await page.locator("[data-reveal]").all())
    await visibleFinal(element);
  await context.close();
});

test("a client navigation registers the new page once without a document reload", async ({
  page,
}) => {
  await auditMotion(page);
  await page.goto("/");
  const timeOrigin = await page.evaluate(() => performance.timeOrigin);
  await page.locator(".service-connect .text-link").click();
  await expect(page).toHaveURL(/\/services\/integration-outils-api$/);
  expect(await page.evaluate(() => performance.timeOrigin)).toBe(timeOrigin);
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          window.revealAudit.filter(
            ({ element, finishedAt }) =>
              element.matches(".page-intro") && finishedAt !== null,
          ).length,
      ),
    )
    .toBe(1);
  await visibleFinal(page.locator(".page-intro"));
  await page.locator(".closing-cta").scrollIntoViewIfNeeded();
  await settle(page);
  await page.locator(".page-intro").scrollIntoViewIfNeeded();
  await settle(page);
  expect(
    await page.evaluate(
      () =>
        window.revealAudit.filter(({ element }) =>
          element.matches(".page-intro"),
        ).length,
    ),
  ).toBe(1);
});

test("unavailable animation APIs preserve the static site", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "IntersectionObserver", { value: undefined });
  });
  await page.goto("/");
  for (const element of await page.locator("[data-reveal]").all())
    await visibleFinal(element);
});

test("deep-linked blocks remain stationary and focused blocks finish immediately", async ({
  page,
}) => {
  await auditMotion(page);
  for (const route of [
    "/a-propos#outils",
    "/contact?intent=diagnostic#formulaire",
  ]) {
    await page.goto(route);
    await settle(page);
    await visibleFinal(page.locator(":target"));
    expect(
      await page.evaluate(() =>
        window.revealAudit.some(({ element }) => element.matches(":target")),
      ),
    ).toBe(false);
  }
  await page.goto("/");
  const card = page.locator(".service-connect");
  await card.evaluate((element) =>
    element.scrollIntoView({ behavior: "instant", block: "center" }),
  );
  await expect
    .poll(() => card.evaluate((element) => element.getAnimations().length))
    .toBe(1);
  await card.locator("a").focus();
  await visibleFinal(card);
  expect(await card.evaluate((element) => element.getAnimations().length)).toBe(
    0,
  );
  await expect(card.locator("a")).toBeFocused();
});

for (const reducedMotion of ["no-preference", "reduce"] as const) {
  for (const width of [1440, 390]) {
    test(`visual evidence ${width}px ${reducedMotion}`, async ({ page }) => {
      test.setTimeout(120_000);
      await mkdir(evidence, { recursive: true });
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ reducedMotion });
      for (const route of [
        "/",
        "/services/integration-outils-api",
        "/realisations/compta-pro",
      ]) {
        await page.goto(route);
        if (route === "/" && reducedMotion === "no-preference") {
          await page
            .locator(".hero-diagram")
            .evaluate((element) =>
              element.scrollIntoView({ block: "center", behavior: "instant" }),
            );
          await page.waitForFunction(() =>
            document
              .querySelector(".hero-diagram")
              ?.getAnimations()
              .some((animation) => animation.id === "block-reveal"),
          );
          await page.locator(".hero-diagram").evaluate((element) => {
            const animation = element
              .getAnimations()
              .find((item) => item.id === "block-reveal");
            if (animation) {
              animation.pause();
              animation.currentTime = 300;
            }
          });
          await page.screenshot({
            path: `${evidence}/hero-${width}-paused-at-300ms.png`,
          });
          await page
            .locator(".hero-diagram")
            .evaluate((element) =>
              element.getAnimations().forEach((animation) => animation.play()),
            );
        }
        for (const element of await page.locator("[data-reveal]").all()) {
          await element.evaluate((node) =>
            node.scrollIntoView({ block: "center", behavior: "instant" }),
          );
          await settle(page);
          await visibleFinal(element);
        }
        const slug =
          route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
        await page.evaluate(() =>
          window.scrollTo({ top: 0, behavior: "instant" }),
        );
        await page.screenshot({
          path: `${evidence}/${slug}-${width}-${reducedMotion}.png`,
          fullPage: true,
        });
        if (route === "/") {
          for (const selector of [
            ".problems",
            "#services",
            "#methode",
            ".about-preview",
            "#contact",
          ]) {
            await captureBlock(
              page,
              selector,
              `${evidence}/${selector.slice(1)}-${width}-${reducedMotion}.png`,
            );
          }
          await page.evaluate(() =>
            window.scrollTo({ top: 0, behavior: "instant" }),
          );
          const transition = await page
            .locator(".about-preview")
            .evaluate((element) => {
              const start = element.getBoundingClientRect();
              const end = document
                .getElementById("contact")
                ?.getBoundingClientRect();
              return {
                x: 0,
                y: start.y,
                width: window.innerWidth,
                height: (end?.bottom ?? start.bottom) - start.y,
              };
            });
          await page.screenshot({
            path: `${evidence}/about-contact-${width}-${reducedMotion}.png`,
            fullPage: true,
            clip: transition,
          });
        }
      }
    });
  }
}
