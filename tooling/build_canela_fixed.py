"""Rebuild the real Canela Text Trial subset from the design PDF with CORRECT
per-glyph advance widths (the previous build hardcoded every width to 600,
which jammed the letters together). Outputs proper OTF files."""
from io import BytesIO
from pathlib import Path

import fitz
from fontTools.agl import AGL2UV
from fontTools.cffLib import CFFFontSet
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.boundsPen import BoundsPen
from fontTools.ttLib import newTable

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "design" / "archive" / "Ambassador Onboarding.ai"
OUT = ROOT / "apps" / "web" / "src" / "fonts"
OUT.mkdir(parents=True, exist_ok=True)

doc = fitz.open(PDF)

TARGETS = [
    (21, "Canela Text Trial", "CanelaText-Regular", "Regular"),
    (22, "Canela Text Trial", "CanelaText-Medium", "Medium"),
]


for xref, family, ps_name, style in TARGETS:
    name, ext, typ, data = doc.extract_font(xref)
    cff = CFFFontSet()
    cff.decompile(BytesIO(data), None)
    top = cff[0]

    glyph_order = list(top.charset)
    if ".notdef" not in glyph_order:
        glyph_order = [".notdef"] + glyph_order

    # Real advance widths come straight from the CFF charstrings
    cff_glyphs = top.CharStrings
    widths = {}
    for name in glyph_order:
        g = cff_glyphs[name]
        g.draw(BoundsPen(None))  # forces charstring execution -> populates width
        widths[name] = int(round(g.width))

    # Unicode cmap straight from the real (AGL) glyph names in the subset
    cmap = {}
    for gname in glyph_order:
        if gname in AGL2UV:
            cmap[AGL2UV[gname]] = gname
        elif gname.startswith("uni") and len(gname) == 7:
            cmap[int(gname[3:], 16)] = gname

    # Real bounding boxes for vertical metrics
    glyph_set = top.CharStrings
    ymin = ymax = 0
    for gname in glyph_order:
        pen = BoundsPen(None)
        glyph_set[gname].draw(pen)
        if pen.bounds:
            _, gymin, _, gymax = pen.bounds
            ymin = min(ymin, gymin)
            ymax = max(ymax, gymax)
    ascent = int(round(ymax)) or 750
    descent = int(round(ymin)) or -250

    fb = FontBuilder(1000, isTTF=False)
    fb.setupGlyphOrder(glyph_order)
    fb.setupCharacterMap(cmap)
    fb.setupNameTable({
        "familyName": family,
        "styleName": style,
        "uniqueFontIdentifier": f"{ps_name};1.0",
        "fullName": f"{family} {style}",
        "psName": ps_name,
        "version": "1.0",
    })
    fb.setupHead(unitsPerEm=1000)
    fb.setupHorizontalHeader(ascent=ascent, descent=descent)
    fb.setupHorizontalMetrics({g: (widths.get(g, 500), 0) for g in glyph_order})
    fb.setupPost(isFixedPitch=0)
    fb.setupOS2(
        sTypoAscender=ascent,
        sTypoDescender=descent,
        sTypoLineGap=0,
        usWinAscent=ascent,
        usWinDescent=abs(descent),
        xAvgCharWidth=int(round(sum(widths.values()) / max(len(widths), 1))),
    )

    font = fb.font
    cff_table = newTable("CFF ")
    cff_table.cff = cff
    font["CFF "] = cff_table

    otf_path = OUT / f"{ps_name}.otf"
    font.save(otf_path)

    uniq = sorted(set(widths[g] for g in glyph_order if g != ".notdef"))
    print(f"saved {otf_path.name}: {len(glyph_order)} glyphs, "
          f"{len(uniq)} unique widths -> {uniq[:8]}..., asc={ascent} desc={descent}")
    print("  covered chars:", "".join(chr(c) for c in sorted(cmap) if 32 < c < 127))

    # Also emit woff2 if brotli available (smaller for web)
    try:
        font.flavor = "woff2"
        font.save(OUT / f"{ps_name}.woff2")
        print(f"  + {ps_name}.woff2")
    except Exception as e:
        print("  (woff2 skipped:", e, ")")
