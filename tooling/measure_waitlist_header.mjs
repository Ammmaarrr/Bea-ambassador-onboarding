import { chromium } from "./node_modules/playwright/index.mjs";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1367, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3005/waitlist", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

const selectors = [
  ".waitlist-canvas__logo",
  ".waitlist-canvas__nav-link",
  ".waitlist-canvas__header-cta",
];

for (const sel of selectors) {
  const els = await page.$$(sel);
  for (let i = 0; i < els.length; i++) {
    const box = await els[i].boundingBox();
    const text = ((await els[i].textContent()) ?? "").trim();
    const styles = await els[i].evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        color: s.color,
        letterSpacing: s.letterSpacing,
      };
    });
    console.log(`${sel}${els.length > 1 ? `[${i}]` : ""}:`, box, text, styles);
  }
}

await page.screenshot({
  path: "shots/waitlist-header.png",
  clip: { x: 0, y: 0, width: 1367, height: 120 },
});
await browser.close();
