import { chromium } from "playwright-core";

const width = Number(process.argv[2] || 1367);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 } });
await page.goto("http://localhost:3123/", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

const counts = await page.evaluate(() => {
  const mobile = document.querySelector(".onboarding-prize-list");
  const desktop = document.querySelector('[data-prize-row="desktop"]');
  return {
    mobileDisplay: mobile ? getComputedStyle(mobile).display : null,
    desktopDisplay: desktop ? getComputedStyle(desktop).display : null,
    mobileCards: mobile ? mobile.querySelectorAll("li").length : 0,
    desktopCards: desktop ? desktop.children.length : 0,
  };
});

await page.locator('[data-prize-row="desktop"]').scrollIntoViewIfNeeded().catch(() => {});
await page.screenshot({ path: `home-prizes-${width}.png`, fullPage: true });
await browser.close();
console.log(JSON.stringify({ width, ...counts }, null, 2));
