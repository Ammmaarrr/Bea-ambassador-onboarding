import { chromium } from "./node_modules/playwright/index.mjs";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1367, height: 847 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000/waitlist/3", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

for (const sel of [".waitlist-canvas__copy", ".waitlist-canvas__title", ".waitlist-canvas__subtitle", ".waitlist-canvas__city-slot"]) {
  const el = await page.$(sel);
  if (el) console.log(sel, await el.boundingBox());
}

await page.screenshot({ path: "shots/waitlist-3.png" });
await browser.close();
