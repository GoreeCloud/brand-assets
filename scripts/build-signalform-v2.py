#!/usr/bin/env python3
"""Source-first GoreeCloud Signalform v2: seven original unapproved identity families.

This script produces editable vector geometry only. No image-generation API,
fonts, internet calls, package execution, or mutations to any existing master.
"""
from __future__ import annotations
import argparse
import hashlib
import json
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
VERSION = "signalform-v2"
# Candidate-only light/lagoon/iris/indigo variations inspired by GC UI alpha
# foundations. NOT declarations of new verified official brand tokens.
INK = "#172440"
BG_TOP = "#25375A"
BG_BOTTOM = "#101A30"
IVORY = "#E9F4FF"
LAVENDER = "#B8B9FF"
TEAL = "#7CE2D5"
SKY = "#8CCAF7"
INDIGO = "#8EA5F4"
DEEP = "#24375C"

PRODUCTS = {
    "goreeshield": {
        "name": "GoreeShield", "role": "PRIVACY",
        "concept": "Quiet Aperture",
        "description": "Two separate privacy shutters frame a user-controlled aperture. No shield, scanner, or threat-monitoring symbolism.",
        "accent": "#7CE2D5", "secondary": "#B8C9FF",
        "mark": '''
        <path d="M174 145c-50 29-79 67-79 111s29 82 79 111" fill="none" stroke="#7CE2D5" stroke-width="34" stroke-linecap="round"/>
        <path d="M338 145c50 29 79 67 79 111s-29 82-79 111" fill="none" stroke="#B8C9FF" stroke-width="34" stroke-linecap="round"/>
        <rect x="202" y="190" width="108" height="132" rx="51" fill="#7CE2D5"/>
        <path d="M226 256h60" stroke="#172440" stroke-width="16" stroke-linecap="round"/>
        <circle cx="268" cy="256" r="23" fill="#172440" stroke="#E9F4FF" stroke-width="7"/>
        ''',
    },
    "wardveil": {
        "name": "Wardveil", "role": "CYBERSECURITY",
        "concept": "Sentinel Sweep",
        "description": "An open detection arc and directional sweep show threat monitoring and defensive response without a privacy-choice shield.",
        "accent": "#B4B7FF", "secondary": "#7CE2D5",
        "mark": '''
        <path d="M360 164a135 135 0 1 0 0 184" fill="none" stroke="#B4B7FF" stroke-width="33" stroke-linecap="round"/>
        <path d="m260 260 96-103" fill="none" stroke="#7CE2D5" stroke-width="24" stroke-linecap="round"/>
        <path d="m170 292 49-33 37 21 37-35" fill="none" stroke="#E9F4FF" stroke-width="21" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="260" cy="260" r="20" fill="#7CE2D5" stroke="#172440" stroke-width="9"/>
        <circle cx="358" cy="157" r="13" fill="#E9F4FF"/>
        ''',
    },
    "mesh": {
        "name": "GoreeCloud Mesh", "role": "INTEGRATION",
        "concept": "Interlock",
        "description": "Two independent rounded linkways interlock deliberately, representing interoperable boundaries rather than universal data permission.",
        "accent": "#80E0DA", "secondary": "#AEBEFF",
        "mark": '''
        <g transform="rotate(-36 236 226)">
          <rect x="123" y="162" width="226" height="124" rx="62" fill="none" stroke="#80E0DA" stroke-width="31"/>
        </g>
        <g transform="rotate(36 280 289)">
          <rect x="166" y="226" width="226" height="124" rx="62" fill="none" stroke="#AEBEFF" stroke-width="31"/>
        </g>
        <path d="m209 287 46-46" fill="none" stroke="#172440" stroke-width="40" stroke-linecap="round"/>
        <path d="m209 287 46-46" fill="none" stroke="#E9F4FF" stroke-width="18" stroke-linecap="round"/>
        ''',
    },
    "maps": {
        "name": "GoreeCloud Maps", "role": "MAPS AND LOCATION",
        "concept": "Wayfinding Loop",
        "description": "A continuous route from origin to destination with an independent compass heading, not the generic folded-map location pin.",
        "accent": "#8CCAF7", "secondary": "#7CE2D5",
        "mark": '''
        <path d="M160 337c-43-64-7-120 51-121 55-1 82 57 129 21 35-26 17-80-7-102" fill="none" stroke="#8CCAF7" stroke-width="33" stroke-linecap="round"/>
        <circle cx="160" cy="337" r="28" fill="#7CE2D5" stroke="#172440" stroke-width="11"/>
        <path d="m333 107 54 65-58-13-35 39Z" fill="#E9F4FF" stroke="#172440" stroke-width="12" stroke-linejoin="round"/>
        <circle cx="257" cy="246" r="12" fill="#E9F4FF"/>
        ''',
    },
    "projects": {
        "name": "GoreeCloud Projects", "role": "PLANNING",
        "concept": "Milestone Ladder",
        "description": "Three intentional, offset milestones joined by a progress spine and one completed task, not a Kanban UI screenshot.",
        "accent": "#AEB6FF", "secondary": "#7CE2D5",
        "mark": '''
        <path d="M152 159v196" fill="none" stroke="#AEB6FF" stroke-width="25" stroke-linecap="round"/>
        <circle cx="152" cy="177" r="23" fill="#7CE2D5"/>
        <circle cx="152" cy="269" r="23" fill="#AEB6FF"/>
        <circle cx="152" cy="355" r="23" fill="#E9F4FF"/>
        <rect x="204" y="146" width="169" height="57" rx="24" fill="#AEB6FF"/>
        <rect x="223" y="238" width="145" height="57" rx="24" fill="#7CE2D5"/>
        <rect x="203" y="325" width="169" height="58" rx="24" fill="#E9F4FF"/>
        <path d="m246 353 20 19 37-39" fill="none" stroke="#24375C" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
        ''',
    },
    "analytics": {
        "name": "GoreeCloud Analytics", "role": "INSIGHTS",
        "concept": "Insight Horizon",
        "description": "An ascending insight signal with three samples and a partial orbit, rather than ordinary dashboard bars.",
        "accent": "#8EB8FA", "secondary": "#7CE2D5",
        "mark": '''
        <path d="M136 342c-18-103 37-189 133-203 53-8 100 14 123 55" fill="none" stroke="#8EB8FA" stroke-width="28" stroke-linecap="round"/>
        <path d="M136 342c44 0 60-87 112-85 45 2 51-70 123-81" fill="none" stroke="#7CE2D5" stroke-width="29" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="136" cy="342" r="21" fill="#E9F4FF"/>
        <circle cx="248" cy="257" r="20" fill="#E9F4FF" stroke="#172440" stroke-width="7"/>
        <circle cx="371" cy="176" r="22" fill="#E9F4FF" stroke="#172440" stroke-width="7"/>
        ''',
    },
    "gateway": {
        "name": "GoreeCloud Gateway", "role": "NETWORK EDGE",
        "concept": "One-Way Passage",
        "description": "A strong open portal with one unambiguous left-to-right route through its threshold.",
        "accent": "#A6B5FF", "secondary": "#7CE2D5",
        "mark": '''
        <path d="M177 370V204c0-52 34-86 79-86s79 34 79 86v166" fill="none" stroke="#A6B5FF" stroke-width="34" stroke-linecap="round"/>
        <path d="M124 273h252" fill="none" stroke="#7CE2D5" stroke-width="28" stroke-linecap="round"/>
        <path d="m327 230 54 43-54 43" fill="none" stroke="#E9F4FF" stroke-width="27" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="125" cy="273" r="22" fill="#E9F4FF"/>
        ''',
    },
}

def svg_doc(view, title, desc, body, width, height):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
            f'viewBox="{view}" role="img" aria-labelledby="title desc">\n'
            f'<title id="title">{escape(title)}</title>\n'
            f'<desc id="desc">{escape(desc)}</desc>\n{body}\n</svg>\n')

def normalized_svg(text):
    return "\n".join(line.rstrip() for line in text.splitlines()) + "\n"

def symbol(meta):
    return svg_doc("0 0 512 512", meta["name"] + " Signalform v2 symbol — concept",
                   meta["description"],meta["mark"],512,512)

def app_icon(meta):
    body = f'''<defs>
        <linearGradient id="tile" x1="16" y1="8" x2="486" y2="504" gradientUnits="userSpaceOnUse">
           <stop stop-color="{BG_TOP}"/><stop offset="1" stop-color="{BG_BOTTOM}"/>
        </linearGradient>
       </defs>
       <rect x="8" y="8" width="496" height="496" rx="108" fill="url(#tile)"/>
       <rect x="11" y="11" width="490" height="490" rx="106" stroke="#C1D6FF" stroke-opacity=".23" stroke-width="5" fill="none"/>
       {meta["mark"]}
       <path d="M76 425h57" stroke="{meta["accent"]}" stroke-width="9" stroke-linecap="round" opacity=".85"/>'''
    return svg_doc("0 0 512 512",
                   meta["name"] + " Signalform v2 app icon — unapproved proposal",
                   meta["description"] + " Original source-drawn product concept, not official branding.",
                   body,512,512)

def wordmark(meta, dark=False):
    fg = "#EEF2FF" if dark else "#172440"
    muted = "#BDCAE7" if dark else "#4F5C76"
    size = 62 if len(meta["name"]) > 17 else 72
    label = escape(meta["role"] + " · SIGNALFORM V2 CONCEPT")
    body = f'''<svg x="2" y="0" width="170" height="170" viewBox="0 0 512 512">
        {meta["mark"]}
       </svg>
       <g font-family="system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif">
        <text x="206" y="85" font-weight="760" font-size="{size}" letter-spacing="-2.2" fill="{fg}">{escape(meta["name"])}</text>
        <text x="210" y="127" font-weight="710" font-size="20" letter-spacing="2.1" fill="{muted}">{label}</text>
       </g>'''
    return svg_doc("0 0 1120 170",meta["name"] + (" dark" if dark else " light") + " Signalform v2 wordmark proposal",
                   meta["description"] + " Not an approved canonical identity.",
                   body,1120,170)

def artwork(meta):
    # Original layered presentation art, not a product screenshot or claim of deployed features.
    body=f'''<defs>
      <linearGradient id="paper" x1="0" y1="0" x2="1280" y2="760" gradientUnits="userSpaceOnUse">
        <stop stop-color="#EEF1FC"/><stop offset="1" stop-color="#D6E6F2"/>
      </linearGradient>
      <linearGradient id="plane" x1="130" y1="145" x2="1040" y2="630" gradientUnits="userSpaceOnUse">
        <stop stop-color="#24375A"/><stop offset="1" stop-color="#101A30"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1280" height="760" rx="46" fill="url(#paper)"/>
    <circle cx="994" cy="346" r="296" fill="{meta["accent"]}" opacity=".13"/>
    <circle cx="994" cy="346" r="238" stroke="{meta["accent"]}" stroke-width="3" opacity=".37" fill="none"/>
    <rect x="112" y="126" width="860" height="495" rx="63" fill="url(#plane)" stroke="#AFC7F1" stroke-opacity=".7" stroke-width="5"/>
    <rect x="157" y="174" width="766" height="71" rx="23" fill="#30466C"/>
    <circle cx="199" cy="210" r="10" fill="{meta["accent"]}"/>
    <circle cx="234" cy="210" r="10" fill="#AABAFE"/>
    <path d="M178 310h315M178 359h262M178 408h296" stroke="#5873A1" stroke-width="22" stroke-linecap="round" opacity=".48"/>
    <rect x="718" y="248" width="423" height="369" rx="69" fill="#162745" stroke="{meta["accent"]}" stroke-width="8"/>
    <g transform="translate(679 211) scale(.98)">
      {meta["mark"]}
    </g>
    <g font-family="system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif">
      <text x="177" y="527" font-size="32" font-weight="740" fill="#F1F6FF">{escape(meta["name"])}</text>
      <text x="179" y="572" font-size="19" letter-spacing="2.1" fill="#B9C8E6">{escape(meta["role"])}</text>
      <text x="110" y="704" font-size="21" font-weight="700" fill="#4F6183">SIGNALFORM V2 · ORIGINAL IDENTITY EXPLORATION · NOT AN APPLICATION SCREENSHOT</text>
    </g>'''
    return svg_doc("0 0 1280 760",meta["name"] + " Signalform v2 conceptual artwork",
                   "Original visualization of a proposed identity using layered cloud canvas, surface and lens. Not deployed product functionality.",
                   body,1280,760)

def files(meta):
    app = normalized_svg(app_icon(meta))
    return {
        "app-icon.svg":app,
        "favicon.svg":app,
        "symbol.svg":normalized_svg(symbol(meta)),
        "logo.svg":normalized_svg(wordmark(meta)),
        "logo-dark.svg":normalized_svg(wordmark(meta,True)),
        "artwork.svg":normalized_svg(artwork(meta)),
    }

def run():
    parser=argparse.ArgumentParser()
    parser.add_argument("--check",action="store_true")
    args=parser.parse_args()
    mismatches=[]
    for slug,meta in PRODUCTS.items():
        dst=ROOT/"products"/slug/"candidates"/VERSION
        if not args.check:
            dst.mkdir(parents=True,exist_ok=True)
        rendered=files(meta)
        manifest={
            "schema_version":2,
            "product":slug,
            "family":VERSION,
            "status":"unapproved original candidate; NOT an official brand master",
            "design_name":meta["concept"],
            "role":meta["role"],
            "description":meta["description"],
            "provenance":"original source-authored vectors; no external image service or third-party logo",
            "approved":False,
            "files":{name:hashlib.sha256(content.encode()).hexdigest() for name,content in rendered.items()},
        }
        rendered["manifest.json"]=json.dumps(manifest,indent=2,sort_keys=True)+"\n"
        for name,content in rendered.items():
            target=dst/name
            if args.check:
                if not target.is_file() or target.read_text()!=content:
                    mismatches.append(slug+"/"+name)
            else:
                target.write_text(content)
    if mismatches:
        print("FAIL source mismatch:",*mismatches,sep="\n")
        return 1
    print(("PASS" if args.check else "WRITTEN")+
          ": seven isolated original Signalform v2 vector families, six SVGs and pinned manifest each.")
    return 0

if __name__=="__main__":
    raise SystemExit(run())
