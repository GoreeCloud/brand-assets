# GoreeCloud Music — original official visual identity

| Field | Value |
| --- | --- |
| Product | GoreeCloud Music |
| Source creation | October 29, 2026, as part of the founder-delegated original branding work |
| Central master | [GoreeCloud/brand-assets](https://github.com/GoreeCloud/brand-assets/tree/main/products/music) |
| Status | Official source files created; platform integration and visual release checks must be verified independently |

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

The founder requirement is not satisfied merely by publishing source art. The GoreeCloud Music native alpha must package a pinned official icon, replace the login's generic multimedia symbol with the official image, and provide correct platform installer / launcher icon metadata. The corresponding runtime and packaging changes must be source-reviewed, tested and validated on an actual supported Linux environment.

Use the [mandatory asset requirement](../../docs/ASSET-REQUIREMENT.md) and [raster distribution instructions](../../docs/RASTER-DERIVATIVES.md). Do not infer macOS, Windows, Android, iOS, iPadOS, web, or production deployment acceptance where those platforms are not independently implemented and verified.

## Provenance limits

These new graphics are first-party SVG source work prepared under the founder's delegated creative direction, **not recovered from a pre-existing official Music brand**, not third-party music trademarks, and not proof of an already published desktop package or physical-device signoff. Consumer integration and accessibility/visual evaluation remain separate acceptance steps.
