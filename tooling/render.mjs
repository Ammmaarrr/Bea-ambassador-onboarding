import { pdf } from "pdf-to-img";
import fs from "node:fs";

const doc = await pdf("./design.pdf", { scale: 2 });
console.log("pages:", doc.length);
let i = 0;
for await (const page of doc) {
  fs.writeFileSync(`design-page-${i}.png`, page);
  console.log("wrote design-page-" + i + ".png");
  i++;
  if (i >= 3) break;
}
