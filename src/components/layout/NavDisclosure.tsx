"use client";

import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const subscribe = () => () => {};

export function NavDisclosure({
  id,
  label,
  className,
  iconOnly = false,
  children,
}: {
  id: string;
  label: string;
  className: string;
  iconOnly?: boolean;
  children: ReactNode;
}) {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  function close(restoreFocus = false) {
    if (disclosure.current) disclosure.current.open = false;
    if (restoreFocus) trigger.current?.focus();
  }
  return (
    <details
      ref={disclosure}
      className={className}
      onToggle={(event) => setExpanded(event.currentTarget.open)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
      onClick={(event) => {
        if (event.target instanceof Element && event.target.closest("a"))
          close();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && disclosure.current?.open) {
          event.preventDefault();
          event.stopPropagation();
          close(true);
        }
      }}
    >
      <summary
        ref={trigger}
        aria-controls={id}
        aria-expanded={hydrated ? expanded : undefined}
      >
        <span className={iconOnly ? "sr-only" : undefined}>{label}</span>
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </summary>
      <div id={id}>{children}</div>
    </details>
  );
}
