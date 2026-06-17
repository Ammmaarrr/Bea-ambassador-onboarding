import { chromium } from "playwright-core";

const browser = await chromium.launch();
for (const width of [390, 1024]) {
  const page = await browser.newPage({ viewport: { width, height: 800 } });
  await page.goto("http://localhost:3123/", { waitUntil: "networkidle" });
  const state = await page.evaluate(() => {
    const m = document.querySelector(".onboarding-page-mobile");
    const d = document.querySelector(".onboarding-page-desktop");
    const cs = (el) => (el ? getComputedStyle(el).display : "missing");
    return {
      mobile: cs(m),
      desktop: cs(d),
      mobileVisible: m?.offsetHeight > 0,
      desktopVisible: d?.offsetHeight > 0,
      mobileImg: !!m?.querySelector('img[src*="hero-students"]'),
      desktopArtboard: !!d?.querySelector('img[src*="welcome.png"]'),
      bodyHeight: document.body.scrollHeight,
    };
  });
  console.log(width, state);
}
await browser.close();
