import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000/";
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1366, height: 1152 },
  deviceScaleFactor: 2,
});
await page.goto(url, { waitUntil: "networkidle" });
// give fonts/images a moment
await page.waitForTimeout(1500);
await page.screenshot({ path: "app-fullpage.png", fullPage: true });
await page.screenshot({ path: "app-viewport.png", fullPage: false });
console.log("done");
await browser.close();
