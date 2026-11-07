# GoreeCloud UI — Aperture Weave approved original design

**Status: FOUNDER APPROVED November 6, 2026.** Original candidate vectors are immutable evidence for the promoted canonical GC UI masters. Any publication/consumer rollout still requires platform-specific testing.

The founder requested a new original, premium visual identity and more polished GC UI interfaces on November 6, 2026. The approved design uses a three-part open aperture, visually representing the established Canvas, Surface and Lens architecture. Its controlled Iris, cobalt and lagoon treatments are brand-art hues informed by documented GC UI palettes, not new UI semantic tokens. All assets are original self-contained SVG source, manually authored without an image-generation service, external image references, scripts, embedded fonts or third-party artwork.

| File | Intended role |
| --- | --- |
| aperture-app-icon.svg | Midnight tile / launcher concept |
| aperture-symbol.svg | Transparent open-center symbol |
| aperture-logo.svg | Wordmark on a light background |
| aperture-logo-dark.svg | Wordmark on a dark background |
| aperture-interface-artwork.svg | Decorative three-plane constellation artwork, not a working interface |

The manifest.json has SHA-256 source pins and byte sizes. The node scripts/verify-gc-ui-candidate.mjs check validates source integrity, basic vector safety and local-only structure. The GC UI source preview keeps byte-identical copies under assets/candidates/; official icon/wordmarks in the GC UI consumer are migrated separately with source-blob pin verification.

The founder approved this particular identity direction. The canonical products/gc-ui/ master SVGs and generated raster icons in the dedicated adoption PR use these exact sources; other brand assets remain unchanged. Before deployment or consumer migration, verify platform-specific app/launcher behavior, light/dark and forced colors, favicon legibility, RTL, native icons, packaging and rollback. Never describe the experimental workspace as Stable because of an identity change.
