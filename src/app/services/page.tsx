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
            "Le bon point de départ n’est pas une technologie, mais ce qui vous fait perdre du temps aujourd’hui. Selon le besoin, la meilleure réponse peut être de créer un outil, de connecter ceux que vous utilisez déjà ou d’automatiser quelques étapes."
          }
        </p>
      </PageIntro>
      <ArticleSection title="Concevoir le bon outil.">
        <p>
          {
            "Lorsque votre activité a besoin d’une interface ou d’une fonctionnalité qui n’existe pas sous la bonne forme, je développe une solution adaptée à votre façon de travailler. Cela peut être une application métier, un espace client, un formulaire avancé ou un site professionnel avec des fonctionnalités spécifiques."
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
            "Certaines tâches manuelles existent simplement parce que deux services ne communiquent pas. Je crée les connexions nécessaires pour faire circuler les bonnes informations au bon moment : entre un site et un CRM, un paiement et un accès, un CMS et un outil d’emailing, ou plusieurs sources de données."
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
            "Lorsqu’une tâche suit des règles suffisamment claires, elle peut souvent être préparée ou exécutée automatiquement. Je construis des workflows pour les documents, relances, notifications, classements, rapports ou transmissions de données."
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
