import {
  Container,
  PageIntro,
  CallToAction,
  TextLink,
} from "@/components/ui/Primitives";
import { Breadcrumbs, ArticleSection } from "@/components/ui/Article";
import { getMetadata } from "@/lib/seo";
import { IntegrationDiagram } from "@/components/diagrams/Workflow";
export const metadata = getMetadata("/services/integration-outils-api");
export default function Page() {
  return (
    <Container>
      <Breadcrumbs
        current="Connecter"
        parent={{ label: "Services", href: "/services" }}
      />
      <PageIntro
        eyebrow="Connecter"
        title="Faites travailler vos outils ensemble."
      >
        <p>
          {
            "Vous utilisez peut-être déjà les bons services. Le problème est simplement qu’ils ne se transmettent pas les bonnes informations. Une intégration bien conçue peut supprimer de nombreuses ressaisies sans remplacer tout votre système."
          }
        </p>
      </PageIntro>
      <ArticleSection title="Les signes qu’une intégration peut suffire">
        <ul>
          <li>{"Vous saisissez la même information dans plusieurs outils."}</li>
          <li>{"Un formulaire doit déclencher une action ailleurs."}</li>
          <li>
            {
              "Un paiement doit mettre à jour un accès, un suivi ou un document."
            }
          </li>
          <li>{"Vous exportez puis réimportez régulièrement des données."}</li>
          <li>
            {
              "Votre CRM, CMS, agenda ou logiciel métier possède une API qui n’est pas exploitée."
            }
          </li>
          <li>
            {
              "Une modification dans un outil devrait être reflétée dans un autre."
            }
          </li>
        </ul>
      </ArticleSection>
      <ArticleSection title="Ce que je peux connecter">
        <p>
          {
            "Sites, applications métier, CRM, CMS, agenda, paiements, emailing ou outils de travail comme Google Workspace : je pars des services déjà utilisés et des informations qu’ils doivent échanger."
          }
        </p>
        <p>
          {
            "Une API permet à deux logiciels d’échanger des données. Un webhook permet à un service de signaler un événement à un autre. Selon les possibilités disponibles, une intégration peut aussi s’appuyer sur des exports, des imports ou des traitements programmés."
          }
        </p>
        <IntegrationDiagram />
      </ArticleSection>
      <ArticleSection title="Ne pas remplacer un outil qui fonctionne.">
        <p>
          {
            "Avant de proposer une nouvelle plateforme, je regarde si les outils existants peuvent être mieux reliés. Nous comparons la complexité, les coûts récurrents, les limites des services et la maintenance nécessaire avant de choisir une solution."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Une intégration doit aussi savoir gérer les erreurs.">
        <p>
          {
            "Une donnée invalide, un service indisponible ou un événement reçu deux fois ne doivent pas créer un problème silencieux. Je prévois les validations, la gestion des erreurs, les protections contre les doublons lorsque nécessaire et les points où une intervention humaine doit reprendre la main."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Exemple : Aqua Dance Flow">
        <p>
          {
            "Le site Aqua Dance Flow récupère des événements depuis Eventbrite via son API. Une route de webhook permet de déclencher la revalidation de la page événements, pour relier la source des informations à leur présentation sur le site."
          }
        </p>
        <TextLink href="/realisations/aqua-dance-flow">
          Découvrir Aqua Dance Flow
        </TextLink>
      </ArticleSection>
      <CallToAction href="/contact">Connecter mes outils</CallToAction>
    </Container>
  );
}
