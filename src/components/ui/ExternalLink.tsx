import type { ComponentPropsWithoutRef } from "react";

type ExternalLinkProps = Omit<
  ComponentPropsWithoutRef<"a">,
  "target" | "rel" | "href"
> & {
  href: string;
};

export function ExternalLink({ href, children, ...props }: ExternalLinkProps) {
  if (!/^https?:\/\//.test(href))
    throw new Error("ExternalLink requires an HTTP(S) destination.");
  return (
    <a {...props} href={href} target="_blank" rel="noopener">
      {children}{" "}
      <span className="external-arrow" aria-hidden="true">
        ↗
      </span>
      <span className="sr-only"> (ouvre un nouvel onglet)</span>
    </a>
  );
}
