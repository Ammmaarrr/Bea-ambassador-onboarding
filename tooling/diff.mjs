import { PNG } from "pngjs";
import fs from "node:fs";

function load(p) {
  return PNG.sync.read(fs.readFileSync(p));
}

const design = load("design-page-0.png");
const app = load("app-fullpage.png");

const w = Math.min(design.width, app.width);
const h = Math.min(design.height, app.height);
console.log(`Comparing ${w}x${h}`);

const diff = new PNG({ width: w, height: h });
let totalDelta = 0;
let changed = 0;
const threshold = 32; // per-channel
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const di = (design.width * y + x) << 2;
    const ai = (app.width * y + x) << 2;
    const oi = (w * y + x) << 2;
    const dr = Math.abs(design.data[di] - app.data[ai]);
    const dg = Math.abs(design.data[di + 1] - app.data[ai + 1]);
    const db = Math.abs(design.data[di + 2] - app.data[ai + 2]);
    const delta = (dr + dg + db) / 3;
    totalDelta += delta;
    if (dr > threshold || dg > threshold || db > threshold) {
      changed++;
      diff.data[oi] = 255;
      diff.data[oi + 1] = 0;
      diff.data[oi + 2] = 0;
      diff.data[oi + 3] = 255;
    } else {
      // faded grayscale of design for context
      const g = (design.data[di] + design.data[di + 1] + design.data[di + 2]) / 3;
      const v = 255 - (255 - g) * 0.25;
      diff.data[oi] = v;
      diff.data[oi + 1] = v;
      diff.data[oi + 2] = v;
      diff.data[oi + 3] = 255;
    }
  }
}
fs.writeFileSync("diff.png", PNG.sync.write(diff));
const meanDelta = totalDelta / (w * h);
const pctChanged = (changed / (w * h)) * 100;
console.log(`Mean per-pixel color delta (0-255): ${meanDelta.toFixed(2)}`);
console.log(`Pixels differing >${threshold}/channel: ${pctChanged.toFixed(2)}%`);
console.log(`Approx visual similarity: ${(100 - meanDelta / 255 * 100).toFixed(2)}%`);
