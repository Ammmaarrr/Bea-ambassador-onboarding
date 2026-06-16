import { chromium } from "playwright-core";
import path from "node:path";

const browser = await chromium.launch({
  executablePath: process.env.PW_CHROME,
});
const page = await browser.newPage({ viewport: { width: 760, height: 360 } });
const url = "file://" + path.resolve("canela-render-test.html").replace(/\\/g, "/");
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await page.screenshot({ path: "canela-render-test.png" });
await browser.close();
console.log("wrote canela-render-test.png");
