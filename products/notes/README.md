# GoreeCloud Notes — original product icon and wordmark sources

| Field | Value |
| --- | --- |
| Product | GoreeCloud Notes |
| Canonical graphics | products/notes in GoreeCloud/brand-assets |
| Source date | November 14, 2026; original first-party artwork made under founder-delegated design |
| Status | Central source candidate; consumer integration and founder visual acceptance are separate gates |

## Design and provenance

The new glass-effect lilac writing sheet, large violet/lagoon note strokes and mint bookmark sit on the same midnight navy rounded tile style used in first-party GoreeCloud Music and Messenger. Accent hues come from verified GoreeCloud UI iris/lagoon semantic tokens and existing official family sources. The page/bookmark shapes are original, not copied from the predecessor Quiet.md asset, GoreeCloud umbrella G, or the separate GoreeCloud UI identity.

The master icon and wordmarks contain accessible title and description, have no external images, scripts, fonts, network references, tracking or animation and render offline in light/dark contexts. Brand colors do not change automatically with an app's theme.

## Source and distribution

- app-icon.svg: original 512 viewBox master.
- logo.svg and logo-dark.svg: standalone light/dark wordmarks generated from app-icon.svg by node scripts/build-notes-wordmarks.mjs.
- raster/icon-{16,32,48,64,128,192,256,512}.png and raster/favicon.ico: derivatives produced by the pinned Sharp build tool.
- raster/asset-index.json: SVG Git blob fingerprint, per-derivative SHA-256 and exact dimensions.

The source SVGs and checksummed derivatives are centrally owned; downstream app files must be byte-exact revision-pinned copies. The old Notes desktop build still uses its legacy PNG/ICO; it is NOT updated by publishing these source assets. Consumer adoption must preserve the package/application IDs and validate 16px, 32px, Light/Dark launcher previews, desktop entry, Windows ICO and actual installed Linux package. The mandatory approved Linux UI framework migration, physical UI review, Cloud Lens surfaces and signed Stable release remain outstanding.

The asset sources are newly authored, not a previously founder-approved artwork recovery. Source checks and raster signatures are evidence of integrity only, not human visual approval.
