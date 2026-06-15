import fs from "node:fs";
import zlib from "node:zlib";

const pdf = fs.readFileSync("../Ambassador Onboarding.ai").toString("latin1");

function getStream(objNum) {
  const re = new RegExp(`${objNum} 0 obj\\s*<<([\\s\\S]*?)>>\\s*stream\\r?\\n([\\s\\S]*?)endstream`);
  const m = pdf.match(re);
  if (!m) return null;
  let buf = Buffer.from(m[2], "latin1");
  if (/FlateDecode/.test(m[1])) buf = zlib.inflateSync(buf);
  return { dict: m[1], buf };
}

// FontFile3 for CanelaTextTrial-Regular is object 890
const s890 = getStream(890);
const s889 = getStream(889); // Medium
fs.writeFileSync("canela-regular-type1c.bin", s890.buf);
fs.writeFileSync("canela-medium-type1c.bin", s889.buf);
console.log("890 size", s890.buf.length, "head", s890.buf.slice(0,8).toString("hex"));
console.log("889 size", s889.buf.length);
