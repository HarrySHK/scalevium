/**
 * Renders Voice Agent flowchart .dc.html files to PNG hero assets under public/case-studies/.
 * Requires: npx playwright install chromium (run once)
 */
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const voiceRoot = path.join(root, "public", "Voice Agent Case Studies");

/** slug → flowchart filename relative to industry folder */
const CASES = [
  {
    slug: "ai-hospitality-receptionist",
    dir: path.join(voiceRoot, "Hospitality", "Hotel AI Receptionist"),
    flowchart: "Hotel AI Receptionist Flowchart.dc.html",
  },
  {
    slug: "ai-gym-receptionist",
    dir: path.join(voiceRoot, "Fitness & Wellness", "Gym AI Booking"),
    flowchart: "Gym AI Booking Flowchart.dc.html",
  },
  {
    slug: "ai-spa-receptionist",
    dir: path.join(voiceRoot, "Fitness & Wellness", "Spa AI Receptionist"),
    flowchart: "Spa AI Receptionist Flowchart.dc.html",
  },
  {
    slug: "ai-therapy-receptionist",
    dir: path.join(voiceRoot, "Healthcare", "Therapy AI Intake"),
    flowchart: "Therapy AI Intake Flowchart.dc.html",
  },
  {
    slug: "ai-dental-receptionist",
    dir: path.join(voiceRoot, "Healthcare", "Dental AI Scheduling"),
    flowchart: "Dental AI Scheduling Flowchart.dc.html",
  },
];

const outDir = path.join(root, "public", "case-studies");
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();

for (const { slug, dir, flowchart } of CASES) {
  const htmlPath = path.join(dir, flowchart);
  if (!fs.existsSync(htmlPath)) {
    console.error("Missing flowchart:", htmlPath);
    process.exitCode = 1;
    continue;
  }

  const fileUrl = `file:///${htmlPath.replace(/\\/g, "/")}`;
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1600 },
    deviceScaleFactor: 2,
  });
  await page.goto(fileUrl, { waitUntil: "networkidle", timeout: 120_000 });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(800);

  const outPath = path.join(outDir, `${slug}.png`);
  const diagram = page.locator("[data-screen-label]").first();
  await diagram.waitFor({ state: "visible", timeout: 30_000 });
  await diagram.screenshot({ path: outPath, type: "png" });
  await page.close();
  console.log("Wrote", outPath);
}

await browser.close();
