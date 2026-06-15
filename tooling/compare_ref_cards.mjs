import { PNG } from "pngjs";
import fs from "node:fs";
import { chromium } from "playwright";
import path from "node:path";

const refPath = process.argv[2] || "../image-bc35c685-6c07-44b0-a6dc-edd11a39a6a2.png";
const url = process.argv[3] || "http://localhost:3000/";

// Load reference and crop prize section from bottom
const ref = PNG.sync.read(fs.readFileSync(refPath));
const W = ref.width;
const H = ref.height;
console.log("Reference size:", W, "x", H);

// Save full ref scaled to 1366 if needed
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1366, height: 1152 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const appSection = await page.locator("section").nth(1);
await appSection.screenshot({ path: "compare-app-prize.png" });

const appFull = await page.screenshot({ path: "compare-app-full.png", fullPage: true });

// Measure app card boxes
const boxes = await page.evaluate(() => {
  const row = document.querySelector('[data-prize-row="desktop"]');
  if (!row) return null;
  return [...row.querySelectorAll("article")].map((el) => {
    const r = el.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top), left: Math.round(r.left) };
  });
});
console.log("App card boxes:", JSON.stringify(boxes, null, 2));

await browser.close();
