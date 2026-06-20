/**
 * Measure waitlist page 9 (prizes) artboard + DOM.
 * Run: node measure_waitlist_9.mjs
 */
import { PNG } from "pngjs";
import { chromium } from "./node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const img = PNG.sync.read(
  fs.readFileSync(path.join(root, "design/waitlist artboard/9.png")),
);
const px = (x, y) => {
  const i = (img.width * y + x) << 2;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};
const lum = (x, y) => {
  const [r, g, b] = px(x, y);
  return (r + g + b) / 3;
};
const isWhite = (x, y) => {
  const [r, g, b] = px(x, y);
  return r > 248 && g > 248 && b > 246;
};

function findBox(x0, x1, y0, y1, test) {
  for (let y = y0; y < y1; y++) {
    let hit = 0;
    for (let x = x0; x < x1; x++) if (test(x, y)) hit++;
    if (hit > (x1 - x0) * 0.55) {
      let top = y,
        bottom = y,
        left = x1,
        right = x0;
      for (let yy = y; yy < y1; yy++) {
        let h = 0;
        for (let x = x0; x < x1; x++) if (test(x, yy)) h++;
        if (h > (x1 - x0) * 0.45) bottom = yy;
        else if (bottom > top + 20) break;
      }
      for (let x = x0; x < x1; x++) {
        let h = 0;
        for (let yy = top; yy <= bottom; yy++) if (test(x, yy)) h++;
        if (h > (bottom - top) * 0.45) {
          left = Math.min(left, x);
          break;
        }
      }
      for (let x = x1 - 1; x >= x0; x--) {
        let h = 0;
        for (let yy = top; yy <= bottom; yy++) if (test(x, yy)) h++;
        if (h > (bottom - top) * 0.45) {
          right = Math.max(right, x);
          break;
        }
      }
      return { left, top, width: right - left + 1, height: bottom - top + 1 };
    }
  }
  return null;
}

const peach = (x, y) => {
  const [r, g, b] = px(x, y);
  return r > 235 && g > 225 && b > 210 && r - b > 5;
};

console.log("=== Artboard 9 ===", img.width, "x", img.height);
console.log("sidebar right edge", findBox(200, 230, 0, 1696, (x, y) => lum(x, y) < 230));
console.log("points card", findBox(820, 1180, 80, 260, isWhite));
console.log("title band y=108", (() => {
  let d = 0;
  for (let x = 260; x < 780; x++) if (lum(x, 108) < 100) d++;
  return d;
})());
console.log("reward1", findBox(250, 580, 320, 720, isWhite));
console.log("reward2", findBox(580, 880, 320, 720, isWhite));
console.log("reward3", findBox(880, 1180, 320, 720, isWhite));
console.log("school banner", findBox(250, 1180, 700, 840, peach));
console.log("prompts card", findBox(250, 1180, 840, 1020, isWhite));
console.log("earn left", findBox(250, 540, 1030, 1580, isWhite));
console.log("earn right", findBox(540, 830, 1030, 1580, isWhite));
console.log("standing", findBox(820, 1180, 1030, 1580, isWhite));
console.log("profile", findBox(1100, 1280, 30, 90, isWhite));

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1367, height: 1696 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3010/waitlist/9", {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});
await page.waitForTimeout(2000);

const selectors = [
  ".waitlist-canvas__prizes-sidebar",
  ".waitlist-canvas__prizes-profile",
  ".waitlist-canvas__prizes-heading",
  ".waitlist-canvas__points-card",
  ".waitlist-canvas__prizes-sectionhead",
  ".waitlist-canvas__reward-row",
  ".waitlist-canvas__reward-card",
  ".waitlist-canvas__info-card--school",
  ".waitlist-canvas__info-card--prompts",
  ".waitlist-canvas__info-card--earn",
  ".waitlist-canvas__info-card--standing",
];

console.log("\n=== DOM ===");
for (const sel of selectors) {
  const items = await page.$$(sel);
  for (let i = 0; i < items.length; i++) {
    const box = await items[i].boundingBox();
    console.log(sel + (items.length > 1 ? `[${i}]` : ""), box);
  }
}

await page.screenshot({ path: "shots/waitlist-9-full.png", fullPage: true });
await browser.close();
