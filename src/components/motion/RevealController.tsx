"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function RevealController() {
  const pathname = usePathname();
  const revealed = useRef(new WeakSet<HTMLElement>());

  useEffect(() => {
    const root = document.getElementById("contenu");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (
      !root ||
      preference.matches ||
      typeof IntersectionObserver === "undefined" ||
      typeof Element.prototype.animate !== "function"
    )
      return;

    const elements = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const animations = new Map<HTMLElement, Animation>();

    function startSignal(element: HTMLElement) {
      if (element.dataset.reveal === "hero-diagram" && !preference.matches)
        element.dataset.workflowActive = "";
    }

    function reveal(element: HTMLElement) {
      if (revealed.current.has(element)) return;
      revealed.current.add(element);
      // Navigation and keyboard focus take priority over an entrance effect.
      if (
        element.matches(":target") ||
        element.contains(document.activeElement)
      ) {
        startSignal(element);
        return;
      }

      const copy = element.dataset.reveal === "hero-copy";
      const distance = copy
        ? 12
        : element.dataset.reveal === "visual"
          ? 28
          : 24;
      const delay = Math.min(
        360,
        Math.max(0, Number(element.dataset.revealDelay) || 0),
      );
      const animation = element.animate(
        // SSR content is already visible: never lower its opacity on entry.
        [{ transform: `translateY(${distance}px)` }, { transform: "none" }],
        {
          id: "block-reveal",
          duration: copy ? 500 : 650,
          delay: copy ? 0 : delay,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          iterations: 1,
          fill: "backwards",
        },
      );
      animations.set(element, animation);
      animation.onfinish = () => {
        animations.delete(element);
        animation.cancel();
        startSignal(element);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            observer.unobserve(entry.target);
            reveal(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px 48px 0px", threshold: 0 },
    );

    for (const element of elements) {
      if (revealed.current.has(element)) continue;
      // The home H1 never waits for visibility observation or fades out.
      if (element.dataset.reveal === "hero-copy") reveal(element);
      else observer.observe(element);
    }

    function onFocus(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("[data-reveal]");
      if (!element) return;
      observer.unobserve(element);
      revealed.current.add(element);
      animations.get(element)?.cancel();
      animations.delete(element);
      startSignal(element);
    }

    function stop() {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      elements.forEach((element) => delete element.dataset.workflowActive);
    }

    function onPreferenceChange() {
      if (!preference.matches) return;
      stop();
      // Switching the preference back must not replay already visible content.
      elements.forEach((element) => revealed.current.add(element));
    }

    root.addEventListener("focusin", onFocus);
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      stop();
      root.removeEventListener("focusin", onFocus);
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, [pathname]);

  return null;
}
