# GoreeCloud Music — original official visual identity

| Field | Value |
| --- | --- |
| Product | GoreeCloud Music |
| Source creation | October 29, 2026, as part of the founder-delegated original branding work |
| Central master | [GoreeCloud/brand-assets](https://github.com/GoreeCloud/brand-assets/tree/main/products/music) |
| Status | Official source files published; native Linux consumer source integration passed CI, but physical-device visual and release checks remain pending |

## Founder direction and design

As GoreeCloud's founder, I require my Music product to use an original, recognizable GoreeCloud identity even while the native GTK4 client is alpha. The prior reviewed Linux source used GTK's generic `audio-headphones-symbolic` image on its login panel and a generic `multimedia-audio-player` desktop entry icon, with no dedicated product SVG found in the inspected source tree.

The new identity is original artwork rather than a rebranded Navidrome or SimpMusic mark. Its midnight navy record tile, violet-to-aqua outline and prominent note coordinate with GC UI's semantic visual direction. The record icon itself stays stable when the user's Light/Dark interface preference changes.

## Source assets

| Role | Central source |
| --- | --- |
| Square application icon | [app-icon.svg](app-icon.svg) |
| Horizontal logo for light backgrounds | [logo.svg](logo.svg) |
| Reversed horizontal logo for dark backgrounds | [logo-dark.svg](logo-dark.svg) |
| Original banner / optional library illustration | [artwork/library-hero.svg](artwork/library-hero.svg) |
| PNG / favicon delivery set | [raster/asset-index.json](raster/asset-index.json) |

The visual identity sources are authored as locally renderable SVGs with descriptions and no embedded third-party images or remote runtime dependencies. The wordmarks can be regenerated with `npm run logos:build`; PNG/ICO derivatives use `npm run icons:build`. `npm test` pins the source vectors and validates derivative dimensions, formats and SHA-256 manifests.

## Actual consumer use

The native Linux alpha now consumes the pinned official icon in its GTK login and workspace header, and declares `com.goreecloud.Music` as its desktop-entry icon. The central SVG master was copied byte-identically, and the 128-pixel PNG was packaged from this repository's checksum-verified raster derivative. [Music PR #4](https://github.com/GoreeCloud/music/pull/4) passed GitHub CI and merged as [`8d048f53`](https://github.com/GoreeCloud/music/commit/8d048f53a5eb6d7dd4598e6afb8026acba39de00). The test suite passed 15 Python tests; the wheel included the official icon, and a temporary XDG installation verified correct desktop/icon file placement. This is **verified source and local packaging adoption**, not a screenshot-reviewed release, installed production desktop application, cross-platform acceptance, or proof of deployed rendering.

Use the [mandatory asset requirement](../../docs/ASSET-REQUIREMENT.md) and [raster distribution instructions](../../docs/RASTER-DERIVATIVES.md). Do not infer macOS, Windows, Android, iOS, iPadOS, web, or production deployment acceptance where those platforms are not independently implemented and verified.

## Provenance limits

These new graphics are first-party SVG source work prepared under the founder's delegated creative direction, **not recovered from a pre-existing official Music brand**, not third-party music trademarks, and not proof of an already published desktop package or physical-device signoff. Source-level native integration was verified; accessibility, physical-device rendering, deployment, and other platform evaluation remain separate acceptance steps.
