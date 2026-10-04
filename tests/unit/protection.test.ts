import { expect, it } from "vitest";
import { classifyDecision } from "@/lib/contact-protection";

it.each([
  [true, false, false, false, [], "allowed"],
  [false, true, false, false, [], "denied"],
  [false, true, false, true, [], "rate-limited"],
  [false, false, true, false, [], "errored"],
  [false, false, false, false, [], "errored"],
  [true, false, false, false, [{ conclusion: "ERROR" }], "errored"],
  [true, false, false, false, [{ conclusion: "CHALLENGE" }], "errored"],
] as const)(
  "maps protection decision %j / %j / %j without allowing uncertainty",
  (allowed, denied, errored, rate, results, expected) => {
    expect(
      classifyDecision({
        isAllowed: () => allowed,
        isDenied: () => denied,
        isErrored: () => errored,
        reason: { isRateLimit: () => rate },
        results,
      }),
    ).toBe(expected);
  },
);
