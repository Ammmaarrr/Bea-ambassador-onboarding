const { chromium } = require("./node_modules/playwright");
const fs = require("fs");

fs.mkdirSync("shots", { recursive: true });

(async () => {
  const b = await chromium.launch();

  const pages = [
    ["school-800",        "http://localhost:3000/your-school",  800,  900],
    ["school-1367",       "http://localhost:3000/your-school",  1367, 900],
    ["prizes-onb-800",   "http://localhost:3000/prizes",        800,  900],
    ["prizes-onb-1367",  "http://localhost:3000/prizes",        1367, 900],
    ["waitlist-landing-1367", "http://localhost:3000/waitlist", 1367, 900],
    ["waitlist-step3-1367",   "http://localhost:3000/waitlist/3", 1367, 900],
    ["waitlist-prizes-1367",  "http://localhost:3000/waitlist/9", 1367, 900],
  ];

  for (const [name, url, w, h] of pages) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: "networkidle" });
    await p.waitForTimeout(1500);
    await p.screenshot({ path: `shots/${name}.png`, fullPage: false });
    await ctx.close();
    console.log(`${name} (${w}px) saved`);
  }

  await b.close();
  console.log("done");
})().catch(e => { console.error(e.message); process.exit(1); });
