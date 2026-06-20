/**
 * Measure waitlist step artboards 3–7 for overlay coordinates.
 * Run: node measure_waitlist_steps.mjs
 */
import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artDir = path.join(root, "design/waitlist artboard");

const lum = (img, x, y) => {
  const i = (img.width * y + x) << 2;
  return (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3;
};
const px = (img, x, y) => {
  const i = (img.width * y + x) << 2;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};

function load(file) {
  return PNG.sync.read(fs.readFileSync(path.join(artDir, file)));
}

function findBlackBtn(img, x0, x1, y0, y1) {
  for (let y = y0; y < y1; y++) {
    let b = 0;
    for (let x = x0; x < x1; x++) if (px(img, x, y)[0] < 50) b++;
    if (b > (x1 - x0) * 0.45) {
      let top = y,
        bottom = y,
        left = x0,
        right = x1 - 1;
      for (let yy = y; yy < y1; yy++) {
        let bb = 0;
        for (let x = x0; x < x1; x++) if (px(img, x, yy)[0] < 50) bb++;
        if (bb > (x1 - x0) * 0.3) bottom = yy;
        else if (bottom > top + 14) break;
      }
      for (let x = x0; x < x1; x++) {
        let bb = 0;
        for (let yy = top; yy <= bottom; yy++) if (px(img, x, yy)[0] < 50) bb++;
        if (bb > (bottom - top) * 0.4) {
          left = x;
          break;
        }
      }
      for (let x = x1 - 1; x >= x0; x--) {
        let bb = 0;
        for (let yy = top; yy <= bottom; yy++) if (px(img, x, yy)[0] < 50) bb++;
        if (bb > (bottom - top) * 0.4) {
          right = x;
          break;
        }
      }
      return { left, top, width: right - left + 1, height: bottom - top + 1 };
    }
  }
  return null;
}

function findWhiteInput(img, x0, x1, y0, y1) {
  for (let y = y0; y < y1; y++) {
    let w = 0;
    for (let x = x0 + 4; x < x1 - 4; x++) {
      const [r, g, b] = px(img, x, y);
      if (r > 248 && g > 248 && b > 246) w++;
    }
    if (w > (x1 - x0 - 8) * 0.55) {
      const top = y;
      let bottom = y;
      for (let yy = y; yy < Math.min(y + 70, y1); yy++) {
        let ww = 0;
        for (let x = x0 + 4; x < x1 - 4; x++) {
          const [r, g, b] = px(img, x, yy);
          if (r > 248 && g > 248 && b > 246) ww++;
        }
        if (ww > (x1 - x0 - 8) * 0.45) bottom = yy;
      }
      if (bottom - top >= 40) {
        let left = x0,
          right = x1 - 1;
        for (let x = x0; x < x1; x++) {
          let ww = 0;
          for (let yy = top; yy <= bottom; yy++) {
            const [r, g, b] = px(img, x, yy);
            if (r > 248 && g > 248 && b > 246) ww++;
          }
          if (ww > (bottom - top) * 0.5) {
            left = x;
            break;
          }
        }
        for (let x = x1 - 1; x >= x0; x--) {
          let ww = 0;
          for (let yy = top; yy <= bottom; yy++) {
            const [r, g, b] = px(img, x, yy);
            if (r > 248 && g > 248 && b > 246) ww++;
          }
          if (ww > (bottom - top) * 0.5) {
            right = x;
            break;
          }
        }
        return { left, top, width: right - left + 1, height: bottom - top + 1 };
      }
    }
  }
  return null;
}

function findUnderline(img, x0, x1, y0, y1) {
  for (let y = y0; y < y1; y++) {
    let d = 0;
    for (let x = x0; x < x1; x++) if (px(img, x, y)[0] < 35) d++;
    if (d > (x1 - x0) * 0.88) {
      return { left: x0, top: y - 44, width: x1 - x0, height: 52, underlineY: y };
    }
  }
  return null;
}

function findPlainLabel(img, x0, x1, y0, y1) {
  for (let y = y0; y < y1; y++) {
    let d = 0;
    for (let x = x0; x < x0 + 200; x++) if (lum(img, x, y) < 90) d++;
    if (d > 20) return y;
  }
  return null;
}

function titleBand(img) {
  let first = -1,
    last = -1;
  for (let y = 170; y < 280; y++) {
    let d = 0;
    for (let x = 100; x < 620; x++) if (lum(img, x, y) < 75) d++;
    if (d > 80) {
      if (first < 0) first = y;
      last = y;
    }
  }
  return first >= 0 ? { top: first, bottom: last } : null;
}

function measure(file) {
  const img = load(file);
  const L = 100,
    R = 620;
  const page = {
    width: img.width,
    height: img.height,
    title: titleBand(img),
    cta: findBlackBtn(img, L, R, 650, img.height - 10) ?? findBlackBtn(img, L, R, 480, img.height - 10),
    inputs: [],
    underlines: [],
  };

  const u1 = findUnderline(img, L, R, 280, 360);
  const u2 = findUnderline(img, L, R, 360, 450);
  if (u1) page.underlines.push(u1);
  if (u2) page.underlines.push(u2);

  const search = findWhiteInput(img, L, R, 260, 340);
  if (search) page.inputs.push({ ...search, id: "search" });

  const email = findWhiteInput(img, L, R, 300, 400);
  if (email && !search) page.inputs.push({ ...email, id: "email" });

  if (file === "5.png") {
    const l1 = findPlainLabel(img, L, R, 220, 260);
    const l2 = findPlainLabel(img, L, R, 330, 370);
    page.labels = { search: l1, schoolCard: l2 };
    page.secondaryBtn = findBlackBtn(img, L, R, 430, 520) ?? findWhiteInput(img, L, R, 430, 520);
    page.schoolCard = findWhiteInput(img, L, R, 340, 420);
  }

  return page;
}

for (const f of ["3.png", "4.png", "5.png", "7.png"]) {
  console.log("\n===", f, "===\n", JSON.stringify(measure(f), null, 2));
}
