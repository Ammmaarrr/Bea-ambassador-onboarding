import fs from "node:fs";
import zlib from "node:zlib";

const pdf = fs.readFileSync("../Ambassador Onboarding.ai");
const text = pdf.toString("latin1");

// Find FontFile2/3 stream refs near Canela
const canelaIdx = text.indexOf("CanelaTextTrial-Regular");
console.log("Canela ref at:", canelaIdx);
console.log(text.slice(canelaIdx, canelaIdx + 500));

// Find all stream objects and look for font signatures after inflate
const streamRe = /(\d+) \d+ obj[\s\S]*?<<([\s\S]*?)>>\s*stream\r?\n([\s\S]*?)endstream/g;
let m, found = 0;
while ((m = streamRe.exec(text)) !== null && found < 5) {
  const dict = m[2];
  const raw = m[3];
  if (!/FontFile|Subtype\/Type1|Subtype\/OpenType|Subtype\/Type0/.test(dict)) continue;
  if (!/Canela|FontFile/.test(dict) && !dict.includes("FontFile")) continue;
  console.log("\n--- obj", m[1], "dict snippet ---");
  console.log(dict.slice(0, 400));
  let buf = Buffer.from(raw, "latin1");
  if (/FlateDecode/.test(dict)) {
    try { buf = zlib.inflateSync(buf); } catch { continue; }
  }
  const head = buf.slice(0, 4).toString("hex");
  console.log("decompressed len", buf.length, "head", head, buf.slice(0, 4).toString());
  if (buf.slice(0, 4).toString() === "OTTO" || buf.readUInt32BE(0) === 0x00010000 || buf.slice(0, 4).toString() === "true") {
    const out = `canela-extract-${found}.otf`;
    fs.writeFileSync(out, buf);
    console.log("WROTE", out);
    found++;
  }
}

// Brute: scan inflated streams for OTTO anywhere in file
console.log("\nBrute scanning all Flate streams for OTTO...");
let count = 0;
while ((m = streamRe.exec(text)) !== null) {
  const raw = Buffer.from(m[3], "latin1");
  if (!/FlateDecode/.test(m[2])) continue;
  try {
    const buf = zlib.inflateSync(raw);
    if (buf.length > 10000 && (buf.slice(0, 4).toString() === "OTTO" || buf.readUInt32BE(0) === 0x00010000)) {
      const out = `font-brute-${count}.otf`;
      fs.writeFileSync(out, buf);
      console.log("WROTE", out, "size", buf.length);
      count++;
      if (count >= 3) break;
    }
  } catch {}
}
