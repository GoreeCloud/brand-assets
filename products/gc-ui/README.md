# GoreeCloud UI — Official Aperture Weave identity

**Status:** Founder-approved design direction (November 6, 2026). This document describes the official SVG master sources; a feature branch is not a deployed consumer release.

The founder reviewed the rendered Aperture Weave icon, light/dark wordmark, and interface artwork and explicitly approved the design. These four canonical GC UI SVG masters are byte-for-byte identical to the original candidate sources, protected by their SHA-256 manifest.

| Canonical master | Approved original source | Usage |
| --- | --- | --- |
| [app-icon.svg](app-icon.svg) | [aperture-app-icon.svg](candidates/aperture-app-icon.svg) | App tile and favicon master |
| [gc-ui-symbol.svg](gc-ui-symbol.svg) | [aperture-symbol.svg](candidates/aperture-symbol.svg) | Standalone open-center mark |
| [gc-ui-logo.svg](gc-ui-logo.svg) | [aperture-logo.svg](candidates/aperture-logo.svg) | Light wordmark |
| [gc-ui-logo-dark.svg](gc-ui-logo-dark.svg) | [aperture-logo-dark.svg](candidates/aperture-logo-dark.svg) | Dark wordmark |

The approved fifth asset is now published under [artwork/interface-constellation.svg](artwork/interface-constellation.svg) as the **official GC UI visual artwork master**, copied byte-for-byte from the founder-approved November 6 candidate [aperture-interface-artwork.svg](candidates/aperture-interface-artwork.svg). It illustrates Canvas, Surface and Lens as a conceptual composition; it is not an application screenshot or active interface. The source SHA-256 is `50661cf8d84818240ac7ac5e273123e041f9471ef4aa953d2be05019e4aef6aa`. Consumers must verify a pinned copy and meaningful use. A central artwork file does not by itself certify favicon/consumer rollout or product release. Assets use original standalone SVG source, no external images or scripts.

## Historical source integrity

The prior GC-letterform identity was canonical from October 29 to November 6, 2026. Its original Git object IDs are preserved here and in history for recovery:

- Old app-icon.svg / GC UI gc-mark.svg: d3d2f4f2ae241e172691de8c8f6bef628331a350
- Old gc-ui-symbol.svg / gc-symbol.svg: 613dfb1747f251d86a1faa6e12c83836b2a950b7
- Old gc-ui-logo.svg / gc-logo.svg: 95a7b63c6928d4e2d79f6afbd41025bc887d7c1c
- Old gc-ui-logo-dark.svg / gc-logo-dark.svg: 9c36aec87107552fa703798a2b09adb610175572

## Derivatives and rollout

Only app-icon.svg is used to generate the GC UI 16–512px PNG sizes, favicon.ico, and SHA-256 raster manifest. The pinned Sharp generator is npm run icons:build; npm test verifies all checked-in vector sources and 65 derivative files across seven products. See [raster derivative guidance](../../docs/RASTER-DERIVATIVES.md).

Promote the validated central masters before synchronizing exact-byte GC UI consumer SVGs and tests. Validate browser favicon and native packaging separately, including tiny-size clarity, accessible contrast, and proper platform conventions. Other ecosystem product brands, public profiles, installed native applications and production deployments are not yet migrated. Approval of an identity does not convert an experimental GC UI workspace to Stable.
