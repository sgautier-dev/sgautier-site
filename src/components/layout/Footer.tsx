import Link from "next/link";
import { site } from "@/data/site";
export function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-top">
        <div>
          <Link className="footer-name" href="/">
            {site.name}
            <span className="identity-dot">.</span>
          </Link>
          <p>{site.descriptor}</p>
        </div>
        <nav aria-label="Services">
          <Link href="/services/developpement-web">
            Développement web sur mesure
          </Link>
          <Link href="/services/integration-outils-api">
            Intégration d’outils & API
          </Link>
          <Link href="/services/automatisation-processus">
            Automatisation des processus
          </Link>
        </nav>
        <nav aria-label="Profils professionnels">
          {site.profiles.map((profile) => (
            <a key={profile.name} href={profile.href}>
              {profile.name} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {site.name}. Tous droits réservés.
        </p>
        <nav aria-label="Informations légales">
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/confidentialite">Confidentialité</Link>
        </nav>
      </div>
    </footer>
  );
}
