/**
 * Measure waitlist page 8 (confirmed) artboard + DOM.
 * Run: node measure_waitlist_8.mjs
 */
import { PNG } from "pngjs";
import { chromium } from "./node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const img = PNG.sync.read(
  fs.readFileSync(path.join(root, "design/waitlist artboard/8.png")),
);
const px = (x, y) => {
  const i = (img.width * y + x) << 2;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};

function findBlackBtn(x0, x1, y0, y1) {
  for (let y = y0; y < y1; y++) {
    let b = 0;
    for (let x = x0; x < x1; x++) if (px(x, y)[0] < 40) b++;
    if (b > (x1 - x0) * 0.45) {
      let top = y,
        bottom = y,
        left = x1,
        right = x0;
      for (let yy = y; yy < y1; yy++) {
        let bb = 0;
        for (let x = x0; x < x1; x++) if (px(x, yy)[0] < 40) bb++;
        if (bb > (x1 - x0) * 0.35) bottom = yy;
        else if (bottom > top + 14) break;
      }
      for (let x = x0; x < x1; x++) {
        let bb = 0;
        for (let yy = top; yy <= bottom; yy++) if (px(x, yy)[0] < 40) bb++;
        if (bb > (bottom - top) * 0.4) {
          left = Math.min(left, x);
          break;
        }
      }
      for (let x = x1 - 1; x >= x0; x--) {
        let bb = 0;
        for (let yy = top; yy <= bottom; yy++) if (px(x, yy)[0] < 40) bb++;
        if (bb > (bottom - top) * 0.4) {
          right = Math.max(right, x);
          break;
        }
      }
      return { left, top, width: right - left + 1, height: bottom - top + 1 };
    }
  }
  return null;
}

function findWhiteCard(x0, x1, y0, y1) {
  for (let y = y0; y < y1; y++) {
    let w = 0;
    for (let x = x0; x < x1; x++) {
      const [r, g, b] = px(x, y);
      if (r > 248 && g > 248 && b > 246) w++;
    }
    if (w > (x1 - x0) * 0.75) {
      let top = y,
        bottom = y,
        left = x1,
        right = x0;
      for (let yy = y; yy < y1; yy++) {
        let ww = 0;
        for (let x = x0; x < x1; x++) {
          const [r, g, b] = px(x, yy);
          if (r > 248 && g > 248) ww++;
        }
        if (ww > (x1 - x0) * 0.65) bottom = yy;
        else if (bottom > top + 40) break;
      }
      for (let x = x0; x < x1; x++) {
        let ww = 0;
        for (let yy = top; yy <= bottom; yy++) {
          const [r, g, b] = px(x, yy);
          if (r > 248 && g > 248) ww++;
        }
        if (ww > (bottom - top) * 0.5) {
          left = Math.min(left, x);
          break;
        }
      }
      for (let x = x1 - 1; x >= x0; x--) {
        let ww = 0;
        for (let yy = top; yy <= bottom; yy++) {
          const [r, g, b] = px(x, yy);
          if (r > 248 && g > 248) ww++;
        }
        if (ww > (bottom - top) * 0.5) {
          right = Math.max(right, x);
          break;
        }
      }
      if (bottom - top > 80)
        return { left, top, width: right - left + 1, height: bottom - top + 1 };
    }
  }
  return null;
}

console.log("=== Artboard 8 ===", img.width, "x", img.height);
console.log("waitingRoom pill", findWhiteCard(1050, 1300, 10, 80));
console.log("rank card", findWhiteCard(400, 970, 380, 820));
console.log("copy link btn", findBlackBtn(480, 880, 2200, 2280));
console.log(
  "perk cards",
  findWhiteCard(90, 400, 920, 1400),
  findWhiteCard(400, 720, 920, 1400),
  findWhiteCard(720, 1050, 920, 1400),
);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1367, height: 1200 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3010/waitlist/8", {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});
await page.waitForTimeout(2000);

const selectors = [
  ".waitlist-canvas__waiting-room",
  ".waitlist-canvas__confirmed-badge",
  ".waitlist-check-badge-svg",
  ".waitlist-canvas__confirmed-title",
  ".waitlist-canvas__confirmed-sub",
  ".waitlist-canvas__rank-card",
  ".waitlist-canvas__section-divider",
  ".waitlist-canvas__perks-sub",
  ".waitlist-canvas__perk-slot",
  ".waitlist-canvas__share-block",
  ".waitlist-canvas__copy-link",
  ".waitlist-canvas__confirmed-footer",
];

console.log("\n=== DOM (viewport) ===");
for (const sel of selectors) {
  const items = await page.$$(sel);
  for (let i = 0; i < items.length; i++) {
    const box = await items[i].boundingBox();
    console.log(sel + (items.length > 1 ? `[${i}]` : ""), box);
  }
}

await page.screenshot({ path: "shots/waitlist-8-top.png", fullPage: false });
await browser.close();
