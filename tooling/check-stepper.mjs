import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1367, height: 900 } });
await page.goto(`http://localhost:3000/?v=${Date.now()}`, {
  waitUntil: "networkidle",
});

const info = await page.evaluate(() => {
  const nav = document.querySelector('[aria-label="Onboarding progress"]');
  const c = nav?.querySelector("a span")?.getBoundingClientRect();
  const h1 = document.querySelector("h1")?.getBoundingClientRect();
  return {
    circleCenter: c ? Math.round(c.left + c.width / 2) : null,
    circleLeft: c ? Math.round(c.left) : null,
    h1Left: h1 ? Math.round(h1.left) : null,
  };
});
console.log("circle1 left:", info.circleLeft, "center:", info.circleCenter, " h1 box left:", info.h1Left);

await page.screenshot({ path: "page1-stepper.png", clip: { x: 380, y: 0, width: 700, height: 240 } });
await browser.close();
