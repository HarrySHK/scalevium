/**
 * Generates public/documents/scalevium-portfolio.pdf from the HTML portfolio.
 * Requires: npx playwright install chromium (run once)
 */
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "public", "documents", "scalevium-portfolio.html");
const pdfPath = path.join(root, "public", "documents", "scalevium-portfolio.pdf");

if (!fs.existsSync(htmlPath)) {
  console.error("Missing:", htmlPath);
  process.exit(1);
}

const fileUrl = `file:///${htmlPath.replace(/\\/g, "/")}`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(fileUrl, { waitUntil: "networkidle", timeout: 120_000 });
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
});
await page.waitForTimeout(500);
await page.pdf({
  path: pdfPath,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
});
await browser.close();

console.log("Wrote", pdfPath);
