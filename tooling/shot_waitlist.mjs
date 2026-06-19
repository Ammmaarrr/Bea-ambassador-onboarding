import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "tooling", "waitlist-shots");
const designDir = path.join(root, "design", "waitlist artboard");

const pages = [
  { url: "/waitlist", ref: "Artboard 1.png", name: "landing" },
  { url: "/waitlist/3", ref: "3.png", name: "step-3" },
  { url: "/waitlist/4", ref: "4.png", name: "step-4" },
  { url: "/waitlist/5", ref: "5.png", name: "step-5" },
  { url: "/waitlist/7", ref: "7.png", name: "step-7" },
  { url: "/waitlist/8", ref: "8.png", name: "step-8" },
];

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1367, height: 900 },
  deviceScaleFactor: 1,
});

for (const p of pages) {
  await page.goto(`http://localhost:3000${p.url}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const refPath = path.join(designDir, p.ref);
  const refB64 = fs.readFileSync(refPath).toString("base64");
  const height = p.name === "landing" ? 2102 : p.name === "step-8" ? 2749 : p.name === "step-5" ? 1226 : 847;

  await page.setViewportSize({ width: 1367, height: Math.min(height, 1200) });
  await page.goto(`http://localhost:3000${p.url}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  await page.screenshot({
    path: path.join(outDir, `${p.name}-app.png`),
    fullPage: p.name === "landing" || p.name === "step-8",
  });

  await page.evaluate(
    ({ b64, h }) => {
      document.getElementById("__pp")?.remove();
      const img = document.createElement("img");
      img.id = "__pp";
      img.src = `data:image/png;base64,${b64}`;
      img.style.cssText = [
        "position:fixed",
        "top:0",
        "left:0",
        "width:1367px",
        `height:${h}px`,
        "z-index:99999",
        "pointer-events:none",
        "opacity:0.45",
      ].join(";");
      document.body.appendChild(img);
    },
    { b64: refB64, h: height },
  );

  await page.waitForTimeout(200);
  await page.screenshot({
    path: path.join(outDir, `${p.name}-overlay.png`),
    fullPage: p.name === "landing" || p.name === "step-8",
  });
  console.log("shot", p.name);
}

await browser.close();
console.log("done ->", outDir);
