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
            "L’intégration livrée pour Holistis relie les contenus Sanity à la préparation d’un brouillon Mailchimp. Un webhook transmet les informations de l’article ; la relecture et la décision d’envoi restent humaines."
          }
        </p>
      </PageIntro>
      <div className="case-hero project-holistis" data-reveal="visual">
        <ProjectVisual name="Holistis" assetKey="holistisContent" />
      </div>
      <div className="case-flow" data-reveal="visual">
        <HolistisNewsletterFlow />
      </div>
      <ArticleSection title="Le besoin éditorial">
        <p>
          {
            "Reprendre un article dans une newsletter demande de recopier son titre, ses images, son texte et son lien. Le besoin : réutiliser ces informations pour préparer la campagne."
          }
        </p>
        <p>
          {
            "Mon intervention porte sur la connexion entre les deux outils et sur l’adaptation du contenu au format de la campagne."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Transformer un contenu en brouillon">
        <p>
          {
            "L’intégration reçoit les éléments depuis Sanity, convertit le texte riche en HTML et le combine au titre, aux images et au lien de l’article."
          }
        </p>
        <p>
          {
            "L’API Mailchimp permet ensuite de créer la campagne et d’y placer ce contenu. Le résultat est un brouillon ; aucun envoi automatique aux abonnés n’est déclenché."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Conserver un point de contrôle">
        <p>
          {
            "Le brouillon peut être relu, adapté ou complété avant diffusion. La préparation répétitive est prise en charge ; la décision éditoriale reste humaine."
          }
        </p>
        <p>
          {
            "La personne responsable conserve ainsi le choix du contenu final et du moment de l’envoi."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Ce que ce projet démontre">
        <p>
          {
            "Ce cas associe un CMS, une transformation de contenu et un service d’emailing. L’automatisation se termine à un point de contrôle utile : le brouillon prêt à relire."
          }
        </p>
      </ArticleSection>
      <div className="case-stack" data-reveal>
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
