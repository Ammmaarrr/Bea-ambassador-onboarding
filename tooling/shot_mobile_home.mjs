import { chromium } from "playwright-core";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("http://localhost:3123/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: "tooling/home-390.png", fullPage: true });
await browser.close();
console.log("wrote tooling/home-390.png");
