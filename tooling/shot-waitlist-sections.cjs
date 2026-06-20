const { chromium } = require("./node_modules/playwright");
const fs = require("fs");

fs.mkdirSync("shots", { recursive: true });

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1367, height: 900 } });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3008/waitlist", { waitUntil: "networkidle" });
  await p.waitForTimeout(2000);

  // Hero section (top viewport)
  await p.screenshot({ path: "shots/wl-hero.png", fullPage: false, clip: { x: 0, y: 0, width: 1367, height: 420 } });
  console.log("hero saved");

  // Timer + features section
  await p.screenshot({ path: "shots/wl-timer.png", fullPage: false, clip: { x: 0, y: 420, width: 1367, height: 340 } });
  console.log("timer saved");

  // Cities + footer
  const fullH = await p.evaluate(() => document.body.scrollHeight);
  await p.screenshot({ path: "shots/wl-cities.png", fullPage: false, clip: { x: 0, y: 760, width: 1367, height: Math.min(500, fullH - 760) } });
  console.log("cities saved");

  await b.close();
})().catch(e => { console.error(e.message); process.exit(1); });
