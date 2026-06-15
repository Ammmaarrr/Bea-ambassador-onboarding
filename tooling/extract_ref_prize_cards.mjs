import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { webSrc } from "./paths.mjs";

const refPath =
  process.argv[2] ||
  "C:/Users/hamza/.cursor/projects/c-Users-hamza-OneDrive-Desktop/assets/c__Users_hamza_AppData_Roaming_Cursor_User_workspaceStorage_e985501ac5ef8fd1a980800f82867f08_images_image-d79cc0a0-f07b-4c3a-98db-96c620c3ecf4.png";
const outDir = webSrc("imports", "ref-cards");
fs.mkdirSync(outDir, { recursive: true });

const img = PNG.sync.read(fs.readFileSync(refPath));
const W = img.width;
const H = img.height;

const lum = (x, y) => {
  const i = (W * y + x) << 2;
  return (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3;
};

const isCard = (x, y) => lum(x, y) > 248;

// Find card row vertical bounds
let top = 0;
let bottom = H - 1;
for (let y = 0; y < H; y++) {
  let white = 0;
  for (let x = 0; x < W; x++) if (isCard(x, y)) white++;
  if (white < W * 0.5) {
    top = y;
    break;
  }
}
for (let y = H - 1; y >= 0; y--) {
  let white = 0;
  for (let x = 0; x < W; x++) if (isCard(x, y)) white++;
  if (white < W * 0.5) {
    bottom = y;
    break;
  }
}

// Find card left edges by scanning mid-row
const midY = Math.floor((top + bottom) / 2);
const edges = [];
for (let x = 2; x < W - 2; x++) {
  if (!isCard(x, midY) && isCard(x - 1, midY) && isCard(x + 1, midY)) edges.push(x);
}
// cluster: card starts where we go from bg to non-bg... actually card is white (bright)
// bg is beige ~240, card is white ~255
const starts = [];
for (let x = 2; x < W - 2; x++) {
  if (isCard(x, midY) && !isCard(x - 1, midY)) starts.push(x);
}

const rects = [];
for (let i = 0; i < starts.length && rects.length < 3; i++) {
  const left = starts[i];
  let right = left;
  for (let x = left; x < W; x++) {
    if (isCard(x, midY)) right = x;
    else if (right > left + 50) break;
  }
  rects.push({ left, top, right, bottom, w: right - left + 1, h: bottom - top + 1 });
}

console.log("Detected", rects);

function crop({ left, top, right, bottom }, name) {
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
  const p = path.join(outDir, name);
  fs.writeFileSync(p, PNG.sync.write(out));
  console.log("Wrote", name, w + "x" + h);
}

const names = ["prize-card-campus-ref.png", "prize-card-market-ref.png", "prize-card-national-ref.png"];
rects.slice(0, 3).forEach((r, i) => crop(r, names[i]));
