/**
 * Crop page-8 (confirmed) assets from artboard 8.png.
 * Run: node tooling/extract_waitlist_8_assets.mjs
 */
import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artDir = path.join(root, "design/waitlist artboard");
const outDir = path.join(root, "apps/web/public/waitlist/confirmed");

function crop(src, { left, top, width, height }) {
  const dst = new PNG({ width, height });
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const si = ((top + y) * src.width + (left + x)) << 2;
      const di = (y * width + x) << 2;
      dst.data[di] = src.data[si];
      dst.data[di + 1] = src.data[si + 1];
      dst.data[di + 2] = src.data[si + 2];
      dst.data[di + 3] = src.data[si + 3];
    }
  }
  return dst;
}

function writePng(png, filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, PNG.sync.write(png));
}

const ab8 = PNG.sync.read(fs.readFileSync(path.join(artDir, "8.png")));

/** Measured from artboard 8 — badge only (no title text). */
const assets = [
  { name: "check-badge", left: 612, top: 192, width: 142, height: 112 },
  { name: "perk-icon-early", left: 304, top: 1548, width: 47, height: 58 },
  { name: "perk-icon-time", left: 645, top: 1551, width: 51, height: 57 },
  { name: "perk-icon-premium", left: 981, top: 1554, width: 69, height: 57 },
  { name: "share-instagram", left: 460, top: 2039, width: 64, height: 64 },
  { name: "share-messages", left: 640, top: 2039, width: 64, height: 64 },
  { name: "share-whatsapp", left: 820, top: 2039, width: 64, height: 64 },
];

for (const a of assets) {
  const out = path.join(outDir, `${a.name}.png`);
  writePng(crop(ab8, a), out);
  console.log(`  ${a.name}: ${a.width}x${a.height} -> ${out}`);
}

/** Copy artboards for reference / optional PNG-underlay mode. */
const artOut = path.join(root, "apps/web/public/waitlist/artboards");
fs.mkdirSync(artOut, { recursive: true });
for (const file of fs.readdirSync(artDir)) {
  if (!file.endsWith(".png")) continue;
  fs.copyFileSync(path.join(artDir, file), path.join(artOut, file));
  console.log(`  copied artboard ${file}`);
}

console.log("Done.");
