const { chromium } = require("./node_modules/playwright");
const fs = require("fs");

fs.mkdirSync("shots", { recursive: true });

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });

  for (const [name, url] of [
    ["mobile-welcome", "http://localhost:3000/"],
    ["mobile-account", "http://localhost:3000/account"],
    ["mobile-invites", "http://localhost:3000/invites"],
  ]) {
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: "networkidle" });
    await p.waitForTimeout(1500);
    await p.screenshot({ path: `shots/${name}.png`, fullPage: false });
    console.log(`${name} saved`);
  }

  await b.close();
  console.log("done");
})().catch(e => { console.error(e.message); process.exit(1); });
