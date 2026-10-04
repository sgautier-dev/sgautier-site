import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { releaseBlockers } from "../src/lib/release-readiness.ts";
import { pageMetadata } from "../src/data/metadata.ts";
import { renderedReleaseBlockers } from "./rendered-release.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const readJson = (path) =>
  JSON.parse(readFileSync(resolve(root, path), "utf8"));
const status = readJson("docs/release-status.json");
const blockers = releaseBlockers(
  status,
  process.env,
  (path) => existsSync(resolve(root, path)),
  readJson("docs/legal-content.json"),
);
for (const { route } of pageMetadata) {
  const file = resolve(
    root,
    ".next/server/app",
    route === "/" ? "index.html" : `${route.slice(1)}.html`,
  );
  if (!existsSync(file)) blockers.push(`Built page required: ${route}`);
  else
    blockers.push(
      ...renderedReleaseBlockers(readFileSync(file, "utf8"), route, status),
    );
}
if (blockers.length) {
  console.error(`RELEASE BLOCKED: ${blockers.length} unresolved checks.`);
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exitCode = 1;
} else {
  console.log(
    "All 13 built pages passed content and asset checks. This result is not permission to publish.",
  );
}
