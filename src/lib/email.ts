import "server-only";
import type { ContactInput } from "./contact-schema";

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ] ?? char,
  );
}
export function buildContactEmail(
  input: ContactInput,
  config: { from: string; to: string },
) {
  const lines = [
    `Nom : ${input.name}`,
    `Email : ${input.email}`,
    ...(input.activity ? [`Entreprise / activité : ${input.activity}`] : []),
    "",
    input.message,
  ];
  return {
    from: `Sébastien Gautier <${config.from}>`,
    to: [config.to],
    replyTo: input.email,
    subject: "Nouvelle demande depuis sgautier.dev",
    text: lines.join("\n"),
    html: `<div lang="fr"><h1>Nouvelle demande de contact</h1><p><strong>Nom :</strong> ${escapeHtml(input.name)}</p><p><strong>Email :</strong> ${escapeHtml(input.email)}</p>${input.activity ? `<p><strong>Entreprise / activité :</strong> ${escapeHtml(input.activity)}</p>` : ""}<p style="white-space:pre-wrap">${escapeHtml(input.message)}</p></div>`,
  };
}
export type ContactEmail = ReturnType<typeof buildContactEmail>;
