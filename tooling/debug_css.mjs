import { chromium } from "playwright-core";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
await page.goto("http://localhost:3123/", { waitUntil: "networkidle" });

const info = await page.evaluate(() => {
  const d = document.querySelector(".onboarding-page-desktop");
  const sheets = [...document.styleSheets];
  const rules = [];
  for (const sheet of sheets) {
    try {
      for (const rule of sheet.cssRules || []) {
        if (rule.cssText?.includes("onboarding-page-desktop")) {
          rules.push(rule.cssText.slice(0, 200));
        }
      }
    } catch {
      /* cross-origin */
    }
  }
  return {
    className: d?.className,
    display: d ? getComputedStyle(d).display : null,
    rulesFound: rules,
    stylesheetHrefs: sheets.map((s) => s.href).filter(Boolean),
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
