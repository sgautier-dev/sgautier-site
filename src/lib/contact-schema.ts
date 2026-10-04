import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Indiquez votre nom.")
    .max(100, "Le nom doit contenir au maximum 100 caractères."),
  email: z
    .string()
    .trim()
    .max(254, "L’adresse email est trop longue.")
    .email("Indiquez une adresse email valide."),
  activity: z
    .string()
    .trim()
    .max(160, "L’activité doit contenir au maximum 160 caractères.")
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .min(10, "Décrivez votre besoin en au moins 10 caractères.")
    .max(5000, "Le message doit contenir au maximum 5 000 caractères."),
  contact_info: z
    .string()
    .max(200, "Le formulaire n’a pas pu être validé.")
    .optional()
    .default(""),
});
export type ContactInput = z.output<typeof contactSchema>;
export type ContactField = "name" | "email" | "activity" | "message";
