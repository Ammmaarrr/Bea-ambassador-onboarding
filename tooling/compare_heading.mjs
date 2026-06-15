import { PNG } from "pngjs";
import fs from "node:fs";
const load = (p) => PNG.sync.read(fs.readFileSync(p));

// crop app heading from app-fullpage.png (2x px)
const app = load("app-fullpage.png");
function crop(img, x0, y0, w, h) {
  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const si = (img.width * (y + y0) + (x + x0)) << 2;
    const oi = (w * y + x) << 2;
    out.data[oi] = img.data[si]; out.data[oi+1] = img.data[si+1];
    out.data[oi+2] = img.data[si+2]; out.data[oi+3] = 255;
  }
  return out;
}
const appHead = crop(app, 915, 300, 1000, 320);
fs.writeFileSync("app-heading.png", PNG.sync.write(appHead));

// stack: design-heading (top) + app-heading (bottom) with label gap
const design = load("design-heading.png");
const W = Math.max(design.width, appHead.width);
const gap = 30;
const H = design.height + gap + appHead.height;
const out = new PNG({ width: W, height: H });
// fill cream
for (let i = 0; i < out.data.length; i += 4) { out.data[i]=245; out.data[i+1]=240; out.data[i+2]=232; out.data[i+3]=255; }
function blit(src, oy) {
  for (let y = 0; y < src.height; y++) for (let x = 0; x < src.width; x++) {
    const si = (src.width * y + x) << 2;
    const di = (out.width * (y + oy) + x) << 2;
    out.data[di]=src.data[si]; out.data[di+1]=src.data[si+1]; out.data[di+2]=src.data[si+2]; out.data[di+3]=255;
  }
}
blit(design, 0);
blit(appHead, design.height + gap);
fs.writeFileSync("heading-compare.png", PNG.sync.write(out));
console.log("wrote heading-compare.png (TOP=design Canela, BOTTOM=app Fraunces)");
