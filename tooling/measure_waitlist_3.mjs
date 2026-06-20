/**
 * Measure waitlist page 3 layout vs artboard.
 * Run: node measure_waitlist_3.mjs
 */
import { PNG } from "pngjs";
import { chromium } from "./node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const img = PNG.sync.read(
  fs.readFileSync(path.join(root, "design/waitlist artboard/3.png")),
);
const px = (x, y) => {
  const i = (img.width * y + x) << 2;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};
const lum = (x, y) => {
  const [r, g, b] = px(x, y);
  return (r + g + b) / 3;
};

function findCardTops() {
  const tops = [];
  for (const left of [100, 233, 366, 499]) {
    for (let y = 200; y < 320; y++) {
      let sepia = 0;
      for (let x = left + 5; x < left + 116; x++) {
        const [r, g, b] = px(x, y);
        if (r > 50 && r < 200 && g > 40 && g < 160 && b < 120) sepia++;
      }
      if (sepia > 25) {
        tops.push({ left, top: y });
        break;
      }
    }
  }
  return tops;
}

function scanCopyRows() {
  for (let y = 175; y < 260; y++) {
    let dark = 0;
    for (let x = 100; x < 620; x++) if (lum(x, y) < 90) dark++;
    if (dark > 30) console.log("artboard text row", y, dark);
  }
}

console.log("=== Artboard 3 ===");
console.log("card tops", findCardTops());
scanCopyRows();

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1367, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3010/waitlist/3", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(1500);

const selectors = [
  ".waitlist-canvas__step-title",
  ".waitlist-canvas__step-subtitle",
  ".waitlist-canvas__city-slot",
  ".waitlist-city-card-label",
];

console.log("\n=== DOM ===");
for (const sel of selectors) {
  const items = await page.$$(sel);
  for (let i = 0; i < items.length; i++) {
    const box = await items[i].boundingBox();
    console.log(sel + (items.length > 1 ? `[${i}]` : ""), box);
  }
}

await page.screenshot({ path: "shots/waitlist-3.png" });
await browser.close();
