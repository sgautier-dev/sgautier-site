import { homeCopy } from "@/data/home-copy";
import { featuredProjects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { site } from "@/data/site";
import {
  Container,
  SectionIntro,
  Button,
  TextLink,
} from "@/components/ui/Primitives";
import { Portrait } from "@/components/ui/Portrait";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ContactForm } from "@/components/contact/ContactForm";
import { getContactConfig } from "@/lib/contact-config";

export function FeaturedProjects() {
  return (
    <section id="realisations" className="section">
      <Container>
        <SectionIntro
          eyebrow="Réalisations"
          title="Des solutions construites pour des problèmes réels."
        >
          <p>{homeCopy.projects[0]}</p>
        </SectionIntro>
        <div className="project-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              large={index === 0}
            />
          ))}
        </div>
        <div className="section-link">
          <TextLink href="/realisations">Voir toutes mes réalisations</TextLink>
        </div>
      </Container>
    </section>
  );
}
export function MethodSection() {
  const titles = ["Comprendre", "Simplifier", "Construire", "Fiabiliser"];
  const results = [
    "Une vision claire du fonctionnement actuel.",
    "Un processus plus simple avant même d’écrire du code.",
    "Une solution proportionnée au besoin.",
    "Un système utilisable quand tout va bien — et maîtrisable quand ce n’est pas le cas.",
  ];
  return (
    <section id="methode" className="section">
      <Container>
        <div className="dark-panel">
          <div className="method-intro">
            <SectionIntro
              eyebrow="Ma méthode"
              title="Comprendre avant d’automatiser."
            />
            <p className="lead">{homeCopy.method[0]}</p>
          </div>
          <div className="method-steps">
            {titles.map((title, index) => (
              <div className="method-step" key={title}>
                <span className="index">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{homeCopy.method[index + 1]}</p>
                <p className="step-result">{results[index]}</p>
              </div>
            ))}
          </div>
          <p className="method-signature">{homeCopy.method[5]}</p>
        </div>
      </Container>
    </section>
  );
}
export function DiagnosticSection() {
  return (
    <section id="diagnostic" className="section">
      <Container>
        <div className="diagnostic">
          <div className="diagnostic-intro">
            <SectionIntro
              eyebrow="Diagnostic automatisation"
              title="Par où commencer ?"
            >
              <p>
                Montrez-moi simplement une tâche ou un processus qui vous prend
                trop de temps.
              </p>
            </SectionIntro>
            <p>{homeCopy.diagnostic[0]}</p>
            <Button href="/contact?intent=diagnostic#formulaire">
              Analyser mon processus
            </Button>
            <div className="principle">{homeCopy.diagnostic[2]}</div>
          </div>
          <div className="diagnostic-details">
            <div>
              <h3>On regarde</h3>
              <p>
                Vos tâches récurrentes, vos outils, les doubles saisies, les
                points de friction, les données qui circulent et les contrôles
                humains nécessaires.
              </p>
            </div>
            <div>
              <h3>Vous repartez avec</h3>
              <p>
                Des améliorations prioritaires, une distinction entre
                automatisation et intervention manuelle, une première évaluation
                de la complexité, des risques et de la mise en œuvre.
              </p>
            </div>
            <div>
              <p className="scope-note">{homeCopy.diagnostic[1]}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
export function TestimonialsSection() {
  return (
    <section id="temoignages" className="section testimonials">
      <Container>
        <SectionIntro
          eyebrow="Ils m’ont fait confiance"
          title="Une bonne solution commence par une bonne compréhension du besoin."
        />
        <div className="quote-grid">
          {testimonials.map((testimonial, index) => (
            <figure
              className={`quote ${index === 0 ? "quote-lead" : ""}`}
              key={testimonial.name}
            >
              <blockquote>
                <p>{testimonial.quote}</p>
              </blockquote>
              <figcaption>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
export function AboutPreview() {
  return (
    <section className="section">
      <Container>
        <div className="about-preview">
          <Portrait />
          <div>
            <p className="eyebrow">Une double lecture de votre activité</p>
            <h2>Ingénieur, développeur et entrepreneur.</h2>
            {homeCopy.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <TextLink href="/a-propos">Découvrir mon parcours</TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
export function ContactSection() {
  return (
    <section id="contact" className="section">
      <Container>
        <div className="dark-panel contact-layout">
          <div className="contact-copy">
            <p className="eyebrow">Parlons de votre besoin</p>
            <h2>
              Quelle tâche aimeriez-vous ne plus avoir à faire manuellement ?
            </h2>
            {homeCopy.contact.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <a className="email-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <p className="geography">{site.geography}</p>
          </div>
          <ContactForm available={getContactConfig() !== null} />
        </div>
      </Container>
    </section>
  );
}
