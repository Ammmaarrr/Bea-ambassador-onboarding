import { chromium } from "playwright-core";

const routes = ["/your-school", "/prizes", "/account", "/invites", "/youre-in"];
const width = Number(process.argv[2] || 390);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 844 } });

for (const route of routes) {
  await page.goto(`http://localhost:3123${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const state = await page.evaluate(() => ({
    mobileRoot: !!document.querySelector(".onboarding-inner-mobile"),
    mobileWrap: !!document.querySelector(".onboarding-page-mobile"),
    artboardVisible: (() => {
      const el = document.querySelector(".onboarding-page-desktop");
      if (!el) return null;
      return getComputedStyle(el).display !== "none";
    })(),
    artboardImg: !!document.querySelector(".onboarding-page-desktop img[src*='/artboards/']"),
    mobileDisplay: document.querySelector(".onboarding-page-mobile")
      ? getComputedStyle(document.querySelector(".onboarding-page-mobile")).display
      : null,
    desktopDisplay: document.querySelector(".onboarding-page-desktop")
      ? getComputedStyle(document.querySelector(".onboarding-page-desktop")).display
      : null,
  }));
  const slug = route.slice(1) || "home";
  await page.screenshot({ path: `mobile-check-${slug}-${width}.png`, fullPage: true });
  console.log(route, JSON.stringify(state));
}

await browser.close();
