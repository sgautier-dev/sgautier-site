import { describe, expect, it, vi } from "vitest";
import { deliverContact } from "@/lib/contact-delivery";
const { send } = vi.hoisted(() => ({ send: vi.fn() }));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));
const config = {
  deliveryEnabled: "true" as const,
  resendKey: "test-only",
  arcjetKey: "test-only",
  from: "sender@example.com",
  to: "owner@example.com",
};
const email = {
  from: "sender@example.com",
  to: ["owner@example.com"],
  replyTo: "test@example.com",
  subject: "Synthetic test",
  html: "<p>Test</p>",
  text: "Test",
};
describe("Resend adapter without network access", () => {
  it.each([null, 500, 503])(
    "treats a resolved transport or server failure (%s) as unknown",
    async (statusCode) => {
      send.mockResolvedValue({
        data: null,
        error: {
          name: "application_error",
          statusCode,
          message: "Private provider detail",
        },
      });
      await expect(deliverContact(email, config)).rejects.toMatchObject({
        code: "CONTACT_UNKNOWN",
      });
      expect(send).toHaveBeenCalledTimes(1);
    },
  );
  it("preserves a known rejection for safe pipeline mapping and applies a timeout", async () => {
    const result = {
      data: null,
      error: { name: "validation_error", statusCode: 422 },
    };
    send.mockResolvedValue(result);
    expect(await deliverContact(email, config)).toEqual(result);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0]?.[1]?.signal).toBeInstanceOf(AbortSignal);
  });
});
