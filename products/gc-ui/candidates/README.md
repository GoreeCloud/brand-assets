# GoreeCloud UI — Aperture Weave identity candidate

**Status: UNAPPROVED ORIGINAL DESIGN CANDIDATE, not the official identity.**

The founder requested a new original, premium visual identity and more polished GC UI interfaces on November 6, 2026. This candidate explores a three-part open aperture, visually representing the established Canvas, Surface and Lens architecture. Its controlled Iris, cobalt and lagoon treatments are brand-art hues informed by documented GC UI palettes, not new UI semantic tokens. All assets are original self-contained SVG source, manually authored without an image-generation service, external image references, scripts, embedded fonts or third-party artwork.

| File | Intended role |
| --- | --- |
| aperture-app-icon.svg | Midnight tile / launcher concept |
| aperture-symbol.svg | Transparent open-center symbol |
| aperture-logo.svg | Wordmark on a light background |
| aperture-logo-dark.svg | Wordmark on a dark background |
| aperture-interface-artwork.svg | Decorative three-plane constellation artwork, not a working interface |

The manifest.json has SHA-256 source pins and byte sizes. The node scripts/verify-gc-ui-candidate.mjs check validates source integrity, basic vector safety and local-only structure. The experimental GC UI reference lab review branch can use byte-identical candidate preview copies under assets/candidates/ with its official navigation icon and favicon unchanged.

The existing official GC UI app-icon, symbol, light/dark logos, and published PNG/ICO derivatives remain the authoritative masters. This candidate is NOT approved to replace launcher icons, favicons, PWA/native bundles or raster distributions. Before official promotion, obtain founder review and selection; test light/dark and high/forced colors, legibility at favicon sizes, RTL and zoom; regenerate and pin derivatives; update the central master first, then byte-identical consumer copies, docs and test pins. Never describe the experimental workspace as Stable because of visual changes.
