/**
 * Re-crop onboarding hero PNGs — strips baked-in artboard chrome (ghost steppers/cards).
 */
import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "apps/web/public/artboards");

function cropFile(srcName, rect, destName) {
  const src = path.join(outDir, srcName);
  const img = PNG.sync.read(fs.readFileSync(src));
  const { left, top, right, bottom } = rect;
  const w = right - left + 1;
  const h = bottom - top + 1;
  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const si = (img.width * (top + y) + (left + x)) << 2;
      const di = (w * y + x) << 2;
      out.data[di] = img.data[si];
      out.data[di + 1] = img.data[si + 1];
      out.data[di + 2] = img.data[si + 2];
      out.data[di + 3] = img.data[si + 3];
    }
  }
  const dest = path.join(outDir, destName);
  fs.writeFileSync(dest, PNG.sync.write(out));
  console.log(destName, `${w}x${h}`);
  return { width: w, height: h };
}

// school-building: drop artboard header + left-column ghost UI
cropFile(
  "school-hero.png",
  { left: 280, top: 120, right: 886, bottom: 1000 },
  "school-building.png",
);

// prizes-illus: drop left ~95px of faint card-outline chrome
cropFile(
  "prizes-illus.png",
  { left: 95, top: 0, right: 690, bottom: 620 },
  "prizes-path.png",
);
