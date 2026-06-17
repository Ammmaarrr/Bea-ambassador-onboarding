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

function findBlackButton(x0, x1, y0, y1) {
  for (let y = y0; y < y1; y++) {
    let black = 0;
    for (let x = x0; x < x1; x++) if (px(x, y)[0] < 45) black++;
    if (black > (x1 - x0) * 0.55) {
      let top = y;
      let bottom = y;
      for (let yy = y; yy < y1; yy++) {
        let b = 0;
        for (let x = x0; x < x1; x++) if (px(x, yy)[0] < 45) b++;
        if (b > (x1 - x0) * 0.4) bottom = yy;
        else if (bottom > top + 20) break;
      }
      return { left: x0, top, width: x1 - x0, height: bottom - top + 1 };
    }
  }
  return null;
}

const btn = findBlackButton(404, 900, 500, 650);
console.log("cta", btn);
console.log("size", img.width, img.height);
