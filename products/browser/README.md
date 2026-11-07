# GoreeCloud Browser — Linux-first desktop identity

The official GoreeCloud Browser uses the **same founder-approved Prism Tabs v5 app icon** as [GoreeCloud Browser Mobile](../browser-mobile/README.md). The canonical icon source is [../browser-mobile/app-icon.svg](../browser-mobile/app-icon.svg); the translucent foreground is [../browser-mobile/symbol.svg](../browser-mobile/symbol.svg). Do not fork or redesign the icon for the desktop application.

This directory adds only the native **GoreeCloud Browser** [light](logo.svg) and [dark](logo-dark.svg) wordmarks, both source-derived from the shared Prism Tabs symbol. Mobile instead uses the subtitle **BROWSER MOBILE**.

**Linux delivery:** the `GoreeCloud/browser` Python/PySide6 package should vendor the source-equivalent SVG and a pinned 256px PNG derivative, use it as QApplication/QMainWindow icon, and install an icon path for the freedesktop launcher. A package or CI test must verify the resource is bundled and valid. This is an identity integration, not production deployment, default-browser activation, or Windows/macOS platform release.

Source generation: `python3 scripts/build-browser-wordmarks.py` (run from the central brand-assets repository root); raster generation: `npm run icons:build`; verification: `npm test`. No third-party artwork or generated-image model is involved. Do not infer that an icon being available proves user-visible installation or Stable release acceptance.
