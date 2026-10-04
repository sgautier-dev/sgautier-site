import { describe, it, expect, vi, beforeEach } from "vitest";
import { actionClient } from "@/lib/safe-action";
import { contactSchema } from "@/lib/contact-schema";
import {
  processContact,
  type ContactDependencies,
  type ProtectionResult,
} from "@/lib/contact-pipeline";
import { getContactConfig } from "@/lib/contact-config";
import { safeContactError } from "@/lib/contact-errors";
import { buildContactEmail } from "@/lib/email";

const validInput = {
  name: " Test Person ",
  email: " test@example.com ",
  activity: " Example activity ",
  message: " A synthetic contact request. ",
  contact_info: "",
};
const config = {
  deliveryEnabled: "true" as const,
  resendKey: "test-only-key",
  arcjetKey: "test-only-key",
  from: "contact@example.com",
  to: "owner@example.com",
};
function setup() {
  const configMock = vi.fn(() => config);
  const protect = vi
    .fn<ContactDependencies["protect"]>()
    .mockResolvedValue("allowed");
  const send = vi.fn<ContactDependencies["send"]>().mockResolvedValue({
    data: { id: "synthetic-acceptance-id" },
    error: null,
  });
  const action = actionClient
    .inputSchema(contactSchema)
    .action(({ parsedInput }) =>
      processContact(parsedInput, { config: configMock, protect, send }),
    );
  return { action, configMock, protect, send };
}
beforeEach(() => {
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

describe("contact validation", () => {
  it("trims all public fields and supports omitted optional fields", () => {
    expect(contactSchema.parse(validInput)).toEqual({
      name: "Test Person",
      email: "test@example.com",
      activity: "Example activity",
      message: "A synthetic contact request.",
      contact_info: "",
    });
    expect(
      contactSchema.parse({
        name: "Person",
        email: "test@example.com",
        message: "A valid request.",
      }).activity,
    ).toBe("");
  });
  it.each([
    ["name", " "],
    ["name", "a".repeat(101)],
    ["email", "invalid"],
    ["email", "a".repeat(255)],
    ["activity", "a".repeat(161)],
    ["message", "short"],
    ["message", "a".repeat(5001)],
    ["contact_info", "a".repeat(201)],
  ])(
    "rejects invalid %s before any provider is invoked",
    async (field, value) => {
      const { action, send, protect } = setup();
      const result = await action({ ...validInput, [field]: value });
      expect(result.validationErrors?.fieldErrors).toHaveProperty(field);
      expect(send).not.toHaveBeenCalled();
      expect(protect).not.toHaveBeenCalled();
    },
  );
  it("allows exact field limits and strips unsolicited recipients", () => {
    const result = contactSchema.parse({
      ...validInput,
      name: "a".repeat(100),
      activity: "a".repeat(160),
      message: "a".repeat(5000),
      to: "attacker@example.com",
    });
    expect(result).not.toHaveProperty("to");
  });
});

describe("contact action pipeline with isolated providers", () => {
  it("rejects the honeypot before configuration, protection and sending", async () => {
    const { action, configMock, protect, send } = setup();
    expect(
      (await action({ ...validInput, contact_info: "spam" })).serverError,
    ).toBe("CONTACT_FAILED");
    expect(configMock).not.toHaveBeenCalled();
    expect(protect).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });
  it("refuses missing configuration", async () => {
    const protect = vi.fn();
    const send = vi.fn();
    await expect(
      processContact(contactSchema.parse(validInput), {
        config: () => null,
        protect,
        send,
      }),
    ).rejects.toMatchObject({ code: "CONTACT_UNAVAILABLE" });
    expect(protect).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });
  it.each<[ProtectionResult, string]>([
    ["denied", "CONTACT_FAILED"],
    ["rate-limited", "CONTACT_RATE_LIMITED"],
    ["errored", "CONTACT_FAILED"],
  ])("fails closed for %s", async (decision, code) => {
    const { action, protect, send } = setup();
    protect.mockResolvedValue(decision);
    expect((await action(validInput)).serverError).toBe(code);
    expect(protect).toHaveBeenCalledTimes(1);
    expect(send).not.toHaveBeenCalled();
  });
  it("fails closed if protection throws without exposing its details", async () => {
    const { action, protect, send } = setup();
    protect.mockRejectedValue(new Error("private token and payload"));
    expect((await action(validInput)).serverError).toBe("CONTACT_FAILED");
    expect(send).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith("CONTACT_FAILED");
  });
  it("rejects a resolved Resend error even when an id is present", async () => {
    const { action, send } = setup();
    send.mockResolvedValue({
      data: { id: "not-accepted" },
      error: { message: "private provider response" },
    });
    expect((await action(validInput)).serverError).toBe("CONTACT_FAILED");
    expect(send).toHaveBeenCalledTimes(1);
  });
  it("reports unknown outcome if Resend throws and does not retry", async () => {
    const { action, send } = setup();
    send.mockRejectedValue(new Error("network timeout with private details"));
    expect((await action(validInput)).serverError).toBe("CONTACT_UNKNOWN");
    expect(send).toHaveBeenCalledTimes(1);
  });
  it.each([null, { id: "" }, { id: "   " }])(
    "requires a nonempty acceptance id (%j)",
    async (data) => {
      const { action, send } = setup();
      send.mockResolvedValue({ data, error: null });
      expect((await action(validInput)).serverError).toBe("CONTACT_UNKNOWN");
      expect(send).toHaveBeenCalledTimes(1);
    },
  );
  it("returns success only after provider acceptance, with a fixed sender and recipient", async () => {
    const { action, protect, send } = setup();
    expect((await action(validInput)).data).toEqual({ accepted: true });
    expect(protect).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0]?.[0]).toMatchObject({
      from: "Sébastien Gautier <contact@example.com>",
      to: ["owner@example.com"],
      replyTo: "test@example.com",
      subject: "Nouvelle demande depuis sgautier.dev",
    });
  });
});

describe("configuration and email privacy", () => {
  it("keeps delivery disabled without explicit server-side enablement", () => {
    expect(getContactConfig({})).toBeNull();
    const env = {
      NODE_ENV: "production",
      RESEND_API_KEY: "test",
      ARCJET_KEY: "test",
      CONTACT_FROM_EMAIL: "contact@example.com",
    };
    expect(getContactConfig(env)).toBeNull();
    expect(
      getContactConfig({
        ...env,
        NODE_ENV: "development",
        CONTACT_DELIVERY_ENABLED: "true",
      }),
    ).toBeNull();
    expect(
      getContactConfig({ ...env, CONTACT_DELIVERY_ENABLED: "true" })?.to,
    ).toBe("contact@sgautier.dev");
    expect(
      getContactConfig({
        ...env,
        CONTACT_DELIVERY_ENABLED: "true",
        CONTACT_FROM_EMAIL: "x\r\nBcc: x@example.com",
      }),
    ).toBeNull();
  });
  it("never exposes arbitrary exceptions", () => {
    expect(safeContactError(new Error("secret"))).toBe("CONTACT_FAILED");
    expect(safeContactError({ code: "CONTACT_UNKNOWN" })).toBe(
      "CONTACT_FAILED",
    );
  });
  it("escapes submitted HTML and leaves the subject independent of input", () => {
    const result = buildContactEmail(
      {
        ...contactSchema.parse(validInput),
        name: "Name\r\nBcc: victim@example.com",
        message: '<script>alert("x")</script> & <img src=x onerror=alert(1)>',
        activity: "",
      },
      config,
    );
    expect(result.html).not.toContain("<script>");
    expect(result.html).not.toContain("<img");
    expect(result.html).toContain("&lt;script&gt;");
    expect(result.text).toContain("<script>");
    expect(result.html).not.toContain("Entreprise / activité");
    expect(result.subject).not.toMatch(/[\r\n]/);
  });
});
