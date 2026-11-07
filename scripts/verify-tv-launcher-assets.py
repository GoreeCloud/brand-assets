#!/usr/bin/env python3
"""Validate original GoreeCloud TV asset sources and reproducible outputs."""
import hashlib
import json
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]/"products"/"tv-launcher"
m=json.loads((ROOT/"manifest.json").read_text())
assert m["version"]=="2026-11-07.1"
expected={"app-icon.svg","logo.svg","logo-dark.svg","tv-banner.svg",
"raster/icon-256.png","raster/icon-512.png","raster/wordmark-dark-1100.png",
"raster/tv-banner-640.png","wallpapers/horizon.webp","wallpapers/aperture.webp",
"wallpapers/cloudforge.webp","wallpapers/harbor.webp"}
assert set(m["assets"])==expected
for path,info in m["assets"].items():
    f=ROOT/path
    assert f.is_file(),path
    assert f.stat().st_size==info["bytes"],path
    assert hashlib.sha256(f.read_bytes()).hexdigest()==info["sha256"],path
    if f.suffix==".svg":
        root=ET.parse(f).getroot()
        assert root.tag.endswith("svg"),path
        raw=f.read_text().lower().replace("http://www.w3.org/2000/svg", "")
        assert "<script" not in raw and "http://" not in raw and "https://" not in raw, path
    if f.suffix in (".png",".webp"):
        with Image.open(f) as im:
            im.verify()
        with Image.open(f) as im:
            if f.suffix==".webp": assert im.size==(1920,1080),path
            if path=="raster/icon-512.png":assert im.size==(512,512)
print("Validated",len(expected),"first-party TV assets with sizes, metadata and SHA-256")
