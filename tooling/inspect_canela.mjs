import * as fontkit from "fontkit";
import fs from "node:fs";

const SAMPLE = "Welcome to Campus launch Represent. Grow. Win.";
const files = ["canela-extract-0.otf", "canela-extract-1.otf", "canela-extract-2.otf"];

for (const f of files) {
  console.log("\n=================", f, "=================");
  try {
    const buf = fs.readFileSync(f);
    let font = fontkit.create(buf);
    if (font.fonts) font = font.fonts[0];
    console.log("postscriptName:", font.postscriptName);
    console.log("familyName:", font.familyName, "| subfamily:", font.subfamilyName);
    console.log("numGlyphs:", font.numGlyphs, "| unitsPerEm:", font.unitsPerEm);
    console.log("characterSet length:", font.characterSet?.length);

    // Check unicode coverage + per-glyph widths for the sample
    const run = font.layout(SAMPLE);
    const widths = run.glyphs.map((g) => g.advanceWidth);
    const uniqueWidths = [...new Set(widths)];
    console.log("advanceWidths sample:", widths.slice(0, 14));
    console.log("unique advanceWidth count:", uniqueWidths.length, "->", uniqueWidths.slice(0, 12));

    // Check which sample chars are actually mapped (not .notdef / glyph 0)
    let missing = [];
    for (const ch of [...new Set(SAMPLE.replace(/\s/g, "").split(""))]) {
      const gid = font.glyphForCodePoint(ch.codePointAt(0)).id;
      if (gid === 0) missing.push(ch);
    }
    console.log("missing chars (map to .notdef):", missing.length ? missing.join("") : "NONE");
  } catch (e) {
    console.log("ERROR:", e.message);
  }
}
