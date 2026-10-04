import "server-only";
import { Resend } from "resend";
import { ContactFailure } from "./contact-errors";
import type { ContactConfig } from "./contact-config";
import type { ContactEmail } from "./email";
import type { SendResult } from "./contact-pipeline";

export async function deliverContact(
  email: ContactEmail,
  config: ContactConfig,
): Promise<SendResult> {
  const resend = new Resend(config.resendKey);
  const result = await resend.emails.send(email, {
    signal: AbortSignal.timeout(10_000),
  });
  // The SDK resolves transport failures as an application_error with a null status.
  if (
    result.error &&
    (result.error.statusCode === null ||
      (result.error.statusCode !== undefined && result.error.statusCode >= 500))
  ) {
    throw new ContactFailure("CONTACT_UNKNOWN");
  }
  return result;
}
