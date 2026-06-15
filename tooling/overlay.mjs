import { PNG } from "pngjs";
import fs from "node:fs";
const load = (p) => PNG.sync.read(fs.readFileSync(p));
const design = load("design-page-0.png");
const app = load("app-fullpage.png");
const w = Math.min(design.width, app.width);
const h = Math.min(design.height, app.height);
const out = new PNG({ width: w, height: h });
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const di = (design.width * y + x) << 2;
    const ai = (app.width * y + x) << 2;
    const oi = (w * y + x) << 2;
    const dl = (design.data[di] + design.data[di + 1] + design.data[di + 2]) / 3;
    const al = (app.data[ai] + app.data[ai + 1] + app.data[ai + 2]) / 3;
    // design ink -> red, app ink -> cyan(green+blue); overlap -> dark/neutral
    out.data[oi] = al;            // R from app brightness
    out.data[oi + 1] = dl;        // G from design brightness
    out.data[oi + 2] = dl;        // B from design brightness
    out.data[oi + 3] = 255;
  }
}
fs.writeFileSync("overlay.png", PNG.sync.write(out));
console.log("wrote overlay.png (red fringe = APP element, cyan fringe = DESIGN element, gray = aligned)");
