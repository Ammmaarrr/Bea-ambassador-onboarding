import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { ARTBOARDS_DIR, webPublic } from "./paths.mjs";

const srcDir = ARTBOARDS_DIR;
const outDir = webPublic("images");
fs.mkdirSync(outDir, { recursive: true });

function crop(img, { left, top, right, bottom }, dest) {
  const W = img.width;
  const w = right - left + 1;
  const h = bottom - top + 1;
  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const si = (W * (top + y) + (left + x)) << 2;
      const di = (w * y + x) << 2;
      out.data[di] = img.data[si];
      out.data[di + 1] = img.data[si + 1];
      out.data[di + 2] = img.data[si + 2];
      out.data[di + 3] = img.data[si + 3];
    }
  }
  fs.writeFileSync(dest, PNG.sync.write(out));
  console.log(path.basename(dest), `${w}x${h}`);
}

const slices = [
  {
    file: "Artboard 1_1.png",
    crops: [
      { name: "school-building.png", left: 520, top: 0, right: 1366, bottom: 900 },
    ],
  },
  {
    file: "Artboard 1_2.png",
    crops: [
      { name: "prizes-levels-illus.png", left: 620, top: 120, right: 1320, bottom: 780 },
    ],
  },
];

for (const { file, crops } of slices) {
  const img = PNG.sync.read(fs.readFileSync(path.join(srcDir, file)));
  for (const c of crops) {
    crop(img, c, path.join(outDir, c.name));
  }
}
