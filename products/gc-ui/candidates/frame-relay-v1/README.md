# GoreeCloud UI — Frame Relay (rejected design archive)

**Status: REJECTED BY FOUNDER — November 15, 2026. ARCHIVED, NOT FOR ADOPTION.** The founder reviewed the rendered concept and said it looked absolutely terrible. This vector family is a failed design experiment; do not show it as an active candidate, revive it through a status change, use it as a source for new deliverables, generate platform derivatives, or migrate any consumer to it. Authored November 15, 2026, in direct response to the request to revamp the GoreeCloud UI icon, favicon and artwork **without generating or displaying images in the chat**.

## Source and identity boundary

The authoritative graphic library is `GoreeCloud/brand-assets`; the application design-language authority remains `GoreeCloud/gc-ui`. The November 11 founder identity clarification explicitly requires a brand-new product mark distinct from the permanent GoreeCloud blue circular-G umbrella logo. The November 6 **Aperture Weave** identity is historically founder-approved but superseded as a *future direction*; it remains the current interim master and should not be edited or silently replaced.

This folder contains original **hand-authored, self-contained SVG source**. It does not contain copied/predecessor imagery, an image-model output, fetched stock graphics, externally loaded fonts, scripts or network references. All colors are **candidate art treatments**, not newly approved global GoreeCloud palette tokens.

## Historical concept — why it failed the premium design test

The rejected **Frame Relay** composition uses three offset open window boundaries and colored rectangles that did not meet the founder's expectations for originality, polish and premium visual identity. It was a mechanical translation of the Canvas/Surface/Lens vocabulary into basic shapes, rather than a compelling, distinctive brand mark. The system-font wordmarks and diagram-like artwork did not resolve that shortcoming. The historical rationale was: Its deliberately visible center is a **clear reading area**. The relationship is rooted in the approved materials model:

- **Canvas:** the stable left/top structural frame providing workspace context.
- **Surface:** a second, offset right-hand frame representing legible information.
- **Lens:** a compact open central boundary representing a nearby focused action without obstructing the reading area.

The icon is flat, geometry-led and legible by silhouette. Its interior is intentionally open; there are no gratuitous stars, pixel particles, faux 3D, complex gradients or fake live services. The standalone symbol supports light surfaces, while the app icon/favicon use a deep-slate field so the light candidate art colors remain visible. The light/dark wordmarks retain the explicitly named **GoreeCloud UI** product and do not substitute the umbrella mark. The art study is a concept, **not a screenshot or functional product demonstration**.

## Archived original assets — not for use

| Source | Intended use | Review requirement |
| --- | --- | --- |
| `symbol.svg` | Transparent standalone symbol | Inspect on light/dark backgrounds and at small sizes |
| `app-icon.svg` | Square launcher/desktop tile master | Inspect 16–512px, adaptive masking and platform packaging |
| `favicon.svg` | Product-specific browser favicon source | Inspect at 16/24/32px, active tabs and light/dark browser chrome |
| `logo-light.svg` | Wordmark for light surfaces | Inspect visual balance, typography fallback and contrast |
| `logo-dark.svg` | Wordmark for dark surfaces | Inspect visual balance, typography fallback and contrast |
| `artwork.svg` | Purposeful Canvas/Surface/Lens identity study | Inspect desktop/mobile cropping, contrast and truthful caption |

`manifest.json` pins each vector to a Git blob and byte length. The companion verifier rejects missing/modified sources, active or external SVG content, and any unintended changes to the permanent umbrella identity (which remains checked by existing CI). Source-integrity checks do **not** certify attractive rendering, optical quality, browser support, or accessibility acceptance.

The candidate validator also checks a strict static SVG element set and parses intrinsic SVG metadata with the already-pinned Sharp dependency **without producing an image file**. Source parsing does not replace visual, browser or tiny-size acceptance.

## Review locally without showing images in this chat

The [REJECTED archive review page](review.html) references the six checked-in SVG files directly and includes 16/24/32/64px favicon samples, light/dark wordmark contexts and the conceptual artwork. No embedded raster, generated chat image, third-party request or script is needed.

To inspect on an authorized machine, clone or update GoreeCloud/brand-assets and run the purpose-built, **loopback-only, read-only** review server from the repository root:

    cd brand-assets
    node scripts/gc-ui-candidate-review-server.mjs
    # Open http://127.0.0.1:8766/review.html in a local browser.
    # Press Ctrl+C to stop; choose another port with --port 8770.

This Node.js server has no installation dependencies for the preview, binds only to 127.0.0.1, and serves just the review HTML and six candidate SVG files. Requests for manifests, other repository files, path traversal and state-changing HTTP methods are rejected. Responses enforce CSP, no-store, no-sniff, same-origin resource policy and no referrer. Its integration tests check these properties. This is a **rejected-source archive inspection tool**, not an active candidate, externally hosted release or approval.

## Rejection enforcement and future redesign

1. **Stop all Frame Relay promotion.** Its rejection is final for this version; retain original bytes and hashes for history. Do not display or generate images in this conversation.
2. Start any future GoreeCloud UI identity as a **new and separate concept**, with an original visual rationale and founder review before preparing platform variants. Do not spend time on 16px favicon exports or platform packaging for the rejected design.
3. The founder's decision for this version is **rejected**, recorded in `manifest.json` and issue #18. A future concept requires a new candidate ID, independent review and explicit approval.
4. Only **after separate approval of a different concept**, produce platform derivatives; preserve the historical Aperture Weave masters and immutable umbrella PNG.
5. Never adopt assets from this archived Frame Relay folder in `GoreeCloud/gc-ui` or other consumers. Later migration must reference a separately approved design with exact revision/hash pins and independent QA.
6. Update canonical Drive documentation **only after verified promotion**, not ahead of founder acceptance. No website or native deployment is implied.

**New design brief:** [GoreeCloud UI replacement identity criteria](../../REPLACEMENT-IDENTITY-DESIGN-BRIEF.md).

**Open issues:** [central new-identity requirement #18](https://github.com/GoreeCloud/brand-assets/issues/18); [GoreeCloud UI visual acceptance #7](https://github.com/GoreeCloud/gc-ui/issues/7).

## Rights and provenance

New SVG paths, compositions and descriptive text in this folder are original work for the GoreeCloud project; no third-party fonts or artwork have been incorporated. This repository's public visibility and package metadata do not, by themselves, grant an external trademark license or change the rights to the GoreeCloud name, official umbrella symbol or previously approved artwork. Preserve the original source history and applicable author attribution/provenance.
