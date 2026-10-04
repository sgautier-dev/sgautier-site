import {
  Container,
  PageIntro,
  CallToAction,
  TagList,
} from "@/components/ui/Primitives";
import { Breadcrumbs, ArticleSection } from "@/components/ui/Article";
import { getMetadata } from "@/lib/seo";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { ComptaProFlow } from "@/components/diagrams/Workflow";
export const metadata = getMetadata("/realisations/compta-pro");
export default function Page() {
  return (
    <Container>
      <Breadcrumbs
        current="Compta Pro"
        parent={{ label: "Réalisations", href: "/realisations" }}
      />
      <PageIntro
        eyebrow="Projet personnel · Cas pilote · Application métier"
        title="Automatiser les traitements fiables sans automatiser les décisions sensibles."
      >
        <p>
          {
            "Compta Pro est un outil local conçu autour de mes propres besoins de gestion financière en tant qu’indépendant. Il organise les imports, les contrôles et la lecture des opérations, tout en laissant certaines décisions sous validation explicite de l’utilisateur."
          }
        </p>
      </PageIntro>
      <div className="case-hero project-compta-pro">
        <ProjectVisual name="Compta Pro" />
      </div>
      <div className="case-flow">
        <ComptaProFlow />
      </div>
      <ArticleSection title="Le point de départ">
        <p>
          {
            "Rassembler des informations financières ne suffit pas : il faut aussi savoir d’où elles viennent, vérifier ce qu’elles contiennent et distinguer les opérations déjà connues de celles qui doivent être intégrées. J’ai conçu Compta Pro pour structurer ce travail dans un outil adapté à mon fonctionnement."
          }
        </p>
        <p>
          {
            "Le projet a commencé autour du rapprochement avec Visual Budget, puis s’est enrichi d’un registre propre et d’une interface web locale. Il ne s’agit pas d’une commande client présentée artificiellement : c’est un outil développé pour un usage professionnel personnel."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Importer sans perdre la provenance">
        <p>
          {
            "L’application traite des exports bancaires et des relevés dans les formats pris en charge. Les fichiers sont vérifiés avant leur intégration et restent reliés aux opérations qu’ils permettent d’observer. Cette séparation entre une opération et ses sources aide à comprendre les recoupements entre plusieurs fichiers."
          }
        </p>
        <p>
          {
            "Les informations ne sont pas déduites du seul nom d’un fichier. Les formats non pris en charge et les incohérences doivent être signalés plutôt que transformés silencieusement en données supposées fiables."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Traiter l’ambiguïté comme une information">
        <p>
          {
            "Deux lignes proches ne correspondent pas nécessairement à la même opération. Lorsqu’un rapprochement présente plusieurs possibilités, le processus doit le montrer au lieu de choisir arbitrairement. Une ambiguïté peut donc bloquer une intégration tant qu’elle n’a pas été examinée."
          }
        </p>
        <p>
          {
            "Le registre distingue les opérations de leurs sources et les actions explicites d’intégration. L’objectif est de pouvoir répéter un traitement sans dupliquer les informations déjà intégrées."
          }
        </p>
        <ProjectVisual name="Compta Pro" review />
      </ArticleSection>
      <ArticleSection title="Automatiser les règles, garder la décision humaine">
        <p>
          {
            "Les contrôles de format, les comparaisons et les calculs peuvent être pris en charge par le logiciel. En revanche, une entrée d’argent ne dit pas à elle seule s’il s’agit d’un revenu professionnel, d’un remboursement ou d’un transfert."
          }
        </p>
        <p>
          {
            "Des suggestions peuvent s’appuyer sur un historique cohérent, mais elles ne deviennent pas automatiquement une classification validée. L’utilisateur garde la main sur les décisions qui demandent du contexte."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Un outil local, à périmètre explicite">
        <p>
          {
            "Le fonctionnement documenté repose sur des fichiers et un registre stockés localement, avec une interface web ouverte sur l’ordinateur. Le registre propre à Compta Pro reste distinct de la base Visual Budget utilisée en lecture seule."
          }
        </p>
        <p>
          {
            "Les captures à intégrer avant publication devront utiliser uniquement des données de démonstration. Le projet n’est pas présenté comme un logiciel comptable certifié ni comme un service de déclaration automatique."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Ce que ce projet démontre">
        <p>
          {
            "Ce cas illustre une démarche de développement métier : partir d’un besoin concret, structurer les données, expliciter les règles et prévoir les situations où le système ne doit pas décider seul. La preuve présentée porte sur ce fonctionnement, pas sur un gain de temps chiffré qui n’a pas encore été mesuré."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="La suite">
        <p>
          {
            "Une adaptation à l’activité d’une autre professionnelle indépendante est prévue. Ce déploiement permettra de confronter l’outil à un second fonctionnement et de documenter les usages et résultats observés. Il reste une étape future tant que la mise en place n’est pas achevée."
          }
        </p>
      </ArticleSection>
      <div className="case-stack">
        <p className="eyebrow">Technologies</p>
        <TagList
          items={["Next.js", "TypeScript", "SQLite", "Traitements locaux"]}
        />
      </div>
      <CallToAction href="/contact">
        Vous avez un processus de gestion à simplifier ? Parlons-en.
      </CallToAction>
    </Container>
  );
}
