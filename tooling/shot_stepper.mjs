import { chromium } from "playwright-core";

const browser = await chromium.launch({ executablePath: process.env.PW_CHROME });
for (const [w, h, name] of [[1280, 800, "tablet10"], [768, 1024, "tablet-portrait"], [390, 844, "mobile"]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3124/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `stepper-${name}.png` });
  await page.close();
  console.log("wrote stepper-" + name + ".png");
}
await browser.close();
