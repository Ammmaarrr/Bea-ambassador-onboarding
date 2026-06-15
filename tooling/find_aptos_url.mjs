import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("https://www.microsoft.com/en-us/download/details.aspx?id=106087", {
  waitUntil: "networkidle",
  timeout: 60000,
});
const links = await page.evaluate(() =>
  [...document.querySelectorAll("a")].map((a) => ({
    text: (a.textContent || "").trim().slice(0, 60),
    href: a.href,
  })),
);
console.log(
  JSON.stringify(
    links.filter(
      (x) =>
        /download|aptos|\.zip/i.test(x.href) ||
        /download/i.test(x.text),
    ),
    null,
    2,
  ),
);
const html = await page.content();
const cdn = [...html.matchAll(/https:\/\/download\.microsoft\.com\/download\/[^"'\\s]+/g)].map(
  (m) => m[0],
);
console.log("cdn", [...new Set(cdn)]);
await browser.close();
