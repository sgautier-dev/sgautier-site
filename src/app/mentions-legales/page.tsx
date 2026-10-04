import { getFinalDocument } from "@/lib/publication";
import { FinalLegalDocument } from "@/components/ui/FinalLegalDocument";
import { Container, PageIntro } from "@/components/ui/Primitives";
import { Breadcrumbs, ArticleSection } from "@/components/ui/Article";
import { getMetadata } from "@/lib/seo";
export const metadata = getMetadata("/mentions-legales");
export default function LegalPage() {
  const finalDocument = getFinalDocument("legal");
  return (
    <Container>
      <Breadcrumbs current="Mentions légales" />
      <PageIntro eyebrow="Informations légales" title="Mentions légales" />
      {finalDocument ? (
        <FinalLegalDocument document={finalDocument} />
      ) : (
        <>
          <p className="draft-notice">
            Document de travail — informations à valider avant publication
          </p>
          <ArticleSection title="Éditeur du site">
            <p>Site professionnel de Sébastien Gautier.</p>
            <p className="draft-field">
              À compléter et valider : identité juridique de l’éditeur et
              dénomination de l’activité.
            </p>
          </ArticleSection>
          <ArticleSection title="Statut et identifiants de l’activité">
            <p className="draft-field">
              À compléter et valider : statut juridique, identifiants
              d’immatriculation et autres mentions applicables à l’activité.
            </p>
          </ArticleSection>
          <ArticleSection title="Responsable de publication">
            <p className="draft-field">
              À confirmer : identité et qualité du responsable de publication.
            </p>
          </ArticleSection>
          <ArticleSection title="Coordonnées professionnelles">
            <p>
              Contact :{" "}
              <a href="mailto:contact@sgautier.dev">contact@sgautier.dev</a>.
            </p>
            <p className="draft-field">
              À compléter et valider : adresse de publication et autres
              coordonnées professionnelles obligatoires selon la situation de
              l’éditeur.
            </p>
          </ArticleSection>
          <ArticleSection title="Hébergement">
            <p>Cette version est une prévisualisation locale.</p>
            <p className="draft-field">
              À compléter après choix et configuration de l’hébergement :
              identité, adresse et coordonnées de l’hébergeur. Aucun hébergement
              public n’a été activé pour cette version.
            </p>
          </ArticleSection>
          <ArticleSection title="Propriété intellectuelle et crédits">
            <p>
              La conception de ce site utilise des éléments de Tailwind Plus,
              adaptés pour ce projet, et la police Mona Sans de GitHub sous
              licence SIL Open Font License. Ces ressources restent soumises à
              leurs licences respectives.
            </p>
            <p className="draft-field">
              À valider : droits et crédits des photographies, captures et
              éléments des projets présentés. La reprise des contenus et des
              marques reste soumise aux droits de leurs titulaires.
            </p>
          </ArticleSection>
          <ArticleSection title="Contact">
            <p>
              Pour toute question relative au site :{" "}
              <a href="mailto:contact@sgautier.dev">contact@sgautier.dev</a>.
            </p>
          </ArticleSection>
        </>
      )}
    </Container>
  );
}
