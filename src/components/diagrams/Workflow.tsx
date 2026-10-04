export function HeroWorkflowDiagram() {
  return (
    <figure className="hero-diagram">
      <div className="diagram-topline" aria-hidden="true">
        <span>DU BESOIN À L’OUTIL UTILE</span>
        <span>SCHÉMA</span>
      </div>
      <div className="workflow-map">
        <div className="flow-column inputs">
          {["Formulaire", "Email", "Tableur", "Paiement"].map((item, index) => (
            <div className={`flow-node node-${index}`} key={item}>
              <span className="node-symbol" aria-hidden="true">
                {["≡", "@", "⊞", "€"][index]}
              </span>
              {item}
            </div>
          ))}
        </div>
        <div className="flow-center">
          <span className="center-symbol" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <strong>Votre processus</strong>
          <span>Règles métier</span>
          <span>Automatisation</span>
          <span className="human-check">
            <span aria-hidden="true">✓</span> Validation humaine
          </span>
        </div>
        <div className="flow-column outputs">
          {["CRM", "Document", "Notification", "Tableau de bord"].map(
            (item, index) => (
              <div className={`flow-node node-${index}`} key={item}>
                {item}
                <span aria-hidden="true">↗</span>
              </div>
            ),
          )}
        </div>
      </div>
      <figcaption>
        Vos informations entrent. Votre processus les organise. Vos outils
        prennent le relais.
      </figcaption>
      <p className="illustration-label">Illustration de l’approche</p>
    </figure>
  );
}

export function Flow({
  steps,
  caption,
  human,
}: {
  steps: readonly string[];
  caption: string;
  human?: string;
}) {
  return (
    <figure className="process-diagram">
      <figcaption>{caption}</figcaption>
      <ol>
        {steps.map((step, index) => (
          <li key={step}>
            <span className="flow-step-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      {human && (
        <p className="human-note">
          <span aria-hidden="true">↳</span> {human}
        </p>
      )}
    </figure>
  );
}
export function BuildDiagram() {
  return (
    <figure className="build-diagram">
      <div className="generic-interface" aria-hidden="true">
        <div className="interface-sidebar">
          <b>Votre outil</b>
          <i />
          <i />
          <i />
        </div>
        <div className="interface-body">
          <div className="interface-toolbar">
            <span>Vue d’ensemble</span>
            <span>+</span>
          </div>
          <div className="interface-fields">
            <i />
            <i />
          </div>
          <div className="interface-table">
            <div />
            <div />
            <div />
          </div>
          <span className="interface-action">
            Une interface à votre mesure <span>↗</span>
          </span>
        </div>
      </div>
      <figcaption>Illustration d’une interface métier</figcaption>
    </figure>
  );
}
export function IntegrationDiagram() {
  return (
    <Flow
      caption="Exemple de fonctionnement"
      steps={[
        "Demande reçue",
        "Validation des données",
        "Création d’un suivi",
        "Notification",
      ]}
    />
  );
}
export function AutomationDiagram() {
  return (
    <Flow
      caption="Un processus, des contrôles"
      steps={["Entrée", "Traitement", "Condition", "Action"]}
      human="Validation humaine lorsque nécessaire"
    />
  );
}
export function ComptaProFlow() {
  return (
    <Flow
      caption="Synthèse fonctionnelle · traitement local"
      steps={[
        "Fichiers pris en charge",
        "Vérifications",
        "Rapprochement",
        "Contrôle des ambiguïtés",
        "Registre et synthèses",
      ]}
      human="À vérifier par l’utilisateur"
    />
  );
}
export function AdfEventFlow() {
  return (
    <div className="dual-flow">
      <Flow
        caption="Lecture des informations"
        steps={["Eventbrite", "Lecture API", "Données affichées"]}
      />
      <Flow
        caption="Déclenchement de l’actualisation"
        steps={["Événement Eventbrite", "Webhook", "Revalidation de /events"]}
      />
    </div>
  );
}
export function HolistisNewsletterFlow() {
  return (
    <Flow
      caption="De l’article au brouillon"
      steps={[
        "Contenu Sanity",
        "Webhook",
        "Préparation du contenu",
        "Brouillon Mailchimp",
      ]}
      human="Relecture humaine → envoi décidé par l’utilisateur"
    />
  );
}
