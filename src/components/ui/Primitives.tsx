import Link from "next/link";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function Container({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={clsx("container", className)} {...props} />;
}

type ButtonProps = { secondary?: boolean } & (
  | ComponentPropsWithoutRef<typeof Link>
  | (ComponentPropsWithoutRef<"button"> & { href?: undefined })
);
export function Button({
  secondary,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = clsx("button", secondary && "button-secondary", className);
  if (props.href !== undefined)
    return (
      <Link {...props} className={classes}>
        {children}
        <Arrow />
      </Link>
    );
  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}
export function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
export function TextLink({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link {...props} className="text-link">
      {children}
      <Arrow />
    </Link>
  );
}
export function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-intro">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <div className="lead">{children}</div>}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children && <div className="lead">{children}</div>}
    </div>
  );
}
export function TagList({ items }: { items: readonly string[] }) {
  return (
    <ul className="tags" aria-label="Caractéristiques">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
export function PlusGrid({ children }: { children: ReactNode }) {
  return <div className="plus-grid">{children}</div>;
}
export function CallToAction({
  children,
  href = "/contact",
}: {
  children: ReactNode;
  href?: string;
}) {
  return (
    <div className="closing-cta">
      <p className="eyebrow">La suite, ensemble</p>
      <TextLink href={href}>{children}</TextLink>
    </div>
  );
}
