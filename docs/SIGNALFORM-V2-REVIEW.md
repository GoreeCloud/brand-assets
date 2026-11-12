# Signalform v2 — redesigned GoreeCloud product identities

**Status:** Seven original, unapproved redesign candidates. **No official logo, master, brand approval, favicon consumer, application or production deployment is changed.**

**Date:** November 12, 2026
**Review objective:** The founder rejected the earlier generic identity family and requested a **more distinctive, coordinated redesign** of all seven candidates. Keep the permanent founder-supplied GoreeCloud blue G and every established official product mark unchanged. Retain v1 files for direct comparison. Do not infer approval from code, icon tests or a preview.

## Creative direction — Signalform

A coordinated grammar of **deliberate continuous strokes, purposeful openings, soft rounded joins, measured negative space, and localized Lagoon/Iris/Sky hues**, on a common deep-navy rounded surface. The family has shared proportions without repeating one shield, pin, chart or dashboard frame across the products.

The source palette is experimental and **not** a new official GoreeCloud UI color-token specification. The approved design system continues to govern product interface behavior. Shapes are original procedural, hand-authored SVG paths; no external images, third-party marks, raster generation service, scripts, or web fonts.

| Identity | V1 concern | Redesigned V2 signature | Role / meaningful boundary |
| --- | --- | --- | --- |
| **GoreeShield** | Shield too similar to Wardveil | **Quiet Aperture** — two privacy shutters around a user-controlled central choice | **Privacy**, consent, minimization and control; not threat detection |
| **Wardveil** | Repeated shield with pulse | **Sentinel Sweep** — incomplete radar arc, sweep and detection trace | **Cybersecurity**, detection/monitoring/response; not consent governance |
| **GoreeCloud Mesh** | Ordinary four-point hub | **Interlock** — overlapping, deliberately crossing independent connections | **Integration**, bounded interoperability under GoreeShield and Wardveil controls |
| **GoreeCloud Maps** | Generic folded map plus pin | **Wayfinding Loop** — unique route geometry with origin and compass destination | Mapping and navigation; no deployed-feature claim |
| **GoreeCloud Projects** | UI screenshot-like Kanban board | **Milestone Ladder** — distinct stage cadence, one completed milestone | Work planning and coordination; not upstream Plane branding |
| **GoreeCloud Analytics** | Generic bars and trend line | **Insight Horizon** — ascending insight flow with sampled points and open orbit | Measurement and insights; no claim of active tracking |
| **GoreeCloud Gateway** | Both arrows pointed inward | **One-Way Passage** — portal with one unmistakable left-to-right path | Network edge/routing; no deployed-routing claim |

**Reviewer attention:** Evaluate especially whether the GoreeShield aperture reads as consent rather than a power button, whether Wardveil's sweep reads as defensive monitoring, whether Mesh's two connections clearly interlock, and whether the narrow Maps route remains comprehensible at 16 px. Identity distinctness is a human decision even when the file hashes differ.

## Deliverables (per product)

All V2 files are located at `products/<slug>/candidates/signalform-v2/`:

- Six source SVGs: `app-icon.svg`, `favicon.svg`, `symbol.svg`, `logo.svg`, `logo-dark.svg`, `artwork.svg`.
- `manifest.json` with source hashes, the explicit `approved: false` flag, role, distinctive design name and source authorship.
- Eight direct-source raster exports (16, 32, 48, 64, 128, 192, 256, 512 px), a four-frame ICO, and `raster/asset-index.json` with exact SHA-256 hashes and dimension/size metadata.

There are **42 editable SVGs, 56 PNGs, seven ICO files and 14 provenance manifests** across the seven products. The unchanged Foundation v1 proposals are retained in their own directories.

## Build, tests and source boundary

Rebuild only the designated V2 candidate tree; never write into the canonical brand masters or the V1 candidate directories.

```sh
python3 scripts/build-signalform-v2.py --check
node scripts/build-signalform-v2-rasters.mjs
node --test scripts/verify-signalform-v2.mjs
node --test scripts/verify-signalform-v2-visual.mjs
node --test scripts/verify-signalform-v2-boundary.mjs
npm test
```

Checks cover source determinism, XML/vector safety, title/description, candidate state, dimensions, ICO decoding, source/raster SHA-256, unique 16px graphics, 16px nonempty and alpha bounds, unclipped light/dark wordmarks and nonempty wide artwork. A **separate fixed-pin boundary test** verifies the exact permanent umbrella G PNG, the current GC UI/Browser/Search source icons, and all seven v1 candidate manifests remain byte-identical.

These automated validations do **not** constitute founder approval, product ownership/licensing verification, human legibility, WCAG contrast, assistive-tech acceptance, platform bundling, or production readiness.

## Selection and rollout gates

1. Compare V1 versus V2 at 16, 32 and 512 px, plus both wordmark variants on actual light/dark backgrounds and the artwork composition.
2. Request targeted shape revisions for any ambiguous roles. Obtain explicit founder acceptance separately for each product.
3. On acceptance, prepare **another PR** that intentionally promotes only accepted individual identity masters into central canonical product paths, with rollback notes and immutable source hashes.
4. Adopt accepted masters into their actual website/native/service consumers in separate reviewable changes. Test favicon, PWA, Android/iOS/desktop packages as applicable.
5. Confirm accessibility and product validation with real browser/device/manual checks; only then update the website official status and close corresponding brand-coverage gaps.

**Do not merge this candidate design PR into production or claim any seven are official merely because its CI is green.**
