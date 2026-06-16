import { chromium } from "playwright-core";

const widths = [390, 768, 1024, 1367];
const browser = await chromium.launch();

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto("http://localhost:3123/", { waitUntil: "networkidle" });
  await page.locator(".onboarding-prize-list, [data-prize-row=desktop]").first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `prizes-verify-${width}.png` });
  const lines = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll(".prize-card-illus")];
    return imgs.map((img, i) => {
      const r = img.getBoundingClientRect();
      const parent = img.parentElement?.getBoundingClientRect();
      const offset =
        parent && parent.width > 0
          ? Math.round(r.left + r.width / 2 - (parent.left + parent.width / 2))
          : 0;
      return { i, offsetPx: offset, w: Math.round(r.width) };
    });
  });
  console.log(width, JSON.stringify(lines));
  await page.close();
}

await browser.close();
