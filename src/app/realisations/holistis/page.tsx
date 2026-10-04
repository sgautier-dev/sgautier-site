import {
  Container,
  PageIntro,
  CallToAction,
  TagList,
} from "@/components/ui/Primitives";
import { Breadcrumbs, ArticleSection } from "@/components/ui/Article";
import { getMetadata } from "@/lib/seo";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { HolistisNewsletterFlow } from "@/components/diagrams/Workflow";
export const metadata = getMetadata("/realisations/holistis");
export default function Page() {
  return (
    <Container>
      <Breadcrumbs
        current="Holistis"
        parent={{ label: "Réalisations", href: "/realisations" }}
      />
      <PageIntro
        eyebrow="CMS · Automatisation éditoriale"
        title="Automatiser la préparation d’une campagne sans automatiser la décision d’envoi."
      >
        <p>
          {
            "Holistis utilise Sanity pour gérer ses contenus. À partir des informations d’un article, un webhook peut préparer un brouillon de campagne Mailchimp. Le système prend en charge la préparation répétitive, tandis que la relecture et la décision d’envoi restent humaines."
          }
        </p>
      </PageIntro>
      <div className="case-hero project-holistis">
        <ProjectVisual name="Holistis" />
      </div>
      <div className="case-flow">
        <HolistisNewsletterFlow />
      </div>
      <ArticleSection title="Le besoin éditorial">
        <p>
          {
            "Préparer un contenu pour le site puis le reprendre dans une newsletter peut demander de recopier le titre, les images, le texte et le lien. Le besoin est de réutiliser les informations déjà disponibles sans obliger à reconstruire la campagne à chaque publication."
          }
        </p>
        <p>
          {
            "Mon intervention a porté sur la connexion entre la gestion de contenu et l’outil d’emailing, ainsi que sur la transformation du contenu dans un format adapté à la campagne."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Transformer un contenu en brouillon">
        <p>
          {
            "La route d’intégration reçoit les éléments utiles depuis Sanity. Le texte riche est converti en HTML, puis combiné au titre, aux images et au lien vers l’article pour construire le contenu de la campagne."
          }
        </p>
        <p>
          {
            "Le traitement utilise ensuite l’API Mailchimp pour créer une campagne et y placer ce contenu. Le résultat est un brouillon préparé dans l’outil d’emailing, pas un message envoyé automatiquement aux abonnés."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Conserver un point de contrôle">
        <p>
          {
            "La distinction entre préparer et envoyer est centrale. Le contenu peut être relu, adapté ou complété avant la diffusion. L’automatisation retire une partie du travail répétitif sans supprimer la décision éditoriale finale."
          }
        </p>
        <p>
          {
            "Ce modèle est aussi une façon de définir une limite utile à l’automatisation : le système prépare les éléments ; la personne responsable choisit quand et comment les publier."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Ce que ce projet démontre">
        <p>
          {
            "Ce cas relie un CMS à un service tiers, transforme des données éditoriales et prépare une action dans un autre outil. Il montre qu’une automatisation peut être utile sans exécuter tout le processus de bout en bout."
          }
        </p>
        <p>
          {
            "La fonctionnalité présentée est la génération du brouillon. L’activation des déclencheurs et leur configuration en production doivent être vérifiées séparément ; aucun volume de campagnes ni gain de temps chiffré n’est revendiqué ici."
          }
        </p>
      </ArticleSection>
      <div className="case-stack">
        <p className="eyebrow">Technologies</p>
        <TagList
          items={[
            "Next.js",
            "Sanity",
            "API Mailchimp",
            "Transformation de contenu",
          ]}
        />
      </div>
      <CallToAction href="/contact">
        Vous préparez régulièrement les mêmes contenus ? Parlons-en.
      </CallToAction>
    </Container>
  );
}
