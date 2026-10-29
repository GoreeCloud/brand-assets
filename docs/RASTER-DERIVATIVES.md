# GoreeCloud official app icon derivatives — provenance and usage

| Field | Value |
| --- | --- |
| Status | Source-derived PNG and ICO files generated and locally validated; publication and consumer rollout are separately gated |
| Prepared | October 29, 2026 |
| Asset authority | [GoreeCloud/brand-assets](https://github.com/GoreeCloud/brand-assets) |
| Source-of-truth format | Official SVG masters in each product directory |
| Consumers in this batch | GoreeCloud UI and GoreeCloud Search |

## Founder direction and scope

As GoreeCloud's founder, I require real, traceable, officially branded app icons and applicable favicons in every supported application and service from the development stage onward. The source SVGs remain authoritative. These derivatives provide size-specific files for actual web, desktop, mobile, and installer integration; they do not independently approve a product's platform packaging or make the application brand-compliant.

## Published asset organization

| Product | Canonical vector | Delivery directory |
| --- | --- | --- |
| GoreeCloud UI | [GC UI app icon](../products/gc-ui/app-icon.svg) | [GC UI rasters](../products/gc-ui/raster/asset-index.json) |
| GoreeCloud Search | [Search app icon](../products/search/app-icon.svg) | [Search rasters](../products/search/raster/asset-index.json) |

Each delivery directory contains eight square PNGs, with widths and heights of **16, 32, 48, 64, 128, 192, 256, and 512 pixels**, plus `favicon.ico` embedding **16, 32, 48, and 256-pixel PNG entries**, and a machine-readable `asset-index.json` containing the canonical source Git blob ID, SHA-256 checksums, byte sizes, format and dimensions.

These filenames are generated resources, not evidence that a particular application's web/PWA manifest, package metadata, or launcher currently consumes them.

## Reproducible build and verification

From the central repository root on a supported Node.js environment:

```sh
npm ci
npm run icons:build
npm test
```

The pinned development dependency `sharp@0.34.5` rasterizes the original icon SVGs. `scripts/build-raster-icons.mjs` produces PNGs, PNG-backed ICO containers, and integrity manifests. `scripts/check-identity.mjs` ensures the central SVG sources retain their inspected Git blob IDs. `scripts/validate-vectors.mjs` checks baseline SVG structure. `scripts/verify-raster-icons.mjs` checks PNG dimensions and signatures, ICO entries, exact embedded PNG payloads, source IDs, and manifest SHA-256 hashes. CI runs the same checks after `npm ci`.

Pinned lockfile and manifests make publication and consumption verifiable, but a rerender on a different CPU, OS, library or font configuration might differ byte-for-byte. Do not assume an independently rebuilt PNG has the same hash without checking. Distribute the checked-in published derivative when preserving exact rendered pixels matters.

## Consumer integration

- Copy files into the consumer's web static assets, native bundle/resources, or build pipeline at a **known central repository commit**; do not depend on a live GitHub URL to render a login, launch, or offline UI.
- Prefer the canonical SVG for modern vector display and the appropriate PNG or ICO for platform-specific requirements. Web/PWA paths, shortcut and installer metadata, native launcher safe areas, platform adaptive-mask conventions, and declared supported devices need their own configuration and verification.
- Keep accessible alternate text for meaningful images and suppress decorative redundancy. Validate legibility against the mandatory default Light appearance and user-selectable Dark / high-contrast modes.
- Do not regenerate or recolor logos based on theme accent; use official light/dark wordmark variants.
- Test real clients and deployed assets. A source-file checksum, successful local generation, or GitHub Actions success is **not** a rendered-browser, physical-device, production deployment, or platform-release certificate.

## Remaining work

Finish platform-specific adaptive launcher icons and mobile resources where those platforms are actually supported; integrate the published derivatives and official wordmarks into applicable consumers; verify light/dark rendering, cache behavior, accessibility, manifests and packaged output; create original approved identities for products still lacking them; and update the [evidence ledger](ADOPTION-LEDGER.md) without misrepresenting untested apps as compliant.

This document is technical distribution guidance subordinate to GoreeCloud's governing project instructions and the [mandatory brand asset requirement](ASSET-REQUIREMENT.md).
