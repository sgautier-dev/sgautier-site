import { Container, PageIntro } from "@/components/ui/Primitives";
import { Breadcrumbs, ArticleSection } from "@/components/ui/Article";
import { getMetadata } from "@/lib/seo";
export const metadata = getMetadata("/confidentialite");
export default function PrivacyPage() {
  return (
    <Container>
      <Breadcrumbs current="Confidentialité" />
      <PageIntro
        eyebrow="Vos données"
        title="Confidentialité et données personnelles"
      />
      <p className="draft-notice">
        Document de travail — informations à valider avant publication
      </p>
      <ArticleSection title="Responsable du traitement">
        <p>
          Contact pour cette prévisualisation :{" "}
          <a href="mailto:contact@sgautier.dev">contact@sgautier.dev</a>.
        </p>
        <p className="draft-field">
          À confirmer : identité juridique et coordonnées complètes du
          responsable du traitement.
        </p>
      </ArticleSection>
      <ArticleSection title="Données et finalités du formulaire">
        <p>
          Le formulaire demande votre nom, votre adresse email et votre message.
          Le champ entreprise / activité est facultatif. Ces informations
          servent à comprendre votre demande et à vous répondre.
        </p>
        <p>
          Dans cette prévisualisation, l’envoi est désactivé. Les tests
          utilisent des données fictives et des services simulés. N’incluez pas
          d’informations sensibles dans un message de test.
        </p>
      </ArticleSection>
      <ArticleSection title="Prévention des abus">
        <p>
          L’intégration prévoit une validation des champs, un champ de détection
          des soumissions automatisées, ainsi que des contrôles Arcjet limités
          aux demandes de contact : détection des robots, protection Shield et
          limitation initiale de cinq tentatives par minute par adresse IP
          identifiée par le service.
        </p>
        <p>
          Une décision de protection indisponible ou indéterminée bloque
          l’envoi. Les contrôles nécessiteront le traitement de données
          techniques de la requête selon la configuration retenue.
        </p>
        <p className="draft-field">
          À valider : configuration effective d’Arcjet, données techniques
          transmises, journalisation et information des visiteurs.
        </p>
      </ArticleSection>
      <ArticleSection title="Bases juridiques">
        <p className="draft-field">
          À déterminer et valider selon les finalités effectives : réponse aux
          demandes, éventuelles démarches précontractuelles et prévention des
          abus. Aucune inscription marketing n’est associée au formulaire.
        </p>
      </ArticleSection>
      <ArticleSection title="Destinataires et prestataires">
        <p>
          Après activation autorisée, les demandes seront adressées à Sébastien
          Gautier. Resend sera utilisé pour transmettre l’email et Arcjet pour
          les contrôles techniques de prévention des abus. Le navigateur ne
          reçoit pas les clés d’accès à ces services.
        </p>
        <p className="draft-field">
          À confirmer : hébergeur, contrats applicables, configuration des
          prestataires, personnes autorisées à accéder aux demandes et à la
          messagerie.
        </p>
      </ArticleSection>
      <ArticleSection title="Durées de conservation et journaux">
        <p>
          Le site ne stocke pas les messages dans une base de données ou dans le
          stockage local du navigateur. Les champs restent affichés en cas
          d’échec et sont effacés du formulaire après confirmation d’acceptation
          par le service d’email.
        </p>
        <p>
          Les journaux applicatifs prévus se limitent à des codes opérationnels
          sans contenu du message. Les journaux et la messagerie des
          prestataires suivent leurs propres paramètres.
        </p>
        <p className="draft-field">
          À définir : conservation des demandes dans la messagerie, des journaux
          techniques et des données chez chaque prestataire, ainsi que les
          modalités de suppression.
        </p>
      </ArticleSection>
      <ArticleSection title="Transferts et garanties">
        <p className="draft-field">
          À vérifier : lieux de traitement, éventuels transferts hors de
          l’Espace économique européen et garanties applicables aux prestataires
          effectivement configurés.
        </p>
      </ArticleSection>
      <ArticleSection title="Droits et contact">
        <p>
          Pour toute question sur le traitement de vos données ou pour exercer
          les droits applicables à votre situation, écrivez à{" "}
          <a href="mailto:contact@sgautier.dev">contact@sgautier.dev</a>.
        </p>
        <p className="draft-field">
          À valider : modalités d’exercice des droits, vérification
          proportionnée de l’identité et procédure de traitement des demandes.
        </p>
      </ArticleSection>
      <ArticleSection title="Recours">
        <p className="draft-field">
          À confirmer : autorité de contrôle compétente et modalités de
          réclamation à indiquer dans la version publiée.
        </p>
      </ArticleSection>
      <ArticleSection title="Cookies, stockage et mesure d’audience">
        <p>
          Cette version n’intègre ni mesure d’audience, ni publicité, ni suivi
          des sessions, ni widget social embarqué. Les informations du
          formulaire ne sont pas enregistrées dans l’URL ou dans le stockage
          local du navigateur.
        </p>
        <p className="draft-field">
          À vérifier sur l’hébergement final : cookies et stockages
          éventuellement ajoutés par l’environnement. L’absence de bannière ne
          constitue pas une validation juridique.
        </p>
      </ArticleSection>
    </Container>
  );
}
