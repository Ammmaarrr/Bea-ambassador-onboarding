import { chromium } from "playwright";
import path from "node:path";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1100, height: 1000 }, deviceScaleFactor: 2 });
await page.goto("file://" + path.resolve("fonttest.html").replace(/\\/g, "/"), { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.screenshot({ path: "fonts.png", fullPage: true });
console.log("done");
await browser.close();
