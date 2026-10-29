# GoreeCloud Brand Assets

**The official central GitHub repository for GoreeCloud application and service visual identities.**

As GoreeCloud's founder, I require **every GoreeCloud application and service** to maintain and properly use an official icon, logo, artwork, favicon, and any other appropriate brand assets, including during development, pre-alpha, alpha, beta, and stable releases. When a product's assets are missing, create original GoreeCloud assets and integrate them; do not leave framework placeholders or third-party marks as its identity.

See [mandatory asset requirement](docs/ASSET-REQUIREMENT.md) for scope, provenance, light/dark usage, missing-asset procedures, and acceptance gates.

## Verified asset recovery

### GoreeCloud UI

The four currently published [GC UI identity vectors](products/gc-ui/README.md) are copied byte-for-byte from the official existing `GoreeCloud/gc-ui` consumer assets, with their original Git blob hashes preserved:

- [App icon](products/gc-ui/app-icon.svg)
- [Transparent symbol](products/gc-ui/gc-ui-symbol.svg)
- [Light-background logo](products/gc-ui/gc-ui-logo.svg)
- [Dark-background logo](products/gc-ui/gc-ui-logo-dark.svg)

Run `node scripts/check-identity.mjs` to verify the exact source fingerprints. GitHub Actions also runs this check. This verifies **identity integrity**, not successful rendering or rollout in every supported application.

## Canonical source vs consumer copies

Official design sources and maintained derivatives belong in this repository. Individual app repositories may carry revision-pinned, source-identical copies for platform packaging and offline use. [GoreeCloud UI](https://github.com/GoreeCloud/gc-ui) is the separate sole design-system authority for interface composition and accessibility.

**Current limitations:** The four GC UI SVGs are published. Local raster/icon outputs and web manifest previews exist in a separately prepared staging package but are **not yet published here**, so do not reference them as live assets. Every other GoreeCloud application and service requires an actual per-product asset audit and independent integration. The previously cited `GoreeCloud/branding-assets` repository was not accessible through the current connected GitHub account; the original GC UI provenance record is retained, not erased.

## Contribution and acceptance

When introducing product imagery, preserve product naming, file role, source provenance, rights and licensing, legitimate light/dark variants, pixel-size requirements and usage guidance. Verify SVG safety and hashes, working favicons, native bundle icons, release metadata, contrast, accessibility and actual product rendering. Do not mark an unreviewed file or a partial platform migration as fully compliant.
