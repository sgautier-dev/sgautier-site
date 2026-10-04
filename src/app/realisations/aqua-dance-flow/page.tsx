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
            "Aqua Dance Flow a besoin de présenter ses événements dans une interface cohérente tout en s’appuyant sur des informations gérées dans un service externe. L’intégration relie Eventbrite au site et prévoit un déclenchement de revalidation lorsque la source évolue."
          }
        </p>
      </PageIntro>
      <div className="case-hero project-aqua-dance-flow">
        <ProjectVisual name="Aqua Dance Flow" />
      </div>
      <div className="case-flow">
        <AdfEventFlow />
      </div>
      <ArticleSection title="Le besoin">
        <p>
          {
            "Les visiteurs doivent retrouver les informations utiles sur les événements : intitulé, dates, lieu, visuel et lien d’inscription. Lorsque ces informations existent déjà dans une plateforme dédiée, les recopier ailleurs crée une deuxième version à maintenir."
          }
        </p>
        <p>
          {
            "Mon intervention a consisté à relier cette source au site et à adapter ses données à la présentation attendue, plutôt que de demander au visiteur de naviguer entre des formats disparates."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Récupérer et présenter les bonnes informations">
        <p>
          {
            "Le site interroge l’API Eventbrite pour récupérer les événements d’une organisation. Les informations reçues sont transformées en un format utilisé par l’interface : noms, dates, images, localisation, lien et disponibilité lorsque celle-ci est fournie."
          }
        </p>
        <p>
          {
            "L’intégration prévoit également des valeurs de remplacement pour certains champs absents et traite les réponses qui ne correspondent pas au format attendu. Ces choix font partie du travail invisible derrière les cartes d’événements."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Déclencher une actualisation">
        <p>
          {
            "Le projet comporte une route de webhook destinée à déclencher la revalidation de la page événements. Le principe est de signaler qu’une source a changé afin que la présentation du site puisse être actualisée."
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
            "Le code prévoit également des événements personnalisés. L’objectif n’est donc pas de forcer toutes les informations dans un seul outil, mais de permettre au site de présenter les données utiles selon les sources réellement employées."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Ce que l’intégration démontre">
        <p>
          {
            "Ce projet montre comment une interface publique peut exploiter une API externe, transformer les données reçues et disposer d’un mécanisme d’actualisation. Il ne se limite pas à l’apparence du site : une partie essentielle de la solution organise la circulation des informations."
          }
        </p>
        <p>
          {
            "Aucun chiffre de gain de temps ou de performance n’est avancé ici sans mesure dédiée."
          }
        </p>
      </ArticleSection>
      <div className="case-stack">
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
