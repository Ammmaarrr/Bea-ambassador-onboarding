import { chromium } from "playwright-core";

const browser = await chromium.launch();
for (const width of [320, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 844 } });
  await page.goto("http://localhost:3123/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const clipped = await page.evaluate(() => {
    const bad = [];
    for (const el of document.querySelectorAll(
      ".onboarding-page-mobile h1, .onboarding-page-mobile h2, .onboarding-page-mobile p, .onboarding-compact-stepper p, .bea-brand-text",
    )) {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (cs.textOverflow === "ellipsis" || cs.overflow === "hidden") {
        bad.push({ tag: el.tagName, text: el.textContent?.slice(0, 40), overflow: cs.overflow });
      }
      if (r.width > window.innerWidth + 1) {
        bad.push({ tag: el.tagName, text: el.textContent?.slice(0, 40), issue: "wider-than-viewport" });
      }
    }
    return bad;
  });
  console.log(width, clipped.length ? clipped : "ok");
  await page.screenshot({ path: `tooling/home-${width}-text.png`, fullPage: true });
}
await browser.close();
