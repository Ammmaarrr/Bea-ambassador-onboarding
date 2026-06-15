import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { webSrc } from "./paths.mjs";

const outDir = webSrc("imports", "onboarding");

const cards = [
  { src: "prize-card-campus.png", out: "illus-campus-tower.png", y0: 165, y1: 500 },
  { src: "prize-card-market.png", out: "illus-market-skyline.png", y0: 165, y1: 500 },
  { src: "prize-card-national.png", out: "illus-national-trophy.png", y0: 165, y1: 500 },
];

function isInk(r, g, b) {
  return r < 235 || g < 230 || b < 220;
}

for (const c of cards) {
  const src = PNG.sync.read(fs.readFileSync(path.join(outDir, c.src)));
  const W = src.width;
  const h = c.y1 - c.y0;

  let minX = W;
  let maxX = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < W; x++) {
      const si = (W * (c.y0 + y) + x) << 2;
      const r = src.data[si];
      const g = src.data[si + 1];
      const b = src.data[si + 2];
      if (isInk(r, g, b)) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
      }
    }
  }

  const pad = 24;
  const x0 = Math.max(0, minX - pad);
  const x1 = Math.min(W - 1, maxX + pad);
  const w = x1 - x0 + 1;

  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const si = (W * (c.y0 + y) + (x0 + x)) << 2;
      const di = (w * y + x) << 2;
      out.data[di] = 255;
      out.data[di + 1] = 255;
      out.data[di + 2] = 255;
      out.data[di + 3] = 255;
      if (isInk(src.data[si], src.data[si + 1], src.data[si + 2])) {
        out.data[di] = src.data[si];
        out.data[di + 1] = src.data[si + 1];
        out.data[di + 2] = src.data[si + 2];
      }
    }
  }

  fs.writeFileSync(path.join(outDir, c.out), PNG.sync.write(out));
  console.log(c.out, `${w}x${h}`);
}
