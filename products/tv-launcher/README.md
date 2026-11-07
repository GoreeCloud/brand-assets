# GoreeCloud TV — Original Visual Identity and Wallpapers

**Canonical product:** [GoreeCloud TV Launcher](https://github.com/GoreeCloud/tv-launcher).  
**Asset master:** `GoreeCloud/brand-assets/products/tv-launcher/`.  
**Status:** Founder-requested official identity initial revision; creator-authored, source-controlled. Visual/TalkBack and multidevice acceptance is tracked separately.

## Artwork

An original cloud-and-TV display mark, independent from GC UI and mobile Browser identities:

- `app-icon.svg` — original GoreeCloud TV symbol, SVG master.
- `logo.svg` and `logo-dark.svg` — readable light/dark GoreeCloud TV wordmarks, with the vector mark.
- `tv-banner.svg` — original Android TV banner composition.
- `raster/icon-512.png`, `raster/icon-256.png` — platform icon derivatives built using equivalent original shape geometry.
- `raster/wordmark-dark-1100.png` — native Android TV wordmark.
- `raster/tv-banner-640.png` — native Android TV banner.

Four bundled 1920×1080 **original procedural** wallpapers are rendered reproducibly using the checked-in script:

1. `wallpapers/horizon.webp` — **Horizon Expedition**, default sunset science-fiction vista with invented structures.
2. `wallpapers/aperture.webp` — **Aperture City**, violet metropolitan skyline and planet.
3. `wallpapers/cloudforge.webp` — **Cloudforge Peaks**, atmospheric wilderness, floating landforms, and distant celestial body.
4. `wallpapers/harbor.webp` — **Neon Harbor**, stylized neon-water city vista.

## Provenance and verification

Written specifically for GoreeCloud. No user-provided mockup pixels, streaming service logos, actors, stock photos, downloaded image assets or third-party trademarks are embedded in these files. Created using original Pillow/numpy drawing operations, shapes, gradients, synthetic skies, and DejaVu Sans system typography. This artwork is not presented as an existing television series or playable media.

Rebuild: `python3 scripts/build-tv-launcher-assets.py` from the repository root, with `Pillow>=10` and `numpy>=1.24`. The generated `manifest.json` records SHA-256 and file sizes; consumer copies must be byte-identical and pinned to this repository's commit. The source SVGs provide vector masters; native raster packaging is built from equivalent original geometry by the script.

The references are visual direction only. Do not copy/fork an Apple TV layout, incorporate third-party promotional images, or imply entertainment integrations which the app does not implement. The underlying GoreeCloud UI design standard governs semantic roles, contrast, TV remote focus, and accessibility, not any mandated product palette.

**Acceptance still required:** actual 720p and 4K output, forced-colors/contrast/legibility, RTL, accessibility reader navigation, and final founder visual approval. These are initial original official *sources*, not independently approved stable release assets.
