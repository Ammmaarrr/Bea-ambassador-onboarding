import { chromium } from "playwright-core";
import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const browser = await chromium.launch();

for (const width of [1367, 1024]) {
  const page = await browser.newPage({ viewport: { width, height: 1200 } });
  await page.goto("http://localhost:3123/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const shot = path.join(root, `tooling/home-${width}-pp.png`);
  await page.screenshot({ path: shot, fullPage: false });

  const app = PNG.sync.read(fs.readFileSync(shot));
  const ref = PNG.sync.read(fs.readFileSync(path.join(root, "design/artboards/Artboard 1.png")));
  const scale = width / 1367;
  const h = Math.min(app.height, Math.floor(ref.height * scale));
  let diff = 0;
  let samples = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < width; x++) {
      const rx = Math.floor(x / scale);
      const ry = Math.floor(y / scale);
      if (rx >= ref.width || ry >= ref.height) continue;
      const ai = (app.width * y + x) << 2;
      const ri = (ref.width * ry + rx) << 2;
      const dr = Math.abs(app.data[ai] - ref.data[ri]);
      const dg = Math.abs(app.data[ai + 1] - ref.data[ri + 1]);
      const db = Math.abs(app.data[ai + 2] - ref.data[ri + 2]);
      if (dr + dg + db > 60) diff++;
      samples++;
    }
  }
  console.log(`${width}px diff pixels: ${diff}/${samples} (${((diff / samples) * 100).toFixed(2)}%)`);
}

await browser.close();
