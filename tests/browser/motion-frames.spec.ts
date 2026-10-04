import { test, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const evidence = process.env.EVIDENCE_DIRECTORY || "artifacts/reveal";
const scenes = [
  { name: "hero", route: "/", selector: ".hero" },
  { name: "problems", route: "/", selector: ".problems" },
  { name: "services", route: "/", selector: "#services" },
  { name: "projects", route: "/", selector: "#realisations" },
  { name: "method", route: "/", selector: "#methode" },
  {
    name: "internal",
    route: "/services/integration-outils-api",
    selector: ".article-section",
  },
];

declare global {
  interface Window {
    capturedMotion: {
      element: Element;
      animation: Animation;
      beforeOpacity: string;
    }[];
  }
}

for (const width of [1440, 390]) {
  test(`initial, intermediate and final motion frames at ${width}px`, async ({
    browser,
  }) => {
    test.setTimeout(90_000);
    await mkdir(evidence, { recursive: true });

    for (const scene of scenes) {
      // The unpaused tests record real timing. These stills inspect exact frames.
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        reducedMotion: "no-preference",
      });
      const capture = await context.newPage();
      await capture.addInitScript((selector) => {
        window.capturedMotion = [];
        const animate = Element.prototype.animate;
        Element.prototype.animate = function (frames, options) {
          const beforeOpacity = getComputedStyle(this).opacity;
          const animation = animate.call(this, frames, options);
          if (animation.id === "block-reveal" && this.closest(selector)) {
            animation.pause();
            animation.currentTime = 0;
            window.capturedMotion.push({
              element: this,
              animation,
              beforeOpacity,
            });
          }
          return animation;
        };
      }, scene.selector);
      await capture.goto(`http://127.0.0.1:3100${scene.route}`);
      await capture.evaluate(() => document.fonts.ready);
      await capture
        .locator(scene.selector)
        .first()
        .evaluate((element) =>
          window.scrollBy({
            top: element.getBoundingClientRect().top - 120,
            behavior: "instant",
          }),
        );
      await expect
        .poll(() => capture.evaluate(() => window.capturedMotion.length))
        .toBeGreaterThan(0);
      const phases = [];
      for (const time of [0, 300, 1200]) {
        const state = await capture.evaluate(async (time) => {
          for (const { animation } of window.capturedMotion)
            animation.currentTime = time;
          await new Promise(requestAnimationFrame);
          return window.capturedMotion.map(({ element, beforeOpacity }) => ({
            label: `${element.tagName}.${element.className}`,
            beforeOpacity,
            opacity: getComputedStyle(element).opacity,
            y: new DOMMatrixReadOnly(getComputedStyle(element).transform).m42,
          }));
        }, time);
        expect(state.length).toBeGreaterThan(0);
        for (const item of state) {
          expect(item.beforeOpacity).toBe("1");
          expect(item.opacity).toBe("1");
          if (time === 1200) expect(item.y).toBe(0);
        }
        phases.push({ time, state });
        await capture.screenshot({
          path: `${evidence}/frames-${scene.name}-${width}-${time}ms.png`,
        });
      }
      await writeFile(
        `${evidence}/frames-${scene.name}-${width}.json`,
        JSON.stringify(phases, null, 2),
      );
      await context.close();
    }
  });
}
