import { PNG } from "pngjs";
import fs from "node:fs";
const src = PNG.sync.read(fs.readFileSync("design-page-0.png"));
// heading region in 2x px: approx x 690..1380, y 250..480
const x0=905,y0=330,w=1000,h=360;
const out = new PNG({width:w,height:h});
for(let y=0;y<h;y++)for(let x=0;x<w;x++){
  const si=(src.width*(y+y0)+(x+x0))<<2;
  const oi=(w*y+x)<<2;
  out.data[oi]=src.data[si];out.data[oi+1]=src.data[si+1];out.data[oi+2]=src.data[si+2];out.data[oi+3]=255;
}
fs.writeFileSync("design-heading.png", PNG.sync.write(out));
console.log("wrote design-heading.png", w, h);
