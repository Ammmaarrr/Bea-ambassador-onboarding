import { PNG } from "pngjs";
import fs from "fs";
import path from "path";
import { WEB_APP } from "./paths.mjs";

function lum(img, x, y) {
  const i = (img.width * y + x) << 2;
  return (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3;
}

const file = path.join(
  WEB_APP,
  "..",
  "..",
  "design",
  "artboards",
  "Artboard 1.png",
);
const img = PNG.sync.read(fs.readFileSync(file));
const rowY = 89;

// Min luminance per column across the circle band — circles/text show as dips.
const X0 = 480, X1 = 1330;
const minL = [];
for (let x = X0; x <= X1; x++) {
  let m = 255;
  for (let y = rowY - 11; y <= rowY + 11; y++) m = Math.min(m, lum(img, x, y));
  minL.push(m);
}

// background ~243. Use threshold 215 to find solid ink (circle outlines + text).
const thr = 215;
let map = "";
for (const m of minL) map += m < 150 ? "#" : m < thr ? "o" : " ";
let ruler = "";
for (let x = X0; x <= X1; x++) ruler += x % 100 === 0 ? "|" : x % 20 === 0 ? ":" : " ";
console.log(`min-lum map x=${X0}..${X1}; '#'<150 'o'<${thr} (first | = x=500)`);
console.log(map);
console.log(ruler);

// Find ink runs (separated by >=10 empty cols) = step clusters.
const runs = [];
let start = null, gap = 0;
for (let i = 0; i < minL.length; i++) {
  if (minL[i] < thr) {
    if (start === null) start = X0 + i;
    gap = 0;
  } else if (start !== null) {
    gap++;
    if (gap >= 10) {
      runs.push({ l: start, r: X0 + i - gap });
      start = null;
    }
  }
}
if (start !== null) runs.push({ l: start, r: X1 });
console.log("\nStep clusters (circle+label):");
for (const r of runs) console.log(`  ${r.l}..${r.r}  (circle≈left edge ${r.l})`);
