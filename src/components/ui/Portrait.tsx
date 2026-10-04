import Image from "next/image";
import portrait from "@/images/portrait-sebastien.jpg";
import { getApprovedAsset } from "@/lib/publication";
import { ApprovedVisual } from "./ApprovedVisual";
export function Portrait() {
  const asset = getApprovedAsset("portrait");
  if (asset)
    return (
      <ApprovedVisual
        assetKey="portrait"
        asset={asset}
        className="portrait"
        reveal
      />
    );
  return (
    <figure className="portrait" data-reveal>
      <Image
        src={portrait}
        alt="Sébastien Gautier"
        sizes="(min-width: 1024px) 440px, (min-width: 540px) 40vw, 320px"
      />
      <figcaption>
        Portrait existant · sélection à valider avant publication
      </figcaption>
    </figure>
  );
}
