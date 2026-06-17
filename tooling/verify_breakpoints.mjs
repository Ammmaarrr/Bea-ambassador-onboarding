import { chromium } from "playwright-core";

const base = process.argv[2] || "http://localhost:3123";
const widths = [390, 768, 1024, 1367];

const browser = await chromium.launch();

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const path of ["/", "/your-school"]) {
    await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const state = await page.evaluate(() => {
      const mobile = document.querySelector(".onboarding-page-mobile");
      const desktop = document.querySelector(".onboarding-page-desktop");
      const mobileNav = document.querySelector("header.md\\:hidden");
      const onboardingHeader = document.querySelector(".hidden.md\\:block");
      const hero = document.querySelector('img[alt="Students sitting on campus steps"]');
      const compact = document.querySelector(".onboarding-compact-stepper");
      const artboard = document.querySelector(".onboarding-artboard-canvas img");
      const activeStep = document.querySelector(
        '.onboarding-compact-stepper a[aria-current="step"]',
      );
      const activeLabel = activeStep?.getAttribute("aria-label") ?? null;
      const mobileVisible = mobile && getComputedStyle(mobile).display !== "none";
      const desktopVisible = desktop && getComputedStyle(desktop).display !== "none";
      const compactVisible = compact && getComputedStyle(compact).display !== "none";
      const mobileNavVisible =
        mobileNav && getComputedStyle(mobileNav).display !== "none";
      const heroVisible = hero && getComputedStyle(hero).display !== "none";
      const headerVisible =
        onboardingHeader && getComputedStyle(onboardingHeader).display !== "none";
      return {
        mobileVisible,
        desktopVisible,
        mobileNavVisible,
        heroVisible,
        headerVisible,
        compactVisible,
        artboardVisible: !!artboard && desktopVisible,
        activeLabel,
        compactText: compact?.querySelector("p")?.textContent?.trim() ?? null,
      };
    });
    console.log(`${width}px ${path}`, JSON.stringify(state));
  }
}

await browser.close();
