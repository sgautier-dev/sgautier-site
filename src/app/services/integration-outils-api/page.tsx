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
            "Vos outils répondent peut-être déjà au besoin, mais leurs informations circulent mal. Une intégration peut supprimer les ressaisies sans remplacer tout votre système."
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
            "Une API échange des données ; un webhook signale un événement. Les exports, imports et traitements programmés offrent d’autres possibilités selon vos outils."
          }
        </p>
        <IntegrationDiagram />
      </ArticleSection>
      <ArticleSection title="Ne pas remplacer un outil qui fonctionne.">
        <p>
          {
            "Nous comparons les possibilités des outils existants, leur complexité, leurs coûts récurrents et leur maintenance avant de choisir une solution."
          }
        </p>
      </ArticleSection>
      <ArticleSection title="Une intégration doit aussi savoir gérer les erreurs.">
        <p>
          {
            "Donnée invalide, service indisponible, événement reçu deux fois : je prévois les contrôles, les protections contre les doublons et les points de reprise humaine."
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
