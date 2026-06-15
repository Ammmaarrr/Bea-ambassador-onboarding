/**
 * Unified QA measurement CLI for the Logic Yard Next.js app.
 *
 * Usage:
 *   node measure.mjs overlays              # regenerate artboard-overlays.json
 *   node measure.mjs artboards             # scan 1x/ artboard dimensions
 *   node measure.mjs app [png]             # analyze app screenshot layout
 *   node measure.mjs design [png]          # full design reference measurements
 *   node measure.mjs prize-ref [url] [ref] # compare prize cards (Playwright)
 */

import { chromium } from "playwright";
import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { ARTBOARDS_DIR, WEB_APP } from "./paths.mjs";

const [, , mode = "help", ...args] = process.argv;
const DEFAULT_URL = "http://localhost:3000/";

const px = (img, x, y) => {
  const i = (img.width * y + x) << 2;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};

const lum = (img, x, y) => {
  const [r, g, b] = px(img, x, y);
  return (r + g + b) / 3;
};

const css = (v) => (v / 2).toFixed(1);

function loadPng(filePath) {
  return PNG.sync.read(fs.readFileSync(filePath));
}

function printHelp() {
  console.log(`measure.mjs — Logic Yard QA tooling

Commands:
  overlays              Write apps/web/src/lib/artboard-overlays.json
  artboards             Print step/footer positions for design artboards
  app [screenshot.png]  Analyze app full-page screenshot (default: app-fullpage.png)
  design [screenshot]   Full design reference measurements (default: design-page-0.png)
  prize-ref [url] [ref] Compare prize cards in browser vs reference PNG

Examples:
  node measure.mjs overlays
  node measure.mjs prize-ref http://localhost:3000/ design-ref.png
`);
}

function findBlackButton(img, x0, x1, y0, y1) {
  for (let y = y0; y < y1; y++) {
    let black = 0;
    for (let x = x0; x < x1; x++) {
      if (px(img, x, y)[0] < 45) black++;
    }
    if (black > (x1 - x0) * 0.55) {
      let top = y;
      let bottom = y;
      for (let yy = y; yy < y1; yy++) {
        let b = 0;
        for (let x = x0; x < x1; x++) if (px(img, x, yy)[0] < 45) b++;
        if (b > (x1 - x0) * 0.4) bottom = yy;
        else if (bottom > top + 20) break;
      }
      return { left: x0, top, width: x1 - x0, height: bottom - top + 1 };
    }
  }
  return null;
}

function findWhiteInputs(img, x0, x1) {
  const rects = [];
  let y = 200;
  while (y < 700) {
    let white = 0;
    for (let x = x0; x < x1; x++) if (px(img, x, y)[0] > 250) white++;
    if (white > (x1 - x0) * 0.85) {
      const top = y;
      let bottom = y;
      for (let yy = y; yy < y + 80; yy++) {
        let w = 0;
        for (let x = x0; x < x1; x++) if (px(img, x, yy)[0] > 250) w++;
        if (w > (x1 - x0) * 0.7) bottom = yy;
      }
      if (bottom - top > 35) {
        rects.push({ left: x0, top, width: x1 - x0, height: bottom - top + 1 });
        y = bottom + 40;
        continue;
      }
    }
    y++;
  }
  return rects;
}

async function runOverlays() {
  const W = 1367;
  const H = 1153;
  const pages = [
    { name: "your-school", file: "Artboard 1_1.png" },
    { name: "prizes", file: "Artboard 1_2.png" },
    { name: "account", file: "Artboard 1_3.png" },
    { name: "invites", file: "Artboard 1_4.png" },
    { name: "youre-in", file: "Artboard 1_5.png" },
  ];

  const stepNav = [
    { label: "Welcome", href: "/", left: 497, top: 80, width: 110, height: 32 },
    { label: "Your School", href: "/your-school", left: 537, top: 80, width: 125, height: 32 },
    { label: "Prizes", href: "/prizes", left: 597, top: 80, width: 95, height: 32 },
    { label: "Account creation", href: "/account", left: 657, top: 80, width: 155, height: 32 },
    { label: "Invites", href: "/invites", left: 717, top: 80, width: 95, height: 32 },
    { label: "You're In", href: "/youre-in", left: 787, top: 80, width: 115, height: 32 },
  ];

  const loginLink = { label: "Log in", href: "/login", left: 1120, top: 34, width: 200, height: 24 };
  const out = { width: W, height: H, stepNav, loginLink, pages: {} };

  for (const p of pages) {
    const img = loadPng(path.join(ARTBOARDS_DIR, p.file));
    const btn = findBlackButton(img, 76, 596, 600, 800);
    const centeredBtn = findBlackButton(img, 443, 923, 500, 650);
    const inputs = p.name === "account" ? findWhiteInputs(img, 76, 556) : [];
    out.pages[p.name] = {
      src: `/artboards/${p.name}.png`,
      cta: btn || centeredBtn,
      ...(inputs.length ? { inputs } : {}),
    };
    console.log(p.name, JSON.stringify(out.pages[p.name], null, 2));
  }

  const dest = path.join(WEB_APP, "src/lib/artboard-overlays.json");
  fs.writeFileSync(dest, JSON.stringify(out, null, 2));
  console.log("wrote", dest);
}

function runArtboards() {
  const files = fs.readdirSync(ARTBOARDS_DIR).filter((f) => f.endsWith(".png"));

  function findTanTextY(img, x = 76) {
    for (let y = 80; y < 300; y++) {
      const [r, g, b] = px(img, x, y);
      if (r > 170 && r < 220 && g > 120 && g < 180 && b < 120) return y;
    }
    return -1;
  }

  function findFooterY(img) {
    const W = img.width;
    for (let y = img.height - 200; y < img.height; y++) {
      const [r, g, b] = px(img, 200, y);
      if (r > 220 && g > 210 && b < 200 && r - b > 15) return y;
    }
    return -1;
  }

  for (const file of files.sort()) {
    const img = loadPng(path.join(ARTBOARDS_DIR, file));
    console.log(file, {
      w: img.width,
      h: img.height,
      stepLabelY: findTanTextY(img),
      footerY: findFooterY(img),
    });
  }
}

function runApp(file = "app-fullpage.png") {
  const img = loadPng(file);
  const W = img.width;

  function bands(x0, x1, y0, y1, thr, cnt) {
    const out = [];
    let inB = false;
    let s = 0;
    for (let y = y0; y < y1; y++) {
      let c = 0;
      for (let x = x0; x < x1; x++) if (lum(img, x, y) < thr) c++;
      const on = c > cnt;
      if (on && !inB) {
        inB = true;
        s = y;
      } else if (!on && inB) {
        inB = false;
        if (y - s > 4) out.push([s, y]);
      }
    }
    if (inB) out.push([s, y1]);
    return out;
  }

  console.log("APP right-col dark bands CSS [top-bottom h]:");
  for (const b of bands(930, 1850, 0, 1340, 100, 14)) {
    console.log("  ", css(b[0]), "-", css(b[1]), "h", css(b[1] - b[0]));
  }

  const isCream = (x, y) => {
    const i = (W * y + x) << 2;
    return (
      Math.abs(img.data[i] - 245) +
        Math.abs(img.data[i + 1] - 240) +
        Math.abs(img.data[i + 2] - 232) <
      30
    );
  };

  let repTop = -1;
  for (let y = 1400; y < 1700; y++) {
    let c = 0;
    for (let x = 1000; x < 1740; x++) if (lum(img, x, y) < 90) c++;
    if (c > 25) {
      repTop = y;
      break;
    }
  }
  console.log("APP Represent top CSS:", css(repTop));

  let prizeTop = -1;
  for (let y = 1500; y < img.height; y++) {
    let n = 0;
    for (let x = 320; x < 1440; x++) if (!isCream(x, y)) n++;
    if (n > 250) {
      prizeTop = y;
      break;
    }
  }
  console.log("APP prize card top CSS:", css(prizeTop));
}

function runDesign(file = "design-page-0.png") {
  const img = loadPng(file);
  const W = img.width;
  const H = img.height;

  const isCream = (x, y) => {
    const [r, g, b] = px(img, x, y);
    return Math.abs(r - 245) + Math.abs(g - 240) + Math.abs(b - 232) < 36;
  };

  function firstDark(x0, x1, y0, y1, thr, cnt) {
    for (let y = y0; y < y1; y++) {
      let c = 0;
      for (let x = x0; x < x1; x++) if (lum(img, x, y) < thr) c++;
      if (c > cnt) return y;
    }
    return -1;
  }

  function lastDark(x0, x1, y0, y1, thr, cnt) {
    let last = -1;
    for (let y = y0; y < y1; y++) {
      let c = 0;
      for (let x = x0; x < x1; x++) if (lum(img, x, y) < thr) c++;
      if (c > cnt) last = y;
    }
    return last;
  }

  function solidBand(x0, x1, y0, y1, thr, cnt) {
    const bands = [];
    let inB = false;
    let s = 0;
    for (let y = y0; y < y1; y++) {
      let c = 0;
      for (let x = x0; x < x1; x++) if (lum(img, x, y) < thr) c++;
      const on = c > cnt;
      if (on && !inB) {
        inB = true;
        s = y;
      } else if (!on && inB) {
        inB = false;
        if (y - s > 12) bands.push([s, y]);
      }
    }
    return bands;
  }

  let photoRight = 0;
  for (let x = 0; x < 1200; x++) {
    if (isCream(x, 300)) {
      photoRight = x;
      break;
    }
  }

  let photoBottom = 0;
  for (let y = 0; y < H; y++) {
    if (isCream(300, y)) {
      photoBottom = y;
      break;
    }
  }

  const headingTop = firstDark(930, 1820, 300, 700, 90, 15);
  const headingBottom = lastDark(930, 1820, 300, 700, 90, 15);
  const buttonBands = solidBand(930, 1320, 700, 1320, 70, 150);
  const repTop = firstDark(1100, 1900, 980, 1300, 90, 25);

  function cardTopScan(y0) {
    for (let y = y0; y < H; y++) {
      let n = 0;
      for (let x = 160; x < 720; x++) if (!isCream(x, y)) n++;
      if (n > 300) return y;
    }
    return -1;
  }

  const prizeTop = cardTopScan(1150);
  let prizeBottom = -1;
  for (let y = prizeTop + 50; y < H; y++) {
    let n = 0;
    for (let x = 160; x < 720; x++) if (!isCream(x, y)) n++;
    if (n < 60) {
      prizeBottom = y;
      break;
    }
  }

  console.log("=== DESIGN measurements (CSS px) ===");
  console.log("photo right edge:", css(photoRight));
  console.log("photo bottom:", css(photoBottom));
  console.log("heading top:", css(headingTop), "bottom:", css(headingBottom));
  console.log(
    "button band(s):",
    buttonBands.map((b) => `[${css(b[0])}, ${css(b[1])}]`).join(" "),
  );
  console.log("Represent heading top:", css(repTop));
  console.log(
    "prize card top:",
    css(prizeTop),
    "bottom:",
    css(prizeBottom),
    "height:",
    css(prizeBottom > 0 ? prizeBottom - prizeTop : 0),
  );
  console.log("artboard:", css(W), "x", css(H));
}

function cardRects(img) {
  const W = img.width;
  const H = img.height;
  const isBg = (x, y) => lum(img, x, y) > 235;

  let rowY = -1;
  for (let y = Math.floor(H * 0.68); y < Math.floor(H * 0.92); y++) {
    let edge = 0;
    for (let x = 20; x < W - 20; x++) {
      if (!isBg(x, y) && isBg(x, y - 1)) edge++;
    }
    if (edge > 40) {
      rowY = y;
      break;
    }
  }

  const rects = [];
  let x = 20;
  while (x < W - 50) {
    while (x < W - 50 && isBg(x, rowY + 30)) x++;
    if (x >= W - 50) break;
    const left = x;
    let right = left;
    for (let cx = left + 30; cx < W; cx++) {
      if (!isBg(cx, rowY + 40)) right = cx;
      else if (right > left + 80) break;
    }
    let bottom = rowY;
    for (let y = rowY; y < H; y++) {
      if (!isBg(left + 20, y)) bottom = y;
    }
    if (right - left > 80) {
      rects.push({ left, top: rowY, right, bottom, w: right - left + 1, h: bottom - rowY + 1 });
      x = right + 30;
    } else x++;
    if (rects.length >= 3) break;
  }
  return { rowY, rects };
}

async function runPrizeRef(url = DEFAULT_URL, refPath = "design-ref.png") {
  const ref = loadPng(refPath);
  console.log("REF", JSON.stringify(cardRects(ref), null, 2));

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1366, height: 1152 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const app = await page.evaluate(() => {
    const row = document.querySelector('[data-prize-row="desktop"]');
    const cards = row ? [...row.querySelectorAll("article")] : [];
    const r = (el) => {
      const b = el.getBoundingClientRect();
      return {
        left: Math.round(b.left),
        top: Math.round(b.top),
        right: Math.round(b.right),
        bottom: Math.round(b.bottom),
        w: Math.round(b.width),
        h: Math.round(b.height),
      };
    };
    return {
      rowY: row ? Math.round(row.getBoundingClientRect().top) : null,
      rects: cards.map(r),
      h2: document.querySelector("h2") ? r(document.querySelector("h2")) : null,
    };
  });

  console.log("APP", JSON.stringify(app, null, 2));
  await browser.close();
}

switch (mode) {
  case "overlays":
    await runOverlays();
    break;
  case "artboards":
    runArtboards();
    break;
  case "app":
    runApp(args[0]);
    break;
  case "design":
    runDesign(args[0]);
    break;
  case "prize-ref":
    await runPrizeRef(args[0], args[1]);
    break;
  default:
    printHelp();
    process.exit(mode === "help" ? 0 : 1);
}
