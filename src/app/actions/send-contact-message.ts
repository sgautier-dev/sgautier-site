"use server";

import { actionClient } from "@/lib/safe-action";
import { contactSchema } from "@/lib/contact-schema";
import { getContactConfig } from "@/lib/contact-config";
import { processContact } from "@/lib/contact-pipeline";
import { protectContact } from "@/lib/contact-protection";
import { deliverContact } from "@/lib/contact-delivery";

export const sendContactMessage = actionClient
  .inputSchema(contactSchema)
  .action(async ({ parsedInput }) =>
    processContact(parsedInput, {
      config: getContactConfig,
      protect: protectContact,
      send: deliverContact,
    }),
  );
