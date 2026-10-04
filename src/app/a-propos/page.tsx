import { Container, PageIntro, CallToAction } from "@/components/ui/Primitives";
import { Breadcrumbs, ArticleSection } from "@/components/ui/Article";
import { getMetadata } from "@/lib/seo";
import { Portrait } from "@/components/ui/Portrait";
import { canonicalOrigin } from "@/lib/seo";
import { serializeJsonLd } from "@/lib/structured-data";
export const metadata = getMetadata("/a-propos");
export default function Page() {
  return (
    <Container>
      <Breadcrumbs current="À propos" />
      <PageIntro
        eyebrow="À propos"
        title="Ingénieur, développeur et entrepreneur."
      >
        <p>
          {
            "Mon parcours me permet aujourd’hui d’aborder un projet à la fois par la technique et par son usage réel dans une activité."
          }
        </p>
      </PageIntro>
      <div className="about-portrait">
        <Portrait />
      </div>
      <ArticleSection title="Une base d’ingénieur.">
        <p>
          {
            "Je suis ingénieur en informatique diplômé de l’INSA Lyon. J’ai commencé ma carrière dans la Business Intelligence, au croisement des systèmes d’information, de la donnée et des besoins opérationnels."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Comprendre ce qui se passe autour du cœur de métier.">
        <p>
          {
            "J’ai ensuite créé et dirigé ma propre activité. Cette expérience m’a confronté directement à tout ce qu’un indépendant ou une petite structure doit gérer en plus de son métier : organisation, clients, administratif, outils, communication et décisions quotidiennes."
          }
        </p>
        <p>
          {
            "C’est aussi ce qui explique mon intérêt actuel pour les outils capables de réduire le temps absorbé par ces tâches périphériques."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Revenir à la technique avec une autre perspective.">
        <p>
          {
            "En revenant au développement web, je n’ai pas seulement retrouvé un métier technique. J’y ai ajouté une expérience concrète de l’entreprise et de ses contraintes. Je conçois aujourd’hui des sites, applications et intégrations avec cette double lecture : ce qui fonctionne techniquement et ce qui fonctionne réellement dans l’usage."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Connecter, simplifier, automatiser.">
        <p>
          {
            "Mon travail évolue naturellement vers l’intégration d’outils et l’automatisation des processus. L’objectif n’est pas d’automatiser pour automatiser, mais d’identifier les étapes qui méritent réellement de l’être, puis de les rendre fiables et compréhensibles."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Ma manière de travailler">
        <ul>
          <li>
            <strong>{"Écoute"}</strong>
            {
              " — Comprendre le fonctionnement réel avant de proposer une solution."
            }
          </li>
          <li>
            <strong>{"Pragmatisme"}</strong>
            {
              " — Chercher la solution la plus simple qui répond correctement au besoin."
            }
          </li>
          <li>
            <strong>{"Fiabilité"}</strong>
            {
              " — Prévoir les erreurs, les contrôles et les cas où une intervention humaine reste nécessaire."
            }
          </li>
          <li>
            <strong>{"Clarté"}</strong>
            {
              " — Expliquer les choix techniques sans transformer chaque échange en cours d’informatique."
            }
          </li>
          <li>
            <strong>{"Maintenabilité"}</strong>
            {
              " — Construire des solutions qui peuvent évoluer sans devenir dépendantes d’un assemblage incompréhensible."
            }
          </li>
        </ul>
      </ArticleSection>
      <ArticleSection title="Outils et technologies" id="outils">
        <p>
          Je travaille principalement avec Next.js, React, TypeScript, Tailwind
          CSS et des services spécialisés selon les besoins : CMS, paiement,
          authentification, emailing, API, webhooks ou outils d’automatisation.
        </p>
        <p>
          La stack n’est jamais le point de départ. Elle découle du problème à
          résoudre.
        </p>
      </ArticleSection>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            url: `${canonicalOrigin}/a-propos`,
            mainEntity: { "@id": `${canonicalOrigin}/#person` },
          }),
        }}
      />
      <CallToAction href="/contact">Parlons de votre besoin</CallToAction>
    </Container>
  );
}
