import { test, expect, type Page, type Locator } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const evidence = process.env.EVIDENCE_DIRECTORY || "artifacts/reveal";

declare global {
  interface Window {
    revealAudit: {
      element: Element;
      animation: Animation;
      createdAt: number;
      beforeOpacity: string;
      immediateOpacity: string;
      topBefore: number;
      viewportHeight: number;
      samples: { at: number; time: number; opacity: string; y: number }[];
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
      const beforeOpacity = getComputedStyle(this).opacity;
      const topBefore = this.getBoundingClientRect().top;
      const createdAt = performance.now();
      const animation = animate.call(this, frames, options);
      if (animation.id === "block-reveal") {
        const record: Window["revealAudit"][number] = {
          element: this,
          animation,
          createdAt,
          beforeOpacity,
          immediateOpacity: getComputedStyle(this).opacity,
          topBefore,
          viewportHeight: window.innerHeight,
          samples: [],
          finishedAt: null,
        };
        window.revealAudit.push(record);
        animation.addEventListener("finish", () => {
          record.finishedAt = performance.now();
        });
        const sample = () => {
          const style = getComputedStyle(this);
          record.samples.push({
            at: performance.now(),
            time:
              typeof animation.currentTime === "number"
                ? animation.currentTime
                : 0,
            opacity: style.opacity,
            y: new DOMMatrixReadOnly(style.transform).m42,
          });
          if (animation.playState === "running" || animation.pending)
            requestAnimationFrame(sample);
        };
        requestAnimationFrame(sample);
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

async function assertOpacityContinuity(page: Page, name: string) {
  const records = await page.evaluate(() =>
    window.revealAudit.map(({ element, animation, ...record }) => ({
      ...record,
      label: `${element.tagName}.${element.className}`,
      expectedDistance: element.matches(".hero-copy")
        ? 12
        : element.matches(
              ".plus-grid > article, .service-card, .project-card, .portrait, .case-hero, .case-flow, .secondary-projects > article",
            )
          ? 28
          : 24,
      timing: animation.effect?.getTiming(),
      keyframes:
        animation.effect instanceof KeyframeEffect
          ? animation.effect.getKeyframes()
          : [],
      transforms:
        animation.effect instanceof KeyframeEffect
          ? animation.effect.getKeyframes().map((frame) => {
              const matrix = new DOMMatrixReadOnly(String(frame.transform));
              return { y: matrix.m42, scaleX: matrix.a, scaleY: matrix.d };
            })
          : [],
    })),
  );
  expect(records.length).toBeGreaterThan(0);
  for (const record of records) {
    expect(record.beforeOpacity, record.label).toBe("1");
    expect(record.immediateOpacity, record.label).toBe("1");
    expect(record.transforms, record.label).toEqual([
      { y: record.expectedDistance, scaleX: 1, scaleY: 1 },
      { y: 0, scaleX: 1, scaleY: 1 },
    ]);
    expect(
      record.keyframes.every((frame) => frame.opacity === undefined),
      record.label,
    ).toBe(true);
    expect(
      record.samples.every((sample) => sample.opacity === "1"),
      record.label,
    ).toBe(true);
  }
  await mkdir(evidence, { recursive: true });
  await writeFile(
    `${evidence}/${name}-motion.json`,
    JSON.stringify(records, null, 2),
  );
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
  expect(timings.map((timing) => timing?.delay)).toEqual([0, 120, 240, 360]);
  for (const timing of timings)
    expect(timing).toMatchObject({
      duration: 650,
      iterations: 1,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    });
  const pacing = await page.evaluate(() =>
    window.revealAudit
      .filter(({ element }) => element.matches(".plus-grid > article"))
      .map(({ animation, createdAt, finishedAt, samples }) => {
        const delay = animation.effect?.getTiming().delay ?? 0;
        return {
          delay,
          elapsed: Number(finishedAt) - createdAt,
          startedAt: samples.find((sample) => sample.time >= delay)?.at,
          middle: samples.find(
            (sample) =>
              sample.time >= delay + 250 && sample.time <= delay + 350,
          ),
        };
      }),
  );
  for (const [index, record] of pacing.entries()) {
    expect(record.elapsed).toBeGreaterThanOrEqual(625 + record.delay);
    expect(record.elapsed).toBeLessThan(800 + record.delay);
    expect(record.middle?.opacity).toBe("1");
    expect(record.middle?.y).toBeGreaterThan(0);
    expect(record.middle?.y).toBeLessThan(28);
    if (index > 0) {
      const stagger =
        Number(record.startedAt) - Number(pacing[index - 1].startedAt);
      expect(stagger).toBeGreaterThanOrEqual(90);
      expect(stagger).toBeLessThanOrEqual(150);
    }
  }
  await assertOpacityContinuity(page, "live-problems");
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
    ).toMatchObject({ duration: 500, delay: 0, iterations: 1 });
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
      duration: 650,
      delay: 120,
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
    await assertOpacityContinuity(page, `live-hero-${width}`);
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

test("a reveal begins just before viewport entry and is still moving on entry", async ({
  page,
}) => {
  await auditMotion(page);
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect
    .poll(() => page.evaluate(() => window.revealAudit.length))
    .toBeGreaterThan(0);
  const card = page.locator(".service-build");
  await card.evaluate((element) =>
    window.scrollBy({
      top: element.getBoundingClientRect().top - window.innerHeight - 24,
      behavior: "instant",
    }),
  );
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          window.revealAudit.filter(({ element }) =>
            element.matches(".service-build"),
          ).length,
      ),
    )
    .toBe(1);
  const distance = await page.evaluate(() => {
    const record = window.revealAudit.find(({ element }) =>
      element.matches(".service-build"),
    );
    return record ? record.topBefore - record.viewportHeight : null;
  });
  expect(distance).toBeGreaterThan(0);
  expect(distance).toBeLessThanOrEqual(48);
  await page.waitForFunction(() => {
    const animation = document
      .querySelector(".service-build")
      ?.getAnimations()[0];
    return (
      typeof animation?.currentTime === "number" && animation.currentTime >= 120
    );
  });
  await page.evaluate(() => window.scrollBy({ top: 120, behavior: "instant" }));
  expect(
    await card.evaluate(
      (element) => element.getBoundingClientRect().top < window.innerHeight,
    ),
  ).toBe(true);
  expect(
    await card.evaluate((element) =>
      element
        .getAnimations()
        .some((animation) => animation.playState === "running"),
    ),
  ).toBe(true);
  await settle(page);
  await assertOpacityContinuity(page, "early-viewport-entry");
});

for (const reducedMotion of ["no-preference", "reduce"] as const) {
  for (const width of [1440, 390]) {
    test(`visual evidence ${width}px ${reducedMotion}`, async ({ page }) => {
      test.setTimeout(120_000);
      await mkdir(evidence, { recursive: true });
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ reducedMotion });
      await auditMotion(page);
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
        if (reducedMotion === "no-preference")
          await assertOpacityContinuity(page, `${slug}-${width}`);
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
            "#realisations",
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
