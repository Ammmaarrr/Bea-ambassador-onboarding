/**

 * Crop waitlist mobile assets from laptop artboards.

 * Run: node tooling/extract_waitlist_mobile_assets.mjs

 */

import { PNG } from "pngjs";

import fs from "node:fs";

import path from "node:path";

import { fileURLToPath } from "node:url";



const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const artDir = path.join(root, "design/waitlist artboard");

const outDir = path.join(root, "apps/web/public/waitlist");



const CITY_CARD = { top: 1588, width: 144 };



function crop(src, { left, top, width, height }) {

  const dst = new PNG({ width, height });

  for (let y = 0; y < height; y++) {

    for (let x = 0; x < width; x++) {

      const si = ((top + y) * src.width + (left + x)) << 2;

      const di = (y * width + x) << 2;

      dst.data[di] = src.data[si];

      dst.data[di + 1] = src.data[si + 1];

      dst.data[di + 2] = src.data[si + 2];

      dst.data[di + 3] = src.data[si + 3];

    }

  }

  return dst;

}



/** Stop before baked artboard labels (bright serif rows below the photo). */

function findCityPhotoHeight(src, left, { top, width }) {

  const px = (x, y) => {

    const i = (src.width * y + x) << 2;

    return src.data[i];

  };

  const brightRow = (y) => {

    let count = 0;

    for (let x = left + 5; x < left + width - 5; x++) {

      if (px(x, y) > 230) count++;

    }

    return count;

  };



  for (let y = top + 80; y < top + 220; y++) {

    if (brightRow(y) >= 10) {

      return y - top - 5;

    }

  }



  return 100;

}



function writePng(png, filePath) {

  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  fs.writeFileSync(filePath, PNG.sync.write(png));

}



const ab1 = PNG.sync.read(fs.readFileSync(path.join(artDir, "Artboard 1.png")));

const ab8 = PNG.sync.read(fs.readFileSync(path.join(artDir, "8.png")));



const cities = [

  { left: 692, name: "new-york" },

  { left: 850, name: "boston" },

  { left: 1008, name: "miami" },

  { left: 1166, name: "los-angeles" },

];



for (const card of cities) {

  const height = findCityPhotoHeight(ab1, card.left, CITY_CARD);

  writePng(

    crop(ab1, { left: card.left, top: CITY_CARD.top, width: CITY_CARD.width, height }),

    path.join(outDir, "cities", `${card.name}.png`),

  );

  console.log(`  ${card.name}: ${CITY_CARD.width}x${height}`);

}



writePng(

  crop(ab1, { left: 720, top: 168, width: 580, height: 436 }),

  path.join(outDir, "hero", "couple.png"),

);



writePng(
  crop(ab8, { left: 612, top: 192, width: 142, height: 112 }),
  path.join(outDir, "confirmed", "check-badge.png"),
);

const perkIcons = [
  { name: "perk-icon-early", left: 272, top: 964, width: 32, height: 32 },
  { name: "perk-icon-time", left: 669, top: 964, width: 32, height: 32 },
  { name: "perk-icon-premium", left: 1066, top: 964, width: 32, height: 32 },
];
for (const icon of perkIcons) {
  writePng(
    crop(ab8, icon),
    path.join(outDir, "confirmed", `${icon.name}.png`),
  );
}

const ab9 = PNG.sync.read(fs.readFileSync(path.join(artDir, "9.png")));
writePng(
  crop(ab9, { left: 1094, top: 128, width: 48, height: 48 }),
  path.join(outDir, "prizes", "gift-icon.png"),
);
writePng(
  crop(ab9, { left: 1108, top: 42, width: 36, height: 36 }),
  path.join(outDir, "avatars", "ron.png"),
);

console.log("Wrote waitlist mobile assets to", outDir);


