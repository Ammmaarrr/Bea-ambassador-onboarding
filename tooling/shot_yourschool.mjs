import { chromium } from "playwright-core";

const url = process.argv[2] || "http://localhost:3123/your-school";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: "your-school-1024.png", fullPage: false });
await browser.close();
console.log("wrote your-school-1024.png");
