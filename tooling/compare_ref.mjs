import { chromium } from "playwright";
import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";

const refPath = process.argv[2];
const url = process.argv[3] || "http://localhost:3000/";
const outDir = path.dirname(refPath);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1366, height: 1152 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const appShot = path.join(outDir, "app-compare.png");
await page.screenshot({ path: appShot, fullPage: false });

const app = await page.evaluate(() => {
  const rect = (el) => {
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return {
      left: Math.round(b.left),
      top: Math.round(b.top),
      right: Math.round(b.right),
      bottom: Math.round(b.bottom),
      w: Math.round(b.width),
      h: Math.round(b.height),
    };
  };
  const row = document.querySelector('[data-prize-row="desktop"]');
  const cards = row ? [...row.querySelectorAll("article")] : [];
  return {
    photo: rect(document.querySelector("section img")),
    h1: rect(document.querySelector("h1")),
    btn: rect(document.querySelector("button")),
    trophy: rect(document.querySelector("[data-trophy-card]")),
    h2: rect(document.querySelector("h2")),
    prizeRow: rect(row),
    cards: cards.map((c, i) => ({ i, ...rect(c) })),
    hero: rect(document.querySelector("section")),
    divider: rect(document.querySelector("section + div")),
  };
});
await browser.close();

// Analyze reference image - detect card regions by scanning for card borders
const ref = PNG.sync.read(fs.readFileSync(refPath));
const W = ref.width;
const H = ref.height;
const scaleX = 1366 / W;
const scaleY = 1152 / H;

const lum = (x, y) => {
  const i = (W * y + x) << 2;
  return (ref.data[i] + ref.data[i + 1] + ref.data[i + 2]) / 3;
};

// Find horizontal divider line (beige to prize section)
let dividerY = -1;
for (let y = Math.floor(H * 0.45); y < Math.floor(H * 0.65); y++) {
  let dark = 0;
  for (let x = Math.floor(W * 0.2); x < Math.floor(W * 0.8); x++) {
    const i = (W * y + x) << 2;
    const r = ref.data[i];
    const g = ref.data[i + 1];
    const b = ref.data[i + 2];
    if (r < 210 && g < 200 && b < 180) dark++;
  }
  if (dark > W * 0.3) {
    dividerY = y;
    break;
  }
}

// Find prize cards - look for rounded rect borders in bottom third
const cardTops = [];
const yScan0 = Math.floor(H * 0.72);
const yScan1 = Math.floor(H * 0.95);
for (let y = yScan0; y < yScan1; y++) {
  let transitions = 0;
  let prev = lum(0, y) > 200;
  for (let x = 1; x < W; x++) {
    const cur = lum(x, y) > 200;
    if (cur !== prev) transitions++;
    prev = cur;
  }
  if (transitions >= 6 && transitions <= 20) cardTops.push(y);
}
const cardTop = cardTops.length ? cardTops[0] : Math.floor(H * 0.78);

// Scan columns for card left edges at cardTop
const edges = [];
for (let x = 1; x < W - 1; x++) {
  const l = lum(x - 1, cardTop);
  const c = lum(x, cardTop);
  const r = lum(x + 1, cardTop);
  if (c < 220 && l > 230 && r > 230) edges.push(x);
}
// cluster edges into 3 card left borders
const cardLefts = edges.filter((x, i, arr) => i === 0 || x - arr[i - 1] > 30);

// measure card widths by finding right edges
const cardRects = [];
for (const left of cardLefts.slice(0, 3)) {
  let right = left;
  for (let x = left + 50; x < W; x++) {
    if (lum(x, cardTop) < 220) right = x;
    else if (right > left + 50) break;
  }
  let bottom = cardTop;
  for (let y = cardTop; y < H; y++) {
    if (lum(left + 20, y) < 230) bottom = y;
  }
  cardRects.push({
    left: Math.round(left * scaleX),
    top: Math.round(cardTop * scaleY),
    right: Math.round(right * scaleX),
    bottom: Math.round(bottom * scaleY),
    w: Math.round((right - left) * scaleX),
    h: Math.round((bottom - cardTop) * scaleY),
  });
}

console.log(
  JSON.stringify(
    {
      refSize: { w: W, h: H },
      scaledTo: { w: 1366, h: 1152 },
      refDividerY: dividerY >= 0 ? Math.round(dividerY * scaleY) : null,
      refCards: cardRects,
      app,
      appShot,
    },
    null,
    2,
  ),
);
