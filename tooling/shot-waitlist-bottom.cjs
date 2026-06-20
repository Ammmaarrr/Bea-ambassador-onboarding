const { chromium } = require("./node_modules/playwright");
const fs = require("fs");

fs.mkdirSync("shots", { recursive: true });

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1367, height: 1600 } });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3008/waitlist", { waitUntil: "networkidle" });
  await p.waitForTimeout(2000);

  // Capture bottom half of the full page (cities + footer)
  await p.screenshot({ path: "shots/wl-cities-footer.png", fullPage: false, clip: { x: 0, y: 760, width: 1367, height: 840 } });
  console.log("cities+footer saved");

  await b.close();
})().catch(e => { console.error(e.message); process.exit(1); });
