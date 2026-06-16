import { chromium } from "playwright-core";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("http://localhost:3123/", { waitUntil: "networkidle" });
await page.locator(".onboarding-prize-list").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: "prize-cards-fixed-390.png", fullPage: false });
await browser.close();
console.log("wrote prize-cards-fixed-390.png");
