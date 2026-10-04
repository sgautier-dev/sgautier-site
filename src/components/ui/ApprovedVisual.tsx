import Image from "next/image";
import portrait from "@/images/portrait-sebastien.jpg";
import type { ApprovedAsset, AssetKey } from "@/lib/publication-schema";

export function ApprovedVisual({
  assetKey,
  asset,
  className = "project-visual",
  reveal = false,
}: {
  assetKey: AssetKey;
  asset: ApprovedAsset;
  className?: string;
  reveal?: boolean;
}) {
  return (
    <figure
      className={className}
      data-publication-asset={assetKey}
      data-reveal={reveal ? "visual" : undefined}
    >
      {asset.path ? (
        <Image
          src={
            asset.path === "src/images/portrait-sebastien.jpg"
              ? portrait
              : asset.path.replace(/^public/, "")
          }
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          sizes={
            assetKey === "portrait"
              ? "(min-width: 1024px) 440px, (min-width: 540px) 40vw, 320px"
              : "(min-width: 1024px) 760px, (min-width: 768px) 50vw, 100vw"
          }
        />
      ) : (
        <div className="approved-alternative">
          <p>{asset.alternative}</p>
        </div>
      )}
      {asset.caption && <figcaption>{asset.caption}</figcaption>}
    </figure>
  );
}
