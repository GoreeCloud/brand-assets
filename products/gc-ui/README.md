# GoreeCloud UI — recovered official identity vectors

**Status:** Four source-matched official identity SVGs published and verified on October 29, 2026; raster exports and complete consumer rollout remain separately unverified.

As GoreeCloud's founder, I require GC UI identity assets to live in my official centralized repository, `GoreeCloud/brand-assets`, and to be used consistently in development and released products. These four files were copied **without modification** from the existing `GoreeCloud/gc-ui` source, preserving the recorded original visual identity rather than creating a substitute.

## Verified identities

| Official identity source here | Existing GC UI consumer source | Exact Git blob SHA-1 |
| --- | --- | --- |
| [app-icon.svg](app-icon.svg) | `GoreeCloud/gc-ui/assets/gc-mark.svg` | `d3d2f4f2ae241e172691de8c8f6bef628331a350` |
| [gc-ui-symbol.svg](gc-ui-symbol.svg) | `GoreeCloud/gc-ui/assets/gc-symbol.svg` | `613dfb1747f251d86a1faa6e12c83836b2a950b7` |
| [gc-ui-logo.svg](gc-ui-logo.svg) | `GoreeCloud/gc-ui/assets/gc-logo.svg` | `95a7b63c6928d4e2d79f6afbd41025bc887d7c1c` |
| [gc-ui-logo-dark.svg](gc-ui-logo-dark.svg) | `GoreeCloud/gc-ui/assets/gc-logo-dark.svg` | `9c36aec87107552fa703798a2b09adb610175572` |

All four destination blobs were fetched and verified to match their original source SHA values.

## Usage

- Use `app-icon.svg` as the GC UI app icon and (on supported web clients) SVG favicon; scale appropriately or derive raster application icons from this approved source.
- Use `gc-ui-symbol.svg` as a standalone transparent symbol.
- Use `gc-ui-logo.svg` on light backgrounds and `gc-ui-logo-dark.svg` on dark backgrounds.
- Maintain intrinsic aspect ratio, legibility, clear space and authentic original palette. Do not recolor these identity files based on the user's accent theme.
- For offline/desktop/mobile use, include a pinned, source-identical bundle copy rather than loading GitHub at runtime. Retain appropriate provenance.
- Verify actual rendered results across supported platforms, screen density and contrast modes. These files alone do not certify packaging or release compliance.

## Historical context and current authority

The existing [GC UI branding document](https://github.com/GoreeCloud/gc-ui/blob/main/docs/BRANDING.md) formerly described `GoreeCloud/branding-assets` with historical commit IDs `29ea759c167a86390a2b4ff559e5fc40ec7c99a3` and `dd13aad`. The account's connected GitHub repository search did not find that older repository. Its historical records remain cited; we make no claim of having independently verified the inaccessible older source.

The current founder-designated central source for official artwork is [GoreeCloud/brand-assets](https://github.com/GoreeCloud/brand-assets), while [GoreeCloud/gc-ui](https://github.com/GoreeCloud/gc-ui) is the sole design-system authority for interface treatment.

## Remaining verification

Produce reproducible, validated PNG/ICO and platform-specific derivatives as required; test favicon and manifest references; audit current consumer references and CI; correct stale canonical URLs in GC UI without breaking verified source-file pins; and migrate other GoreeCloud products on a per-product basis. Do not mark these incomplete steps finished.
