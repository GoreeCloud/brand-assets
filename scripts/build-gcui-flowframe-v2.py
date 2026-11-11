#!/usr/bin/env python3
"""Generate an original GC UI Flowframe v2 design candidate.

This changes no approved canonical GC UI master: proposal-only SVGs.
No network, web fonts, external images, dependencies, or image-generation APIs.
"""
from pathlib import Path
import argparse,hashlib,json

ROOT=Path(__file__).resolve().parents[1]
DIR=ROOT/"products/gc-ui/candidates/flowframe-v2"
DEFS='''<defs>
 <linearGradient id="gcui-lagoon" x1="170" y1="60" x2="440" y2="380" gradientUnits="userSpaceOnUse"><stop stop-color="#8CFFF0"/><stop offset="1" stop-color="#28A4CC"/></linearGradient>
 <linearGradient id="gcui-iris" x1="96" y1="100" x2="400" y2="420" gradientUnits="userSpaceOnUse"><stop stop-color="#B0ADFF"/><stop offset="1" stop-color="#5850CF"/></linearGradient>
 <linearGradient id="gcui-tile" x1="40" y1="130" x2="355" y2="500" gradientUnits="userSpaceOnUse"><stop stop-color="#243A72"/><stop offset="1" stop-color="#131F46"/></linearGradient>
</defs>'''
SHAPES='''<g stroke-linejoin="round">
 <rect x="185" y="74" width="249" height="274" rx="58" fill="url(#gcui-lagoon)"/>
 <rect x="122" y="124" width="263" height="273" rx="58" fill="url(#gcui-iris)"/>
 <rect x="72" y="178" width="277" height="270" rx="60" fill="url(#gcui-tile)" stroke="#C3CCFF" stroke-width="10"/>
 <rect x="104" y="210" width="211" height="31" rx="15" fill="#344980"/>
 <circle cx="127" cy="225.5" r="6" fill="#B4ABFF"/><circle cx="148" cy="225.5" r="6" fill="#68E4DC"/>
 <rect x="104" y="266" width="93" height="142" rx="24" fill="#8C9BFF"/>
 <rect x="214" y="266" width="101" height="64" rx="21" fill="#57E0D9"/>
 <rect x="214" y="344" width="101" height="64" rx="21" fill="#556DD5"/>
 <path d="M132 302h38M132 322h26M238 295h42M238 370h45" fill="none" stroke="#E7F0FF" stroke-width="9" stroke-linecap="round"/>
</g>'''
def doc(view,body,title,desc,dimensions=''):
 return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" {dimensions} role="img" aria-labelledby="title desc">\n<title id="title">{title}</title>\n<desc id="desc">{desc}</desc>\n{body}\n</svg>\n'
symbol=doc("0 0 512 512",DEFS+SHAPES,
 "GoreeCloud UI Flowframe candidate symbol",
 "Three layered rounded interface windows with a modular foreground layout, representing Canvas, Surface and Lens.")
app=doc("0 0 512 512",'''<defs><linearGradient id="tilebg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse"><stop stop-color="#1B2854"/><stop offset="1" stop-color="#080F28"/></linearGradient></defs>
<rect x="8" y="8" width="496" height="496" rx="120" fill="url(#tilebg)"/>
<rect x="12" y="12" width="488" height="488" rx="117" fill="none" stroke="#E1E7FF" stroke-opacity=".2" stroke-width="4"/>
'''+DEFS+'<g transform="translate(51 35) scale(.81)">'+SHAPES+'</g>',
"GoreeCloud UI Flowframe candidate app icon",
"Original midnight app tile bearing three offset colorful interface planes and an abstract modular card layout.")
def logo(dark):
 fg="#F5F7FF" if dark else "#14213F"
 sub="#B6C5E4" if dark else "#52668A"
 return doc("0 0 870 190",
  '<svg x="3" y="0" width="180" height="180" viewBox="0 0 512 512">'+DEFS+SHAPES+'</svg>'+
  f'<g font-family="system-ui,-apple-system,Segoe UI,sans-serif"><text x="208" y="104" font-size="78" font-weight="750" letter-spacing="-3" fill="{fg}">GoreeCloud</text><text x="211" y="149" font-size="33" font-weight="720" letter-spacing="6.5" fill="{sub}">UI / DESIGN SYSTEM</text></g>',
  "GoreeCloud UI Flowframe candidate "+("dark" if dark else "light")+" logo",
  "New Flowframe layered-pane symbol with GoreeCloud UI design-system wordmark.")
art=doc("0 0 1440 900",'''<defs>
 <linearGradient id="sky" x1="0" y1="0" x2="1440" y2="900" gradientUnits="userSpaceOnUse"><stop stop-color="#111A3C"/><stop offset="1" stop-color="#081125"/></linearGradient>
 <radialGradient id="aura" cx="0" cy="0" r="1" gradientTransform="translate(900 435) rotate(90) scale(570)"><stop stop-color="#5054C3" stop-opacity=".47"/><stop offset="1" stop-color="#5054C3" stop-opacity="0"/></radialGradient>
 <linearGradient id="glass" x1="0" y1="0" x2="0" y2="900" gradientUnits="userSpaceOnUse"><stop stop-color="#2B3D77"/><stop offset="1" stop-color="#16254B"/></linearGradient>
</defs>
<rect width="1440" height="900" rx="60" fill="url(#sky)"/><rect width="1440" height="900" rx="60" fill="url(#aura)"/>
<g fill="none" stroke="#A0AEFF" stroke-opacity=".14" stroke-width="3"><ellipse cx="925" cy="490" rx="535" ry="287" transform="rotate(-18 925 490)"/><ellipse cx="925" cy="490" rx="417" ry="190" transform="rotate(-18 925 490)"/></g>
<g opacity=".5" fill="#B5C7FF"><circle cx="132" cy="141" r="4"/><circle cx="1290" cy="204" r="4"/><circle cx="1207" cy="800" r="3"/></g>
<!-- Layer 0: Cloud Canvas (an abstract composition, not application behavior). -->
<g transform="translate(274 144) rotate(-7 500 310)"><rect x="88" y="88" width="845" height="579" rx="56" fill="#0D1735" stroke="#667BB7" stroke-width="4"/><rect x="108" y="108" width="805" height="539" rx="39" fill="url(#glass)"/><rect x="142" y="142" width="740" height="72" rx="25" fill="#344681"/><circle cx="185" cy="178" r="9" fill="#ABB8FF"/><circle cx="217" cy="178" r="9" fill="#67DFDC"/><rect x="160" y="253" width="218" height="337" rx="34" fill="#1A2B55"/><rect x="407" y="256" width="429" height="144" rx="30" fill="#4D58B4"/><rect x="407" y="431" width="203" height="150" rx="30" fill="#395EAA"/><rect x="637" y="431" width="199" height="150" rx="30" fill="#247E95"/></g>
<!-- Layer 1: Cloud Surface + layer 2: Cloud Lens, separated and readable. -->
<g transform="translate(852 382) rotate(9 177 178)"><rect x="5" y="5" width="365" height="360" rx="47" fill="#101D43" stroke="#91A3FF" stroke-width="5"/><rect x="31" y="34" width="315" height="65" rx="24" fill="#384C8C"/><rect x="31" y="131" width="138" height="195" rx="26" fill="#8B89F4"/><rect x="188" y="131" width="158" height="89" rx="25" fill="#48D8D0"/><rect x="188" y="236" width="158" height="90" rx="25" fill="#3C6EC5"/></g>
<g transform="translate(200 540) rotate(-12 170 84)"><rect x="0" y="0" width="344" height="168" rx="36" fill="#15264D" stroke="#8098D9" stroke-width="4"/><rect x="35" y="38" width="153" height="17" rx="8" fill="#A5BAFF"/><rect x="35" y="83" width="260" height="17" rx="8" fill="#5FE4DE"/><rect x="35" y="122" width="195" height="13" rx="7" fill="#847EEC"/></g>
<g font-family="system-ui,-apple-system,Segoe UI,sans-serif" fill="#E9F0FF"><text x="102" y="100" font-size="24" letter-spacing="7" font-weight="760" fill="#9AABDF">GOREeCLOUD UI / FLOWFRAME</text><text x="102" y="827" font-size="22" fill="#C0CEEC">Canvas  /  Surface  /  Lens</text></g>'''.replace('GOREeCLOUD','GOREECLOUD'),
"GoreeCloud UI Flowframe — original interface artwork candidate",
"Layered interface windows representing the three material systems in an illustrative deep-navy composition, not a screenshot or functional claim.")
generated={"app-icon.svg":app,"favicon.svg":app,"symbol.svg":symbol,"logo.svg":logo(False),"logo-dark.svg":logo(True),"artwork.svg":art}
def main():
 parser=argparse.ArgumentParser()
 parser.add_argument("--check",action="store_true")
 args=parser.parse_args()
 DIR.mkdir(parents=True,exist_ok=True)
 bad=[]
 for name,data in generated.items():
  p=DIR/name
  if args.check:
   if not p.exists() or p.read_text()!=data:bad.append(name)
  else:p.write_text(data)
 manifest={"status":"new original design candidate; NOT founder approved or canonical",
           "design":"Flowframe v2: Cloud Canvas/Surface/Lens layered interface planes",
           "files":{n:hashlib.sha256(v.encode()).hexdigest() for n,v in generated.items()}}
 text=json.dumps(manifest,indent=2,sort_keys=True)+"\n"
 if args.check:
  if not (DIR/"manifest.json").exists() or (DIR/"manifest.json").read_text()!=text:bad.append("manifest.json")
 else:(DIR/"manifest.json").write_text(text)
 print(("FAIL "+", ".join(bad)) if bad else "PASS" if args.check else "WRITTEN",len(generated),"Flowframe v2 candidate vectors")
 return 1 if bad else 0
if __name__=="__main__":raise SystemExit(main())
