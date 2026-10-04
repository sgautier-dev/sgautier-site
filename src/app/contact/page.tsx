import { Suspense } from "react";
import { Container, PageIntro } from "@/components/ui/Primitives";
import { Breadcrumbs } from "@/components/ui/Article";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactIntent } from "@/components/contact/ContactIntent";
import { getContactConfig } from "@/lib/contact-config";
import { getMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = getMetadata("/contact");
export default function ContactPage() {
  return (
    <Container>
      <Breadcrumbs current="Contact" />
      <PageIntro
        eyebrow="Contact"
        title="Parlez-moi de ce qui vous fait perdre du temps."
      >
        <p>
          Décrivez simplement votre fonctionnement actuel, votre besoin ou la
          tâche que vous aimeriez simplifier. Vous n’avez pas besoin de savoir
          quelle technologie utiliser.
        </p>
        <p>
          Un site ou une application à créer ? Vous pouvez aussi m’en parler.
        </p>
      </PageIntro>
      <div className="contact-page">
        <div id="formulaire">
          <Suspense fallback={null}>
            <ContactIntent />
          </Suspense>
          <ContactForm available={getContactConfig() !== null} />
        </div>
        <aside className="contact-sidebar">
          <div>
            <h2>Vous préférez écrire directement ?</h2>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div>
            <h2>Vous pouvez commencer simplement.</h2>
            <p>
              Un message de quelques lignes suffit. Si le besoin mérite d’être
              approfondi, nous préciserons ensuite le processus, les contraintes
              et la meilleure façon d’avancer.
            </p>
          </div>
          <p className="geography">{site.geography}</p>
        </aside>
      </div>
    </Container>
  );
}
