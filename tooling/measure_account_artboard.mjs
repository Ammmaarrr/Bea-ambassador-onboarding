/**
 * Measure account page (Artboard 4) element positions.
 * Run: node measure_account_artboard.mjs
 */
import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const img = PNG.sync.read(
  fs.readFileSync(path.join(root, "design/artboards/Artboard  4.png")),
);
const px = (x, y) => {
  const i = (img.width * y + x) << 2;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};
const lum = (x, y) => {
  const [r, g, b] = px(x, y);
  return (r + g + b) / 3;
};

function findWhiteBox(y0, y1) {
  for (let y = y0; y < y1; y++) {
    let w = 0;
    for (let x = 100; x < 650; x++) {
      const [r, g, b] = px(x, y);
      if (r > 248 && g > 248 && b > 246) w++;
    }
    if (w > 400) {
      let top = y;
      let bottom = y;
      let left = 650;
      let right = 100;
      for (let yy = y; yy < y1; yy++) {
        let ww = 0;
        for (let x = 100; x < 650; x++) {
          const [r, g, b] = px(x, yy);
          if (r > 248 && g > 248) ww++;
        }
        if (ww > 400) bottom = yy;
        else if (bottom > top + 20) break;
      }
      for (let x = 100; x < 650; x++) {
        let ww = 0;
        for (let yy = top; yy <= bottom; yy++) {
          const [r, g, b] = px(x, yy);
          if (r > 248 && g > 248) ww++;
        }
        if (ww > (bottom - top) * 0.5) {
          left = Math.min(left, x);
          break;
        }
      }
      for (let x = 649; x >= 100; x--) {
        let ww = 0;
        for (let yy = top; yy <= bottom; yy++) {
          const [r, g, b] = px(x, yy);
          if (r > 248 && g > 248) ww++;
        }
        if (ww > (bottom - top) * 0.5) {
          right = Math.max(right, x);
          break;
        }
      }
      return { left, top, width: right - left + 1, height: bottom - top + 1 };
    }
  }
  return null;
}

function findBlackBtn(y0, y1) {
  for (let y = y0; y < y1; y++) {
    let b = 0;
    for (let x = 100; x < 650; x++) if (px(x, y)[0] < 40) b++;
    if (b > 400) {
      let top = y;
      let bottom = y;
      let left = 650;
      let right = 100;
      for (let yy = y; yy < y1; yy++) {
        let bb = 0;
        for (let x = 100; x < 650; x++) if (px(x, yy)[0] < 40) bb++;
        if (bb > 350) bottom = yy;
        else if (bottom > top + 20) break;
      }
      for (let x = 100; x < 650; x++) {
        let bb = 0;
        for (let yy = top; yy <= bottom; yy++) if (px(x, yy)[0] < 40) bb++;
        if (bb > (bottom - top) * 0.4) {
          left = Math.min(left, x);
          break;
        }
      }
      for (let x = 649; x >= 100; x--) {
        let bb = 0;
        for (let yy = top; yy <= bottom; yy++) if (px(x, yy)[0] < 40) bb++;
        if (bb > (bottom - top) * 0.4) {
          right = Math.max(right, x);
          break;
        }
      }
      return { left, top, width: right - left + 1, height: bottom - top + 1 };
    }
  }
  return null;
}

function labelRow(y) {
  for (let x = 70; x < 120; x++) if (lum(x, y) < 80) return x;
  return null;
}

function scanRows(y0, y1, fn) {
  for (let y = y0; y < y1; y++) if (fn(y)) console.log("  y", y);
}

console.log("Artboard", img.width, "x", img.height);
console.log("\nLabels:");
console.log("  Full Name", labelRow(388), "y=384 area");
console.log("  Email", labelRow(530), "y=526 area");
console.log("  Password", labelRow(676), "y=672 area");

console.log("\nInputs:");
console.log(" ", findWhiteBox(390, 480));
console.log(" ", findWhiteBox(530, 620));
console.log(" ", findWhiteBox(675, 760));

console.log("\nCTA:", findBlackBtn(810, 880));
console.log("\nSocial:", findWhiteBox(950, 1030));

console.log("\nEyebrow rows:");
scanRows(265, 295, (y) => {
  let o = 0;
  for (let x = 76; x < 180; x++) {
    const [r, g, b] = px(x, y);
    if (r > 160 && r < 215 && g > 100 && g < 165 && b < 110) o++;
  }
  return o > 8;
});

console.log("\nTitle rows:");
scanRows(295, 350, (y) => {
  let d = 0;
  for (let x = 76; x < 520; x++) if (lum(x, y) < 65) d++;
  return d > 120;
});

console.log("\nSubtitle rows:");
scanRows(345, 385, (y) => {
  let g = 0;
  for (let x = 76; x < 520; x++) {
    const l = lum(x, y);
    if (l > 80 && l < 140) g++;
  }
  return g > 60;
});

console.log("\nHint rows:");
scanRows(775, 805, (y) => {
  let g = 0;
  for (let x = 106; x < 400; x++) {
    const l = lum(x, y);
    if (l > 110 && l < 180) g++;
  }
  return g > 15;
});

console.log("\nDivider rows:");
scanRows(905, 945, (y) => {
  let line = 0;
  for (let x = 106; x < 580; x++) {
    const l = lum(x, y);
    if (l > 165 && l < 225) line++;
  }
  return line > 280;
});

console.log("\nLegal rows:");
scanRows(1045, 1080, (y) => {
  let d = 0;
  for (let x = 76; x < 520; x++) if (lum(x, y) < 130) d++;
  return d > 25;
});
