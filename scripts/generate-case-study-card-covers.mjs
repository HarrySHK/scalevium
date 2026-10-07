/**
 * Renders on-brand case study card covers (dark + light) from the Voice Agent flowchart
 * .dc.html files into public/case-studies/cards/. The flowchart PNGs stay the detail-page hero.
 * Requires: npx playwright install chromium (run once)
 */
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const voiceRoot = path.join(root, "public", "Voice Agent Case Studies");
const outDir = path.join(root, "public", "case-studies", "cards");

const WIDTH = 1280;
const HEIGHT = 880; // 16:11 — matches .case-study-card--compact .case-study-card-media-frame

const CASES = [
  { slug: "ai-hospitality-receptionist", dir: "Hospitality/Hotel AI Receptionist" },
  { slug: "ai-dental-receptionist", dir: "Healthcare/Dental AI Scheduling" },
  { slug: "ai-therapy-receptionist", dir: "Healthcare/Therapy AI Intake" },
  { slug: "ai-gym-receptionist", dir: "Fitness & Wellness/Gym AI Booking" },
  { slug: "ai-spa-receptionist", dir: "Fitness & Wellness/Spa AI Receptionist" },
  {
    slug: "ai-med-spa-receptionist",
    // No flowchart source exists for this study; content is drawn from its case study copy.
    data: {
      eyebrow: "Voice agent",
      callTime: "Sample call · 6:15 PM",
      caller: "Hi, I'd like a Botox consultation — ideally with my usual injector.",
      agent: "Of course. She has Thursday at 4 PM open. I've booked your complimentary consultation and texted the details.",
      agentNode: { label: "AI agent", title: "Scalevium voice agent" },
      outcomes: [
        { label: "Books", title: "Consultation" },
        { label: "Answers", title: "Treatments & pricing" },
        { label: "Hands off", title: "Clinical questions" },
      ],
      integrations: ["Boulevard", "Mangomint", "SMS"],
      dashboard: { title: "Call dashboard", desc: "Transcript, summary, outcome" },
    },
  },
];

const THEMES = {
  dark: {
    bg: "#070709",
    bgAlt: "#0e1118",
    surface: "rgba(16, 22, 32, 0.88)",
    surfaceSolid: "#101620",
    text: "#f4f4f6",
    muted: "#9aa4b2",
    accent: "#3E7BFA",
    accentText: "#6EA0FF",
    border: "rgba(255, 255, 255, 0.09)",
    grid: "rgba(110, 160, 255, 0.07)",
    glowAlpha: 0.32,
    bubbleCaller: "rgba(255, 255, 255, 0.05)",
    bubbleAgent: "rgba(62, 123, 250, 0.16)",
    shadow: "0 30px 60px -30px rgba(0, 0, 0, 0.8)",
    logo: "logo-dark.png",
  },
  light: {
    bg: "#f6f7f9",
    bgAlt: "#e9eef6",
    surface: "rgba(255, 255, 255, 0.92)",
    surfaceSolid: "#ffffff",
    text: "#0b0e14",
    muted: "#4b5565",
    accent: "#2563eb",
    accentText: "#2563eb",
    border: "rgba(11, 14, 20, 0.10)",
    grid: "rgba(37, 99, 235, 0.07)",
    glowAlpha: 0.22,
    bubbleCaller: "#f1f3f7",
    bubbleAgent: "rgba(37, 99, 235, 0.09)",
    shadow: "0 30px 60px -32px rgba(15, 23, 42, 0.28)",
    logo: "logo-light.png",
  },
};

function hexToRgba(hex, alpha) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function extractFlowchart(page, htmlPath) {
  await page.goto(`file:///${htmlPath.replace(/\\/g, "/")}`, { waitUntil: "networkidle", timeout: 120_000 });
  await page.locator("[data-screen-label]").first().waitFor({ state: "visible", timeout: 30_000 });

  return page.evaluate(() => {
    const stage = document.querySelector("[data-screen-label]");
    const text = (el) => (el?.textContent || "").trim();
    const nodes = Array.from(stage.children)
      .filter((d) => d.tagName === "DIV" && d.children.length === 3 && d.style.height === "140px")
      .map((d) => ({
        label: text(d.children[0]),
        title: text(d.children[1]),
        desc: text(d.children[2]),
        top: parseInt(d.style.top, 10),
        left: parseInt(d.style.left, 10),
      }));

    const sampleLabel = Array.from(stage.querySelectorAll("div")).find(
      (d) => d.children.length === 0 && /^Sample call/i.test(text(d))
    );
    const lines = sampleLabel
      ? Array.from(sampleLabel.nextElementSibling.children).map((c) => ({ who: text(c.children[0]), text: text(c.children[1]) }))
      : [];

    const integrationsLabel = Array.from(stage.querySelectorAll("span")).find((s) => text(s) === "Integrations");
    const integrations = integrationsLabel
      ? Array.from(integrationsLabel.parentElement.querySelectorAll("span")).slice(1).map(text)
      : [];

    const agentNode = nodes.find((n) => /ai agent/i.test(n.label));
    const dashboardNode = nodes.reduce((last, n) => (!last || n.top > last.top ? n : last), null);
    return {
      dashboard: { title: dashboardNode?.title || "Call dashboard", desc: dashboardNode?.desc || "" },
      eyebrow: "Voice agent",
      callTime: text(sampleLabel),
      caller: lines.find((l) => /caller/i.test(l.who))?.text || "",
      agent: [...lines].reverse().find((l) => /ai agent/i.test(l.who))?.text || "",
      agentNode: { label: agentNode?.label || "AI agent", title: agentNode?.title || "Scalevium voice agent" },
      outcomes: nodes
        .filter((n) => n.top === 480 && n.left >= 700)
        .sort((a, b) => a.left - b.left)
        .map(({ label, title }) => ({ label, title })),
      integrations,
    };
  });
}

function renderCover(data, theme, logoDataUri) {
  const t = THEMES[theme];
  const outcomes = data.outcomes.slice(0, 3);
  const integrations = data.integrations.slice(0, 4);

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:${WIDTH}px;height:${HEIGHT}px;overflow:hidden;font-family:'Plus Jakarta Sans',sans-serif;-webkit-font-smoothing:antialiased}
.cover{position:relative;width:100%;height:100%;padding:56px 60px;display:flex;flex-direction:column;gap:34px;color:${t.text};
  background:
    radial-gradient(ellipse 60% 70% at 92% 8%, ${hexToRgba(t.accent, t.glowAlpha)}, transparent 70%),
    radial-gradient(ellipse 55% 60% at 0% 100%, ${hexToRgba(t.accent, t.glowAlpha * 0.65)}, transparent 70%),
    linear-gradient(160deg, ${t.bgAlt} 0%, ${t.bg} 70%);overflow:hidden}
.cover::before{content:"";position:absolute;inset:0;background-image:linear-gradient(${t.grid} 1px,transparent 1px),linear-gradient(90deg,${t.grid} 1px,transparent 1px);background-size:48px 48px;
  -webkit-mask-image:radial-gradient(ellipse 90% 90% at 50% 40%,#000 40%,transparent 100%)}
.cover>*{position:relative}
.top{display:flex;align-items:center;justify-content:space-between}
.eyebrow{display:inline-flex;align-items:center;gap:14px;padding:12px 22px;border-radius:999px;border:1.5px solid ${hexToRgba(t.accent, 0.35)};background:${hexToRgba(t.accent, 0.1)};
  font-size:22px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${t.accentText}}
.dot{width:14px;height:14px;border-radius:50%;background:${t.accentText};box-shadow:0 0 0 6px ${hexToRgba(t.accent, 0.2)}}
.logo{height:32px}
.body{flex:1;display:grid;grid-template-columns:1.25fr 1fr;gap:36px;min-height:0}
.panel{border-radius:28px;border:1.5px solid ${t.border};background:${t.surface};box-shadow:${t.shadow};padding:30px 32px;display:flex;flex-direction:column;gap:22px;min-height:0}
.panel-head{display:flex;align-items:center;justify-content:space-between;font-size:19px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${t.muted}}
.live{display:flex;align-items:center;gap:12px}
.live i{width:12px;height:12px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 5px rgba(34,197,94,.18)}
.wave{display:flex;align-items:center;gap:5px;height:30px}
.wave span{width:5px;border-radius:3px;background:${t.accentText};opacity:.85}
.bubble{border-radius:22px;padding:20px 24px;font-size:28px;line-height:1.38;font-weight:500;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden}
.bubble small{display:block;margin-bottom:6px;font-size:16px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.caller{background:${t.bubbleCaller};color:${t.muted};-webkit-line-clamp:4;border-top-left-radius:8px;margin-right:48px}
.caller small{color:${t.text}}
.agent{background:${t.bubbleAgent};color:${t.text};-webkit-line-clamp:5;border:1.5px solid ${hexToRgba(t.accent, 0.3)};border-top-right-radius:8px;margin-left:48px}
.agent small{color:${t.accentText}}
.result{margin-top:auto;display:flex;align-items:center;gap:16px;padding-top:22px;border-top:1.5px solid ${t.border};font-size:23px;color:${t.muted};white-space:nowrap;overflow:hidden}
.result b{color:${t.text};font-weight:700}
.check{flex-shrink:0;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(34,197,94,.16);color:#22c55e;font-size:20px;font-weight:700}
.flow{display:flex;flex-direction:column;gap:18px;min-height:0}
.branches{flex:1}
.outcome{flex:1;display:flex;flex-direction:column;justify-content:center}
.node-agent{border-radius:24px;padding:24px 26px;background:linear-gradient(135deg,${t.accent},${hexToRgba(t.accent, 0.78)});color:#fff;box-shadow:0 24px 48px -24px ${hexToRgba(t.accent, 0.8)}}
.node-agent small{display:block;font-size:16px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;opacity:.8;margin-bottom:6px}
.node-agent b{font-size:30px;font-weight:700;letter-spacing:-.01em}
.branches{position:relative;display:flex;flex-direction:column;gap:14px;padding-left:34px}
.branches::before{content:"";position:absolute;left:12px;top:-18px;bottom:36px;width:2px;background:${hexToRgba(t.accent, 0.45)}}
.outcome{position:relative;border-radius:20px;padding:16px 22px;background:${t.surface};border:1.5px solid ${t.border};box-shadow:${t.shadow}}
.outcome::before{content:"";position:absolute;left:-22px;top:50%;width:22px;height:2px;background:${hexToRgba(t.accent, 0.45)}}
.outcome small{display:block;font-size:15px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:${t.accentText};margin-bottom:4px}
.outcome b{font-size:25px;font-weight:700;color:${t.text};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block}
.outcome.handoff{border-color:${hexToRgba(t.accent, 0.45)};background:${hexToRgba(t.accent, theme === "dark" ? 0.12 : 0.08)}}
.outcome.handoff small{color:${t.accentText}}
.bottom{display:flex;align-items:center;gap:12px;flex-wrap:nowrap;overflow:hidden}
.bottom em{font-style:normal;font-size:18px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:${t.muted};margin-right:6px}
.chip{font-size:21px;font-weight:600;padding:9px 18px;border-radius:999px;border:1.5px solid ${t.border};background:${t.surfaceSolid};color:${t.text};white-space:nowrap}
</style></head><body>
<div class="cover">
  <div class="top">
    <span class="eyebrow"><span class="dot"></span>${esc(data.eyebrow)}</span>
    <img class="logo" src="${logoDataUri}" alt="">
  </div>
  <div class="body">
    <div class="panel">
      <div class="panel-head">
        <span class="live"><i></i>${esc(data.callTime || "Live call")}</span>
        <span class="wave">${[10, 22, 14, 28, 18, 30, 12, 24, 16, 26, 11].map((h) => `<span style="height:${h}px"></span>`).join("")}</span>
      </div>
      <div class="bubble caller"><small>Caller</small>${esc(data.caller)}</div>
      <div class="bubble agent"><small>AI agent</small>${esc(data.agent)}</div>
      <div class="result"><span class="check">✓</span><span><b>${esc(data.dashboard.title)}</b>${data.dashboard.desc ? ` · ${esc(data.dashboard.desc)}` : ""}</span></div>
    </div>
    <div class="flow">
      <div class="node-agent"><small>${esc(data.agentNode.label)}</small><b>${esc(data.agentNode.title)}</b></div>
      <div class="branches">
        ${outcomes
          .map((o) => `<div class="outcome${/hand/i.test(o.label) ? " handoff" : ""}"><small>${esc(o.label)}</small><b>${esc(o.title)}</b></div>`)
          .join("")}
      </div>
    </div>
  </div>
  <div class="bottom">
    <em>Integrations</em>
    ${integrations.map((i) => `<span class="chip">${esc(i)}</span>`).join("")}
  </div>
</div>
</body></html>`;
}

fs.mkdirSync(outDir, { recursive: true });
const logos = Object.fromEntries(
  Object.entries(THEMES).map(([name, t]) => {
    const file = path.join(root, "public", "brand", t.logo);
    return [name, `data:image/png;base64,${fs.readFileSync(file).toString("base64")}`];
  })
);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1.5 });

for (const study of CASES) {
  let data = study.data;
  if (!data) {
    const dir = path.join(voiceRoot, study.dir);
    const flowchart = fs.readdirSync(dir).find((f) => f.endsWith("Flowchart.dc.html"));
    if (!flowchart) {
      console.error("Missing flowchart in", dir);
      process.exitCode = 1;
      continue;
    }
    data = await extractFlowchart(page, path.join(dir, flowchart));
  }

  for (const theme of Object.keys(THEMES)) {
    await page.setContent(renderCover(data, theme, logos[theme]), { waitUntil: "networkidle" });
    await page.evaluate(async () => document.fonts?.ready);
    const outPath = path.join(outDir, `${study.slug}-${theme}.png`);
    await page.screenshot({ path: outPath, type: "png" });
    console.log("Wrote", path.relative(root, outPath));
  }
}

await browser.close();
