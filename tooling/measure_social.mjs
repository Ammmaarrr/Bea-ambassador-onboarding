/**
 * Measure social button rects on Artboard 4 (account page).
 */
import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";

const img = PNG.sync.read(
  fs.readFileSync(path.join("..", "design/artboards/Artboard  4.png")),
);
const W = img.width;
const px = (x, y) => {
  const i = (W * y + x) << 2;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};
const lum = (x, y) => {
  const [r, g, b] = px(x, y);
  return (r + g + b) / 3;
};

/** Border / anti-alias pixels on pill outline (not page cream). */
const isOutline = (r, g, b) => {
  if (r === 248 && g === 243 && b === 239) return false;
  return r >= 205 && r <= 247 && g >= 200 && g <= 244 && b >= 190 && b <= 240;
};

function outlineScore(left, top, width, height) {
  let score = 0;
  const right = left + width - 1;
  const bottom = top + height - 1;
  for (let x = left; x <= right; x++) {
    if (isOutline(...px(x, top))) score++;
    if (isOutline(...px(x, bottom))) score++;
  }
  for (let y = top; y <= bottom; y++) {
    if (isOutline(...px(left, y))) score++;
    if (isOutline(...px(right, y))) score++;
  }
  return score;
}

function bestRect(left, width) {
  let best = { score: 0 };
  for (let top = 880; top < 980; top++) {
    for (let height = 44; height <= 56; height++) {
      const score = outlineScore(left, top, width, height);
      if (score > best.score) best = { left, top, width, height, score };
    }
  }
  return best;
}

const google = bestRect(106, 228);
const apple = bestRect(354, 228);

console.log(JSON.stringify({ google, apple }, null, 2));
