import { chromium } from "./node_modules/playwright/index.mjs";

const selectors = [
  ".onboarding-step-eyebrow",
  ".onboarding-form-title",
  ".onboarding-canvas__account-subtitle",
  '.onboarding-canvas__field-label[for="account-name"]',
  "#account-name",
  "#account-email",
  "#account-password",
  ".onboarding-canvas__field-hint",
  ".onboarding-canvas__cta",
  ".onboarding-canvas__or-divider",
  ".onboarding-canvas__social-btn",
  ".onboarding-canvas__legal",
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1367, height: 1153 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000/account", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

for (const sel of selectors) {
  const els = await page.$$(sel);
  for (let i = 0; i < els.length; i++) {
    const box = await els[i].boundingBox();
    const text = ((await els[i].textContent()) ?? "").trim().replace(/\s+/g, " ").slice(0, 50);
    console.log(`${sel}${els.length > 1 ? `[${i}]` : ""}:`, box, text);
  }
}

await browser.close();
