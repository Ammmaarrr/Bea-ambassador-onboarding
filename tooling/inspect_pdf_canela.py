from io import BytesIO
from pathlib import Path

import fitz
from fontTools.cffLib import CFFFontSet

PDF = Path(__file__).resolve().parents[1] / "design" / "archive" / "Ambassador Onboarding.ai"
doc = fitz.open(PDF)

# Find all embedded fonts across pages
seen = {}
for pno in range(doc.page_count):
    for f in doc.get_page_fonts(pno):
        xref = f[0]
        seen[xref] = f

print("== embedded fonts ==")
for xref, f in sorted(seen.items()):
    # f = (xref, ext, type, basefont, name, encoding, ...)
    print(xref, f[1], f[2], f[3], "| enc:", f[5] if len(f) > 5 else "?")

print("\n== Canela candidates ==")
for xref, f in sorted(seen.items()):
    base = str(f[3])
    if "anela" in base:
        name, ext, typ, data = doc.extract_font(xref)
        print(f"\nxref {xref}: name={name} ext={ext} type={typ} bytes={len(data)}")
        head = data[:4]
        print("  head:", head, head.hex())
        try:
            cff = CFFFontSet()
            cff.decompile(BytesIO(data), None)
            top = cff[0]
            cs = top.CharStrings
            charset = list(top.charset)
            print("  glyphs:", len(charset))
            print("  charset sample:", charset[:30])
            # widths
            widths = {}
            for gname in charset[:40]:
                c = cs[gname]
                c.decompile()
                w = getattr(c, "width", None)
                widths[gname] = w
            print("  widths sample:", widths)
        except Exception as e:
            print("  CFF parse error:", e)
