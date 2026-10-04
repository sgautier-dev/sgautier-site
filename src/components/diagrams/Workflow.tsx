export function HeroWorkflowDiagram() {
  return (
    <figure
      className="hero-diagram"
      data-reveal="hero-diagram"
      data-reveal-delay="140"
    >
      <div className="diagram-topline" aria-hidden="true">
        <span>DU BESOIN À L’OUTIL UTILE</span>
        <span>SCHÉMA</span>
      </div>
      <div className="workflow-map">
        <svg
          className="workflow-signal signal-horizontal"
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M 0 250 H 1000" pathLength="100" />
        </svg>
        <svg
          className="workflow-signal signal-vertical"
          viewBox="0 0 500 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M 250 0 V 1000" pathLength="100" />
        </svg>
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
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="interface-body">
          <div className="interface-toolbar">
            <i />
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
            <i /> <span>↗</span>
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
    <figure className="process-diagram automation-diagram">
      <figcaption>Un processus, des contrôles</figcaption>
      <ol className="automation-trunk">
        {["Entrée", "Traitement", "Condition"].map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className="automation-branches">
        <div className="automation-branch">
          <p>Automatisable</p>
          <ol aria-label="Parcours automatisable">
            <li>Action</li>
          </ol>
        </div>
        <div className="automation-branch human-branch">
          <p>Validation requise</p>
          <ol aria-label="Parcours avec validation">
            <li className="human-stage">Validation humaine</li>
            <li>Action</li>
          </ol>
        </div>
      </div>
    </figure>
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
