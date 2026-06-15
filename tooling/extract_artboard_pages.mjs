import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { ARTBOARDS_DIR, webPublic } from "./paths.mjs";

const srcDir = ARTBOARDS_DIR;
const outDir = webPublic("artboards");
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  { src: "Artboard 1_1.png", out: "your-school.png", footer: { top: 1000, h: 153 } },
  { src: "Artboard 1_2.png", out: "prizes.png", footer: { top: 1000, h: 153 } },
  { src: "Artboard 1_3.png", out: "account.png", footer: null },
  { src: "Artboard 1_4.png", out: "invites.png", footer: { top: 1000, h: 153 } },
  { src: "Artboard 1_5.png", out: "youre-in.png", footer: { top: 1000, h: 153 } },
];

function crop(img, rect, dest) {
  const W = img.width;
  const { left, top, right, bottom } = rect;
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

for (const p of pages) {
  const img = PNG.sync.read(fs.readFileSync(path.join(srcDir, p.src)));
  const W = img.width;
  const H = img.height;

  // Main body below header (y=120) — used as decorative layer
  crop(img, { left: 0, top: 120, right: W - 1, bottom: (p.footer?.top ?? H) - 1 }, path.join(outDir, p.out.replace(".png", "-body.png")));

  if (p.footer) {
    crop(img, { left: 0, top: p.footer.top, right: W - 1, bottom: p.footer.top + p.footer.h - 1 }, path.join(outDir, p.out.replace(".png", "-footer.png")));
  }

  // Full reference copy
  fs.copyFileSync(path.join(srcDir, p.src), path.join(outDir, p.out));
  console.log("copied", p.out);
}

// Extract prize step cards from artboard 1_2
const ab2 = PNG.sync.read(fs.readFileSync(path.join(srcDir, "Artboard 1_2.png")));
crop(ab2, { left: 76, top: 380, right: 555, bottom: 455 }, path.join(outDir, "prize-row-campus.png"));
crop(ab2, { left: 76, top: 475, right: 555, bottom: 550 }, path.join(outDir, "prize-row-market.png"));
crop(ab2, { left: 76, top: 570, right: 555, bottom: 645 }, path.join(outDir, "prize-row-national.png"));
crop(ab2, { left: 600, top: 200, right: 1290, bottom: 820 }, path.join(outDir, "prizes-illus.png"));

// School page right image from artboard 1_1
const ab1 = PNG.sync.read(fs.readFileSync(path.join(srcDir, "Artboard 1_1.png")));
crop(ab1, { left: 480, top: 0, right: 1366, bottom: 1000 }, path.join(outDir, "school-hero.png"));

// School card from artboard 1_1
crop(ab1, { left: 76, top: 380, right: 496, bottom: 530 }, path.join(outDir, "school-card.png"));

// Equation card from artboard 1_4
const ab4 = PNG.sync.read(fs.readFileSync(path.join(srcDir, "Artboard 1_4.png")));
crop(ab4, { left: 76, top: 420, right: 596, bottom: 520 }, path.join(outDir, "impact-card.png"));
