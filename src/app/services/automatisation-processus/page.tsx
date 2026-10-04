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
            "Les étapes qui suivent des règles claires sont de bonnes candidates : collecter, vérifier, transformer, transmettre, générer un document ou déclencher une action. Le processus doit aussi prévoir les données manquantes, les erreurs et les exceptions."
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
            "Certaines situations demandent du contexte, une responsabilité humaine ou une appréciation qui ne peut pas être réduite à une règle fiable. Dans ces cas, l’automatisation prépare l’information et demande une validation avant de poursuivre."
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
            "Elle peut être utile pour résumer, extraire, classer ou préparer un brouillon lorsque les informations sont moins structurées. Je l’utilise uniquement lorsqu’elle apporte un avantage réel, avec un niveau de contrôle adapté au risque d’erreur et aux données concernées."
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
            "Avant d’automatiser, je cherche d’abord à simplifier le processus. Ensuite seulement viennent les outils, les workflows, le code et éventuellement l’IA. La documentation et les possibilités de reprise font partie de la solution."
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
            "Commencez par une tâche que vous aimeriez ne plus avoir à répéter chaque semaine. Nous regarderons ensemble si elle mérite réellement d’être automatisée et jusqu’où. Le périmètre et les conditions du diagnostic sont définis avant de commencer."
          }
        </p>
      </ArticleSection>
      <p className="principle">
        Tout ce qui peut être automatisé ne mérite pas forcément de l’être.
      </p>
      <CallToAction href="/contact?intent=diagnostic#formulaire">
        Analyser mon processus
      </CallToAction>
    </Container>
  );
}
