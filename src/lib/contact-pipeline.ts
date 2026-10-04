import "server-only";
import { ContactFailure } from "./contact-errors";
import { buildContactEmail, type ContactEmail } from "./email";
import type { ContactConfig } from "./contact-config";
import type { ContactInput } from "./contact-schema";

export type ProtectionResult =
  "allowed" | "denied" | "rate-limited" | "errored";
export type SendResult = { data: { id: string } | null; error: unknown };
export type ContactDependencies = {
  config: () => ContactConfig | null;
  protect: (config: ContactConfig) => Promise<ProtectionResult>;
  send: (email: ContactEmail, config: ContactConfig) => Promise<SendResult>;
};
export async function processContact(
  input: ContactInput,
  dependencies: ContactDependencies,
): Promise<{ accepted: true }> {
  if (input.contact_info.trim()) throw new ContactFailure("CONTACT_FAILED");
  const config = dependencies.config();
  if (!config) throw new ContactFailure("CONTACT_UNAVAILABLE");
  let protection: ProtectionResult;
  try {
    protection = await dependencies.protect(config);
  } catch {
    throw new ContactFailure("CONTACT_FAILED");
  }
  if (protection === "rate-limited")
    throw new ContactFailure("CONTACT_RATE_LIMITED");
  if (protection !== "allowed") throw new ContactFailure("CONTACT_FAILED");
  let result: SendResult;
  try {
    result = await dependencies.send(buildContactEmail(input, config), config);
  } catch {
    throw new ContactFailure("CONTACT_UNKNOWN");
  }
  if (result.error) throw new ContactFailure("CONTACT_FAILED");
  if (!result.data?.id.trim()) throw new ContactFailure("CONTACT_UNKNOWN");
  return { accepted: true };
}
