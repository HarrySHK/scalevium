/**
 * Renders the TaxDome Workflow Automation hero and dark/light card covers.
 * Requires Playwright Chromium (already used by the other case-study art scripts).
 */
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "case-studies");
const cardDir = path.join(outDir, "cards");

const THEMES = {
  dark: {
    bg: "#070709",
    bgAlt: "#0e1118",
    surface: "rgba(16, 22, 32, 0.92)",
    surfaceSolid: "#101620",
    text: "#f4f4f6",
    muted: "#9aa4b2",
    accent: "#3E7BFA",
    accentText: "#6EA0FF",
    border: "rgba(255, 255, 255, 0.09)",
    grid: "rgba(110, 160, 255, 0.08)",
    glow: 0.28,
    row: "rgba(255, 255, 255, 0.03)",
    shadow: "0 30px 60px -30px rgba(0, 0, 0, 0.8)",
    logo: "logo-dark.png",
  },
  light: {
    bg: "#f6f7f9",
    bgAlt: "#e9eef6",
    surface: "rgba(255, 255, 255, 0.94)",
    surfaceSolid: "#ffffff",
    text: "#0b0e14",
    muted: "#4b5565",
    accent: "#2563eb",
    accentText: "#2563eb",
    border: "rgba(11, 14, 20, 0.10)",
    grid: "rgba(37, 99, 235, 0.07)",
    glow: 0.18,
    row: "#f4f7fb",
    shadow: "0 30px 60px -32px rgba(15, 23, 42, 0.28)",
    logo: "logo-light.png",
  },
};

function hexToRgba(hex, alpha) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

function markup(themeName, logoDataUri, width, height) {
  const t = THEMES[themeName];
  const compact = height < 1000;
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${width}px;
    height: ${height}px;
    overflow: hidden;
    font-family: "Plus Jakarta Sans", sans-serif;
    -webkit-font-smoothing: antialiased;
    color: ${t.text};
  }
  .stage {
    width: 100%;
    height: 100%;
    padding: ${compact ? "48px 52px" : "56px 64px"};
    display: flex;
    flex-direction: column;
    gap: ${compact ? "28px" : "32px"};
    background:
      radial-gradient(ellipse 55% 60% at 100% 0%, ${hexToRgba(t.accent, t.glow)}, transparent 68%),
      linear-gradient(165deg, ${t.bgAlt} 0%, ${t.bg} 72%);
    position: relative;
  }
  .stage::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(${t.grid} 1px, transparent 1px),
      linear-gradient(90deg, ${t.grid} 1px, transparent 1px);
    background-size: 44px 44px;
    -webkit-mask-image: radial-gradient(ellipse 85% 80% at 50% 40%, #000 35%, transparent 100%);
  }
  .stage > * { position: relative; }
  .top, .foot { display: flex; align-items: center; justify-content: space-between; }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 10px 18px;
    border-radius: 999px;
    border: 1px solid ${hexToRgba(t.accent, 0.35)};
    background: ${hexToRgba(t.accent, 0.1)};
    font-size: ${compact ? "18px" : "20px"};
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${t.accentText};
  }
  .dot { width: 10px; height: 10px; border-radius: 50%; background: ${t.accentText}; box-shadow: 0 0 0 5px ${hexToRgba(t.accent, 0.18)}; }
  .logo { height: ${compact ? "28px" : "32px"}; }
  .grid { flex: 1; min-height: 0; display: grid; grid-template-columns: 1.35fr 0.9fr; gap: 28px; }
  .panel {
    border-radius: 24px;
    border: 1px solid ${t.border};
    background: ${t.surface};
    box-shadow: ${t.shadow};
    padding: ${compact ? "22px 24px" : "26px 28px"};
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-height: 0;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${t.muted};
  }
  .live { display: flex; align-items: center; gap: 8px; }
  .live i { width: 9px; height: 9px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.16); }
  .rows { flex: 1; display: flex; flex-direction: column; gap: 12px; min-height: 0; }
  .row {
    flex: 1;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr 0.7fr;
    gap: 12px;
    align-items: center;
    padding: ${compact ? "14px 16px" : "16px 18px"};
    border-radius: 14px;
    background: ${t.row};
    border: 1px solid ${t.border};
  }
  .row strong { display: block; font-size: ${compact ? "20px" : "22px"}; letter-spacing: -0.02em; }
  .row span { display: block; margin-top: 3px; font-size: 14px; color: ${t.muted}; }
  .stage-pill, .notice {
    justify-self: start;
    font-size: 14px;
    font-weight: 700;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid ${hexToRgba(t.accent, 0.35)};
    color: ${t.accentText};
    background: ${hexToRgba(t.accent, 0.1)};
  }
  .notice { color: ${t.text}; border-color: ${t.border}; background: ${t.surfaceSolid}; }
  .agents { display: flex; flex-direction: column; gap: 12px; }
  .agent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border-radius: 14px;
    border: 1px solid ${t.border};
    background: ${t.surfaceSolid};
    font-size: 18px;
    font-weight: 700;
  }
  .agent em { font-style: normal; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${t.muted}; }
  .gate {
    margin-top: auto;
    border-radius: 16px;
    padding: 16px 18px;
    background: ${hexToRgba(t.accent, themeName === "dark" ? 0.16 : 0.08)};
    border: 1px solid ${hexToRgba(t.accent, 0.4)};
  }
  .gate small { display: block; font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${t.accentText}; margin-bottom: 6px; }
  .gate b { font-size: 20px; letter-spacing: -0.02em; }
  .foot { gap: 10px; }
  .foot em { font-style: normal; font-size: 14px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${t.muted}; margin-right: 4px; }
  .chip {
    font-size: 16px;
    font-weight: 600;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid ${t.border};
    background: ${t.surfaceSolid};
    white-space: nowrap;
  }
</style></head><body>
<div class="stage">
  <div class="top">
    <span class="eyebrow"><span class="dot"></span>Browser automation</span>
    <img class="logo" src="${logoDataUri}" alt="">
  </div>
  <div class="grid">
    <div class="panel">
      <div class="head"><span class="live"><i></i>TaxDome workspace</span><span>Sample pipeline</span></div>
      <div class="rows">
        <div class="row"><div><strong>Client file</strong><span>Pipeline · active</span></div><span class="stage-pill">Review</span><span class="notice">Note captured</span></div>
        <div class="row"><div><strong>IRS notice</strong><span>Read into the firm's system</span></div><span class="stage-pill">Intake</span><span class="notice">Context attached</span></div>
        <div class="row"><div><strong>Stage update</strong><span>Waiting on a person</span></div><span class="stage-pill">Hold</span><span class="notice">Not written yet</span></div>
      </div>
    </div>
    <div class="panel agents">
      <div class="head"><span>Four-agent system</span></div>
      <div class="agent">Intake<em>01</em></div>
      <div class="agent">Research<em>02</em></div>
      <div class="agent">Notices<em>03</em></div>
      <div class="agent">Filing<em>04</em></div>
      <div class="gate"><small>Telegram</small><b>Write blocked until approved</b></div>
    </div>
  </div>
  <div class="foot">
    <em>Stack</em>
    <span class="chip">Playwright</span>
    <span class="chip">OpenClaw</span>
    <span class="chip">ARIA snapshots</span>
    <span class="chip">Telegram</span>
    <span class="chip">TaxDome</span>
  </div>
</div>
</body></html>`;
}

fs.mkdirSync(cardDir, { recursive: true });
const logos = Object.fromEntries(
  Object.entries(THEMES).map(([name, theme]) => {
    const file = path.join(root, "public", "brand", theme.logo);
    return [name, `data:image/png;base64,${fs.readFileSync(file).toString("base64")}`];
  })
);

const browser = await chromium.launch({ channel: "chrome" });

for (const theme of Object.keys(THEMES)) {
  const card = await browser.newPage({ viewport: { width: 1280, height: 880 }, deviceScaleFactor: 1.5 });
  await card.setContent(markup(theme, logos[theme], 1280, 880), { waitUntil: "networkidle" });
  await card.evaluate(async () => document.fonts?.ready);
  const cardPath = path.join(cardDir, `taxdome-workflow-automation-${theme}.png`);
  await card.screenshot({ path: cardPath, type: "png" });
  await card.close();
  console.log("Wrote", path.relative(root, cardPath));
}

const hero = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1.5 });
await hero.setContent(markup("dark", logos.dark, 1600, 900), { waitUntil: "networkidle" });
await hero.evaluate(async () => document.fonts?.ready);
const heroPath = path.join(outDir, "taxdome-workflow-automation.png");
await hero.screenshot({ path: heroPath, type: "png" });
await hero.close();
console.log("Wrote", path.relative(root, heroPath));

await browser.close();
