# GoreeCloud UI — Frame Relay identity refresh candidate

**Status:** Proposed source concept only; **not founder-approved, official, deployed, or adopted by any consumer**. Authored November 15, 2026, in direct response to the request to revamp the GoreeCloud UI icon, favicon and artwork **without generating or displaying images in the chat**.

## Source and identity boundary

The authoritative graphic library is `GoreeCloud/brand-assets`; the application design-language authority remains `GoreeCloud/gc-ui`. The November 11 founder identity clarification explicitly requires a brand-new product mark distinct from the permanent GoreeCloud blue circular-G umbrella logo. The November 6 **Aperture Weave** identity is historically founder-approved but superseded as a *future direction*; it remains the current interim master and should not be edited or silently replaced.

This folder contains original **hand-authored, self-contained SVG source**. It does not contain copied/predecessor imagery, an image-model output, fetched stock graphics, externally loaded fonts, scripts or network references. All colors are **candidate art treatments**, not newly approved global GoreeCloud palette tokens.

## Concept: a working interface, not an abstract badge

The **Frame Relay** mark uses three offset open window boundaries, rather than a generic letter G, cube, orbit, gradient blob or shield. Its deliberately visible center is a **clear reading area**. The relationship is rooted in the approved materials model:

- **Canvas:** the stable left/top structural frame providing workspace context.
- **Surface:** a second, offset right-hand frame representing legible information.
- **Lens:** a compact open central boundary representing a nearby focused action without obstructing the reading area.

The icon is flat, geometry-led and legible by silhouette. Its interior is intentionally open; there are no gratuitous stars, pixel particles, faux 3D, complex gradients or fake live services. The standalone symbol supports light surfaces, while the app icon/favicon use a deep-slate field so the light candidate art colors remain visible. The light/dark wordmarks retain the explicitly named **GoreeCloud UI** product and do not substitute the umbrella mark. The art study is a concept, **not a screenshot or functional product demonstration**.

## Candidate assets

| Source | Intended use | Review requirement |
| --- | --- | --- |
| `symbol.svg` | Transparent standalone symbol | Inspect on light/dark backgrounds and at small sizes |
| `app-icon.svg` | Square launcher/desktop tile master | Inspect 16–512px, adaptive masking and platform packaging |
| `favicon.svg` | Product-specific browser favicon source | Inspect at 16/24/32px, active tabs and light/dark browser chrome |
| `logo-light.svg` | Wordmark for light surfaces | Inspect visual balance, typography fallback and contrast |
| `logo-dark.svg` | Wordmark for dark surfaces | Inspect visual balance, typography fallback and contrast |
| `artwork.svg` | Purposeful Canvas/Surface/Lens identity study | Inspect desktop/mobile cropping, contrast and truthful caption |

`manifest.json` pins each vector to a Git blob and byte length. The companion verifier rejects missing/modified sources, active or external SVG content, and any unintended changes to the permanent umbrella identity (which remains checked by existing CI). Source-integrity checks do **not** certify attractive rendering, optical quality, browser support, or accessibility acceptance.

## Deliberate no-cutover procedure

1. Review the six actual SVG files as source and rendered on a **local authorized development system**. Do not display or generate images in this conversation.
2. Test actual 16px favicon legibility, white/dark backgrounds, contrast, forced colors, high zoom, raster derivative exports, browser cache, PWA manifest, and native packaging.
3. Request the founder's **explicit visual decision**; record the exact candidate/version and any revisions. Until then, status stays `proposed-unapproved-source-only`.
4. After approval, publish final masters and **reproducible** PNG/ICO derivatives in this central repository, preserving the historical Aperture Weave masters and immutable original umbrella PNG.
5. Update `GoreeCloud/gc-ui` and any other authorized consumers using exact revision/hash-pinned copies; run their own UI/identity, high-zoom, performance, favicon and accessibility checks. Roll back by reverting their consumer-specific adoption PR if necessary.
6. Update canonical Drive documentation **only after verified promotion**, not ahead of founder acceptance. No website or native deployment is implied.

**Open issues:** [central new-identity requirement #18](https://github.com/GoreeCloud/brand-assets/issues/18); [GoreeCloud UI visual acceptance #7](https://github.com/GoreeCloud/gc-ui/issues/7).

## Rights and provenance

New SVG paths, compositions and descriptive text in this folder are original work for the GoreeCloud project; no third-party fonts or artwork have been incorporated. This repository's public visibility and package metadata do not, by themselves, grant an external trademark license or change the rights to the GoreeCloud name, official umbrella symbol or previously approved artwork. Preserve the original source history and applicable author attribution/provenance.
