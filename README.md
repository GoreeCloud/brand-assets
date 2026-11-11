# GoreeCloud Brand Assets

**The official central GitHub repository for GoreeCloud application and service visual identities.**

As GoreeCloud's founder, I require **every GoreeCloud application and service** to maintain and properly use an official icon, logo, artwork, favicon, and any other appropriate brand assets, including during development, pre-alpha, alpha, beta, and stable releases. When a product's assets are missing, create original GoreeCloud assets and integrate them; do not leave framework placeholders or third-party marks as its identity.

See [mandatory asset requirement](docs/ASSET-REQUIREMENT.md) for scope, provenance, light/dark usage, missing-asset procedures, and acceptance gates.

## Founder identity clarification — November 11, 2026

**GoreeCloud's permanent umbrella circular-G logo** and **GoreeCloud UI's separate, newly requested product identity** are not interchangeable. See the [verified asset boundary and source fingerprints](docs/GOREECLOUD-IDENTITY-BOUNDARIES-2026-11-11.md). The founder's exact 1024×1024 umbrella PNG is now published as the [permanent GoreeCloud source master](brand/goreecloud/profile-logo-1024.png), with an independent SHA-256 and dimensions verification ([PR #20](https://github.com/GoreeCloud/brand-assets/pull/20)). Faithful SVG/favicon/artwork derivatives remain tracked in [issue #17](https://github.com/GoreeCloud/brand-assets/issues/17). A **brand-new** GC UI identity is requested in [issue #18](https://github.com/GoreeCloud/brand-assets/issues/18); the previously approved Aperture Weave files remain documented historical/interim source assets, **not fulfillment of that new request**.

## Permanent GoreeCloud umbrella logo

The [founder-supplied original blue G](brand/goreecloud/README.md) is now
the permanent **GoreeCloud** identity master, separate from product identities.
The exact supplied PNG stays preserved; its SVG reconstruction, six-resolution
favicon, direct-source PNG exports and first-party four-pillar artwork are
available alongside it. Do not replace the umbrella G with the GoreeCloud UI
mark or automatically recolor its official geometry. Consumer adoption and
human visual/favicon acceptance remain distinct gates.

## Verified asset recovery

### GoreeCloud UI

The four currently published [GC UI identity vectors](products/gc-ui/README.md) are copied byte-for-byte from the official existing `GoreeCloud/gc-ui` consumer assets, with their original Git blob hashes preserved:

- [App icon](products/gc-ui/app-icon.svg)
- [Transparent symbol](products/gc-ui/gc-ui-symbol.svg)
- [Light-background logo](products/gc-ui/gc-ui-logo.svg)
- [Dark-background logo](products/gc-ui/gc-ui-logo-dark.svg)
- [Official interface constellation artwork](products/gc-ui/artwork/interface-constellation.svg) — founder-approved original, byte-identical to preserved candidate

Run `node scripts/check-identity.mjs` to verify the exact source fingerprints of all currently recovered icons and logos. GitHub Actions also runs this check. This verifies **identity integrity**, not successful rendering or rollout in every supported application.

### GoreeCloud Search

The [Search app icon](products/search/app-icon.svg) is a byte-exact recovery of the existing Search web companion favicon. See [Search source mapping and outstanding assets](products/search/README.md). The light/dark Search wordmarks are now centrally published; consumer integration, artwork and supported-platform derivatives remain pending.

### GoreeCloud Music

A new original [GoreeCloud Music icon](products/music/app-icon.svg), [light wordmark](products/music/logo.svg), [dark wordmark](products/music/logo-dark.svg), and [abstract music artwork](products/music/artwork/library-hero.svg) are centrally authored for the previously unbranded Linux alpha. Eight-size PNG and ICO exports are generated with the shared pipeline. See the [Music identity and provenance record](products/music/README.md). Native Linux source adoption merged with [Music PR #4](https://github.com/GoreeCloud/music/pull/4) and passed CI; actual rendered and release QA remain separately required.

### GoreeCloud Notify

The existing native Notify bell icon is now the [central official source](products/notify/app-icon.svg), with [light](products/notify/logo.svg) and [dark](products/notify/logo-dark.svg) wordmarks and [raster derivatives](products/notify/raster/asset-index.json). The original divergent web favicon is retained as a candidate for provenance. Native/web source unification passed CI and merged in [Notify PR #19](https://github.com/GoreeCloud/notify/pull/19); actual rendered checks remain gated.

### GoreeCloud Photos

The existing first-party Photos icon artwork is preserved as the central [accessible app icon](products/photos/app-icon.svg), with new [light](products/photos/logo.svg) and [dark](products/photos/logo-dark.svg) wordmarks plus [PNG/ICO exports](products/photos/raster/asset-index.json). The unchanged original SVG remains archived for source provenance. Photos native source adoption passed CI and merged in [Photos PR #2](https://github.com/GoreeCloud/photos/pull/2); actual rendering still requires verification.

### GoreeCloud Messenger

An original [Messenger app icon](products/messenger/app-icon.svg), [light](products/messenger/logo.svg) and [dark](products/messenger/logo-dark.svg) wordmarks and [PNG/ICO exports](products/messenger/raster/asset-index.json) are published for first-party Messenger identity. Native platform packaging remains separately gated.

### GoreeCloud Browser family — Prism Tabs v5

The founder approved **Prism Tabs v5** on November 6, 2026. Its [canonical color icon](products/browser-mobile/app-icon.svg), [transparent foreground](products/browser-mobile/symbol.svg), [monochrome Android derivative](products/browser-mobile/monochrome.svg), [Browser Mobile light/dark wordmarks](products/browser-mobile/README.md) and [desktop Browser wordmarks](products/browser/README.md) are now centrally published for both [Android Browser Mobile](https://github.com/GoreeCloud/browser-mobile) and [Linux-first Browser](https://github.com/GoreeCloud/browser). The selected original source, older alternatives and design evolution remain preserved in the historical draft. Full-color identity approval does not independently certify themed-icon rendering, a completed platform installation, release readiness or Stable status. PNG/ICO exports include pinned source/derivative manifests. No image-generation service was used.

### GoreeCloud TV Launcher

An original first-party cloud-and-screen identity and four offline 1920×1080 GoreeCloud TV landscapes are authored in [products/tv-launcher](products/tv-launcher/README.md), with SVG masters, branded native APK raster derivatives, deterministic source build script, and per-asset SHA-256 manifest. The Android app packages byte-identical artwork copies. Interactive UI acceptance and signed release remain independent gates.



### Seven missing product identities — original Foundation v1 designs (proposal only)

The missing first-party icon/logo/favicons/artwork requirement is being
addressed with **seven separate source-authored SVG candidate families**
for GoreeShield, Wardveil, GoreeCloud Mesh, Maps, Projects, Analytics and
Gateway. Each proposed set includes a distinct app icon and transparent
symbol, light/dark wordmarks, a concept illustration, scalable favicon,
eight PNG sizes and a pinned multi-resolution ICO. These are located
under `products/<slug>/candidates/foundation-v1/` and documented in
[the candidate review register](docs/SEVEN-IDENTITY-CANDIDATES-2026-11-11.md).
**None is official or rolled out.** The current GoreeCloud permanent umbrella
G, approved Browser-family mark, existing Search icon, all other central
masters and separate GC UI Flowframe candidate remain unchanged.

The design is original source SVG produced without an external image service,
third-party artwork, remote fonts or external requests. SHA-256 and XML safety,
semantic-identity separation, 16px icon uniqueness and raster/ICO tests run
with `npm run candidates:seven:verify` and `npm test`. Founder visual approval,
platform packaging, accessibility acceptance and consumer adoption are
still required before any official promotion. Follow up under
[brand coverage issue #24](https://github.com/GoreeCloud/brand-assets/issues/24).

## Identity candidate preservation — awaiting reconciliation

- [GoreeCloud Notify historical source candidates](products/notify/README.md) preserve the formerly divergent native/web designs; the native bell is now the single official master.
- [GoreeCloud Photos original icon](products/photos/README.md) remains archived as a source candidate; the geometry-preserving accessible canonical master and derivatives are published.

These candidate files are historical implementation evidence, not a shortcut around [official asset acceptance](docs/ASSET-REQUIREMENT.md).

## Canonical source vs consumer copies

Official design sources and maintained derivatives belong in this repository. Individual app repositories may carry revision-pinned, source-identical copies for platform packaging and offline use. [GoreeCloud UI](https://github.com/GoreeCloud/gc-ui) is the separate sole design-system authority for interface composition and accessibility.

**Current limitations:** The four GC UI SVGs and the recovered Search source icon are published, alongside Search light/dark logos. This repository also provides [reproducible PNG/ICO derivatives](docs/RASTER-DERIVATIVES.md) for GC UI, Search, and Music, with size and integrity manifests and pinned tooling. These are distribution assets, **not evidence of application packaging, deployed favicons, visual acceptance, or cross-platform compliance**. All applications still require complete asset coverage and integration checks. The previously cited `GoreeCloud/branding-assets` repository was not accessible through the current connected GitHub account; the original GC UI provenance record is retained, not erased.

## Contribution and acceptance

When introducing product imagery, preserve product naming, file role, source provenance, rights and licensing, legitimate light/dark variants, pixel-size requirements and usage guidance. Verify SVG safety and hashes, working favicons, native bundle icons, release metadata, contrast, accessibility and actual product rendering. Do not mark an unreviewed file or a partial platform migration as fully compliant.


[Public repository brand adoption ledger](docs/ADOPTION-LEDGER.md) records the evidence status for each reviewed repository and keeps incomplete migrations visible.
