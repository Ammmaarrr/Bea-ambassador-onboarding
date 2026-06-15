import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { webSrc } from "./paths.mjs";

const srcPath = webSrc("imports", "onboarding", "prize-card-campus.png");
const src = PNG.sync.read(fs.readFileSync(srcPath));
const W = src.width;
const H = src.height;

const isBg = (r, g, b) => r > 240 && g > 235 && b > 225;

let minX = W;
let maxX = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (W * y + x) << 2;
    const r = src.data[i];
    const g = src.data[i + 1];
    const b = src.data[i + 2];
    if (!isBg(r, g, b)) {
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
    }
  }
}

const trimW = maxX - minX + 1;
const trimmed = new PNG({ width: trimW, height: H });
for (let y = 0; y < H; y++) {
  for (let x = 0; x < trimW; x++) {
    const si = (W * y + (minX + x)) << 2;
    const di = (trimW * y + x) << 2;
    trimmed.data[di] = src.data[si];
    trimmed.data[di + 1] = src.data[si + 1];
    trimmed.data[di + 2] = src.data[si + 2];
    trimmed.data[di + 3] = src.data[si + 3];
  }
}

// Scale trimmed card back to 760×625 to match market/national assets
const outW = 760;
const outH = 625;
const out = new PNG({ width: outW, height: outH });
for (let y = 0; y < outH; y++) {
  const sy = Math.min(H - 1, Math.round((y * H) / outH));
  for (let x = 0; x < outW; x++) {
    const sx = Math.min(trimW - 1, Math.round((x * trimW) / outW));
    const si = (trimW * sy + sx) << 2;
    const di = (outW * y + x) << 2;
    out.data[di] = trimmed.data[si];
    out.data[di + 1] = trimmed.data[si + 1];
    out.data[di + 2] = trimmed.data[si + 2];
    out.data[di + 3] = trimmed.data[si + 3];
  }
}

fs.writeFileSync(srcPath, PNG.sync.write(out));
console.log("Fixed campus card:", {
  trimmedLeft: minX,
  trimW,
  out: `${outW}x${outH}`,
});
