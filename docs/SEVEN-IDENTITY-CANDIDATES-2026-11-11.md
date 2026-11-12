# Seven missing GoreeCloud product identities — original Foundation v1 candidates

**Status: proposed artwork for review, NOT official, approved, adopted, released, or deployed.**

**Date:** November 11, 2026
**Scope:** [Brand coverage issue #24](https://github.com/GoreeCloud/brand-assets/issues/24): GoreeShield, Wardveil, GoreeCloud Mesh, Maps, Projects, Analytics, Gateway.
**Governing requirements:** [Brand asset requirements](ASSET-REQUIREMENT.md) and the existing GoreeCloud UI design language, not a new competing brand standard.

## Proposed semantics and distinction

| Product | Responsibility | Distinct candidate symbol | Scope boundary |
| --- | --- | --- | --- |
| GoreeShield | **Privacy** | Layered shield plus an explicit consent-control toggle | Not a malware scanner, network monitor, or Wardveil |
| Wardveil | **Cybersecurity** | Faceted protective shield with a visible defensive signal pulse | Not a replacement for privacy choices or personal-data governance |
| GoreeCloud Mesh | **Integration** | Four distinct service endpoints with a deliberate central hub | Not universal permission to exchange data; Wardveil/GoreeShield still apply |
| GoreeCloud Maps | Navigation and geospatial apps | Folded map with a destination pin | No assertion that a live map service is released |
| GoreeCloud Projects | Planning and work coordination | Segmented project board with separate task cards | Does not incorporate or republish upstream Plane branding |
| GoreeCloud Analytics | First-party analytics | Three abstract bars plus a lightweight trend trace | Does not imply telemetry collection or production analytics |
| GoreeCloud Gateway | Edge routing and network entry | Routed gateway passage between separate endpoints | No assertion that traffic is currently protected/deployed |

These shapes are **original source-authored vectors** in the same review-only visual family, but deliberately have unique internal geometry. The product-specific colors are candidates based on known GC UI Iris/Lagoon and navy roles; they are **not new semantic tokens or universal brand specifications**.

## Deliverables and ownership

Each product stores files at `products/<slug>/candidates/foundation-v1/`:

- `app-icon.svg` — original square app glyph on a native navy tile.
- `symbol.svg` — unframed standalone vector for UI composition and headings.
- `logo.svg`, `logo-dark.svg` — product-specific light/dark wordmarks using local system font fallbacks.
- `favicon.svg` — byte-identical source to the app icon; no external resources.
- `artwork.svg` — original wide conceptual composition. It is **not** a screenshot or a statement of deployed capability.
- `manifest.json` — source SHA-256 pins, review status, design provenance.
- `raster/icon-{16,32,48,64,128,192,256,512}.png` — eight deterministic raster variants.
- `raster/favicon.ico` — actual 16/32/48/256px icon frames.
- `raster/asset-index.json` — per-file raster hashes, dimensions, source reference and generator.

The permanent founder-supplied GoreeCloud blue-G umbrella logo is **unmodified**. The founder-approved Browser family, Search, other current official masters and the proposed Flowframe v2 GC UI identity are also **unmodified**. This PR must not automatically change an application launcher, production browser favicon, website navigation, platform package, search metadata, marketing pages, or existing user branding.

No generated-image service, bundled third-party logo or webfont is used. This candidate pipeline authors source-code SVG, derives PNG/ICO locally with the existing pinned `sharp@0.34.5`, and tests every output. It does not imply human art-direction approval, licensing for third-party trademarks, native app delivery, WCAG review or platform release.

## Reproduction and verification

From the repository root, with the pinned Node dependencies installed:

```bash
python3 scripts/build-seven-product-candidates.py --check
node scripts/build-seven-candidate-rasters.mjs
node --test scripts/verify-seven-product-candidates.mjs
node --test scripts/verify-seven-visual-bounds.mjs
npm test
```

The source generator is intentionally restricted to `products/<slug>/candidates/foundation-v1`; canonical `products/<slug>/app-icon.svg` is not created or changed. The independent raster pipeline also only writes within the candidate subtree.

Validation covers XML parsing for all 42 SVGs, candidate status, accessible title/description, local-only embedded drawing, distinct app icons (including 16px raster hashes), width/height and alphabetic size of every raster, ICO frame offsets/sizes and SHA-256 manifest consistency. These checks **do not replace** manual contrast, high-zoom, light/dark, forced-colors, platform-native or trademark review.

## Next acceptance gates

1. Founder reviews visible candidates at true 16px, 32px, launcher and larger showcase sizes, considering distinction between products and the umbrella G.
2. Adjust shapes/colors/typography based on review, without changing the owner-approved design system or claiming existing product features.
3. Promote only specifically accepted designs to canonical product paths through a **separate** reviewed PR with stable hashes, backout strategy and rollout list.
4. Integrate the accepted revision into actual first-party consumers, including native icon bundles and web/PWA/ICO paths appropriate to each product.
5. Test real browser and device rendering, keyboard/screen-reader naming where appropriate, high contrast, light/dark modes, and minimum-size legibility; capture evidence.
6. Update central brand coverage and website icon status only after central approval and verified consumer use. Resolve Drive's separate existing-consumer identity provenance before calling it official.

**Do not close issue #24** based solely on creation of these candidate source files.


## November 12 — additional raster legibility safety gate

The new `verify-seven-visual-bounds.mjs` suite checks all seven products at
**true 16-pixel PNG size**: source-consistent transparent rounded corners,
opaque center, nonempty composition and minimum color variation. It also
renders both light/dark wordmarks and confirms content stays well inside
the 1100×170 viewBox (not clipped on any edge), and verifies conceptual
artwork fills its intended 1280×720 canvas.

These 28 tests are additive to the original source-integrity tests and are
included in `npm test` and `npm run candidates:seven:verify`. Pixel-density
and clipping smoke tests cannot establish human readability, color contrast,
legibility in all browsers/fonts, trademark safety, or founder approval.
All seven designs remain unapproved candidates at their existing paths;
no canonical/production consumer is changed.
