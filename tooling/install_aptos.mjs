import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { webSrc } from "./paths.mjs";

const APTOS_URL =
  "https://download.microsoft.com/download/8/6/0/860a94fa-7feb-44ef-ac79-c072d9113d69/Microsoft%20Aptos%20Fonts.zip";

const zipPath = path.join(process.env.TEMP || ".", "MicrosoftAptosFonts.zip");
const extractDir = path.join(process.env.TEMP || ".", "MicrosoftAptosFonts");
const projectFonts = webSrc("fonts");

fs.mkdirSync(projectFonts, { recursive: true });

console.log("Downloading Aptos from Microsoft...");
const res = await fetch(APTOS_URL);
if (!res.ok) throw new Error(`Download failed: ${res.status}`);
const buf = Buffer.from(await res.arrayBuffer());
fs.writeFileSync(zipPath, buf);
console.log("Downloaded", buf.length, "bytes");

fs.mkdirSync(extractDir, { recursive: true });
execSync(
  `powershell -NoProfile -Command "Expand-Archive -Path '${zipPath.replace(/'/g, "''")}' -DestinationPath '${extractDir.replace(/'/g, "''")}' -Force"`,
  { stdio: "inherit" },
);

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else if (/\.(ttf|otf|ttc)$/i.test(ent.name)) out.push(p);
  }
  return out;
}

const fontFiles = walk(extractDir);
console.log("Found", fontFiles.length, "font files");

// Per-user install (no admin required)
const userFonts = path.join(
  process.env.LOCALAPPDATA || "",
  "Microsoft",
  "Windows",
  "Fonts",
);
fs.mkdirSync(userFonts, { recursive: true });

for (const src of fontFiles) {
  const dest = path.join(userFonts, path.basename(src));
  fs.copyFileSync(src, dest);
}

// Register fonts with Windows (per-user)
for (const src of fontFiles) {
  try {
    execSync(
      `powershell -NoProfile -Command "New-ItemProperty -Path 'HKCU:\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Fonts' -Name '${path.basename(src).replace(/'/g, "''")}' -Value '${src.replace(/'/g, "''")}' -PropertyType String -Force | Out-Null"`,
      { stdio: "ignore" },
    );
  } catch {
    // registry optional; file copy is enough for many apps
  }
}

console.log("Installed to", userFonts);

// Bundle Regular + Medium for web (heading uses weight 400)
const bundle = [
  ["Aptos.ttf", "Aptos-Regular.ttf"],
  ["Aptos-Regular.ttf", "Aptos-Regular.ttf"],
  ["Aptos-Medium.ttf", "Aptos-Medium.ttf"],
];

for (const src of fontFiles) {
  const base = path.basename(src);
  for (const [from, to] of bundle) {
    if (base.toLowerCase() === from.toLowerCase()) {
      fs.copyFileSync(src, path.join(projectFonts, to));
      console.log("Bundled for web:", to);
    }
  }
}

console.log("Aptos install complete. Hard-refresh the browser (Ctrl+Shift+R).");
