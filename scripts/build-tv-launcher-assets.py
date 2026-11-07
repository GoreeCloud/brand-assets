#!/usr/bin/env python3
"""Deterministic, original GoreeCloud TV vector/raster artwork builder.

No downloaded images, fonts, generated-AI pictures or third-party marks.
Dependencies: Pillow, numpy. Re-running regenerates the shipped artwork.
"""
from __future__ import annotations
import hashlib
import json
import math
import random
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1] / "products" / "tv-launcher"
W, H = 1920, 1080
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
ROOT.mkdir(parents=True, exist_ok=True)
(ROOT / "wallpapers").mkdir(exist_ok=True)
(ROOT / "raster").mkdir(exist_ok=True)

SCENES = [
    ("horizon", 17, (14, 32, 67), (68, 96, 140), (246, 144, 114), (25, 73, 100)),
    ("aperture", 31, (16, 21, 52), (91, 64, 118), (237, 123, 169), (35, 55, 117)),
    ("cloudforge", 47, (12, 36, 54), (55, 99, 123), (166, 202, 188), (24, 71, 72)),
    ("harbor", 71, (15, 18, 52), (54, 45, 109), (231, 88, 144), (18, 82, 115)),
]

def palette_sky(top, middle, bottom, seed):
    y = np.linspace(0, 1, H, dtype=np.float32)[:, None, None]
    top = np.array(top, np.float32)[None, None, :]
    middle = np.array(middle, np.float32)[None, None, :]
    bottom = np.array(bottom, np.float32)[None, None, :]
    first = np.clip(y / .58, 0, 1)
    second = np.clip((y - .58) / .42, 0, 1)
    base = np.where(y <= .58, top * (1 - first) + middle * first,
                    middle * (1 - second) + bottom * second)
    x = np.linspace(0, 1, W, dtype=np.float32)[None, :, None]
    glow = np.exp(-((x - .78) ** 2 / .055 + (y - .42) ** 2 / .11)) * 67
    rng = np.random.default_rng(seed)
    noise = rng.normal(0, 2.8, (H, W, 1)).astype(np.float32)
    return Image.fromarray(np.uint8(np.clip(base + glow + noise, 0, 255)), "RGB").convert("RGBA")

def haze(im, seed, strength=1.0):
    rng = random.Random(seed)
    cloud = Image.new("RGBA", (W // 3, H // 3), (0, 0, 0, 0))
    d = ImageDraw.Draw(cloud, "RGBA")
    for _ in range(110):
        x = rng.randint(90, 650)
        y = rng.randint(30, 275)
        rx, ry = rng.randint(45, 175), rng.randint(12, 56)
        c = rng.choice([(219, 214, 228, 24), (242, 176, 159, 16),
                        (184, 199, 225, 19), (106, 162, 196, 15)])
        d.ellipse((x-rx, y-ry, x+rx, y+ry), fill=c)
    cloud = cloud.filter(ImageFilter.GaussianBlur(19)).resize((W, H), Image.Resampling.BILINEAR)
    im.alpha_composite(cloud)

def radial_illumination(im, cx, cy, radius, tint=(255,190,141), strength=135):
    xx = np.arange(W, dtype=np.float32)[None, :]
    yy = np.arange(H, dtype=np.float32)[:, None]
    z = np.exp(-(((xx-cx)/radius)**2 + ((yy-cy)/radius)**2)*1.8) * strength
    layer = np.empty((H,W,4),dtype=np.uint8)
    layer[:,:,:3] = np.array(tint, dtype=np.uint8)
    layer[:,:,3] = np.clip(z,0,155).astype(np.uint8)
    im.alpha_composite(Image.fromarray(layer,"RGBA"))

def stars(im, rng, count):
    d=ImageDraw.Draw(im, "RGBA")
    for _ in range(count):
        x=rng.randint(0,W-1)
        y=rng.randint(8,470)
        r=rng.choice([1,1,1,2,2,3])
        c=rng.randint(90,230)
        d.ellipse((x-r,y-r,x+r,y+r),fill=(231,242,255,c))
        if r==3:
            d.line((x-7,y,x+7,y), fill=(226,244,254,60), width=1)
            d.line((x,y-7,x,y+7), fill=(226,244,254,60), width=1)

def planet(im,rng, center, radius, mode):
    cx,cy=center
    ring=Image.new("RGBA",(W,H))
    rd=ImageDraw.Draw(ring,"RGBA")
    ring_colors={"horizon":(242,188,163,120),"aperture":(183,141,240,100),
                 "cloudforge":(175,231,216,120),"harbor":(246,125,206,110)}
    for i in range(7):
        pad=i*13
        rd.arc((cx-radius-110-pad,cy-radius//3-60-pad,cx+radius+130+pad,cy+radius//3+50+pad),
               184,348,fill=ring_colors[mode],width=3 if i%2==0 else 1)
    im.alpha_composite(ring)
    # Physically inspired, original textured procedural globe. Directional
    # lighting, atmospheric limb and curved bands avoid a flat circle.
    from numpy import pi
    yy,xx=np.mgrid[0:2*radius,0:2*radius].astype(np.float32)
    u=(xx-radius)/radius
    v=(yy-radius)/radius
    r2=u*u+v*v
    inside=r2<=1
    shade=np.sqrt(np.clip(1-r2,0,1))
    solar=np.clip(.65+.32*u+.13*shade,0,1.2)
    belts=(np.sin(20*v+3*np.sin(u*5))*13
         +np.sin(37*v-2*np.sin(u*8))*7
         +np.sin(56*v+3*np.cos(u*14))*3)
    granular=np.random.default_rng(radius+cx+cy).normal(0,5,(2*radius,2*radius))
    base_rgb={"horizon":(125,151,188),"aperture":(126,99,170),
              "cloudforge":(122,180,183),"harbor":(153,99,172)}[mode]
    sphere=np.zeros((radius*2,radius*2,4),dtype=np.uint8)
    for channel in range(3):
        level=base_rgb[channel]+belts*(.85 if channel else 1.1)+granular
        level=level*(.58+solar*.44)+shade*30
        sphere[:,:,channel]=np.uint8(np.clip(level,0,255))
    # Soft rim and edge fade improve separation from the atmospheric sky.
    sphere[:,:,3]=np.uint8(np.where(inside, np.clip((1-r2)*220+70,0,255),0))
    planet_raster=Image.fromarray(sphere,"RGBA")
    im.alpha_composite(planet_raster,(int(cx-radius),int(cy-radius)))
    # Clipped luminous atmospheric contours add depth without reference art.
    overlay=Image.new("RGBA",(W,H))
    dd=ImageDraw.Draw(overlay,"RGBA")
    dd.arc((cx-radius-4,cy-radius-4,cx+radius+4,cy+radius+4),
           205,346,fill=(253,219,197,145),width=5)
    im.alpha_composite(overlay)

def ridges(im,rng,mode):
    d=ImageDraw.Draw(im,"RGBA")
    if mode=="cloudforge":
        colors=[(105,154,156,145),(55,104,111,215),(23,65,75,255),(11,37,54,255)]
    elif mode=="harbor":
        colors=[(100,72,125,140),(39,46,98,170),(19,34,72,255),(10,20,52,255)]
    else:
        colors=[(84,117,139,135),(41,81,108,205),(21,52,81,245),(8,25,46,255)]
    heights=[615,730,832,970]
    for band,(base,col) in enumerate(zip(heights,colors)):
        pts=[(0,H)]
        ph=rng.uniform(0,6)
        for x in range(-40,W+50,22):
            envelope=(math.sin(x/390 + ph)*36+math.sin(x/142+ph*1.5)*18
                      +math.sin(x/58+ph*.5)*10)
            if mode=="cloudforge": envelope*=1.7
            pts.append((x,int(base+envelope+rng.uniform(-6,6))))
        pts.extend([(W,H),(0,H)])
        d.polygon(pts,fill=col)
        if band==0:
            d.line(pts[1:-2],fill=(209,205,207,70),width=3)

def skyline(im,rng,mode):
    d=ImageDraw.Draw(im,"RGBA")
    if mode=="cloudforge":
        # Thin floating rock islands: entirely fictional silhouettes.
        for x,y,w in [(1270,520,370),(1570,610,230),(910,620,195)]:
            d.ellipse((x-w//2,y-25,x+w//2,y+18),fill=(18,69,71,225))
            d.polygon([(x-w//2,y),(x+w//2,y),(x+15,y+95),(x-36,y+85)],fill=(27,78,86,255))
            for j in range(12):
                xx=x+rng.randint(-w//3,w//3)
                d.line((xx,y-20,xx-8,y-80-rng.randint(0,35)),fill=(96,171,143,75),width=3)
        return
    if mode not in ("horizon","aperture","harbor"): return
    center=(1420 if mode=="horizon" else 1320)
    foundation=(610 if mode=="horizon" else 690 if mode=="aperture" else 640)
    for i in range(55):
        x=center+rng.randint(-430,440)
        w=rng.randint(14,50)
        h=rng.randint(35,210)
        if abs(x-center)<110:h+=rng.randint(30,160)
        y=foundation-h
        shade=(35,69,92,220) if mode=="horizon" else (35,36,76,228)
        d.rectangle((x,y,x+w,foundation+25),fill=shade)
        if rng.random()<.26:
            d.polygon([(x+w*.4,y),(x+w*.55,y-24),(x+w*.7,y)],fill=(55,104,130,235))
        color=(253,191,143,210) if mode=="horizon" else (122,222,240,205) if mode=="aperture" else (249,107,186,198)
        for yy in range(int(y+14),int(foundation),17):
            for xx in range(int(x+7),int(x+w-2),12):
                if rng.random()>.48:
                    d.rectangle((xx,yy,xx+2,yy+4),fill=color)
    # An emblematic crescent-shaped architecture arc; not an existing city's skyline.
    for k in range(5):
        d.arc((center-210-k*8,foundation-370-k*8,center+210+k*8,foundation+40+k*8),
              185,355,fill=(202,216,225,110),width=3)
    d.line((center+10,foundation-350,center+10,foundation+20),fill=(244,216,207,170),width=5)

def harbor_water(im,rng):
    d=ImageDraw.Draw(im,"RGBA")
    d.polygon([(0,750),(W,720),(W,H),(0,H)],fill=(9,26,61,235))
    for _ in range(360):
        y=rng.randint(744,H)
        x=rng.randint(10,W-10)
        w=rng.randint(14,120)
        r=rng.random()
        col=(243,103,171,rng.randint(17,80)) if r<.35 else (70,227,233,rng.randint(20,95)) if r<.7 else (239,184,152,rng.randint(20,90))
        d.line((x,y,x+w,y),fill=col,width=rng.randint(1,3))

def wallpaper(name,seed,top,middle,bottom,ground):
    rng=random.Random(seed)
    im=palette_sky(top,middle,bottom,seed)
    radial_illumination(im,1510 if name!="cloudforge" else 1290, 415, 540 if name!="cloudforge" else 660)
    haze(im,seed)
    stars(im,rng,75 if name in ("horizon","cloudforge") else 170)
    planet(im,rng,(1230 if name=="horizon" else 1140,145 if name=="horizon" else 125), 240 if name=="horizon" else 145,name)
    skyline(im,rng,name)
    ridges(im,rng,name)
    if name=="harbor":harbor_water(im,rng)
    # Foreground atmospheric veil and subtle vignette for strong menu contrast.
    yy,xx=np.mgrid[0:H,0:W].astype(np.float32)
    mask=np.clip(1-((xx-W*.5)/(W*.85))**2-((yy-H*.48)/(H*.82))**2,0,1)
    v=np.uint8(38*(1-mask))
    overlay=np.zeros((H,W,4),np.uint8)
    overlay[:,:,:3]=(4,7,17)
    overlay[:,:,3]=v
    im.alpha_composite(Image.fromarray(overlay,"RGBA"))
    target=ROOT/"wallpapers"/f"{name}.webp"
    im.convert("RGB").save(target,"WEBP",quality=92,method=5)
    print("wallpaper",target.name,target.stat().st_size)

def svg_assets():
    mark='''<defs><linearGradient id="cloud" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e1a4ff"/><stop offset=".46" stop-color="#8762ed"/><stop offset="1" stop-color="#34d9e8"/></linearGradient><linearGradient id="display" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#352052"/><stop offset="1" stop-color="#16384c"/></linearGradient></defs>
<path d="M70 151H208c26 0 43-19 43-42 0-23-18-42-42-42-7 0-14 1-19 4-11-26-35-43-64-43-37 0-67 26-73 61-26 0-46 20-46 45 0 24 22 43 63 17Z" fill="url(#display)" stroke="url(#cloud)" stroke-width="11" stroke-linejoin="round"/>
<rect x="80" y="91" width="94" height="56" rx="11" fill="none" stroke="#f6ecff" stroke-width="8"/>
<path d="M126 90v-16m-17-8 17 8 17-8" fill="none" stroke="#f6ecff" stroke-width="7" stroke-linecap="round"/>
<circle cx="190" cy="120" r="11" fill="#6defdf"/>'''
    def document(body, view):
        return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" role="img" aria-label="GoreeCloud TV">{body}</svg>\n'
    # This vector source is the authoritative product mark; typography uses named system family.
    (ROOT/"app-icon.svg").write_text(document(mark,'0 0 264 184'))
    text='''<text x="276" y="117" font-family="DejaVu Sans, sans-serif" font-weight="bold" font-size="62" fill="#f8faff">GoreeCloud</text>
<text x="780" y="117" font-family="DejaVu Sans, sans-serif" font-size="55" fill="#d8daee">TV</text>'''
    (ROOT/"logo-dark.svg").write_text(document(mark+text,'0 0 900 190'))
    (ROOT/"logo.svg").write_text(document(mark+text.replace("#f8faff","#1b2846").replace("#d8daee","#485571"),'0 0 900 190'))
    (ROOT/"tv-banner.svg").write_text(document('''<rect width="800" height="450" rx="28" fill="#162640"/>
<path d="M0 330Q150 200 310 320T800 280V450H0Z" fill="#234d70"/>
<path d="M0 390Q290 310 460 390T800 330V450H0Z" fill="#15364f"/>
<circle cx="628" cy="118" r="77" fill="#df9ac9" opacity=".65"/>
<g transform="translate(40 103) scale(1.08)">'''+mark+'''</g>
<text x="330" y="238" font-family="DejaVu Sans, sans-serif" font-weight="bold" font-size="61" fill="white">GoreeCloud TV</text>''','0 0 800 450'))
    # Raster derivatives are drawn from the same geometric master.
    def icon_canvas(size):
        im=Image.new("RGBA",(size,size),(0,0,0,0))
        d=ImageDraw.Draw(im,"RGBA")
        for y in range(size):
            a=y/size
            d.line((0,y,size,y),fill=(int(26+28*a),int(34+7*a),int(73+55*a),255))
        s=size/256
        def pt(x,y):return int(x*s),int(y*s)
        d.rounded_rectangle((pt(12,12),pt(244,244)),radius=int(57*s),outline=(130,203,254,185),width=max(3,int(5*s)))
        # Curved cloud mark with distinct screen and luminous aperture beacon.
        d.ellipse((pt(52,87),pt(154,187)),fill=(93,72,191,255),outline=(214,139,252,255),width=max(3,int(7*s)))
        d.ellipse((pt(105,51),pt(200,159)),fill=(49,123,191,255),outline=(174,204,253,255),width=max(3,int(6*s)))
        d.rounded_rectangle((pt(39,112),pt(216,191)),radius=int(38*s),fill=(47,125,185,255),outline=(128,237,243,255),width=max(3,int(6*s)))
        d.rounded_rectangle((pt(75,124),pt(181,178)),radius=int(12*s),fill=(22,38,78,255),outline=(249,252,255,255),width=max(2,int(7*s)))
        d.polygon([pt(120,137),pt(120,164),pt(149,150)],fill=(177,250,249,255))
        return im
    ico=icon_canvas(512)
    ico.save(ROOT/"raster"/"icon-512.png")
    ico.resize((256,256),Image.Resampling.LANCZOS).save(ROOT/"raster"/"icon-256.png")
    # UI wordmark raster from first-party text/symbol components.
    word=Image.new("RGBA",(1100,230),(0,0,0,0))
    word.alpha_composite(ico.resize((200,200),Image.Resampling.LANCZOS),(6,15))
    d=ImageDraw.Draw(word)
    d.text((218,64),"GoreeCloud TV",font=ImageFont.truetype(BOLD,92),fill=(248,251,255,255))
    word.save(ROOT/"raster"/"wordmark-dark-1100.png")
    banner=Image.new("RGBA",(640,360),(18,30,61,255))
    bd=ImageDraw.Draw(banner)
    bd.rounded_rectangle((7,7,632,352),radius=45,outline=(154,149,240,140),width=5)
    bd.ellipse((425,-100,720,195),fill=(115,91,182,160))
    banner.alpha_composite(ico.resize((175,175),Image.Resampling.LANCZOS),(30,92))
    bd=ImageDraw.Draw(banner)
    bd.text((222,134),"GoreeCloud",font=ImageFont.truetype(BOLD,49),fill=(250,250,255,255))
    bd.text((225,196),"TV LAUNCHER",font=ImageFont.truetype(BOLD,22),fill=(158,232,225,255))
    banner.save(ROOT/"raster"/"tv-banner-640.png")
    print("brand: vector SVG originals + PNG icon, wordmark and banner")

def main():
    for name,seed,top,middle,bottom,ground in SCENES:
        wallpaper(name,seed,top,middle,bottom,ground)
    svg_assets()
    records={}
    for path in sorted(ROOT.rglob("*")):
        if path.is_file() and path.name not in ("manifest.json","README.md"):
            records[str(path.relative_to(ROOT))]={"sha256":hashlib.sha256(path.read_bytes()).hexdigest(),"bytes":path.stat().st_size}
    (ROOT/"manifest.json").write_text(json.dumps({"version":"2026-11-07.1","generation":"deterministic original Pillow/numpy procedural, no reference media","assets":records},indent=2)+"\n")
    print("total assets",len(records))

if __name__=="__main__":main()
