import { chromium } from "playwright";
import fs from "node:fs";

const url = process.argv[2] || "http://localhost:3000/";

/** Common CSS viewport sizes for 12" / 13" laptops (100% browser zoom) */
const laptops = [
  { name: "12in-win-hd", label: '12" Windows HD', width: 1366, height: 768 },
  { name: "12in-win-1280", label: '12" / compact 1280', width: 1280, height: 800 },
  { name: "13in-mac-1280", label: '13" MacBook Air (1280 scaled)', width: 1280, height: 832 },
  { name: "13in-mac-1440", label: '13" MacBook (1440×900)', width: 1440, height: 900 },
  { name: "13in-win-125", label: '13" Windows 1080p @125%', width: 1536, height: 864 },
  { name: "13in-win-150", label: '13" Windows 1080p @150%', width: 1280, height: 720 },
  { name: "13in-mac-1512", label: '13" MacBook Pro 14" scaled', width: 1512, height: 982 },
];

const outDir = "responsive/laptops";
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const results = [];

for (const vp of laptops) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    const overflowX = doc.scrollWidth > doc.clientWidth + 1;
    const scrollW = doc.scrollWidth;
    const clientW = doc.clientWidth;

    const offenders = [...document.querySelectorAll("*")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.right > window.innerWidth + 2 || r.left < -2);
      })
      .slice(0, 6)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          cls: String(el.className || "").slice(0, 50),
          right: Math.round(r.right),
          width: Math.round(r.width),
        };
      });

    const trophy = document.querySelector("[data-trophy-card]");
    const trophyRect = trophy?.getBoundingClientRect();
    const trophyClip = trophyRect ? trophyRect.right > window.innerWidth + 1 : false;

    const desktopRow = document.querySelector('[data-prize-row="desktop"]');
    const prizeRow =
      desktopRow && getComputedStyle(desktopRow).display !== "none" ? desktopRow : null;
    const prizeCards = prizeRow
      ? [...prizeRow.children].map((el) => {
          const r = el.getBoundingClientRect();
          return { width: Math.round(r.width), left: Math.round(r.left), right: Math.round(r.right) };
        })
      : null;
    const prizeClip = prizeCards?.some((c) => c.right > window.innerWidth + 1) ?? false;

    const layout =
      desktopRow && getComputedStyle(desktopRow).display !== "none"
        ? window.innerWidth >= 1366
          ? "exact-1366"
          : "fluid-lg"
        : "mobile-grid";

    const heroH = document.querySelector("section")?.getBoundingClientRect().height ?? 0;
    const prizeSection = [...document.querySelectorAll("section")][1];
    const prizeVisible = prizeSection
      ? prizeSection.getBoundingClientRect().top < window.innerHeight
      : false;

    return {
      overflowX,
      scrollW,
      clientW,
      overflowPx: Math.max(0, scrollW - clientW),
      layout,
      prizeCards,
      trophyClip,
      prizeClip,
      trophyRight: trophyRect ? Math.round(trophyRect.right) : null,
      offenders,
      heroH: Math.round(heroH),
      prizeInView: prizeVisible,
    };
  });

  const shot = `${outDir}/${vp.name}.png`;
  await page.screenshot({ path: shot, fullPage: false });
  await page.screenshot({ path: `${outDir}/${vp.name}-full.png`, fullPage: true });

  results.push({
    ...vp,
    ...metrics,
    screenshot: shot,
  });

  const issues = [];
  if (metrics.overflowX) issues.push(`scroll +${metrics.overflowPx}px`);
  if (metrics.trophyClip) issues.push(`trophy +${metrics.trophyRight - vp.width}px`);
  if (metrics.prizeClip) issues.push("prize clip");
  const status = issues.length ? issues.join(", ") : "OK";
  console.log(
    `${vp.label.padEnd(32)} ${vp.width}×${vp.height}  ${status.padEnd(22)} layout=${metrics.layout}`
  );
}

await browser.close();

const report = {
  testedAt: new Date().toISOString(),
  url,
  results: results.map((r) => ({
    name: r.name,
    label: r.label,
    width: r.width,
    height: r.height,
    overflowX: r.overflowX,
    overflowPx: r.overflowPx,
    layout: r.layout,
    prizeInView: r.prizeInView,
    heroH: r.heroH,
    screenshot: r.screenshot,
    offenders: r.offenders,
  })),
};

fs.writeFileSync(`${outDir}/report.json`, JSON.stringify(report, null, 2));
console.log("\nWrote", `${outDir}/report.json`);
