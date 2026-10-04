export const contactMessages = {
  accepted:
    "Merci, votre demande a bien été transmise. Je reviendrai vers vous à cette adresse.",
  failed:
    "Le message n’a pas pu être envoyé. Vos informations sont conservées dans le formulaire. Vous pouvez réessayer ou m’écrire directement par email.",
  unknown:
    "La confirmation de l’envoi n’a pas pu être reçue. Votre message est conservé dans le formulaire. Vous pouvez réessayer ou m’écrire directement par email.",
  rateLimited:
    "Plusieurs tentatives ont été détectées en peu de temps. Merci de réessayer un peu plus tard ou de m’écrire directement par email.",
  unavailable:
    "L’envoi depuis le formulaire n’est pas encore disponible. Vous pouvez m’écrire directement à contact@sgautier.dev.",
} as const;
export type ContactErrorCode =
  | "CONTACT_FAILED"
  | "CONTACT_RATE_LIMITED"
  | "CONTACT_UNAVAILABLE"
  | "CONTACT_UNKNOWN";
export function messageForError(code: ContactErrorCode) {
  switch (code) {
    case "CONTACT_RATE_LIMITED":
      return contactMessages.rateLimited;
    case "CONTACT_UNAVAILABLE":
      return contactMessages.unavailable;
    case "CONTACT_UNKNOWN":
      return contactMessages.unknown;
    default:
      return contactMessages.failed;
  }
}
export const contactFields = ["name", "email", "activity", "message"] as const;
