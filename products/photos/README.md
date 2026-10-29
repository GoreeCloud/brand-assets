# GoreeCloud Photos — official brand source and provenance

**Status (October 29, 2026):** First-party native icon geometry preserved and promoted to the central source with accessible labeling. Light/dark wordmarks and PNG/ICO variants are centrally generated; the native GTK consumer source is now integrated and CI-verified; actual rendered deployment and release acceptance remain separate work.

As GoreeCloud's founder, I require Photos to use its own official visual identity throughout its native development alpha. The application previously shipped a distinctive violet framed-landscape icon, so I am preserving that visual design instead of inventing a replacement.

## Canonical and historical sources

| Role | File | Evidence |
| --- | --- | --- |
| Accessible official icon | [app-icon.svg](app-icon.svg) | Git blob `3231d720b1ae17a2c49f4d58e98c60acd331118a`; preserves existing shapes and colors, adds `role=img` and `aria-label` |
| Original unchanged icon | [candidates/linux-app-icon.svg](candidates/linux-app-icon.svg) | Git blob `0413b92b28ab75255a6dbfbf522ac6aa10f13c19` matching [Photos Linux packaging](https://github.com/GoreeCloud/photos/blob/main/packaging/com.goreecloud.Photos.svg) before migration |
| Light wordmark | [logo.svg](logo.svg) | First-party brand lockup from official geometry |
| Dark wordmark | [logo-dark.svg](logo-dark.svg) | Reversed accessible brand lockup |
| App raster/favicons | [raster/asset-index.json](raster/asset-index.json) | Eight PNG sizes and PNG-backed ICO; pinned source and SHA-256 derivative hashes |

Wordmarks can be regenerated with `node scripts/build-photos-wordmarks.mjs`; icon exports use `npm run icons:build`. `npm test` verifies canonical source pins, SVG structures, raster formats and manifests.

## Still required

The [Photos native branding PR #2](https://github.com/GoreeCloud/photos/pull/2) integrated the exact official SVG and PNG source in its GTK header/sidebar and native installer, passed 10 Python unit tests and GitHub CI, and merged as [299e80c5](https://github.com/GoreeCloud/photos/commit/299e80c511acd17e0b974ff67e92db85390ea84d). A temporary isolated-home installer smoke test verified GTK image decode, installed PNG hash, and desktop-entry validity. Still required: real supported Linux GUI rendering, contrast/accessibility acceptance and further client platforms. Create additional artwork only where justified by real product surfaces and keep licenses and metadata recorded. Do not claim Android, iOS, web favicon use, deployed status or stable release unless independently implemented and verified.

The candidate file remains historical evidence, **not** a second active master. The [ecosystem adoption ledger](../../docs/ADOPTION-LEDGER.md) records the verified rollout status.
