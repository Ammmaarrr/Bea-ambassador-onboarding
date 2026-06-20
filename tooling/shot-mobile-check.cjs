const { chromium } = require("./node_modules/playwright");
const fs = require("fs");

fs.mkdirSync("shots", { recursive: true });

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });

  for (const [name, url] of [
    ["mob-school",       "http://localhost:3000/your-school"],
    ["mob-prizes-onb",  "http://localhost:3000/prizes"],
    ["mob-waitlist-3",  "http://localhost:3000/waitlist/3"],
    ["mob-waitlist-9",  "http://localhost:3000/waitlist/9"],
    ["mob-waitlist-1",  "http://localhost:3000/waitlist"],
  ]) {
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: "networkidle" });
    await p.waitForTimeout(1000);
    await p.screenshot({ path: `shots/${name}.png`, fullPage: false });
    console.log(`${name} saved`);
  }

  await b.close();
  console.log("done");
})().catch(e => { console.error(e.message); process.exit(1); });
