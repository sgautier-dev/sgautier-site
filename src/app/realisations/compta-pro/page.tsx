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
        title="Simplifier la gestion financière sans perdre le contrôle."
      >
        <p>
          {
            "Développé initialement pour ma propre activité, Compta Pro centralise les imports et les contrôles dans un outil local. Les situations ambiguës restent soumises à une validation explicite."
          }
        </p>
      </PageIntro>
      <div className="case-hero project-compta-pro" data-reveal="visual">
        <ProjectVisual name="Compta Pro" assetKey="comptaProOverview" />
      </div>
      <div className="case-flow" data-reveal="visual">
        <ComptaProFlow />
      </div>
      <ArticleSection title="Le point de départ">
        <p>
          {
            "Rassembler des informations financières demande de vérifier leur provenance et de distinguer les opérations déjà connues de celles à intégrer. Compta Pro structure ce travail dans un outil adapté à mon activité indépendante."
          }
        </p>
        <p>
          {
            "Le projet a commencé par le rapprochement avec Visual Budget, puis s’est enrichi d’un registre propre et d’une interface web locale."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Importer sans perdre la provenance">
        <p>
          {
            "L’application vérifie les exports bancaires et relevés pris en charge avant intégration. Chaque opération reste reliée à ses fichiers sources pour comprendre les recoupements entre plusieurs imports."
          }
        </p>
        <p>
          {
            "Les formats inconnus et les incohérences sont signalés. Le seul nom d’un fichier ne suffit pas à déterminer son contenu."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Traiter l’ambiguïté comme une information">
        <p>
          {
            "Deux lignes proches ne correspondent pas forcément à la même opération. Si plusieurs rapprochements sont possibles, l’ambiguïté est signalée et peut bloquer l’intégration jusqu’à son examen."
          }
        </p>
        <p>
          {
            "Le registre sépare les opérations, leurs sources et les actions d’intégration pour pouvoir répéter un traitement sans créer de doublons."
          }
        </p>
        <ProjectVisual name="Compta Pro" assetKey="comptaProReview" review />
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
            "Les fichiers et le registre sont stockés localement ; l’interface web s’ouvre sur l’ordinateur. La base Visual Budget, utilisée en lecture seule, reste distincte du registre Compta Pro."
          }
        </p>
        <p>
          {
            "Compta Pro reste un outil de gestion personnel : il ne constitue ni un logiciel comptable certifié ni un service de déclaration automatique."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Ce que ce projet démontre">
        <p>
          {
            "Ce cas illustre le développement d’un outil métier : structurer les données, expliciter les règles et prévoir les situations où le système doit demander une décision humaine."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="La suite">
        <p>
          {
            "Une adaptation à l’activité d’une autre professionnelle indépendante est prévue pour confronter l’outil à un second fonctionnement et en documenter les usages. Cette mise en place reste à venir."
          }
        </p>
      </ArticleSection>
      <div className="case-stack" data-reveal>
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
