import { Container, TextLink } from "@/components/ui/Primitives";
export default function NotFound() {
  return (
    <Container>
      <div className="system-page">
        <span className="eyebrow">404</span>
        <h1>Cette page n’existe plus ou a changé d’adresse.</h1>
        <p className="lead">
          Vous pouvez retrouver mes services et mes réalisations, ou me
          contacter directement.
        </p>
        <div className="system-links">
          <TextLink href="/services">Voir les services</TextLink>
          <TextLink href="/realisations">Voir les réalisations</TextLink>
          <TextLink href="/contact">Me contacter</TextLink>
        </div>
      </div>
    </Container>
  );
}
