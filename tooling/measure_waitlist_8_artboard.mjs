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
const isWhite = (x, y) => {
  const [r, g, b] = px(x, y);
  return r > 248 && g > 248 && b > 246;
};

function findBox(x0, x1, y0, y1, test) {
  for (let y = y0; y < y1; y++) {
    let hit = 0;
    for (let x = x0; x < x1; x++) if (test(x, y)) hit++;
    if (hit > (x1 - x0) * 0.55) {
      let top = y,
        bottom = y,
        left = x1,
        right = x0;
      for (let yy = y; yy < y1; yy++) {
        let h = 0;
        for (let x = x0; x < x1; x++) if (test(x, yy)) h++;
        if (h > (x1 - x0) * 0.45) bottom = yy;
        else if (bottom > top + 20) break;
      }
      for (let x = x0; x < x1; x++) {
        let h = 0;
        for (let yy = top; yy <= bottom; yy++) if (test(x, yy)) h++;
        if (h > (bottom - top) * 0.45) {
          left = Math.min(left, x);
          break;
        }
      }
      for (let x = x1 - 1; x >= x0; x--) {
        let h = 0;
        for (let yy = top; yy <= bottom; yy++) if (test(x, yy)) h++;
        if (h > (bottom - top) * 0.45) {
          right = Math.max(right, x);
          break;
        }
      }
      return { left, top, width: right - left + 1, height: bottom - top + 1 };
    }
  }
  return null;
}

const peach = (x, y) => {
  const [r, g, b] = px(x, y);
  return r > 235 && g > 220 && b > 200 && r - b > 8;
};

console.log(
  "badge cream",
  findBox(600, 760, 200, 290, (x, y) => {
    const [r, g, b] = px(x, y);
    return r > 232 && r < 248 && g > 222 && g < 240 && b > 210 && b < 232;
  }),
);
console.log(
  "rank card",
  findBox(409, 957, 395, 820, (x, y) => isWhite(x, y)),
);
console.log(
  "perk1",
  findBox(96, 390, 930, 1380, (x, y) => peach(x, y) || isWhite(x, y)),
);
console.log(
  "perk2",
  findBox(400, 730, 930, 1380, (x, y) => isWhite(x, y)),
);
console.log(
  "perk3",
  findBox(730, 1060, 930, 1380, (x, y) => isWhite(x, y)),
);
console.log(
  "copy btn",
  findBox(508, 858, 2240, 2295, (x, y) => px(x, y)[0] < 40),
);
console.log(
  "waiting room",
  findBox(1080, 1280, 20, 75, (x, y) => isWhite(x, y)),
);

for (const [label, y] of [
  ["title", 340],
  ["subtitle", 390],
  ["perksDivider", 868],
  ["perksSub", 904],
  ["shareDivider", 1620],
  ["shareIcons", 1690],
  ["footer", 2395],
]) {
  let dark = 0;
  for (let x = 409; x < 957; x++) if (lum(x, y) < 120) dark++;
  console.log(label, "y=", y, "dark=", dark);
}
