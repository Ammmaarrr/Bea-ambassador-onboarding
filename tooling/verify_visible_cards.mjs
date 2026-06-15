import { chromium } from "playwright";

const browser = await chromium.launch();
for (const [w, h] of [
  [1366, 768],
  [1280, 800],
]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const visible = await page.evaluate(() => {
    const articles = [...document.querySelectorAll("section")[1].querySelectorAll("article")];
    return articles.filter((a) => {
      const r = a.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && getComputedStyle(a).visibility !== "hidden";
    }).length;
  });

  const rows = await page.evaluate(() => {
    const section = document.querySelectorAll("section")[1];
    return [...section.children]
      .filter((c) => c.tagName === "DIV")
      .slice(1)
      .map((el) => getComputedStyle(el).display);
  });

  await page.screenshot({ path: `responsive/laptops/verify-${w}.png`, fullPage: true });
  console.log(`${w}x${h}: visible cards=${visible}, row displays=${rows.join(", ")}`);
}
await browser.close();
