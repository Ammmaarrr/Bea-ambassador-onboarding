import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { ARTBOARDS_DIR, webPublic } from "./paths.mjs";

const srcPath = path.join(ARTBOARDS_DIR, "Artboard 1_6.png");
const outCards = webPublic("images", "cards");
const outSlices = webPublic("images");
const outRef = webPublic("reference");

for (const d of [outCards, outSlices, outRef]) fs.mkdirSync(d, { recursive: true });

const img = PNG.sync.read(fs.readFileSync(srcPath));
const W = img.width;
const H = img.height;

const px = (x, y) => {
  const i = (W * y + x) << 2;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};
const lum = (x, y) => {
  const [r, g, b] = px(x, y);
  return (r + g + b) / 3;
};
const isCardWhite = (x, y) => {
  const [r, g, b] = px(x, y);
  return r > 252 && g > 251 && b > 249;
};

// Prize row: scan y for three white card tops
let rowY = -1;
for (let y = Math.floor(H * 0.68); y < Math.floor(H * 0.92); y++) {
  let starts = 0;
  for (let x = 80; x < W - 80; x++) {
    if (isCardWhite(x, y) && !isCardWhite(x, y - 1)) starts++;
  }
  if (starts >= 3) {
    rowY = y;
    break;
  }
}
if (rowY < 0) rowY = Math.floor(H * 0.78);

const cardStarts = [];
for (let x = 60; x < W - 60; x++) {
  if (isCardWhite(x, rowY + 8) && !isCardWhite(x - 1, rowY + 8)) cardStarts.push(x);
}

const rects = [];
for (const left of cardStarts.slice(0, 3)) {
  let right = left;
  for (let x = left + 40; x < W; x++) {
    if (isCardWhite(x, rowY + 40)) right = x;
    else if (right > left + 100) break;
  }
  let bottom = rowY;
  for (let y = rowY; y < H - 20; y++) {
    if (isCardWhite(left + 30, y)) bottom = y;
  }
  rects.push({ left, top: rowY, right, bottom, w: right - left + 1, h: bottom - rowY + 1 });
}

console.log("Artboard", W + "x" + H);
console.log("Prize cards:", rects);

function crop(rect, dest) {
  const { left, top, right, bottom } = rect;
  const w = right - left + 1;
  const h = bottom - top + 1;
  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const si = (W * (top + y) + (left + x)) << 2;
      const di = (w * y + x) << 2;
      out.data[di] = img.data[si];
      out.data[di + 1] = img.data[si + 1];
      out.data[di + 2] = img.data[si + 2];
      out.data[di + 3] = img.data[si + 3];
    }
  }
  fs.writeFileSync(dest, PNG.sync.write(out));
  console.log("Wrote", path.basename(dest), w + "x" + h);
}

const names = ["campus", "market", "national"];
rects.forEach((r, i) => crop(r, path.join(outCards, `${names[i]}.png`)));

// Hero slices (measured from 1367 artboard)
const slices = [
  { name: "hero-students.png", x0: 0, y0: 0, x1: 404, y1: 674 },
  { name: "hero-trophy-card.png", x0: 992, y0: 122, x1: 1284, y1: 612 },
];
for (const s of slices) {
  crop(
    { left: s.x0, top: s.y0, right: s.x1 - 1, bottom: s.y1 - 1 },
    path.join(outSlices, s.name),
  );
}

fs.copyFileSync(srcPath, path.join(outRef, "Artboard-1_6.png"));
console.log("Copied reference artboard");
