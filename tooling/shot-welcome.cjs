const { chromium } = require("./node_modules/playwright");
const path = require("path");
const fs = require("fs");

fs.mkdirSync("shots", { recursive: true });

(async () => {
  const b = await chromium.launch();

  // 768px viewport — the previous bug viewport
  const ctx768 = await b.newContext({ viewport: { width: 768, height: 900 } });
  const p768 = await ctx768.newPage();
  await p768.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await p768.waitForTimeout(2000);
  await p768.screenshot({ path: "shots/welcome-768.png", fullPage: false });
  console.log("768px screenshot saved");

  // 1367px viewport — target artboard size
  const ctx1367 = await b.newContext({ viewport: { width: 1367, height: 900 } });
  const p1367 = await ctx1367.newPage();
  await p1367.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await p1367.waitForTimeout(2000);
  await p1367.screenshot({ path: "shots/welcome-1367.png", fullPage: true });
  console.log("1367px screenshot saved");

  // Also screenshot the account and prizes pages at 1367px
  const pAcc = await ctx1367.newPage();
  await pAcc.goto("http://localhost:3000/account", { waitUntil: "networkidle" });
  await pAcc.waitForTimeout(1500);
  await pAcc.screenshot({ path: "shots/account-1367.png", fullPage: false });
  console.log("account screenshot saved");

  await b.close();
  console.log("done");
})().catch(e => { console.error(e.message); process.exit(1); });
