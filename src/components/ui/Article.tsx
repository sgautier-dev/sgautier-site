import Link from "next/link";
import type { ReactNode } from "react";
import { canonicalOrigin } from "@/lib/seo";
import { serializeJsonLd } from "@/lib/structured-data";

export function Breadcrumbs({
  current,
  parent,
}: {
  current: string;
  parent?: { label: string; href: string };
}) {
  const items = [{ label: "Accueil", href: "/" }, ...(parent ? [parent] : [])];
  return (
    <>
      <nav className="breadcrumbs" aria-label="Fil d’Ariane">
        {items.map((item) => (
          <span key={item.href}>
            <Link href={item.href}>{item.label}</Link>
            <span aria-hidden="true"> / </span>
          </span>
        ))}
        <span aria-current="page">{current}</span>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              ...items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.label,
                item: `${canonicalOrigin}${item.href}`,
              })),
              {
                "@type": "ListItem",
                position: items.length + 1,
                name: current,
              },
            ],
          }),
        }}
      />
    </>
  );
}
export function ArticleSection({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section className="article-section" id={id} data-reveal>
      <h2>{title}</h2>
      <div className="prose">{children}</div>
    </section>
  );
}
