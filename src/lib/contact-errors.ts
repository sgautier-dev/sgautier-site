import "server-only";
import type { ContactErrorCode } from "./contact-messages";

export class ContactFailure extends Error {
  constructor(readonly code: ContactErrorCode) {
    super(code);
    this.name = "ContactFailure";
  }
}
export function safeContactError(error: unknown): ContactErrorCode {
  return error instanceof ContactFailure ? error.code : "CONTACT_FAILED";
}
