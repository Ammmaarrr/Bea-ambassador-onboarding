import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const ref = process.argv[2];
const out = process.argv[3] || "design-ref.png";
const b64 = fs.readFileSync(ref).toString("base64");
const ext = path.extname(ref).toLowerCase().includes("png") ? "png" : "jpeg";
const html = `<!DOCTYPE html><html><head><style>html,body{margin:0;background:#f8f3ef}img{width:1366px;display:block}</style></head><body><img src="data:image/${ext};base64,${b64}"></body></html>`;
const htmlPath = path.join(process.cwd(), "ref.html");
fs.writeFileSync(htmlPath, html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1366, height: 1152 } });
await page.goto(`file:///${htmlPath.replace(/\\/g, "/")}`);
await page.waitForTimeout(500);
await page.screenshot({ path: out, fullPage: true });
const h = await page.evaluate(() => document.querySelector("img").getBoundingClientRect().height);
console.log(JSON.stringify({ out, height: Math.round(h) }));
await browser.close();
