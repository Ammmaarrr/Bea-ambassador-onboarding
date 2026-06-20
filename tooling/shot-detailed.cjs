const { chromium } = require("./node_modules/playwright");
const fs = require("fs");

fs.mkdirSync("shots", { recursive: true });

(async () => {
  const b = await chromium.launch();

  // Welcome page hero at 1367px — just the top viewport
  const ctx = await b.newContext({ viewport: { width: 1367, height: 900 } });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await p.waitForTimeout(2000);
  await p.screenshot({ path: "shots/welcome-hero-1367.png", fullPage: false, clip: { x: 0, y: 0, width: 1367, height: 720 } });
  console.log("welcome hero 1367px saved");

  // Prizes page
  const pPrizes = await ctx.newPage();
  await pPrizes.goto("http://localhost:3000/prizes", { waitUntil: "networkidle" });
  await pPrizes.waitForTimeout(1500);
  await pPrizes.screenshot({ path: "shots/prizes-1367.png", fullPage: false });
  console.log("prizes 1367px saved");

  // Invites page
  const pInvites = await ctx.newPage();
  await pInvites.goto("http://localhost:3000/invites", { waitUntil: "networkidle" });
  await pInvites.waitForTimeout(1500);
  await pInvites.screenshot({ path: "shots/invites-1367.png", fullPage: false });
  console.log("invites 1367px saved");

  // Your school page
  const pSchool = await ctx.newPage();
  await pSchool.goto("http://localhost:3000/your-school", { waitUntil: "networkidle" });
  await pSchool.waitForTimeout(1500);
  await pSchool.screenshot({ path: "shots/school-1367.png", fullPage: false });
  console.log("school 1367px saved");

  await b.close();
  console.log("done");
})().catch(e => { console.error(e.message); process.exit(1); });
