import Link from "next/link";
import { navigation, serviceNavigation } from "@/data/site";
import { NavDisclosure } from "./NavDisclosure";

export function MobileNav() {
  return (
    <NavDisclosure id="mobile-links" label="Menu" className="mobile-nav">
      <nav aria-label="Navigation mobile">
        <Link href="/services">Services</Link>
        <ul className="mobile-service-links">
          {serviceNavigation.slice(1).map((service) => (
            <li key={service.href}>
              <Link href={service.href}>{service.label}</Link>
            </li>
          ))}
        </ul>
        {navigation.slice(1).map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link className="mobile-cta" href="/contact">
          Parler de mon besoin <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </NavDisclosure>
  );
}
