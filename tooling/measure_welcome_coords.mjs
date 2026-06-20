import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const img = PNG.sync.read(
  fs.readFileSync(path.join(root, "apps/web/public/artboards/welcome.png")),
);
const W = img.width;
const H = img.height;
const lum = (x, y) => {
  const i = (W * y + x) << 2;
  return (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3;
};

function firstDark(x0, x1, y0, y1, thr = 85, cnt = 8) {
  for (let y = y0; y < y1; y++) {
    let c = 0;
    for (let x = x0; x < x1; x++) if (lum(x, y) < thr) c++;
    if (c > cnt) return y;
  }
  return -1;
}

console.log({
  W,
  H,
  titleTop: firstDark(500, 950, 120, 400),
  subtitleTop: firstDark(500, 950, 400, 520),
  repTop: firstDark(550, 850, 680, 760),
  prizeTop: firstDark(76, 1300, 760, 860),
  dividerY: firstDark(76, 1300, 660, 690, 200, 200),
});
