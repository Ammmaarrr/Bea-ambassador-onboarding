import { chromium } from "playwright";
import fs from "node:fs";

const url = process.argv[2] || "http://localhost:3000/";
const opacity = process.argv[3] || "0.5";

// design render -> data URI (1366x1152 CSS when drawn at 1366px wide)
const b64 = fs.readFileSync("design-page-0.png").toString("base64");
const dataUri = `data:image/png;base64,${b64}`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1366, height: 1152 },
  deviceScaleFactor: 2,
});
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

await page.evaluate(({ src, opacity }) => {
  // make body start at 0,0 (app is mx-auto max-w-1366; at 1366 viewport margins are 0)
  const img = document.createElement("img");
  img.src = src;
  img.style.cssText = [
    "position:absolute",
    "top:0",
    "left:50%",
    "transform:translateX(-50%)",
    "width:1366px",
    "height:auto",
    "z-index:2147483647",
    "pointer-events:none",
    `opacity:${opacity}`,
    "mix-blend-mode:normal",
  ].join(";");
  img.id = "__pp_overlay";
  document.body.appendChild(img);
}, { src: dataUri, opacity });

await page.waitForTimeout(500);
await page.screenshot({ path: "perfectpixel.png", fullPage: true });
console.log("wrote perfectpixel.png at opacity", opacity);
await browser.close();
