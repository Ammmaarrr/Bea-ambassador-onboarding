import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";

const src = PNG.sync.read(
  fs.readFileSync("../apps/web/public/waitlist/artboards/9.png"),
);
const W = src.width;

// avatar circle in artboard coords
const cx = 1181;
const cy = 63;
const r = 27;
const size = r * 2;
const left = cx - r;
const top = cy - r;
const SS = 3; // supersample for smooth edge
const out = new PNG({ width: size * SS, height: size * SS });

for (let y = 0; y < size * SS; y++) {
  for (let x = 0; x < size * SS; x++) {
    const fx = x / SS;
    const fy = y / SS;
    const sx = Math.round(left + fx);
    const sy = Math.round(top + fy);
    const si = (W * sy + sx) << 2;
    const di = (size * SS * y + x) << 2;
    const dist = Math.hypot(fx - r, fy - r);
    out.data[di] = src.data[si];
    out.data[di + 1] = src.data[si + 1];
    out.data[di + 2] = src.data[si + 2];
    out.data[di + 3] = dist <= r - 0.5 ? 255 : 0;
  }
}
const dest = path.resolve("../apps/web/public/waitlist/avatars");
fs.mkdirSync(dest, { recursive: true });
fs.writeFileSync(path.join(dest, "ron.png"), PNG.sync.write(out));
console.log("wrote ron.png", size * SS + "px");
