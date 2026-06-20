import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const img = PNG.sync.read(
  fs.readFileSync(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "../design/waitlist artboard/8.png"),
  ),
);
const px = (x, y) => {
  const i = (img.width * y + x) << 2;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};
const lum = (x, y) => {
  const [r, g, b] = px(x, y);
  return (r + g + b) / 3;
};

function band(y0, y1, x0, x1) {
  for (let y = y0; y < y1; y++) {
    let min = 255,
      w = 0;
    for (let x = x0; x < x1; x++) {
      const l = lum(x, y);
      if (l < min) min = l;
      if (px(x, y)[0] > 252) w++;
    }
    if (min < 200 || w > (x1 - x0) * 0.6) console.log(`y=${y} min=${min.toFixed(0)} white=${w}`);
  }
}

console.log("subtitle band");
band(376, 410, 500, 870);

console.log("rank white top");
band(400, 430, 420, 940);

console.log("perk col1");
band(940, 980, 96, 390);
console.log("perk col2");
band(940, 980, 400, 730);
console.log("perk col3");
band(940, 980, 730, 1060);

console.log("perk bottoms");
band(1320, 1380, 96, 390);
band(1320, 1380, 400, 730);
band(1320, 1380, 730, 1060);
