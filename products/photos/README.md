# GoreeCloud Photos — official brand source and provenance

**Status (October 29, 2026):** First-party native icon geometry preserved and promoted to the central source with accessible labeling. Light/dark wordmarks and PNG/ICO variants are centrally generated; native consumer adoption, actual rendering and release acceptance are separate work.

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

Adopt the exact central source in the native Photos package, replace any generic interface branding with the official icon, verify installer resources and source provenance, and test real supported Linux rendering, contrast and accessibility. Create additional artwork only where justified by real product surfaces and keep licenses and metadata recorded. Do not claim Android, iOS, web favicon use, deployed status or stable release unless independently implemented and verified.

The candidate file remains historical evidence, **not** a second active master. The [ecosystem adoption ledger](../../docs/ADOPTION-LEDGER.md) records the verified rollout status.
