import "server-only";
import { createSafeActionClient } from "next-safe-action";
import { safeContactError } from "./contact-errors";

export const actionClient = createSafeActionClient({
  defaultValidationErrorsShape: "flattened",
  handleServerError(error) {
    const code = safeContactError(error);
    console.warn(code);
    return code;
  },
});
