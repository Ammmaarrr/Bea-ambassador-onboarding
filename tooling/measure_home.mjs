import { chromium } from "playwright-core";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1367, height: 1200 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3123/", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

const metrics = await page.evaluate(() => {
  const canvas = document.querySelector(".onboarding-welcome-canvas");
  const stepper = document.querySelector(".artboard-stepper");
  const h1 = document.querySelector(".onboarding-welcome-canvas h1");
  const trophy = document.querySelector("[data-trophy-card]");
  const btn = document.querySelector('.onboarding-welcome-canvas a[href="/your-school"]');
  const prizeRow = document.querySelector('[data-prize-row="desktop"]');
  const login = document.querySelector(".onboarding-welcome-canvas .text-\\[12px\\]");
  const r = (el) => (el ? el.getBoundingClientRect() : null);
  return {
    canvas: r(canvas),
    step1: r(document.querySelector('.artboard-step[href="/"]')),
    h1: r(h1),
    trophy: r(trophy),
    btn: r(btn),
    prizeRow: r(prizeRow),
    login: r(login),
    scrollH: document.documentElement.scrollHeight,
    viewportH: window.innerHeight,
  };
});

console.log(JSON.stringify(metrics, null, 2));
await page.screenshot({ path: "tooling/home-1367-check.png", fullPage: true });
await browser.close();
