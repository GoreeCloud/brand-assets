#!/usr/bin/env python3
"""Deterministic raster derivatives of the owner's permanent GoreeCloud G geometry.

This code intentionally does not invent a different official mark. The original uploaded 1024px RGBA PNG is the exact input master. Icon
outputs are resized derivatives, not source replacements.
"""
from pathlib import Path
from PIL import Image
import argparse,hashlib,io,json
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"brand/goreecloud/raster"
SOURCE=ROOT/"brand/goreecloud/profile-logo-1024.png"
SIZES=(16,32,48,64,128,192,256,512)

def artwork(size):
    source=SOURCE.read_bytes()
    assert hashlib.sha256(source).hexdigest()=="ac5c76fda60abbf5fc65957b18a3b4053dccb4b3cb42687dcd0bb428709c69e8"
    with Image.open(io.BytesIO(source)) as ref:
        assert ref.mode=="RGBA" and ref.size==(1024,1024)
        return ref.resize((size,size),Image.Resampling.LANCZOS)

def create():
    result={}
    for n in SIZES:
        im=artwork(n);b=io.BytesIO();im.save(b,format="PNG",optimize=True)
        result[f"icon-{n}.png"]=b.getvalue()
    b=io.BytesIO()
    artwork(512).save(b,format="ICO",sizes=[(x,x) for x in (16,32,48,64,128,256)])
    result["favicon.ico"]=b.getvalue()
    return result
def main():
    parser=argparse.ArgumentParser();parser.add_argument("--check",action="store_true")
    args=parser.parse_args()
    generated=create();OUT.mkdir(exist_ok=True,parents=True)
    failed=[]
    for n,content in generated.items():
        p=OUT/n
        if args.check:
            if not p.exists() or p.read_bytes()!=content:failed.append(n)
        else:p.write_bytes(content)
    manifest={"origin":"direct resized exports from exact owner-supplied PNG master",
       "original_uploaded_png_sha256":"ac5c76fda60abbf5fc65957b18a3b4053dccb4b3cb42687dcd0bb428709c69e8",
       "note":"Raster exports derived from exact original PNG; resized files are not byte-identical",
       "files":{n:hashlib.sha256(b).hexdigest() for n,b in generated.items()}}
    index=json.dumps(manifest,sort_keys=True,indent=2)+"\n"
    indexfile=OUT/"asset-index.json"
    if args.check:
        if not indexfile.exists() or indexfile.read_text()!=index:failed.append("asset-index.json")
    else:indexfile.write_text(index)
    print(("FAIL "+", ".join(failed)) if failed else ("PASS" if args.check else "WRITTEN"),len(generated),"GoreeCloud G derivatives")
    return 1 if failed else 0
if __name__=="__main__":
    raise SystemExit(main())
