#!/usr/bin/env python3
"""Original source-first, review-only brand candidates for seven missing products.

All geometry is hand-authored inline SVG. No image service, web font,
network access or third-party design assets. Never changes a canonical master.
"""
from __future__ import annotations
import argparse, hashlib, json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
VERSION='foundation-v1'
PRODUCTS={
 'goreeshield': {
  'name':'GoreeShield', 'discipline':'PRIVACY',
  'description':'Privacy choices and consent; nested shield around a compact consent-control toggle',
  'markup':'''<path d="M256 116 373 163v107c0 77-44 129-117 167-73-38-117-90-117-167V163Z" fill="#25396B" stroke="#78C7E5" stroke-width="20" stroke-linejoin="round"/>
    <path d="M256 174 325 202v72c0 47-24 78-69 104-45-26-69-57-69-104v-72Z" fill="none" stroke="#C4D4FF" stroke-width="14" stroke-linejoin="round"/>
    <rect x="203" y="246" width="106" height="38" rx="19" fill="#80E1D8"/>
    <circle cx="287" cy="265" r="14" fill="#172039"/>''',
  'accent':'#80E1D8'
 },
 'wardveil': {
  'name':'Wardveil', 'discipline':'CYBERSECURITY',
  'description':'Defensive monitoring; faceted watch shield with a protected signal pulse',
  'markup':'''<path d="M256 116 386 166v105c0 79-51 136-130 167-79-31-130-88-130-167V166Z" fill="#263866" stroke="#B2B7FF" stroke-width="21" stroke-linejoin="round"/>
    <path d="M181 270h44l22-45 32 86 21-41h32" fill="none" stroke="#74E0DA" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M212 194 256 177 300 194" fill="none" stroke="#D6D8FF" stroke-width="12" stroke-linecap="round"/>''',
  'accent':'#B2B7FF'
 },
 'mesh': {
  'name':'GoreeCloud Mesh', 'discipline':'INTEGRATION',
  'description':'Authorized connectivity; four independent endpoints routed through a central hub',
  'markup':'''<path d="m175 179 81 77 84-77M175 339l81-83 84 83" fill="none" stroke="#9CA8FF" stroke-width="24" stroke-linecap="round"/>
    <circle cx="256" cy="256" r="64" fill="#25396B" stroke="#B7D0FF" stroke-width="18"/>
    <circle cx="256" cy="256" r="22" fill="#80E1D8"/>
    <circle cx="163" cy="166" r="31" fill="#78DCD6" stroke="#172039" stroke-width="13"/>
    <circle cx="352" cy="166" r="31" fill="#A9A2FF" stroke="#172039" stroke-width="13"/>
    <circle cx="163" cy="353" r="31" fill="#A9A2FF" stroke="#172039" stroke-width="13"/>
    <circle cx="352" cy="353" r="31" fill="#78DCD6" stroke="#172039" stroke-width="13"/>''',
  'accent':'#78DCD6'
 },
 'maps': {
  'name':'GoreeCloud Maps', 'discipline':'MAPS AND LOCATION',
  'description':'Navigable terrain; folded map surface and a location pin with a clear central destination',
  'markup':'''<path d="M128 204 216 172l83 31 84-31v159l-84 32-83-32-88 32Z" fill="#243765" stroke="#B6C7FF" stroke-width="18" stroke-linejoin="round"/>
    <path d="M216 172v159m83-128v160" stroke="#759DCA" stroke-width="12" fill="none"/>
    <path d="M304 122c-44 0-72 31-72 72 0 53 72 121 72 121s72-68 72-121c0-41-28-72-72-72Z" fill="#81DCD7" stroke="#172039" stroke-width="16" stroke-linejoin="round"/>
    <circle cx="304" cy="194" r="24" fill="#1C3965"/>''',
  'accent':'#81DCD7'
 },
 'projects': {
  'name':'GoreeCloud Projects', 'discipline':'PLANNING',
  'description':'Independent workstreams; a three-lane project board with separated task cards',
  'markup':'''<rect x="122" y="136" width="268" height="245" rx="35" fill="#243765" stroke="#B9C9FF" stroke-width="20"/>
    <path d="M211 153v211m90-211v211" stroke="#7088BD" stroke-width="11"/>
    <rect x="147" y="178" width="42" height="100" rx="14" fill="#8EA7F4"/>
    <rect x="229" y="178" width="54" height="65" rx="15" fill="#83E1D9"/>
    <rect x="229" y="260" width="54" height="77" rx="15" fill="#A8AEFF"/>
    <rect x="318" y="178" width="47" height="129" rx="15" fill="#8EA7F4"/>''',
  'accent':'#A8AEFF'
 },
 'analytics': {
  'name':'GoreeCloud Analytics', 'discipline':'ANALYTICS',
  'description':'Privacy-first trends; a restrained bar chart with a distinct insight trajectory',
  'markup':'''<rect x="115" y="134" width="283" height="254" rx="40" fill="#243765" stroke="#B7C9FF" stroke-width="20"/>
    <path d="M157 345h201" fill="none" stroke="#6E8BB4" stroke-width="12" stroke-linecap="round"/>
    <rect x="162" y="270" width="37" height="75" rx="12" fill="#A9ABFF"/>
    <rect x="222" y="228" width="37" height="117" rx="12" fill="#83D8E0"/>
    <rect x="281" y="194" width="37" height="151" rx="12" fill="#8898F3"/>
    <path d="m167 241 75-41 58-34 54 19" fill="none" stroke="#E7F8FF" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>''',
  'accent':'#83D8E0'
 },
 'gateway': {
  'name':'GoreeCloud Gateway', 'discipline':'EDGE NETWORK',
  'description':'Traffic gateway; two isolated networks connected through a deliberate central passage',
  'markup':'''<path d="M173 359V177q83-91 166 0v182" fill="none" stroke="#A7B5FF" stroke-width="27" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M214 359V204q42-44 84 0v155" fill="none" stroke="#6C87BD" stroke-width="16" stroke-linecap="round"/>
    <path d="M130 274h92m68 0h92" fill="none" stroke="#85DED8" stroke-width="19" stroke-linecap="round"/>
    <path d="m195 247 27 27-27 27m120-54-27 27 27 27" fill="none" stroke="#DDF7FF" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="132" cy="274" r="19" fill="#B8C9FF"/><circle cx="380" cy="274" r="19" fill="#B8C9FF"/>''',
  'accent':'#A7B5FF'
 }
}

def doc(view, title, desc, content, dims=''):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" {dims} '
            f'role="img" aria-labelledby="title desc">\n'
            f'<title id="title">{title}</title>\n'
            f'<desc id="desc">{desc}</desc>\n{content}\n</svg>\n')
def symbol(meta):
    return doc('0 0 512 512',meta['name']+' Foundation v1 candidate symbol',
        meta['description'],meta['markup'], 'width="512" height="512"')
def app(meta):
    content=('''<defs><linearGradient id="tile" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
    <stop stop-color="#253765"/><stop offset="1" stop-color="#101A38"/></linearGradient></defs>
    <rect x="8" y="8" width="496" height="496" rx="110" fill="url(#tile)"/>
    <rect x="12" y="12" width="488" height="488" rx="107" fill="none" stroke="#D6E0FF" stroke-opacity=".22" stroke-width="4"/>
    '''+meta['markup'])
    return doc('0 0 512 512',meta['name']+' Foundation v1 candidate app icon',
               meta['description']+'; this is a review-only mark',content,'width="512" height="512"')
def logo(meta, dark=False):
    fg='#F4F6FF' if dark else '#172039'
    sub='#B6C3E5' if dark else '#4D5B7A'
    name=meta['name']
    # Allow longer labels without breaking viewBox; all wordmarks have same canvas.
    font_size=57 if len(name)>18 else 70
    body=('<svg x="0" y="2" width="168" height="168" viewBox="0 0 512 512">'+
      meta['markup']+'</svg>'+
      f'<g font-family="system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif">'
      f'<text x="202" y="89" font-size="{font_size}" font-weight="740" letter-spacing="-2.1" fill="{fg}">{name}</text>'
      f'<text x="205" y="130" font-size="21" font-weight="740" letter-spacing="4.1" fill="{sub}">'
      f'{meta["discipline"]} / DESIGN CANDIDATE</text></g>')
    return doc('0 0 1100 170',name+(' dark' if dark else ' light')+' candidate wordmark',
               'Proposed original '+name+' product identity, not an approved or deployed logo',body)
def artwork(meta,slug):
    body='''<defs>
    <linearGradient id="canvas" x1="0" y1="0" x2="1280" y2="720" gradientUnits="userSpaceOnUse">
    <stop stop-color="#E9EDFB"/><stop offset="1" stop-color="#D8E8F4"/></linearGradient>
    <linearGradient id="surface" x1="100" y1="150" x2="900" y2="600" gradientUnits="userSpaceOnUse">
    <stop stop-color="#243765"/><stop offset="1" stop-color="#141F40"/></linearGradient>
    </defs>
    <rect width="1280" height="720" rx="52" fill="url(#canvas)"/>
    <circle cx="915" cy="350" r="310" fill="#B7C6F7" opacity=".23"/>
    <circle cx="915" cy="350" r="242" fill="none" stroke="#8A9DDE" stroke-opacity=".27" stroke-width="3"/>
    <rect x="120" y="131" width="740" height="465" rx="55" fill="url(#surface)" stroke="#C9D8FF" stroke-opacity=".4" stroke-width="4"/>
    <rect x="165" y="176" width="642" height="60" rx="23" fill="#324677"/>
    <circle cx="204" cy="206" r="9" fill="#AFB7FF"/>
    <circle cx="233" cy="206" r="9" fill="#80E1D8"/>
    <path d="M174 286h352M174 332h289M174 378h320" stroke="#657DB6" stroke-width="23" stroke-linecap="round" opacity=".6"/>
    <rect x="706" y="260" width="407" height="351" rx="60" fill="#1C2B51" stroke="#A9BBFF" stroke-width="6"/>
    <rect x="738" y="292" width="343" height="287" rx="40" fill="#263B68"/>
    <g transform="translate(690 233) scale(.76)">'''+meta['markup']+'''</g>
    <g font-family="system-ui,-apple-system,Segoe UI,sans-serif">
    <text x="167" y="511" fill="#E9F1FF" font-size="27" font-weight="740">'''+meta['name']+'''</text>
    <text x="167" y="546" fill="#AEBCE2" font-size="18">'''+meta['discipline']+''' — CONCEPTUAL ARTWORK</text>
    <text x="116" y="666" fill="#46577A" font-size="20" font-weight="680">Foundation v1 / product identity review — no active functionality is implied</text>
    </g>'''
    return doc('0 0 1280 720',meta['name']+' conceptual brand artwork candidate',
        'Original static presentation artwork using layered Canvas, Surface and Lens planes; not a product screenshot.',body,
        'width="1280" height="720"')
def outputs(meta,slug):
    icon=app(meta)
    return {
      'app-icon.svg':icon, 'symbol.svg':symbol(meta),
      'logo.svg':logo(meta), 'logo-dark.svg':logo(meta,True),
      'favicon.svg':icon,'artwork.svg':artwork(meta,slug)
    }
def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--check',action='store_true')
    args=parser.parse_args()
    failures=[]
    for slug,meta in PRODUCTS.items():
        folder=ROOT/'products'/slug/'candidates'/VERSION
        if not args.check:folder.mkdir(parents=True,exist_ok=True)
        files=outputs(meta,slug)
        manifest={'status':'unapproved original candidate; NOT an official brand master',
          'design':'Foundation v1 — layered Cloud Canvas/Surface/Lens materials',
          'source':'source-authored procedural SVGs; no generated-image model or third-party artwork',
          'product':slug,'files':{n:hashlib.sha256(v.encode()).hexdigest() for n,v in files.items()}}
        files['manifest.json']=json.dumps(manifest,indent=2,sort_keys=True)+'\n'
        for name,data in files.items():
            p=folder/name
            if args.check:
                if not p.is_file() or p.read_text()!=data:failures.append(slug+'/'+name)
            else:p.write_text(data)
    if failures:print('FAILED reproducible files:',*failures);return 1
    print(('PASS' if args.check else 'WRITTEN')+': seven original review-only product families with six SVG sources and pinned manifests each')
    return 0
if __name__=='__main__':raise SystemExit(main())
