import { homeCopy } from "@/data/home-copy";
import { services } from "@/data/services";
import {
  Button,
  Container,
  PlusGrid,
  SectionIntro,
  TagList,
  TextLink,
} from "@/components/ui/Primitives";
import {
  AutomationDiagram,
  BuildDiagram,
  HeroWorkflowDiagram,
  IntegrationDiagram,
} from "@/components/diagrams/Workflow";

export function Hero() {
  return (
    <Container>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            Développement web · Intégrations · Automatisation
          </p>
          <h1>
            Moins de tâches répétitives.{" "}
            <span>Plus de temps pour votre métier.</span>
          </h1>
          <p className="lead">{homeCopy.hero[0]}</p>
          <div className="hero-actions">
            <Button href="#contact">
              Parlons de ce qui vous fait perdre du temps
            </Button>
            <TextLink href="#realisations">Voir mes réalisations</TextLink>
          </div>
        </div>
        <HeroWorkflowDiagram />
      </section>
    </Container>
  );
}
export function ProblemsSection() {
  const situations = [
    [
      "Double saisie",
      "Je recopie les mêmes informations à plusieurs endroits.",
    ],
    [
      "Tâches répétitives",
      "Je refais chaque semaine les mêmes emails, documents, relances ou rapports.",
    ],
    [
      "Outils déconnectés",
      "Mes outils contiennent les bonnes données, mais ils ne communiquent pas entre eux.",
    ],
    [
      "Processus bricolés",
      "Un tableur, quelques emails et plusieurs manipulations manuelles sont devenus indispensables à mon organisation.",
    ],
  ];
  return (
    <section className="section problems">
      <Container>
        <div className="split-heading">
          <SectionIntro
            eyebrow="Le point de départ"
            title="Vos outils devraient alléger votre travail, pas le compliquer."
          />
          <p className="lead">{homeCopy.problems[0]}</p>
        </div>
        <PlusGrid>
          {situations.map(([title, text], index) => (
            <article key={title}>
              <span className="index">0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </PlusGrid>
        <p className="section-note">{homeCopy.problems[1]}</p>
      </Container>
    </section>
  );
}
export function ServicesBento() {
  const diagrams = [
    <BuildDiagram key="build" />,
    <IntegrationDiagram key="connect" />,
    <AutomationDiagram key="automate" />,
  ];
  return (
    <section id="services" className="section">
      <Container>
        <SectionIntro
          eyebrow="Des outils au service de votre activité"
          title="Concevoir. Connecter. Automatiser."
        >
          <p>
            Trois façons d’améliorer votre fonctionnement, selon ce dont votre
            activité a réellement besoin.
          </p>
        </SectionIntro>
        <div className="services-bento">
          {services.map((service, index) => (
            <article
              key={service.key}
              className={`service-card service-${service.key}`}
            >
              <div className="service-copy">
                <p className="eyebrow">
                  <span className="service-number">0{index + 1}</span>
                  {service.label}
                </p>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <TagList items={service.examples} />
                {index === 2 && (
                  <p className="small">
                    Avec ou sans IA, selon ce qui est réellement utile.
                  </p>
                )}
                <TextLink href={service.href}>{service.link}</TextLink>
              </div>
              <div className="service-graphic">{diagrams[index]}</div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
