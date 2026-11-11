# GoreeCloud UI — Flowframe v2 visual identity proposal

**Status: new original design candidate; NOT founder-approved or canonical.** Proposed November 11, 2026 in response to the request for a wholly new GoreeCloud UI-specific logo, icon, favicon and artwork, designed using the GoreeCloud UI design language.

## Design intent

**Flowframe** uses three offset rounded interface planes to express the established **Cloud Canvas → Cloud Surface → Cloud Lens** material system. The foreground contains a small modular interface layout. It is deliberately unlike the preceding **Aperture Weave** open-diamond identity and unlike GoreeCloud's permanent blue circular **G**.

The composition follows the documented GC UI principles: readable hierarchy, rounded shapes, purpose-driven layering, constrained depth, accessible light/dark variants, locally generated artwork, and no mandatory global app accent. Iris and Lagoon colors shown here are an optional brand-art treatment—not a new universal semantic palette. All shapes and color stops are original procedural SVG, with no external imagery, scripts, fonts or analytics.

## Deliverables

| Candidate asset | Purpose |
| --- | --- |
| [app-icon.svg](app-icon.svg) | Product-specific squared launcher/favicon icon |
| [symbol.svg](symbol.svg) | Transparent layered-pane symbol |
| [logo.svg](logo.svg) | Light-background wordmark |
| [logo-dark.svg](logo-dark.svg) | Dark-background wordmark |
| [artwork.svg](artwork.svg) | Original 1440 × 900 three-layer conceptual illustration |
| [favicon.svg](favicon.svg) | Byte-identical scalable browser icon |
| [raster/asset-index.json](raster/asset-index.json) | Pinned PNG 16–512 + four-resolution ICO derivatives |

The candidate SVG files can be rebuilt and verified with `python3 scripts/build-gcui-flowframe-v2.py --check`; the existing pinned Sharp generator produces the consumer raster sizes, and `npm test` verifies the icon formats, manifests and source integrity.

## Decision and deployment boundary

The existing founder-approved [Aperture Weave masters](../../README.md), its source lineage, consumers, and current live product surfaces are **unchanged**. Flowframe v2 is not marked official until it is actually reviewed and selected. Do not replace the approved logo, native app icons, favicons or release assets, or conflate it with the permanent GoreeCloud umbrella logo. Publish to a distinct experimental lab/preview only after isolated browser checks and intentional acceptance.

Source-level validity and raster hashes are not full human contrast, screen-reader, forced-colors, 16px legibility, product-wide accessibility, native packaging, store or Stable release acceptance.
