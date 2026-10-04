import {
  Container,
  PageIntro,
  CallToAction,
  TextLink,
} from "@/components/ui/Primitives";
import { Breadcrumbs, ArticleSection } from "@/components/ui/Article";
import { getMetadata } from "@/lib/seo";
export const metadata = getMetadata("/services");
export default function Page() {
  return (
    <Container>
      <Breadcrumbs current="Services" />
      <PageIntro
        eyebrow="Services"
        title="Améliorer vos outils sans ajouter de complexité."
      >
        <p>
          {
            "Partons de ce qui vous fait perdre du temps. Selon le besoin, la réponse peut être de créer un outil, de connecter l’existant ou d’automatiser quelques étapes."
          }
        </p>
      </PageIntro>
      <ArticleSection title="Concevoir le bon outil.">
        <p>
          {
            "Application métier, espace client, formulaire avancé ou site professionnel : je développe les interfaces et fonctionnalités adaptées à votre activité."
          }
        </p>
        <p>
          {
            "Le sur-mesure peut aussi compléter un logiciel existant plutôt que le remplacer. L’objectif est de couvrir le besoin utile, sans vous imposer une plateforme disproportionnée."
          }
        </p>
        <TextLink href="/services/developpement-web">
          Découvrir le développement sur mesure
        </TextLink>
        <div className="service-proof">
          <p>Un exemple concret</p>
          <TextLink href="/realisations/compta-pro">
            Compta Pro · Projet personnel · Cas pilote
          </TextLink>
        </div>
      </ArticleSection>
      <ArticleSection title="Faire travailler vos outils ensemble.">
        <p>
          {
            "Je relie les services qui doivent échanger des informations : site et CRM, paiement et accès, CMS et emailing, ou plusieurs sources de données. Ces connexions évitent les ressaisies entre outils."
          }
        </p>
        <p>
          {
            "Nous vérifions d’abord les possibilités réelles des outils : accès disponibles, API, formats, droits et limites. Une intégration doit s’adapter à cet environnement, pas le contourner."
          }
        </p>
        <TextLink href="/services/integration-outils-api">
          Découvrir les intégrations
        </TextLink>
        <div className="service-proof">
          <p>Un exemple concret</p>
          <TextLink href="/realisations/aqua-dance-flow">
            Aqua Dance Flow · Intégration API
          </TextLink>
        </div>
      </ArticleSection>
      <ArticleSection title="Retirer les tâches répétitives du chemin.">
        <p>
          {
            "Documents, relances, notifications, classements, rapports : les étapes régies par des règles claires peuvent être préparées ou exécutées automatiquement."
          }
        </p>
        <p>
          {
            "Les décisions sensibles restent au bon endroit. Lorsque le contexte exige une validation humaine, le système prépare les éléments nécessaires avant de poursuivre."
          }
        </p>
        <TextLink href="/services/automatisation-processus">
          Découvrir l’automatisation des processus
        </TextLink>
        <div className="service-proof">
          <p>Un exemple concret</p>
          <TextLink href="/realisations/holistis">
            Holistis · Préparation de brouillons
          </TextLink>
        </div>
      </ArticleSection>
      <ArticleSection title="Vous n’avez pas besoin de choisir la solution technique.">
        <p>
          {
            "Montrez-moi simplement votre fonctionnement actuel et le point de friction. Nous déterminerons ensuite si le meilleur choix est de simplifier, connecter, automatiser ou développer quelque chose de spécifique."
          }
        </p>
      </ArticleSection>
      <CallToAction href="/contact">Parler de mon besoin</CallToAction>
    </Container>
  );
}
