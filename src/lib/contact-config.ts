import "server-only";
import { z } from "zod";

const email = z.email().max(254);
const configSchema = z.object({
  deliveryEnabled: z.literal("true"),
  resendKey: z.string().trim().min(1),
  arcjetKey: z.string().trim().min(1),
  from: email,
  to: email,
});
export type ContactConfig = z.output<typeof configSchema>;
export function getContactConfig(
  env: Readonly<Record<string, string | undefined>> = process.env,
): ContactConfig | null {
  // Resend logs provider error details in development; real sends use a production build.
  if (env.NODE_ENV !== "production") return null;
  const result = configSchema.safeParse({
    deliveryEnabled: env.CONTACT_DELIVERY_ENABLED,
    resendKey: env.RESEND_API_KEY,
    arcjetKey: env.ARCJET_KEY,
    from: env.CONTACT_FROM_EMAIL,
    to: env.CONTACT_TO_EMAIL || "contact@sgautier.dev",
  });
  return result.success ? result.data : null;
}
