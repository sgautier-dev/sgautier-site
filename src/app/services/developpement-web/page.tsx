import {
  Container,
  PageIntro,
  CallToAction,
  TextLink,
} from "@/components/ui/Primitives";
import { Breadcrumbs, ArticleSection } from "@/components/ui/Article";
import { getMetadata } from "@/lib/seo";
import { BuildDiagram } from "@/components/diagrams/Workflow";
export const metadata = getMetadata("/services/developpement-web");
export default function Page() {
  return (
    <Container>
      <Breadcrumbs
        current="Concevoir"
        parent={{ label: "Services", href: "/services" }}
      />
      <PageIntro
        eyebrow="Concevoir"
        title="Un outil web adapté à votre façon de travailler."
      >
        <p>
          {
            "Un logiciel standard n’est pas toujours la meilleure réponse. Lorsqu’un besoin est spécifique, je développe uniquement les fonctionnalités utiles à votre activité, avec une architecture claire et maintenable."
          }
        </p>
      </PageIntro>
      <ArticleSection title="Quand le sur-mesure devient utile">
        <ul>
          <li>{"Votre outil actuel ne couvre pas une étape importante."}</li>
          <li>
            {
              "Vous gérez un processus métier dans un tableur devenu difficile à maintenir."
            }
          </li>
          <li>{"Vous avez besoin d’un espace client ou membre."}</li>
          <li>
            {
              "Votre site doit intégrer une logique de paiement, d’authentification ou de données spécifique."
            }
          </li>
          <li>
            {
              "Une petite application interne éviterait de nombreuses manipulations manuelles."
            }
          </li>
          <li>
            {
              "Vous devez faire évoluer une application existante sans repartir de zéro."
            }
          </li>
        </ul>
      </ArticleSection>
      <ArticleSection title="Ce que je peux construire">
        <p>
          {
            "La forme dépend de l’usage : application métier, interface interne, espace client, site, formulaire ou tableau de bord. CMS, paiements, authentification et connexions peuvent compléter le projet."
          }
        </p>
        <p>
          {
            "Pour faire évoluer un outil existant, un examen ciblé permet d’identifier ce qui peut être conservé et ce qui mérite d’être corrigé."
          }
        </p>
        <BuildDiagram />
      </ArticleSection>
      <ArticleSection title="Construire seulement ce qui est nécessaire.">
        <p>
          {
            "Le besoin et les contraintes guident l’architecture : une solution simple à utiliser, fiable et proportionnée au problème."
          }
        </p>
        <p>
          <strong>
            Cadrer → Prototyper si nécessaire → Développer → Tester → Documenter
            → Livrer
          </strong>
        </p>
        <p>
          Un prototype permet de clarifier une interaction incertaine. Les
          livrables sont définis selon le périmètre du projet.
        </p>
      </ArticleSection>
      <ArticleSection title="Exemple : Compta Pro">
        <p>
          {
            "Compta Pro illustre cette approche : un outil local conçu autour de besoins réels de gestion d’une activité indépendante, avec des règles métier, des contrôles explicites et des décisions sensibles laissées à l’utilisateur."
          }
        </p>
        <p className="project-status">Projet personnel · Cas pilote</p>
        <TextLink href="/realisations/compta-pro">
          Découvrir Compta Pro
        </TextLink>
      </ArticleSection>
      <ArticleSection title="Des technologies choisies pour le besoin">
        <p>
          {
            "Je travaille principalement avec Next.js et TypeScript. Les choix techniques dépendent de l’interactivité, des données, des intégrations, de la sécurité et de la maintenance."
          }
        </p>
      </ArticleSection>
      <CallToAction href="/contact">
        Parler de l’outil dont vous avez besoin
      </CallToAction>
    </Container>
  );
}
