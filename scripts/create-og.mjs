import { chromium } from "@playwright/test";
import { readFile, mkdir } from "node:fs/promises";
const font = await readFile(
  new URL("../src/fonts/Mona-Sans.var.woff2", import.meta.url),
);
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || "chrome",
  headless: true,
});
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html lang="fr"><head><style>
  @font-face{font-family:Mona;src:url(data:font/woff2;base64,${font.toString("base64")});font-weight:200 900;font-display:swap}
  *{box-sizing:border-box}body{margin:0;background:#f7f7f2;color:#121817;font-family:Mona,Arial,sans-serif;padding:65px 72px;width:1200px;height:630px}
  header{display:flex;justify-content:space-between;align-items:center;font-size:22px;letter-spacing:-1px}header b{font-weight:600}header span{font-size:17px;color:#0f766e;letter-spacing:0}
  h1{font-weight:550;font-size:72px;line-height:1.12;letter-spacing:-4px;max-width:1000px;margin:65px 0 45px}h1 span{color:#0f766e}
  footer{border-top:1px solid #ccd8d0;padding-top:27px;display:flex;align-items:center;justify-content:space-between;font-size:19px;color:#5f6b68}.steps{color:#0f766e;font-size:21px}
  </style></head><body><header><b>Sébastien Gautier<span>.</span></b><span>Développement web · Intégrations · Automatisation</span></header><h1>Moins de tâches répétitives.<br><span>Plus de temps pour votre métier.</span></h1><footer><span class="steps">Concevoir. Connecter. Automatiser.</span><span>sgautier.dev ↗</span></footer></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await mkdir(new URL("../public/og/", import.meta.url), { recursive: true });
  await page.screenshot({
    path: new URL("../public/og/brand.png", import.meta.url).pathname,
  });
  console.log("Created public/og/brand.png (1200 × 630).");
} finally {
  await browser.close();
}
