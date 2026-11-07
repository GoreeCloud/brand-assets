# GoreeCloud Photos — official brand source and provenance

**Current consumer status (November 7, 2026):** The official first-party Photos SVGs and raster assets remain the authoritative GoreeCloud brand source. The current [GoreeCloud/photos](https://github.com/GoreeCloud/photos) repository is a fresh, attributed Immich source import. Web favicon, SVG icon, Apple touch icon and PWA icons were integrated by [Photos PR #1](https://github.com/GoreeCloud/photos/pull/1) and merged into [main at 4586014](https://github.com/GoreeCloud/photos/commit/45860140fcdb6b6071495e5cdb86caa46130332d) with [passing hosted source-integrity CI](https://github.com/GoreeCloud/photos/actions/runs/42414719402). Full application rebranding, runtime rendering, native client identity and production acceptance remain open.

As GoreeCloud's founder, I require Photos to use its own official visual identity throughout its native development alpha. The approved first-party Photos brand uses a distinctive violet framed-landscape icon, preserved here as the design authority rather than replaced with unrelated artwork.

## Canonical and historical sources

| Role | File | Evidence |
| --- | --- | --- |
| Accessible official icon | [app-icon.svg](app-icon.svg) | Git blob `3231d720b1ae17a2c49f4d58e98c60acd331118a`; preserves existing shapes and colors, adds `role=img` and `aria-label` |
| Original unchanged icon | [candidates/linux-app-icon.svg](candidates/linux-app-icon.svg) | Git blob `0413b92b28ab75255a6dbfbf522ac6aa10f13c19` an archived geometry source reference, not evidence of current native Photos packaging |
| Light wordmark | [logo.svg](logo.svg) | First-party brand lockup from official geometry |
| Dark wordmark | [logo-dark.svg](logo-dark.svg) | Reversed accessible brand lockup |
| App raster/favicons | [raster/asset-index.json](raster/asset-index.json) | Eight PNG sizes and PNG-backed ICO; pinned source and SHA-256 derivative hashes |

Wordmarks can be regenerated with `node scripts/build-photos-wordmarks.mjs`; icon exports use `npm run icons:build`. `npm test` verifies canonical source pins, SVG structures, raster formats and manifests.

## Current adoption and remaining requirements

[Photos PR #1](https://github.com/GoreeCloud/photos/pull/1) brought first-party artwork into the **current web/PWA source**. The merge and GitHub CI validate source and file hashes, **not actual web browser rendering, mobile identity, native desktop behavior or deployed functionality**.

The current product is treated as a fresh source import without inherited migration obligations. Only directly verified integration in the current repository counts as product functionality; the source artwork retains its independent official provenance.

Remaining: complete GoreeCloud UI integration, additional legal removal/replacement of upstream brand-owned assets, runtime browser visual acceptance, Android/iOS app icon and signing validation, accessibility improvements where appropriate, and independent security/release gates. See [Photos release gates](https://github.com/GoreeCloud/photos/blob/main/docs/GOREECLOUD-RELEASE-GATES.md).

The candidate file remains an archival source reference, **not** a second active master. The [ecosystem adoption ledger](../../docs/ADOPTION-LEDGER.md) tracks verified present-day consumer integrations.
