import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const img = PNG.sync.read(
  fs.readFileSync(path.join(root, "design/artboards/Artboard 1.png")),
);

const px = (x, y) => {
  const i = (img.width * y + x) << 2;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};
const lum = (x, y) => {
  const [r, g, b] = px(x, y);
  return (r + g + b) / 3;
};

function firstDark(x0, x1, y0, y1, thr = 90, cnt = 12) {
  for (let y = y0; y < y1; y++) {
    let c = 0;
    for (let x = x0; x < x1; x++) if (lum(x, y) < thr) c++;
    if (c > cnt) return y;
  }
  return -1;
}

console.log("size", img.width, img.height);
console.log("heading top (right col)", firstDark(404, 1000, 80, 300));
console.log("hero bottom", firstDark(0, 404, 600, 700, 200, 50));
console.log("step circle ~496", lum(496, 78), lum(496, 100));
console.log("represent top", firstDark(400, 1000, 650, 800, 90, 20));
console.log("prize card top", firstDark(84, 500, 750, 900, 200, 100));
