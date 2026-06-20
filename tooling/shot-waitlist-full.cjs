const { chromium } = require("./node_modules/playwright");
const fs = require("fs");

fs.mkdirSync("shots", { recursive: true });

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1367, height: 900 } });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3008/waitlist", { waitUntil: "networkidle" });
  await p.waitForTimeout(2000);
  await p.screenshot({ path: "shots/waitlist-landing-full.png", fullPage: true });
  console.log("full page saved");
  await b.close();
})().catch(e => { console.error(e.message); process.exit(1); });
