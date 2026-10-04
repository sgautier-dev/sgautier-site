import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { canonicalOrigin } from "@/lib/seo";
import { identityGraph, serializeJsonLd } from "@/lib/structured-data";
import "@/styles/tailwind.css";

const monaSans = localFont({
  src: "../fonts/Mona-Sans.var.woff2",
  display: "swap",
  weight: "200 900",
  style: "normal",
  variable: "--font-mona",
  fallback: ["Arial", "sans-serif"],
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
});

export const metadata: Metadata = { metadataBase: new URL(canonicalOrigin) };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={monaSans.variable}>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(identityGraph) }}
        />
      </body>
    </html>
  );
}
