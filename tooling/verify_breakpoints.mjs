import { chromium } from "playwright-core";

const widths = [390, 900, 1024, 1100, 1367];
const pages = [
  { name: "home", url: "/" },
  { name: "your-school", url: "/your-school" },
];

const browser = await chromium.launch();
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  for (const p of pages) {
    await page.goto(`http://localhost:3123${p.url}`, { waitUntil: "networkidle" });
    const state = await page.evaluate(() => {
      const mobile = document.querySelector(".onboarding-page-mobile");
      const desktop = document.querySelector(".onboarding-page-desktop");
      const mobileNav = document.querySelector(".lg\\:hidden.sticky");
      const compact = [...document.querySelectorAll('[aria-label="Onboarding progress"]')].filter(
        (el) => getComputedStyle(el).display !== "none"
      );
      const clickableSteps = document.querySelectorAll(
        'a[href="/prizes"], a[href="/your-school"], a[href="/"]'
      ).length;
      return {
        innerMobile: mobile ? getComputedStyle(mobile).display : "n/a",
        innerDesktop: desktop ? getComputedStyle(desktop).display : "n/a",
        mobileNavVisible: mobileNav ? getComputedStyle(mobileNav).display !== "none" : false,
        visibleSteppers: compact.length,
        linkCount: clickableSteps,
      };
    });
    const mode =
      p.name === "home"
        ? state.mobileNavVisible
          ? "mobile"
          : "laptop"
        : state.innerMobile === "block"
          ? "mobile"
          : "laptop";
    console.log(`${w}px ${p.name}: ${mode} | steppers=${state.visibleSteppers} links=${state.linkCount}`);
  }
}
await browser.close();
