import { cp, mkdir, mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { constants } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import { chromium, expect } from "@playwright/test";
import { pageMetadata } from "../src/data/metadata.ts";
import { renderedReleaseBlockers } from "./rendered-release.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const evidence = join(root, "artifacts/v2/batch-5/public-mode");
await mkdir(evidence, { recursive: true });
const fixture = await mkdtemp(join(tmpdir(), "sgautier-public-mode-"));
const originalLedger = await readFile(join(root, "docs/release-status.json"));
const hash = (data) => createHash("sha256").update(data).digest("hex");
const env = {
  PATH: process.env.PATH,
  HOME: process.env.HOME,
  TMPDIR: process.env.TMPDIR,
  NODE_ENV: "production",
  NEXT_TELEMETRY_DISABLED: "1",
  SITE_RELEASE: "approved",
  SITE_URL: "https://www.sgautier.dev",
  CONTACT_DELIVERY_ENABLED: "true",
  RESEND_API_KEY: "synthetic-fixture-not-a-credential",
  ARCJET_KEY: "synthetic-fixture-not-a-credential",
  CONTACT_FROM_EMAIL: "fixture@example.invalid",
  CONTACT_TO_EMAIL: "fixture@example.invalid",
};
async function run(args, logName) {
  const child = spawn(process.execPath, args, { cwd: fixture, env });
  let output = "";
  child.stdout.on("data", (chunk) => {
    output += chunk;
  });
  child.stderr.on("data", (chunk) => {
    output += chunk;
  });
  const code = await new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("exit", resolve);
  });
  await writeFile(join(evidence, logName), output);
  if (code !== 0)
    throw new Error(`Isolated command failed (${code}); inspect ${logName}.`);
}
let server;
let browser;
try {
  // Copy only application inputs. Never copy .env files, Git state or real approvals back.
  for (const entry of [
    "src",
    "public",
    "package.json",
    "package-lock.json",
    "next.config.ts",
    "tsconfig.json",
    "postcss.config.mjs",
    "scripts",
  ]) {
    await cp(join(root, entry), join(fixture, entry), {
      recursive: true,
      mode: constants.COPYFILE_FICLONE,
    });
  }
  await cp(join(root, "node_modules"), join(fixture, "node_modules"), {
    recursive: true,
    mode: constants.COPYFILE_FICLONE,
  });
  await mkdir(join(fixture, "docs"));
  await mkdir(join(fixture, "public/images"), { recursive: true });
  const status = JSON.parse(originalLedger.toString());
  for (const approval of Object.values(status.approvals)) {
    approval.approved = true;
    approval.evidence = "SYNTHETIC TEST FIXTURE ONLY — not owner authorization";
  }
  for (const [key, asset] of Object.entries(status.assets)) {
    Object.assign(asset, {
      approved: true,
      evidence: "SYNTHETIC TEST FIXTURE ONLY",
      path: `public/images/test-${key}.svg`,
      alternative: "",
      alt: `Synthetic rendering fixture: ${key}`,
      caption: "",
      width: 800,
      height: 500,
    });
    await writeFile(
      join(fixture, asset.path),
      `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="800" height="500" fill="#e8f3f0"/><text x="40" y="220" fill="#121817" font-family="sans-serif" font-size="24">Synthetic rendering fixture</text><text x="40" y="265" fill="#121817" font-family="sans-serif" font-size="20">${key} — not a project screenshot</text></svg>`,
    );
  }
  await writeFile(
    join(fixture, "docs/release-status.json"),
    JSON.stringify(status),
  );
  const document = {
    approved: true,
    evidence: "SYNTHETIC TEST FIXTURE ONLY",
    sections: [
      {
        heading: "Synthetic legal rendering fixture",
        paragraphs: [
          "This isolated test contains no legal facts and grants no publication authorization.",
        ],
      },
    ],
  };
  await writeFile(
    join(fixture, "docs/legal-content.json"),
    JSON.stringify({ legal: document, privacy: document }),
  );
  // These stubs exist only in the disposable copy. Production has no bypass flag or test endpoint.
  const configFile = join(fixture, "src/lib/contact-config.ts");
  const config = await readFile(configFile, "utf8");
  await writeFile(
    configFile,
    config.slice(0, config.indexOf("export function getContactConfig")) +
      "export function getContactConfig(): ContactConfig | null { return null; }\n",
  );
  await writeFile(
    join(fixture, "src/lib/contact-protection.ts"),
    'export async function protectContact(): Promise<"denied"> { return "denied"; }\n',
  );
  await writeFile(
    join(fixture, "src/lib/contact-delivery.ts"),
    'import type { SendResult } from "./contact-pipeline"; export async function deliverContact(): Promise<SendResult> { throw new Error("Email delivery prohibited in isolated rendering fixture."); }\n',
  );
  await run(["node_modules/next/dist/bin/next", "build"], "build.log");
  await run(["scripts/check-release.mjs"], "rendered-gate.log");
  server = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      "3199",
    ],
    { cwd: fixture, env, stdio: "ignore" },
  );
  let ready = false;
  for (let attempt = 0; attempt < 150; attempt++) {
    if (server.exitCode !== null)
      throw new Error("Isolated server exited before becoming ready.");
    try {
      if ((await fetch("http://127.0.0.1:3199")).ok) {
        ready = true;
        break;
      }
    } catch {}
    await delay(100);
  }
  if (!ready) throw new Error("Isolated server did not become ready.");
  browser = await chromium.launch({
    channel: process.env.PLAYWRIGHT_CHANNEL || "chrome",
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const externalRequests = [];
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (url.origin === "http://127.0.0.1:3199") return route.continue();
    externalRequests.push(url.origin);
    return route.abort();
  });
  let renderedImages = 0;
  for (const { route } of pageMetadata) {
    const response = await page.goto(`http://127.0.0.1:3199${route}`);
    expect(response.status()).toBe(200);
    expect(response.headers()["x-robots-tag"]).toBeUndefined();
    expect(
      renderedReleaseBlockers(await page.content(), route, status),
    ).toEqual([]);
    for (const image of await page
      .locator("[data-publication-asset] img")
      .all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      expect(await image.evaluate((element) => element.naturalWidth)).toBe(800);
      renderedImages++;
    }
    if (
      ["/", "/realisations/compta-pro", "/mentions-legales"].includes(route)
    ) {
      await page.screenshot({
        path: join(
          evidence,
          `${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}.png`,
        ),
        fullPage: true,
      });
    }
  }
  await page.goto("http://127.0.0.1:3199/contact");
  await page.getByLabel("Nom", { exact: true }).fill("Synthetic fixture");
  await page
    .getByLabel("Email", { exact: true })
    .fill("fixture@example.invalid");
  await page
    .getByLabel("Parlez-moi de votre besoin")
    .fill("Synthetic local rendering test. Never deliver this message.");
  await page.getByRole("button", { name: /Envoyer ma demande/ }).click();
  await expect(
    page
      .getByRole("form", { name: "Formulaire de contact" })
      .getByRole("alert"),
  ).toContainText("n’est pas encore disponible");
  expect(externalRequests).toEqual([]);
  const ledgerAfter = await readFile(join(root, "docs/release-status.json"));
  expect(hash(ledgerAfter)).toBe(hash(originalLedger));
  const summary = {
    mode: "isolated synthetic final-content fixture",
    routesPassed: pageMetadata.length,
    approvedImageInstancesLoaded: renderedImages,
    externalRequests,
    contactDelivery:
      "disabled in disposable source copy; real adapters removed",
    sourceLedgerUnchanged: true,
    publicationAuthorized: false,
  };
  await writeFile(
    join(evidence, "summary.json"),
    JSON.stringify(summary, null, 2) + "\n",
  );
  console.log(JSON.stringify(summary, null, 2));
} finally {
  await browser?.close();
  if (server && server.exitCode === null) {
    const stopped = new Promise((resolve) => server.once("exit", resolve));
    server.kill("SIGTERM");
    await Promise.race([stopped, delay(3000)]);
  }
  await rm(fixture, { recursive: true, force: true });
}
