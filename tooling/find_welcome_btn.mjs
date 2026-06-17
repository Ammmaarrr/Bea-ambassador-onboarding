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

for (let y = 450; y < 650; y++) {
  for (let x = 404; x < 900; x += 50) {
    if (px(x, y)[0] < 40) {
      let x2 = x;
      while (x2 < 900 && px(x2, y)[0] < 40) x2++;
      if (x2 - x > 200) {
        console.log("dark row", y, "x", x, "w", x2 - x);
        break;
      }
    }
  }
}
