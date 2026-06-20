/**
 * Precise waitlist artboard overlay coordinates (design/waitlist artboard).
 * Run: node measure_waitlist.mjs
 */
import { PNG } from "pngjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artDir = path.join(root, "design/waitlist artboard");
const outPath = path.join(root, "apps/web/src/lib/waitlist-overlays.json");

const px = (img, x, y) => {
  const i = (img.width * y + x) << 2;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};

function load(file) {
  return PNG.sync.read(fs.readFileSync(path.join(artDir, file)));
}

function findBlackButton(img, x0, x1, y0, y1) {
  for (let y = y0; y < y1; y++) {
    let black = 0;
    for (let x = x0; x < x1; x++) if (px(img, x, y)[0] < 50) black++;
    if (black > (x1 - x0) * 0.45) {
      let top = y;
      let bottom = y;
      for (let yy = y; yy < y1; yy++) {
        let b = 0;
        for (let x = x0; x < x1; x++) if (px(img, x, yy)[0] < 50) b++;
        if (b > (x1 - x0) * 0.3) bottom = yy;
        else if (bottom > top + 14) break;
      }
      return { left: x0, top, width: x1 - x0, height: bottom - top + 1 };
    }
  }
  return null;
}

function findRoundedInput(img, x0, x1, y0, y1) {
  for (let y = y0; y < y1; y++) {
    let light = 0;
    for (let x = x0 + 4; x < x1 - 4; x++) {
      const [r, g, b] = px(img, x, y);
      if (r > 248 && g > 248 && b > 246) light++;
    }
    if (light > (x1 - x0 - 8) * 0.55) {
      const top = y;
      let bottom = y;
      for (let yy = y; yy < Math.min(y + 70, y1); yy++) {
        let w = 0;
        for (let x = x0 + 4; x < x1 - 4; x++) {
          const [r, g, b] = px(img, x, yy);
          if (r > 248 && g > 248 && b > 246) w++;
        }
        if (w > (x1 - x0 - 8) * 0.45) bottom = yy;
      }
      if (bottom - top >= 44) {
        return { left: x0, top, width: x1 - x0, height: bottom - top + 1 };
      }
    }
  }
  return null;
}

function findUnderlineFields(img, x0, x1) {
  const fields = [];
  for (let y = 200; y < 500; y++) {
    let dark = 0;
    for (let x = x0; x < x1; x++) if (px(img, x, y)[0] < 35) dark++;
    if (dark > (x1 - x0) * 0.88) {
      fields.push({ left: x0, top: y - 44, width: x1 - x0, height: 52 });
      y += 80;
    }
  }
  return fields;
}

function findCityCards(img, x0, x1, y0, y1) {
  const cards = [];
  const colW = Math.floor((x1 - x0 - 36) / 4);
  for (let i = 0; i < 4; i++) {
    const left = x0 + i * (colW + 12);
    let top = -1;
    for (let y = y0; y < y1; y++) {
      let dark = 0;
      for (let x = left + 8; x < left + colW - 8; x++) {
        const [r, g, b] = px(img, x, y);
        if (r < 120 && g < 120 && b < 130) dark++;
      }
      if (dark > (colW - 16) * 0.35) {
        top = y;
        break;
      }
    }
    if (top < 0) continue;
    let bottom = top;
    for (let y = top; y < y1; y++) {
      let dark = 0;
      for (let x = left + 8; x < left + colW - 8; x++) {
        const [r, g, b] = px(img, x, y);
        if (r < 140 && g < 140 && b < 150) dark++;
      }
      if (dark > (colW - 16) * 0.2) bottom = y;
    }
    cards.push({ left, top, width: colW, height: bottom - top + 1 });
  }
  return cards;
}

function measureStep(file, opts = {}) {
  const img = load(file);
  const L = 100;
  const R = 620;
  const page = {
    width: img.width,
    height: img.height,
    src: `/waitlist/artboards/${file}`,
    back: { left: 76, top: 44, width: 32, height: 32, href: opts.backHref ?? "/waitlist" },
    progress: { left: 186, top: 79, width: 378, height: 5, steps: 4, activeIndex: opts.activeIndex ?? 0 },
    cta: findBlackButton(img, L, R, 650, img.height - 10) ??
      findBlackButton(img, L, R, 480, img.height - 10),
    inputs: [],
    cityCards: [],
  };

  if (opts.search) {
    const s = findRoundedInput(img, L, R, 480, 680);
    if (s) page.inputs.push({ ...s, id: "search", type: "search", placeholder: "Search" });
  }
  if (opts.email) {
    const e = findRoundedInput(img, L, R, 300, 560);
    if (e) page.inputs.push({ ...e, id: "email", type: "email", placeholder: "you@email.com" });
  }
  if (opts.underline) {
    page.inputs = findUnderlineFields(img, L, R).map((r, i) => ({
      ...r,
      id: i === 0 ? "firstName" : "age",
      type: i === 0 ? "text" : "number",
      placeholder: "",
    }));
  }
  if (opts.cityCards) {
    page.cityCards = findCityCards(img, L, R, 240, 560);
  }
  if (page.cta && opts.ctaHref) {
    page.cta = { ...page.cta, href: opts.ctaHref, label: opts.ctaLabel ?? "Continue" };
  }
  if (opts.secondaryLink) {
    page.secondaryLink = {
      ...opts.secondaryLink,
      left: L,
      top: (page.cta?.top ?? 700) + (page.cta?.height ?? 51) + 18,
      width: 320,
      height: 24,
    };
  }
  return page;
}

function measureLanding() {
  const img = load("Artboard 1.png");
  const L = 76;
  const R = 620;
  return {
    width: img.width,
    height: img.height,
    src: "/waitlist/artboards/Artboard 1.png",
    heroEmail: findRoundedInput(img, L, R, 420, 540),
    heroSubmit: { left: 564, top: 458, width: 44, height: 44, href: "/waitlist/3", label: "Submit email" },
    heroCta: { left: 1138, top: 46, width: 128, height: 56, href: "/waitlist/3", label: "Join waitlist" },
    cityPills: [
      { left: 76, top: 612, width: 56, height: 32, label: "NYC" },
      { left: 144, top: 612, width: 72, height: 32, label: "Boston" },
      { left: 228, top: 612, width: 64, height: 32, label: "Miami" },
      { left: 304, top: 612, width: 108, height: 32, label: "Los Angeles" },
      { left: 424, top: 612, width: 80, height: 32, label: "Chicago" },
    ],
    footerEmail: findRoundedInput(img, 720, 1280, 1880, 1980),
  };
}

const out = {
  width: 1367,
  bg: "#f8f3ef",
  pages: {
    "1": measureLanding(),
    "3": measureStep("3.png", {
      activeIndex: 1,
      backHref: "/waitlist",
      search: true,
      cityCards: true,
      ctaHref: "/waitlist/4",
      ctaLabel: "Claim my spot",
      secondaryLink: { href: "/waitlist/4", label: "Continue without selecting a market" },
    }),
    "4": measureStep("4.png", {
      activeIndex: 2,
      backHref: "/waitlist/3",
      underline: true,
      ctaHref: "/waitlist/5",
      ctaLabel: "Continue",
    }),
    "5": measureStep("5.png", {
      activeIndex: 3,
      backHref: "/waitlist/4",
      search: true,
      ctaHref: "/waitlist/7",
      ctaLabel: "Continue",
    }),
    "7": measureStep("7.png", {
      activeIndex: 4,
      backHref: "/waitlist/5",
      email: true,
      ctaHref: "/waitlist/8",
      ctaLabel: "Confirm email",
    }),
    "8": {
      width: load("8.png").width,
      height: load("8.png").height,
      src: "/waitlist/artboards/8.png",
      back: { left: 76, top: 44, width: 32, height: 32, href: "/waitlist/7" },
      copyLink: findBlackButton(load("8.png"), 420, 950, 2180, 2260),
    },
    "9": {
      width: load("9.png").width,
      height: load("9.png").height,
      src: "/waitlist/artboards/9.png",
      back: { left: 76, top: 44, width: 32, height: 32, href: "/waitlist/8" },
    },
  },
};

fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log("Wrote", outPath);
