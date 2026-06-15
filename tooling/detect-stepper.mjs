import { PNG } from "pngjs";
import fs from "fs";
import path from "path";
import { ARTBOARDS_DIR, WEB_APP } from "./paths.mjs";

function lum(img, x, y) {
  const i = (img.width * y + x) << 2;
  return (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3;
}

function scoreCircle(img, cx, cy, r = 11) {
  let ring = 0;
  let fill = 0;
  for (let a = 0; a < 32; a++) {
    const ang = (a / 32) * Math.PI * 2;
    const x = Math.round(cx + Math.cos(ang) * r);
    const y = Math.round(cy + Math.sin(ang) * r);
    if (lum(img, x, y) < 200) ring++;
    const x2 = Math.round(cx + Math.cos(ang) * (r - 4));
    const y2 = Math.round(cy + Math.sin(ang) * (r - 4));
    if (lum(img, x2, y2) < 80) fill++;
  }
  return ring + fill * 0.5;
}

function findSixCircles(filePath) {
  const img = PNG.sync.read(fs.readFileSync(filePath));
  const candidates = [];
  for (let cy = 78; cy <= 105; cy++) {
    for (let cx = 320; cx <= 820; cx++) {
      const s = scoreCircle(img, cx, cy);
      if (s >= 18) candidates.push({ cx, cy, s });
    }
  }
  candidates.sort((a, b) => b.s - a.s);

  const picked = [];
  for (const c of candidates) {
    if (picked.find((p) => Math.hypot(p.cx - c.cx, p.cy - c.cy) < 35)) continue;
    picked.push(c);
    if (picked.length === 6) break;
  }
  picked.sort((a, b) => a.cx - b.cx);
  return picked;
}

const ref = path.join(ARTBOARDS_DIR, "Artboard 2.png");
const circles = findSixCircles(ref);
console.log(
  "Artboard 2 circles:",
  circles.map((c) => `${c.cx},${c.cy}`).join(" | "),
);

const labels = [
  "Welcome",
  "Your School",
  "Prizes",
  "Account creation",
  "Invites",
  "You're In",
];
const hrefs = ["/", "/your-school", "/prizes", "/account", "/invites", "/youre-in"];
const widths = [110, 125, 95, 155, 95, 115];

const stepNav = circles.map((c, i) => ({
  label: labels[i],
  href: hrefs[i],
  left: c.cx - 4,
  top: c.cy - 11,
  width: widths[i],
  height: 32,
}));

const dest = path.join(WEB_APP, "src/lib/artboard-overlays.json");
const existing = JSON.parse(fs.readFileSync(dest, "utf8"));
existing.stepNav = stepNav;
fs.writeFileSync(dest, JSON.stringify(existing, null, 2));
console.log(JSON.stringify(stepNav, null, 2));
