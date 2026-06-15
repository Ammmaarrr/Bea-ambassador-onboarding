import mupdf from "mupdf";
import fs from "node:fs";

const doc = mupdf.Document.openDocument("../Ambassador Onboarding.ai");
console.log("pages", doc.countPages());

// Try to extract fonts - explore mupdf API
const page = doc.loadPage(0);
const text = page.toStructuredText("preserve-spans");
console.log("structured text ok");

// List document fonts if API exists
for (const key of Object.keys(mupdf)) {
  if (/font/i.test(key)) console.log("export", key);
}
