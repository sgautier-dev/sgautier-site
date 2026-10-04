"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { navigation } from "@/data/site";

const subscribe = () => () => {};

export function MobileNav() {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  function close(restoreFocus = false) {
    if (disclosure.current) disclosure.current.open = false;
    if (restoreFocus) trigger.current?.focus();
  }
  return (
    <details
      ref={disclosure}
      className="mobile-nav"
      onToggle={(event) => setExpanded(event.currentTarget.open)}
      onKeyDown={(event) => {
        if (event.key === "Escape" && disclosure.current?.open) {
          event.preventDefault();
          close(true);
        }
      }}
    >
      <summary
        ref={trigger}
        aria-controls="mobile-links"
        aria-expanded={hydrated ? expanded : undefined}
      >
        <span>Menu</span>
        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </summary>
      <nav id="mobile-links" aria-label="Navigation mobile">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => close()}>
            {item.label}
          </Link>
        ))}
        <Link className="mobile-cta" href="/contact" onClick={() => close()}>
          Parler de mon besoin <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </details>
  );
}
