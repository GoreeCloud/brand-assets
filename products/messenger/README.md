# GoreeCloud Messenger — original official visual identity

**Status (October 29, 2026):** New first-party source icon, light/dark wordmarks, and PNG/ICO derivatives prepared for publication and validation. Client packaging, user-facing rendering and production deployment require independent checks.

As GoreeCloud's founder, I require Messenger to have a distinctive, original identity in development, alpha, and released products. The prior inspected web app used a generic Lucide message circle, had no favicon in `web/index.html`, and its Android, iOS and desktop previews had no verified product icon bundles. The new art must not claim to be a Matrix or Synapse trademark.

## Canonical assets

- [app-icon.svg](app-icon.svg) — two overlapping violet and teal speech bubbles on a midnight-blue tile. No shield or false claim of end-to-end encryption readiness.
- [logo.svg](logo.svg) — product wordmark for light backgrounds.
- [logo-dark.svg](logo-dark.svg) — reversed product wordmark for dark backgrounds.
- [raster/asset-index.json](raster/asset-index.json) — eight PNG sizes and one multi-resolution favicon ICO, with Git blob source identifier and SHA-256 file checksums.

Wordmarks are reproducible with `node scripts/build-messenger-wordmarks.mjs`; raster outputs with `npm run icons:build`. The central `npm test` suite verifies pinned source fingerprints, SVG structure, PNG dimensions, ICO container contents and manifest hashes.

## Required consumers and verification

1. **Web companion:** package the official SVG favicon locally and display the same icon in the navigation rail. Verify web build, markup, theme contrast and runtime/browser behavior.
2. **Native Android preview:** supply adaptive foreground/background and mipmap launcher assets in Android's resource directories; set verified icon fields in the manifest; build and install-test the declared supported Android version.
3. **Native iOS/iPadOS previews:** add the corresponding AppIcon asset catalog, map it through the Xcode project, and verify a signed/simulator build as supported.
4. **Native Qt desktop previews:** package a pinned local icon for Qt window icons and platform installers; verify each supported Linux, Windows and macOS package.
5. Maintain first-party promotional artwork and platform-specific derivatives appropriate to actual supported surfaces. No marketing illustration is yet certified by this initial source set.

A source commit, manifest, or web-only integration does **not** certify native packages, production use, encryption verification, or distribution acceptance. All consumers must derive from the [central brand asset requirement](../../docs/ASSET-REQUIREMENT.md) and retain reproducible provenance.
