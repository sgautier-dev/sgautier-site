import Link from "next/link";
import { navigation } from "@/data/site";
import { Button } from "@/components/ui/Primitives";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="identity">
          <span className="brand-mark" aria-hidden="true">
            s<span>g</span>
            <i />
          </span>
          <span>
            Sébastien{" "}
            <br />
            Gautier<span className="identity-dot">.</span>
            <span className="sr-only"> — Accueil</span>
          </span>
        </Link>
        <nav aria-label="Navigation principale" className="desktop-nav">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href="/contact" className="header-cta">
          Parler de mon besoin
        </Button>
        <MobileNav />
      </div>
    </header>
  );
}
