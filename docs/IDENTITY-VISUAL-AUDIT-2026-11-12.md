# GoreeCloud — Product identity visual-quality audit

**Date:** November 12, 2026
**Audience:** Founder, GoreeCloud UI, maintainers of brand-assets and consumer projects
**Overall finding:** **FOUNDATION V1 REJECTED; SIGNALFORM V2 REJECTED.** Neither proposed family passes premium brand-identity quality. Automated raster/CI integrity success was incorrectly presented as if it established visual quality.

**Authority and scope:** This is an editorial quality assessment against the founder's November 12 feedback, the permanent blue GoreeCloud G, the current GoreeCloud UI design authority, and the source-owned product boundaries. It does **not** modify or approve official marks. It does not claim a formal trademark search or external independent branding consultancy review.

## Evidence examined

- Seven original Foundation v1 SVG app icons, transparent symbols, corresponding wordmarks and 16-pixel raster files.
- Seven Signalform v2 candidate SVG app icons, transparent symbols, corresponding wordmarks and 16-pixel raster files.
- Combined equal-scale **7 × 2** icon contact sheet rendered from the actual source SVGs, not screenshots of a hypothetical brand.
- Actual light/dark SVG wordmark renderings using the source-defined font fallbacks.
- Original founder-supplied permanent GoreeCloud G raster: a crisp cobalt outer ring / deep-blue control detail on a pale rounded tile. Dominant sampled colors approximately #3C82FA, #1450AA and #FAFAFF.
- The central design-system documentation, product identity responsibilities and brand-asset requirements.

The observed findings are editorial and qualitative; file hashes, programmatic anti-tampering and Chromium viewport tests remain separate **engineering** evidence.

## Rejection findings

| Criterion | Foundation v1 — rejected | Signalform v2 — rejected |
| --- | --- | --- |
| Recognizability | Mostly recognizable, but default shield/pin/Kanban/chart conventions rather than product identities | Several shapes ambiguous; the Privacy aperture resembles a power/toggle symbol, Mesh looks like untidy links, Analytics and Wardveil compete as unrelated sweeping lines |
| Distinctiveness | Shield repeated for both GoreeShield and Wardveil; many marks could be anonymous stock UI icons | Symbols are different but not ownable or coherent; loops and arcs feel assembled rather than purposefully drawn |
| Craft and geometry | Heavy outlines, inset details, repetitive frames and inconsistent negative space | Irregular overlaps, crowded intersections, excessive round-ended strokes, and unequal optical weight |
| System quality | Same navy tile and generic lavender/teal decoration applied indiscriminately | Same navy tile, lavender/teal palette and arbitrary lower-left decorative dash on every mark; the dash adds no semantic or brand meaning |
| Small-size use | Shield interior toggle, multi-node Mesh, chart/card details often collapse at 16 pixels | Fine crossing and overlapping details merge into noisy shapes; distinct hashes are not visual legibility |
| Brand relationship | Palette and composition poorly reflect the permanent founder-approved cobalt G and light icon tile | Same mismatch, plus the v2 abstract forms remove recognizable product purpose |
| Wordmarks and art | Labels such as 'DESIGN CANDIDATE' baked into wordmarks are not usable production lockups; illustration resembles generic dashboard mockups | Repeated generic pseudo-dashboard art rather than an identifiable product visual language |
| Verification honesty | Automated CI measured file correctness, not aesthetic quality | Same category error; browser rendering success did not establish design acceptance |

**Decision:** Neither V1 nor V2 should be merged into canonical masters, represented as an approved product identity, used as a first-party favicon, or shown as the recommended founder-facing design. Existing preview links are **historical rejected experiments**, not current visual proposals.

## Product-specific critique

| Product | Foundation V1 weakness | Signalform V2 weakness | Required premium redesign direction |
| --- | --- | --- | --- |
| GoreeShield / privacy | Generic double shield; toggle crowded | Aperture resembles power/volume, lacks privacy meaning | A sophisticated selective-visibility or control mark, not a security monitoring clone |
| Wardveil / cybersecurity | Repeats same shield silhouette | Unbalanced radar ring with multiple crossing lines | A distinct, confidently weighted defensive emblem with no privacy-shield duplication |
| GoreeCloud Mesh / integration | Basic four-node generic network | Untidy crossing linked loops | Minimal clearly bounded but interoperable visual with intentional over/under order |
| GoreeCloud Maps | Standard folded map and pin | Ambiguous meander and tiny arrow | A clean, legible direction mark with a distinctive spatial signature |
| GoreeCloud Projects | Looks like small Kanban screenshot | Resembles three generic checklist bars | A memorable project/milestone signifier with reduced details |
| GoreeCloud Analytics | Default chart inside a rectangle | Incomplete arc, small dots and ambiguous path | Strong insight silhouette that survives real 16px display |
| GoreeCloud Gateway | Inward arrows contradict routing | Oversized arch with crowded crossing arrow | One unmistakable directional passage, optically centered |

## Pre-presentation acceptance standard (new)

A future proposed family can be presented as a *visually qualified candidate* only after independent critical inspection and written evidence for **all** of the following, and none can be inferred from CI:

1. **Brand connection:** calibrated from the founder's actual permanent GoreeCloud G; light/dark materials derived from verified GC UI roles, not invented official tokens.
2. **Distinctive shape:** seven product symbols must be individually memorable and cannot primarily look like stock clipart, basic ASCII letters, generic UI icons or arbitrary decorative geometry.
3. **Semantic differentiation:** GoreeShield represents privacy/consent; Wardveil cybersecurity; Mesh controlled integration; other product boundaries remain clear.
4. **Optical precision:** consistent stroke/space system, deliberate negative space, centered visual mass, alignment, corner radii, and high-resolution quality without arbitrary flourishes.
5. **Scale:** inspect actual icon rasters at **16, 24, 32, 48, 128 and 512 pixels**. Verify at native size first; magnification only helps diagnose the failure.
6. **Typography and lockup:** custom-proportioned symbol and readable name; genuine light/dark variants; no 'candidate' or other review metadata baked into the wordmark artwork.
7. **Consistency under conditions:** light and dark backgrounds, high contrast, zoom/reduced motion, realistic favicons and PWA/native cropping and anti-aliasing.
8. **Independent human art direction:** a recorded visual critique with outstanding issues addressed *before* external preview, distinct from automated test success. Founder retains explicit final approval authority.

The internal target is at least **4/5 on every** clarity, distinctiveness, aesthetics, coherence, small-size and lockup criterion, with **no identified critical defect**. These scores are visual reviewer judgments, not machine-derived statistical confidence. Any failed criterion must be reported as failed and blocks presenting the family as premium.

## Internal third-direction study (NOT presented or approved)

An internal uncommitted Cobalt v3 study tested a light-tile, official-color-aligned, one/two-tone direction with substantially simpler symbols and Inter wordmarks. **The study is still not qualified for presentation**: the 16px Analytics path collapsed (then was replaced with pillars), the Gateway arch/arrow needs further optical checks, and multiple symbols—including Wardveil's plain W and Maps' generic pin—remain insufficiently distinctive. A later Mesh crossing improved alignment but still requires a stronger product-specific visual language.

**Do not publish or promote this experiment on a source-integrity pass alone.** Retain working proofs locally until editorial review is complete. The issue is not primarily a lack of tests, but a need for stronger human-led art direction.

## Release / change safeguards

- All seven official identity slots continue to be **MISSING or pending** as previously verified, even if working SVG candidates exist.
- Keep the permanent GoreeCloud umbrella logo, GC UI identity, approved Browser/Search sources, v1/v2 candidate sources and existing consumers unchanged.
- Hold all existing proposal PRs in Draft and annotate them as **founder visually rejected**, without rewriting their historical evidence.
- No new production deployment, DNS changes, favicon replacement, public source promotion or first-party consumer rollout.
- The next proposal requires a completed visual audit *before* any new founder-facing comparison site is deployed.

**Status:** Visual-quality incident documented; active design corrections required. Brand coverage issue #24 remains open.
