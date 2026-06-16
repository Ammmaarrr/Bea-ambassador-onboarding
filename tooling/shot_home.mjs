import { chromium } from "playwright-core";

const browser = await chromium.launch({ executablePath: process.env.PW_CHROME });
const page = await browser.newPage({ viewport: { width: 1367, height: 900 }, deviceScaleFactor: 2 });
await page.goto("http://localhost:3123/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: "home-canela.png" });
await browser.close();
console.log("wrote home-canela.png");
