import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { releaseBlockers } from "../src/lib/release-readiness.ts";

const status = JSON.parse(
  readFileSync(new URL("../docs/release-status.json", import.meta.url), "utf8"),
);
const root = new URL("../", import.meta.url).pathname;
const blockers = releaseBlockers(status, process.env, (path) =>
  existsSync(resolve(root, path)),
);
if (blockers.length) {
  console.error(`RELEASE BLOCKED: ${blockers.length} unresolved checks.`);
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exitCode = 1;
} else {
  console.log(
    "Machine-readable release checks passed. Separate owner authorization and final domain verification still apply.",
  );
}
