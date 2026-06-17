import { chromium } from "playwright-core";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });
await page.goto("http://localhost:3123/your-school", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: "tooling/your-school-1024.png", fullPage: true });
await page.goto("http://localhost:3123/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: "tooling/home-1024.png", fullPage: true });
await browser.close();
console.log("wrote tooling/your-school-1024.png and tooling/home-1024.png");
