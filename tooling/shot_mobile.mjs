import { chromium } from "playwright-core";

const browser = await chromium.launch({ executablePath: process.env.PW_CHROME });
for (const [w, h, name] of [[390, 844, "mobile"], [768, 1024, "tablet"]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto("http://localhost:3125/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `mobile-${name}.png` });
  await page.close();
  console.log("wrote mobile-" + name + ".png");
}
await browser.close();
