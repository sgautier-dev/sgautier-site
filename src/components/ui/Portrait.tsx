import Image from "next/image";
import portrait from "@/images/portrait-sebastien.jpg";
export function Portrait() {
  return (
    <figure className="portrait">
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
