"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container system-page">
      <h1>La page n’a pas pu être chargée.</h1>
      <p>
        Vous pouvez réessayer ou m’écrire directement à{" "}
        <a href="mailto:contact@sgautier.dev">contact@sgautier.dev</a>.
      </p>
      <button type="button" className="button" onClick={() => reset()}>
        Réessayer
      </button>
    </div>
  );
}
