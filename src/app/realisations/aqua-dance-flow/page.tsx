import {
  Container,
  PageIntro,
  CallToAction,
  TagList,
} from "@/components/ui/Primitives";
import { Breadcrumbs, ArticleSection } from "@/components/ui/Article";
import { getMetadata } from "@/lib/seo";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { AdfEventFlow } from "@/components/diagrams/Workflow";
export const metadata = getMetadata("/realisations/aqua-dance-flow");
export default function Page() {
  return (
    <Container>
      <Breadcrumbs
        current="Aqua Dance Flow"
        parent={{ label: "Réalisations", href: "/realisations" }}
      />
      <PageIntro
        eyebrow="Développement web · Intégration API"
        title="Connecter la gestion des événements au site sans maintenir deux fois les mêmes données."
      >
        <p>
          {
            "L’intégration relie les événements gérés dans Eventbrite à leur présentation sur le site Aqua Dance Flow. Un webhook distinct permet de déclencher l’actualisation de la page événements."
          }
        </p>
      </PageIntro>
      <div className="case-hero project-aqua-dance-flow" data-reveal>
        <ProjectVisual name="Aqua Dance Flow" assetKey="adfEvents" />
      </div>
      <div className="case-flow" data-reveal>
        <AdfEventFlow />
      </div>
      <ArticleSection title="Le besoin">
        <p>
          {
            "Les visiteurs doivent retrouver l’intitulé, les dates, le lieu, le visuel et le lien d’inscription. Recopier ces informations depuis une plateforme dédiée crée une deuxième version à maintenir."
          }
        </p>
        <p>
          {
            "Mon intervention relie cette source au site et adapte les données à une présentation cohérente pour le visiteur."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Récupérer et présenter les bonnes informations">
        <p>
          {
            "Le site lit les événements d’une organisation via l’API Eventbrite et adapte les noms, dates, images, lieux, liens et disponibilités fournies au format de son interface."
          }
        </p>
        <p>
          {
            "Des valeurs de remplacement couvrent certains champs absents. Les réponses au format inattendu sont prises en compte dans le traitement."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Déclencher une actualisation">
        <p>
          {
            "Une route de webhook déclenche séparément la revalidation de la page événements lorsqu’un changement lui est signalé."
          }
        </p>
        <p>
          {
            "Il s’agit d’une mise à jour déclenchée par événement, et non de la promesse d’une synchronisation instantanée en continu. Le fonctionnement effectif dépend aussi de la configuration du service qui appelle ce webhook."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Garder un fonctionnement adapté au projet">
        <p>
          {
            "Le site prévoit aussi des événements personnalisés. Il peut ainsi présenter les informations utiles selon les sources réellement employées, sans tout imposer à Eventbrite."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Ce que l’intégration démontre">
        <p>
          {
            "Ce projet associe lecture d’une API, adaptation des données et actualisation de l’interface : les informations gérées ailleurs trouvent leur place dans le site."
          }
        </p>
      </ArticleSection>
      <div className="case-stack" data-reveal>
        <p className="eyebrow">Technologies</p>
        <TagList
          items={["Next.js", "TypeScript", "API Eventbrite", "Webhooks"]}
        />
      </div>
      <CallToAction href="/contact">
        Vos outils doivent échanger des informations ? Parlons-en.
      </CallToAction>
    </Container>
  );
}
