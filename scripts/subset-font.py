"""Builds the subset web fonts in src/assets/fonts/*-Sub.woff2 from the full sources.

Dev-only (not part of the build); based on pointcamp-winter/scripts/subset-font.py.
Re-run after replacing a source font or changing the text set in a display face:
    pip install fonttools brotli
    bun run build                  (the display faces read dist/client/index.html)
    python3 scripts/subset-font.py
    bun run build                  (ships the new subsets)

Kyiv Type Sans (main face, any text): Latin, Cyrillic and punctuation ranges in
KYIV_UNICODES; CONT and MIDL pinned to their defaults (what the page renders). The `wght`
axis is kept whole on purpose: narrowing it (e.g. to 400-1000) re-rounds the advance
widths by up to 0.2 px at 750/900, enough to re-wrap headings that fit to the pixel
(«Наш маршрут Кореєю» at 390 px). Kept whole, metrics match the source exactly and the
file is even smaller.

Black Han Sans, Caveat and Archivo Black: only the characters the prerendered page
shows in them, found by the classes that set those faces (see DISPLAY_FACES). Caveat is
instanced at weight 700, the only weight the marker notes use.
"""
import io
import sys
from html.parser import HTMLParser
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "src/assets/fonts"
PAGE = ROOT / "dist/client/index.html"

KYIV_UNICODES = (
    list(range(0x20, 0x7F))  # Basic Latin
    + list(range(0xA0, 0x100))  # Latin-1 (nbsp, «», ©, °, ·, ×, ±, …)
    + [0x2BC]  # ʼ (Ukrainian apostrophe: Імʼя, звʼяжемося)
    + list(range(0x400, 0x460))  # Cyrillic (incl. Ukrainian Є І Ї)
    + [0x490, 0x491, 0x2116]  # Ґ ґ №
    + [0x2013, 0x2014, 0x2018, 0x2019, 0x201A, 0x201C, 0x201D, 0x201E]  # dashes, quotes
    + [0x2022, 0x2026, 0x2032, 0x2039, 0x203A, 0x20AC, 0x2122]  # • … ′ ‹ › € ™
    + [0x2190, 0x2191, 0x2192, 0x2193, 0x2212, 0x2248, 0x2264, 0x2265]  # arrows, − ≈ ≤ ≥
    + [0x2605]  # ★ (FAQ «готелі 3–4★»)
)

# Display face -> (source, output, classes that set it, axis pins or None).
DISPLAY_FACES = {
    "Black Han Sans": (
        "BlackHanSans-Regular.woff2",
        "BlackHanSans-Sub.woff2",
        {"pk-kr", "pk-day__kr", "font-kr"},
        None,
    ),
    "Caveat": ("Caveat-Variable.woff2", "Caveat-Sub.woff2", {"pk-note"}, {"wght": 700}),
    "Archivo Black": (
        "ArchivoBlack-Regular.woff2",
        "ArchivoBlack-Sub.woff2",
        {"pk-slogan"},
        None,
    ),
}

# Always kept in display faces, whatever the page text is.
SAFETY = {0x20, 0xA0}

VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}


class FaceText(HTMLParser):
    """Collects the characters rendered inside elements carrying given classes."""

    def __init__(self, classes_by_face):
        super().__init__(convert_charrefs=True)
        self.classes_by_face = classes_by_face
        self.stack = []  # one set of faces per open element
        self.chars = {face: set() for face in classes_by_face}
        self.skip = 0  # inside <script>/<style>

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self.skip += 1
        if tag in VOID:
            return
        classes = set((dict(attrs).get("class") or "").split())
        faces = {f for f, cls in self.classes_by_face.items() if classes & cls}
        self.stack.append(faces)

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self.skip -= 1
        if tag in VOID or not self.stack:
            return
        self.stack.pop()

    def handle_data(self, data):
        if self.skip:
            return
        active = set().union(*self.stack) if self.stack else set()
        for face in active:
            self.chars[face].update(data)


def subset_font(src, out, unicodes, pins=None):
    font = TTFont(src)
    options = subset.Options()
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    options.notdef_outline = True
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    if pins:
        buffer = io.BytesIO()
        font.flavor = None
        font.save(buffer)
        font = TTFont(io.BytesIO(buffer.getvalue()), lazy=False)
        font = instancer.instantiateVariableFont(font, pins)
    font.flavor = "woff2"
    font.save(out)
    print(
        f"{out.relative_to(ROOT)}: {src.stat().st_size / 1024:.0f} KiB -> "
        f"{out.stat().st_size / 1024:.1f} KiB"
    )


subset_font(
    FONTS / "KyivTypeSans-VarGX.woff2",
    FONTS / "KyivTypeSans-Sub.woff2",
    KYIV_UNICODES,
    {"CONT": 0, "MIDL": 0},
)

if not PAGE.exists():
    sys.exit(f"{PAGE.relative_to(ROOT)} not found: run `bun run build` first for the display faces.")

parser = FaceText({face: cfg[2] for face, cfg in DISPLAY_FACES.items()})
parser.feed(PAGE.read_text(encoding="utf-8"))
for face, (src, out, _, pins) in DISPLAY_FACES.items():
    text = {c for c in parser.chars[face] if not c.isspace() or c == " "}
    if not text:
        sys.exit(f"No text found for {face}: did the classes in DISPLAY_FACES change?")
    print(f"{face}: {''.join(sorted(text))}")
    subset_font(FONTS / src, FONTS / out, sorted({ord(c) for c in text} | SAFETY), pins)
