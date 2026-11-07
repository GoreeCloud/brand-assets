#!/usr/bin/env python3
"""Generate coordinated Browser family wordmark SVG files from the approved Prism Tabs source.

No external resources, font files, images, scripts, or network operations.
The icon symbol is read from the approved products/browser-mobile/symbol.svg.
"""
from copy import deepcopy
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SVG = "http://www.w3.org/2000/svg"
ET.register_namespace("", SVG)
q = lambda tag: "{" + SVG + "}" + tag

symbol = ET.parse(ROOT / "products/browser-mobile/symbol.svg").getroot()
assert symbol.tag == q("svg") and symbol.get("viewBox") == "0 0 512 512"
defs = symbol.find(q("defs"))
assert defs is not None
art = [c for c in symbol if c.tag not in (q("defs"), q("title"), q("desc"))]
assert len(art) >= 6

def make_wordmark(path: Path, descriptor: str, dark: bool) -> None:
    root = ET.Element(q("svg"), {
        "viewBox": "0 0 1200 280", "role": "img", "aria-labelledby": "title desc"
    })
    ET.SubElement(root,q("title"),{"id":"title"}).text = "GoreeCloud " + descriptor + (" dark" if dark else " light") + " wordmark"
    ET.SubElement(root,q("desc"),{"id":"desc"}).text = "Prism Tabs v5 icon beside the GoreeCloud browser family name"
    root.append(deepcopy(defs))
    ET.SubElement(root, q("rect"), {
        "x":"12","y":"12","width":"256","height":"256","rx":"62",
        "fill":"#101B39"
    })
    group = ET.SubElement(root,q("g"),{"transform":"translate(12 12) scale(.5)"})
    for child in art:
        group.append(deepcopy(child))
    ET.SubElement(root,q("text"),{
        "x":"306","y":"123","fill":"#F3F6FF" if dark else "#1B2544",
        "font-family":"Inter, Noto Sans, Arial, sans-serif",
        "font-weight":"750","font-size":"83"
    }).text="GoreeCloud"
    ET.SubElement(root,q("text"),{
        "x":"312","y":"191","fill":"#A8BCFF" if dark else "#5769D1",
        "font-family":"Inter, Noto Sans, Arial, sans-serif",
        "font-weight":"700","font-size":"37", "letter-spacing":"7.5"
    }).text=descriptor.upper()
    ET.indent(root, space="  ")
    path.write_bytes(ET.tostring(root,encoding="utf-8",xml_declaration=True))
    print("GENERATED",path.relative_to(ROOT))

for name,descriptor in [("browser-mobile","Browser Mobile"),("browser","Browser")]:
    for dark in (False,True):
        make_wordmark(ROOT / "products" / name / ("logo-dark.svg" if dark else "logo.svg"),descriptor,dark)

mono = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-labelledby="title desc">
<title id="title">Prism Tabs v5 monochrome launcher derivative</title>
<desc id="desc">Three layered translucent browser panes derived from the approved Prism Tabs v5 geometry. Themed-color tint is supplied by the operating system.</desc>
<path d="M145 124C145 105 159 96 177 99L311 127C329 131 340 145 340 166V342C340 362 325 376 306 372L166 342C152 339 145 329 145 313Z" fill="#FFFFFF" fill-opacity=".46"/>
<path d="M204 123C204 104 219 95 238 100L376 132C391 136 403 150 403 171V359C403 378 388 391 370 386L223 351C211 348 204 338 204 323Z" fill="#FFFFFF" fill-opacity=".72"/>
<path d="M138 196C138 185 147 175 159 178L221 191C231 193 234 200 237 208L305 224C323 228 336 246 336 264V388C336 408 320 422 301 417L139 381C123 377 114 365 114 348V221C114 202 123 192 138 196Z" fill="#FFFFFF"/>
</svg>
"""
(ROOT / "products/browser-mobile/monochrome.svg").write_text(mono,encoding="utf-8")
print("GENERATED products/browser-mobile/monochrome.svg")
