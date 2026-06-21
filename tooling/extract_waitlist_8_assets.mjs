/**
 * Crop page-8 (confirmed) assets from artboard 8.png.
 * Run: node tooling/extract_waitlist_8_assets.mjs
 * Or:  py tooling/extract_waitlist_8_assets.py
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

function whiteOnTransparent(png, threshold = 180) {
  for (let i = 0; i < png.data.length; i += 4) {
    const lum = (png.data[i] + png.data[i + 1] + png.data[i + 2]) / 3;
    if (lum >= threshold) {
      png.data[i] = 255;
      png.data[i + 1] = 255;
      png.data[i + 2] = 255;
      png.data[i + 3] = 255;
    } else {
      png.data[i + 3] = 0;
    }
  }
  return png;
}

function grayOnTransparent(png, threshold = 180, gray = 198) {
  for (let i = 0; i < png.data.length; i += 4) {
    const lum = (png.data[i] + png.data[i + 1] + png.data[i + 2]) / 3;
    if (lum >= threshold) {
      png.data[i] = gray;
      png.data[i + 1] = gray;
      png.data[i + 2] = gray;
      png.data[i + 3] = 255;
    } else {
      png.data[i + 3] = 0;
    }
  }
  return png;
}

function writePng(png, filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, PNG.sync.write(png));
}

const ab8 = PNG.sync.read(fs.readFileSync(path.join(artDir, "8.png")));

/** Measured from artboard 8 — badge cluster includes sparkles. */
const assets = [
  { name: "check-badge", left: 612, top: 192, width: 142, height: 112, process: "knockoutBg" },
  { name: "back-arrow", left: 70, top: 70, width: 40, height: 28 },
  { name: "perk-icon-early", left: 304, top: 1548, width: 47, height: 58 },
  { name: "perk-icon-time", left: 645, top: 1551, width: 51, height: 57 },
  { name: "perk-icon-premium", left: 981, top: 1554, width: 69, height: 57 },
  { name: "share-instagram", left: 460, top: 2039, width: 64, height: 64 },
  { name: "share-messages", left: 640, top: 2039, width: 64, height: 64 },
  { name: "share-whatsapp", left: 820, top: 2039, width: 64, height: 64 },
  { name: "copy-link-icon", left: 524, top: 2286, width: 36, height: 34, process: "grayOnTransparent" },
];

for (const a of assets) {
  const out = path.join(outDir, `${a.name}.png`);
  let png = crop(ab8, a);
  if (a.process === "whiteOnTransparent") png = whiteOnTransparent(png);
  if (a.process === "grayOnTransparent") png = grayOnTransparent(png);
  writePng(png, out);
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
