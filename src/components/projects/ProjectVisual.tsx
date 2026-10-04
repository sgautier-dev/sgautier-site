import { getApprovedAsset } from "@/lib/publication";
import type { AssetKey } from "@/lib/publication-schema";
import { ApprovedVisual } from "@/components/ui/ApprovedVisual";

type ProjectVisualProps = {
  name: string;
  assetKey: AssetKey;
  caption?: string;
  review?: boolean;
};
export function ProjectVisual({
  name,
  assetKey,
  caption,
  review,
}: ProjectVisualProps) {
  const asset = getApprovedAsset(assetKey);
  if (asset) return <ApprovedVisual assetKey={assetKey} asset={asset} />;
  return (
    <figure className="project-visual">
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
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
