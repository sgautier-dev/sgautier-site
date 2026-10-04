import {
  Container,
  PageIntro,
  CallToAction,
  TextLink,
} from "@/components/ui/Primitives";
import { Breadcrumbs, ArticleSection } from "@/components/ui/Article";
import { getMetadata } from "@/lib/seo";
import { AutomationDiagram } from "@/components/diagrams/Workflow";
export const metadata = getMetadata("/services/automatisation-processus");
export default function Page() {
  return (
    <Container>
      <Breadcrumbs
        current="Automatiser"
        parent={{ label: "Services", href: "/services" }}
      />
      <PageIntro
        eyebrow="Automatiser"
        title="Automatisez ce qui vous éloigne de votre métier."
      >
        <p>
          {
            "Une automatisation utile n’a pas besoin d’être spectaculaire. Elle doit simplement retirer des tâches répétitives, réduire les erreurs et laisser les décisions importantes au bon endroit."
          }
        </p>
      </PageIntro>
      <ArticleSection title="Des tâches qui reviennent toujours">
        <ul>
          <li>{"Préparer les mêmes documents"}</li>
          <li>{"Envoyer des relances"}</li>
          <li>{"Classer ou transformer des données"}</li>
          <li>{"Synchroniser des outils"}</li>
          <li>{"Créer un suivi à partir d’un événement"}</li>
          <li>{"Préparer un rapport"}</li>
          <li>{"Générer un brouillon"}</li>
          <li>
            {"Prévenir la bonne personne lorsqu’une condition est remplie"}
          </li>
        </ul>
      </ArticleSection>
      <ArticleSection title="Ce qu’une automatisation peut prendre en charge">
        <p>
          {
            "Collecter, vérifier, transformer, transmettre ou générer un document : ces étapes peuvent suivre des règles claires. Il faut aussi prévoir les données manquantes et les exceptions."
          }
        </p>
        <p>
          {
            "Le bon périmètre peut être très limité : retirer une seule manipulation récurrente, puis vérifier que le fonctionnement est fiable avant d’aller plus loin."
          }
        </p>
        <AutomationDiagram />
      </ArticleSection>
      <ArticleSection title="Ce qu’elle ne doit pas décider seule">
        <p>
          {
            "Quand une décision demande du contexte ou engage une responsabilité humaine, le système prépare l’information et attend une validation."
          }
        </p>
        <p>
          Par exemple : donnée ambiguë, décision sensible, action difficilement
          réversible, exception métier, résultat généré par IA nécessitant une
          vérification.
        </p>
      </ArticleSection>
      <ArticleSection title="L’IA est une brique, pas la stratégie.">
        <p>
          {
            "L’IA peut résumer, extraire, classer ou préparer un brouillon à partir d’informations peu structurées. Son usage doit apporter un avantage réel, avec des contrôles adaptés aux données et au risque d’erreur."
          }
        </p>
        <p>
          {
            "Un traitement classique peut être plus prévisible et plus simple à maintenir. Le choix dépend du problème, pas de la volonté d’ajouter de l’IA à chaque étape."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Comprendre. Simplifier. Construire. Fiabiliser.">
        <p>
          {
            "Nous simplifions d’abord le processus, puis choisissons les outils. La documentation, les contrôles d’erreur et les possibilités de reprise font partie de la livraison."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Compta Pro : automatiser sans perdre le contrôle">
        <p>
          {
            "Compta Pro organise plusieurs traitements autour de données financières locales, bloque les cas ambigus et laisse certaines classifications sous validation explicite de l’utilisateur."
          }
        </p>
        <p className="project-status">Projet personnel · Cas pilote</p>
        <TextLink href="/realisations/compta-pro">
          Découvrir Compta Pro
        </TextLink>
      </ArticleSection>
      <ArticleSection title="Holistis : automatiser la préparation, pas la décision d’envoi">
        <p>
          {
            "Un contenu Sanity peut servir à générer automatiquement un brouillon de campagne Mailchimp. Le travail répétitif est préparé ; l’envoi reste sous contrôle humain."
          }
        </p>
        <TextLink href="/realisations/holistis">Découvrir Holistis</TextLink>
      </ArticleSection>
      <ArticleSection title="Vous ne savez pas quoi automatiser en premier ?">
        <p>
          {
            "Partons d’une tâche que vous répétez chaque semaine pour définir ce qui peut être amélioré. Le périmètre et les conditions du diagnostic sont convenus avant de commencer."
          }
        </p>
      </ArticleSection>
      <CallToAction href="/contact?intent=diagnostic#formulaire">
        Analyser mon processus
      </CallToAction>
    </Container>
  );
}
