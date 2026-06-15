import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const info = await page.evaluate(() => {
  const section = document.querySelectorAll("section")[1];
  const children = [...section.children].filter((c) => c.tagName === "DIV").slice(1);
  return children.map((el) => ({
    display: getComputedStyle(el).display,
    className: el.className.slice(0, 120),
    articles: el.querySelectorAll("article").length,
  }));
});

console.log("Prize section child rows:", JSON.stringify(info, null, 2));
console.log("Total articles:", await page.locator("section").nth(1).locator("article").count());
await browser.close();
