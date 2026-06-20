import { chromium } from "./node_modules/playwright/index.mjs";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1367, height: 1300 } });

for (const id of ["3", "4", "5", "7"]) {
  const page = await ctx.newPage();
  await page.goto(`http://localhost:3000/waitlist/${id}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  const copy = await page.$(".waitlist-canvas__copy");
  const title = await page.$(".waitlist-canvas__title");
  if (copy) console.log(id, "copy", await copy.boundingBox());
  if (title) console.log(id, "title", await title.boundingBox());

  await page.screenshot({ path: `shots/waitlist-${id}.png`, fullPage: false });
  await page.close();
}

await browser.close();
