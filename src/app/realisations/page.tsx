import {
  Container,
  PageIntro,
  SectionIntro,
  CallToAction,
  TagList,
} from "@/components/ui/Primitives";
import { Breadcrumbs } from "@/components/ui/Article";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { featuredProjects, secondaryProjects } from "@/data/projects";
import { getMetadata } from "@/lib/seo";
import { ExternalLink } from "@/components/ui/ExternalLink";

export const metadata = getMetadata("/realisations");
export default function ProjectsPage() {
  return (
    <Container>
      <Breadcrumbs current="Réalisations" />
      <PageIntro
        eyebrow="Réalisations"
        title="Des solutions construites pour des problèmes réels."
      >
        <p>
          Chaque projet commence par un besoin concret : mieux organiser une
          activité, éviter une double saisie, connecter un service externe,
          automatiser une préparation ou créer une interface qui n’existe pas
          encore sous la bonne forme.
        </p>
      </PageIntro>
      <div className="project-grid">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            large={index === 0}
          />
        ))}
      </div>
      <section className="section">
        <SectionIntro title="D’autres projets, d’autres contextes.">
          <p>
            Site institutionnel, plateforme de services ou portfolio visuel : la
            forme change, mais l’objectif reste le même — construire quelque
            chose d’utile, clair et maintenable.
          </p>
        </SectionIntro>
        <div className="secondary-projects">
          {secondaryProjects.map((project) => (
            <article key={project.slug} data-reveal="visual">
              <ProjectVisual name={project.name} assetKey={project.assetKey} />
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <span className="project-status">{project.statusLabel}</span>
              <TagList items={project.tags} />
              {project.externalUrl && (
                <ExternalLink href={project.externalUrl} className="text-link">
                  Voir le site {project.name}
                </ExternalLink>
              )}
            </article>
          ))}
        </div>
      </section>
      <CallToAction>
        Vous avez un problème à résoudre ? Parlons-en.
      </CallToAction>
    </Container>
  );
}
