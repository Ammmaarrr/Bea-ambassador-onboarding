import { chromium } from "playwright-core";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3123/", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
await page.screenshot({ path: "home-1024.png", fullPage: true });
await browser.close();
console.log("wrote home-1024.png");
