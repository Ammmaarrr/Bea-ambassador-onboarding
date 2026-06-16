/**
 * Tight-crop prize illustrations — removes baked-in vertical guide lines
 * and off-canvas whitespace so cards align consistently at every viewport.
 */
import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { webPublic } from "./paths.mjs";

const files = ["illus-campus.png", "illus-market.png", "illus-national.png"];

/** Sketch strokes only — excludes faint gray guide lines in source exports. */
function isSketch(r, g, b, a) {
  if (a < 12) return false;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum < 165;
}

function cropFile(name) {
  const filePath = webPublic("images", name);
  const src = PNG.sync.read(fs.readFileSync(filePath));
  const { width: W, height: H } = src;

  let minX = W;
  let minY = H;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (W * y + x) << 2;
      if (isSketch(src.data[i], src.data[i + 1], src.data[i + 2], src.data[i + 3])) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  const pad = 10;
  const x0 = Math.max(0, minX - pad);
  const y0 = Math.max(0, minY - pad);
  const x1 = Math.min(W - 1, maxX + pad);
  const y1 = Math.min(H - 1, maxY + pad);
  const w = x1 - x0 + 1;
  const h = y1 - y0 + 1;

  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const si = (W * (y0 + y) + (x0 + x)) << 2;
      const di = (w * y + x) << 2;
      out.data[di] = 255;
      out.data[di + 1] = 255;
      out.data[di + 2] = 255;
      out.data[di + 3] = 255;
      const r = src.data[si];
      const g = src.data[si + 1];
      const b = src.data[si + 2];
      const a = src.data[si + 3];
      if (isSketch(r, g, b, a)) {
        out.data[di] = r;
        out.data[di + 1] = g;
        out.data[di + 2] = b;
        out.data[di + 3] = 255;
      } else if (a > 0 && r > 240 && g > 235) {
        /* keep white */
      } else if (a > 0) {
        /* preserve light tan shadow under drawings */
        out.data[di] = r;
        out.data[di + 1] = g;
        out.data[di + 2] = b;
        out.data[di + 3] = 255;
      }
    }
  }

  fs.writeFileSync(filePath, PNG.sync.write(out));
  console.log(`${name}: ${W}x${H} -> ${w}x${h}`);
}

for (const name of files) cropFile(name);
