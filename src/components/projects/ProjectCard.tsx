import { TagList, TextLink } from "@/components/ui/Primitives";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectCard({
  project,
  large = false,
  revealDelay = 0,
}: {
  project: Project;
  large?: boolean;
  revealDelay?: number;
}) {
  return (
    <article
      className={`project-card project-${project.slug} ${large ? "project-featured" : ""}`}
      data-reveal="visual"
      data-reveal-delay={revealDelay}
    >
      <div>
        <div className="project-name">
          <span>{project.name}</span>
          <span className="project-status">{project.statusLabel}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <TagList items={project.tags} />
        {project.caseStudyHref && (
          <TextLink
            href={project.caseStudyHref}
            aria-label={`Voir l’étude de cas — ${project.name}`}
          >
            Voir l’étude de cas
          </TextLink>
        )}
      </div>
      <ProjectVisual name={project.name} assetKey={project.assetKey} />
    </article>
  );
}
