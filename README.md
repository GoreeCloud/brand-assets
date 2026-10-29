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

Run `node scripts/check-identity.mjs` to verify the exact source fingerprints of all currently recovered icons and logos. GitHub Actions also runs this check. This verifies **identity integrity**, not successful rendering or rollout in every supported application.

### GoreeCloud Search

The [Search app icon](products/search/app-icon.svg) is a byte-exact recovery of the existing Search web companion favicon. See [Search source mapping and outstanding assets](products/search/README.md). The light/dark Search wordmarks are now centrally published; consumer integration, artwork and supported-platform derivatives remain pending.

### GoreeCloud Music

A new original [GoreeCloud Music icon](products/music/app-icon.svg), [light wordmark](products/music/logo.svg), [dark wordmark](products/music/logo-dark.svg), and [abstract music artwork](products/music/artwork/library-hero.svg) are centrally authored for the previously unbranded Linux alpha. Eight-size PNG and ICO exports are generated with the shared pipeline. See the [Music identity and provenance record](products/music/README.md). Native-app integration and rendered QA remain separately required.

## Identity candidate preservation — awaiting reconciliation

- [GoreeCloud Notify source candidates](products/notify/README.md) preserve both the existing Linux icon and differently styled web favicon for an informed canonical selection. Neither candidate has been promoted to a new official master.
- [GoreeCloud Photos source candidate](products/photos/README.md) preserves the existing native icon while accessibility metadata and missing derivatives are reviewed.

These candidate files are historical implementation evidence, not a shortcut around [official asset acceptance](docs/ASSET-REQUIREMENT.md).

## Canonical source vs consumer copies

Official design sources and maintained derivatives belong in this repository. Individual app repositories may carry revision-pinned, source-identical copies for platform packaging and offline use. [GoreeCloud UI](https://github.com/GoreeCloud/gc-ui) is the separate sole design-system authority for interface composition and accessibility.

**Current limitations:** The four GC UI SVGs and the recovered Search source icon are published, alongside Search light/dark logos. This repository also provides [reproducible PNG/ICO derivatives](docs/RASTER-DERIVATIVES.md) for GC UI and Search, with size and integrity manifests and pinned tooling. These are distribution assets, **not evidence of application packaging, deployed favicons, visual acceptance, or cross-platform compliance**. All applications still require complete asset coverage and integration checks. The previously cited `GoreeCloud/branding-assets` repository was not accessible through the current connected GitHub account; the original GC UI provenance record is retained, not erased.

## Contribution and acceptance

When introducing product imagery, preserve product naming, file role, source provenance, rights and licensing, legitimate light/dark variants, pixel-size requirements and usage guidance. Verify SVG safety and hashes, working favicons, native bundle icons, release metadata, contrast, accessibility and actual product rendering. Do not mark an unreviewed file or a partial platform migration as fully compliant.


[Public repository brand adoption ledger](docs/ADOPTION-LEDGER.md) records the evidence status for each reviewed repository and keeps incomplete migrations visible.
