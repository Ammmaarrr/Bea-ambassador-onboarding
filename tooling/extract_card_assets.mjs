import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { webSrc } from "./paths.mjs";

const src = PNG.sync.read(fs.readFileSync("design-page-7.png"));
const W = src.width;
const outDir = webSrc("imports", "onboarding");
fs.mkdirSync(outDir, { recursive: true });

// Artboard 7 welcome page — white line-art prize cards @2x PNG coords
const y0 = 1655;
const y1 = 2280;
const cards = [
  { name: "prize-card-campus.png", x0: 168, x1: 928 },
  { name: "prize-card-market.png", x0: 968, x1: 1728 },
  { name: "prize-card-national.png", x0: 1768, x1: 2568 },
];

function crop(x0, y0, x1, y1, name) {
  const w = x1 - x0;
  const h = y1 - y0;
  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const si = (W * (y0 + y) + (x0 + x)) << 2;
      const di = (w * y + x) << 2;
      out.data[di] = src.data[si];
      out.data[di + 1] = src.data[si + 1];
      out.data[di + 2] = src.data[si + 2];
      out.data[di + 3] = src.data[si + 3];
    }
  }
  const outPath = path.join(outDir, name);
  fs.writeFileSync(outPath, PNG.sync.write(out));
  console.log(name, `${w}x${h}`);
}

for (const c of cards) crop(c.x0, y0, c.x1, y1, c.name);
