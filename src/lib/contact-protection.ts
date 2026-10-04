import "server-only";
import arcjet, { detectBot, fixedWindow, request, shield } from "@arcjet/next";
import type { ContactConfig } from "./contact-config";
import type { ProtectionResult } from "./contact-pipeline";

type DecisionSummary = {
  isAllowed(): boolean;
  isDenied(): boolean;
  isErrored(): boolean;
  reason: { isRateLimit(): boolean };
  results: readonly { conclusion: string }[];
};
export function classifyDecision(decision: DecisionSummary): ProtectionResult {
  if (decision.isDenied() && decision.reason.isRateLimit())
    return "rate-limited";
  if (decision.isDenied()) return "denied";
  if (
    decision.isErrored() ||
    decision.results.some(
      (result) =>
        result.conclusion === "ERROR" || result.conclusion === "CHALLENGE",
    )
  )
    return "errored";
  return decision.isAllowed() ? "allowed" : "errored";
}
export async function protectContact(
  config: ContactConfig,
): Promise<ProtectionResult> {
  const protection = arcjet({
    key: config.arcjetKey,
    characteristics: ["ip.src"],
    rules: [
      shield({ mode: "LIVE" }),
      detectBot({ mode: "LIVE", allow: [] }),
      fixedWindow({ mode: "LIVE", window: "60s", max: 5 }),
    ],
    log: {
      debug() {},
      info() {},
      warn() {
        console.warn("CONTACT_PROTECTION_WARNING");
      },
      error() {
        console.warn("CONTACT_PROTECTION_ERROR");
      },
    },
  });
  const incomingRequest = await request();
  return classifyDecision(await protection.protect(incomingRequest));
}
