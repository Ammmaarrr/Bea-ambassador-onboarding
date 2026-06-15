from io import BytesIO
from pathlib import Path

import fitz
from fontTools.cffLib import CFFFontSet
from fontTools.fontBuilder import FontBuilder
from fontTools.ttLib import newTable
from fontTools.ttLib.tables._c_m_a_p import cmap_classes

ROOT = Path(__file__).resolve().parents[1] / "extracted" / "src" / "fonts"
ROOT.mkdir(parents=True, exist_ok=True)

pdf = fitz.open(Path(__file__).resolve().parents[1] / "Ambassador Onboarding.ai")

for xref, family, ps_name, style in [
    (21, "Canela Text Trial", "CanelaTextTrial-Regular", "Regular"),
    (22, "Canela Text Trial", "CanelaTextTrial-Medium", "Medium"),
]:
    name, ext, _, data = pdf.extract_font(xref)
    cff = CFFFontSet()
    cff.decompile(BytesIO(data), None)
    top = cff[0]
    glyph_order = list(top.charset)
    if ".notdef" not in glyph_order:
        glyph_order = [".notdef"] + glyph_order

    # WinAnsi mapping for the subset used on the home page
    winansi = {
        32: "space",
        46: "period",
        65: "A", 67: "C", 69: "E", 71: "G", 73: "I", 82: "R", 84: "T", 87: "W", 89: "Y",
        97: "a", 98: "b", 99: "c", 100: "d", 101: "e", 102: "f", 103: "g", 104: "h",
        105: "i", 107: "k", 108: "l", 109: "m", 110: "n", 111: "o", 112: "p",
        114: "r", 115: "s", 116: "t", 117: "u", 118: "v", 119: "w", 121: "y",
        8217: "quoteright",
    }
    cmap = {cp: g for cp, g in winansi.items() if g in glyph_order}

    fb = FontBuilder(1000, isTTF=False)
    fb.setupGlyphOrder(glyph_order)
    fb.setupCharacterMap(cmap)
    fb.setupNameTable({
        "familyName": family,
        "styleName": style,
        "uniqueFontIdentifier": ps_name,
        "fullName": f"{family} {style}",
        "psName": ps_name,
    })
    fb.setupHead(unitsPerEm=1000)
    fb.setupHorizontalHeader(ascent=806, descent=-272)
    fb.setupHorizontalMetrics({g: (600, 0) for g in glyph_order})
    fb.setupPost(isFixedPitch=0)
    fb.setupOS2(
        sTypoAscender=806,
        sTypoDescender=-272,
        usWinAscent=806,
        usWinDescent=272,
        xAvgCharWidth=500,
    )

    font = fb.font
    cff_table = newTable("CFF ")
    cff_table.cff = cff
    font["CFF "] = cff_table

    otf_path = ROOT / f"{ps_name}.otf"
    font.save(otf_path)
    print("saved", otf_path, otf_path.stat().st_size, "bytes")
