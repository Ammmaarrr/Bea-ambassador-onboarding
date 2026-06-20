/**
 * Vertical spacing audit — Artboard 4 vs /account DOM.
 * Run: node measure_account_vertical.mjs
 */
import { PNG } from "pngjs";
import { chromium } from "./node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const img = PNG.sync.read(
  fs.readFileSync(path.join(root, "design/artboards/Artboard  4.png")),
);
const px = (x, y) => {
  const i = (img.width * y + x) << 2;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};
const lum = (x, y) => {
  const [r, g, b] = px(x, y);
  return (r + g + b) / 3;
};

function band(y0, y1, test, min = 30) {
  let first = -1;
  let last = -1;
  for (let y = y0; y < y1; y++) {
    let c = 0;
    for (let x = 76; x < 580; x++) if (test(x, y)) c++;
    if (c > min) {
      if (first < 0) first = y;
      last = y;
    }
  }
  return first >= 0 ? { first, last, height: last - first + 1 } : null;
}

const art = {
  eyebrow: band(265, 310, (x, y) => {
    const [r, g, b] = px(x, y);
    return r > 168 && r < 218 && g > 108 && g < 168 && b < 108;
  }, 8),
  title: band(290, 370, (x, y) => lum(x, y) < 55, 120),
  subtitle: band(320, 390, (x, y) => {
    const l = lum(x, y);
    return l > 95 && l < 148;
  }, 70),
  labelName: band(378, 398, (x, y) => lum(x, y) < 75, 15),
  inputName: band(400, 478, (x, y) => {
    const [r, g, b] = px(x, y);
    return r > 248 && g > 248;
  }, 400),
  labelEmail: band(518, 538, (x, y) => lum(x, y) < 75, 15),
  inputEmail: band(543, 620, (x, y) => {
    const [r, g, b] = px(x, y);
    return r > 248 && g > 248;
  }, 400),
  labelPwd: band(665, 685, (x, y) => lum(x, y) < 75, 15),
  inputPwd: band(688, 765, (x, y) => {
    const [r, g, b] = px(x, y);
    return r > 248 && g > 248;
  }, 400),
  hint: band(778, 800, (x, y) => {
    const l = lum(x, y);
    return l > 110 && l < 175;
  }, 12),
  cta: band(828, 886, (x, y) => px(x, y)[0] < 40, 350),
  divider: band(908, 938, (x, y) => {
    const l = lum(x, y);
    return l > 175 && l < 225;
  }, 250),
  social: band(962, 1020, (x, y) => {
    const [r, g, b] = px(x, y);
    return r > 248 && g > 248;
  }, 180),
  legal: band(1055, 1075, (x, y) => lum(x, y) < 130, 20),
};

console.log("=== Artboard vertical bands ===");
for (const [k, v] of Object.entries(art)) console.log(k, v);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1367, height: 1153 } });
const page = await ctx.newPage();
for (const url of ["http://localhost:3010/account", "http://localhost:3000/account"]) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
    break;
  } catch {
    /* try next */
  }
}
await page.waitForTimeout(1500);

const domKeys = [
  [".onboarding-canvas__account-eyebrow", "eyebrow"],
  [".onboarding-canvas__account-title", "title"],
  [".onboarding-canvas__account-subtitle", "subtitle"],
  ['.onboarding-canvas__field-label[for="account-name"]', "labelName"],
  ["#account-name", "inputName"],
  ["#account-email", "inputEmail"],
  ["#account-password", "inputPwd"],
  [".onboarding-canvas__field-hint", "hint"],
  [".onboarding-canvas__cta", "cta"],
  [".onboarding-canvas__or-divider", "divider"],
  [".onboarding-canvas__social-btn", "social"],
  [".onboarding-canvas__legal", "legal"],
];

console.log("\n=== DOM boxes ===");
const dom = {};
for (const [sel, key] of domKeys) {
  const el = await page.$(sel);
  if (!el) continue;
  const box = await el.boundingBox();
  dom[key] = box ? { first: Math.round(box.y), last: Math.round(box.y + box.height), height: Math.round(box.height) } : null;
  console.log(key, dom[key]);
}

console.log("\n=== Delta (DOM.first - art.first) ===");
for (const key of Object.keys(art)) {
  if (art[key] && dom[key]) {
    console.log(key, dom[key].first - art[key].first, `(art ${art[key].first}, dom ${dom[key].first})`);
  }
}

await browser.close();
