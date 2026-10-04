import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const base = "http://127.0.0.1:3100";
const routes = ["/", "/services/integration-outils-api", "/realisations/compta-pro", "/contact"];
const root = fileURLToPath(new URL("../", import.meta.url));
const directory = fileURLToPath(new URL("../artifacts/lighthouse/", import.meta.url));
mkdirSync(directory, { recursive: true });
try { await fetch(base); } catch { throw new Error("Start the production server on 127.0.0.1:3100 before measuring."); }
const medians = [];
for (const route of routes) {
  const slug = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
  const runs = [];
  for (let iteration = 1; iteration <= 3; iteration++) {
    const output = `${directory}${slug}-${iteration}`;
    const result = spawnSync(process.execPath, [
      "node_modules/lighthouse/cli/index.js", `${base}${route}`,
      "--output=json", "--output=html", `--output-path=${output}`,
      "--quiet", "--chrome-flags=--headless", "--form-factor=mobile",
      "--throttling-method=simulate", "--only-categories=performance,accessibility,best-practices,seo",
    ], { cwd: root, stdio: "inherit", timeout: 120_000 });
    if (result.status !== 0) throw new Error(`Lighthouse failed for ${route}, run ${iteration}.`);
    const report = JSON.parse(readFileSync(`${output}.report.json`, "utf8"));
    if (report.runtimeError) throw new Error(`Lighthouse runtime error for ${route}.`);
    runs.push({
      performance: report.categories.performance.score * 100,
      accessibility: report.categories.accessibility.score * 100,
      bestPractices: report.categories["best-practices"].score * 100,
      seo: report.categories.seo.score * 100,
      lcpMs: report.audits["largest-contentful-paint"].numericValue,
      cls: report.audits["cumulative-layout-shift"].numericValue,
      tbtMs: report.audits["total-blocking-time"].numericValue,
      transferredBytes: report.audits["total-byte-weight"].numericValue,
      jsBytes: report.audits["resource-summary"].details.items.find(item => item.resourceType === "script")?.transferSize,
    });
    writeFileSync(`${directory}settings.json`, JSON.stringify({ lighthouseVersion: report.lighthouseVersion, userAgent: report.userAgent, environment: report.environment, configSettings: report.configSettings }, null, 2));
    console.log(`${route} run ${iteration}: performance ${runs.at(-1).performance}, accessibility ${runs.at(-1).accessibility}`);
  }
  const median = key => runs.map(run => run[key]).sort((a, b) => a - b)[1];
  medians.push({ route, runs, median: Object.fromEntries(Object.keys(runs[0]).map(key => [key, median(key)])) });
}
writeFileSync(`${directory}summary.json`, JSON.stringify(medians, null, 2));
console.log(JSON.stringify(medians.map(({ route, median }) => ({ route, ...median })), null, 2));
