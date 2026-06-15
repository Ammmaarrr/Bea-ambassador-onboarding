import { chromium } from "playwright";
import fs from "node:fs";

const url = process.argv[2] || "http://localhost:3000/";
const viewports = [
  { name: "iphone-se", width: 375, height: 812 },
  { name: "iphone-15", width: 390, height: 844 },
  { name: "iphone-15-pro-max", width: 430, height: 932 },
  { name: "ipad-mini", width: 768, height: 1024 },
  { name: "ipad-pro", width: 1024, height: 1366 },
  { name: "desktop", width: 1366, height: 1152 },
];

fs.mkdirSync("responsive", { recursive: true });
const browser = await chromium.launch();

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const issues = await page.evaluate(() => {
    const doc = document.documentElement;
    const overflowX = doc.scrollWidth > doc.clientWidth + 1;
    const els = [...document.querySelectorAll("*")].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > window.innerWidth + 1 || r.left < -1);
    }).slice(0, 8).map((el) => el.tagName + (el.className ? "." + String(el.className).slice(0, 40) : ""));
    return { overflowX, offenders: els };
  });
  await page.screenshot({ path: `responsive/${vp.name}.png`, fullPage: true });
  console.log(vp.name, vp.width + "px", issues.overflowX ? "OVERFLOW" : "ok", issues.offenders.join(", ") || "");
}

await browser.close();
