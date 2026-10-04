import Image, { type StaticImageData } from "next/image";

type ProjectVisualProps = {
  name: string;
  image?: StaticImageData;
  alt?: string;
  caption?: string;
  review?: boolean;
};
export function ProjectVisual({
  name,
  image,
  alt,
  caption,
  review,
}: ProjectVisualProps) {
  return (
    <figure className="project-visual">
      {image ? (
        <div className="screenshot-frame">
          <Image
            src={image}
            alt={alt || name}
            sizes="(min-width: 1024px) 760px, (min-width: 768px) 50vw, 100vw"
          />
        </div>
      ) : (
        <div className="project-placeholder">
          <span className="placeholder-mark" aria-hidden="true">
            {name === "Compta Pro"
              ? "cp."
              : name === "Aqua Dance Flow"
                ? "adf."
                : name === "Holistis"
                  ? "h."
                  : name
                      .split(" ")
                      .map((word) => word[0])
                      .slice(0, 3)
                      .join("")
                      .toLowerCase() + "."}
          </span>
          <p>
            {name === "Compta Pro"
              ? "Capture de démonstration à intégrer avant publication"
              : "Capture du projet à intégrer avant publication"}
            {review && " — vue de contrôle"}
          </p>
          <span className="preview-label">Prévisualisation non publique</span>
        </div>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
