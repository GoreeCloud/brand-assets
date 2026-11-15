# GoreeCloud UI — Replacement identity design brief (after Frame Relay rejection)

**Owner:** GoreeCloud founder  
**Date:** November 15, 2026  
**Status:** Design discovery and evaluation criteria only; **no approved replacement, vector artwork, raster assets, favicon, wordmark, website cutover or native deployment**.

## Founder decision and current identity

On November 15, 2026, the founder reviewed **Frame Relay v1** and said: **"That looks absolutely terrible."** This is an explicit rejection of that design family, not a request to tweak its colors. Archive the six SVGs and their manifest without deleting Git history; prohibit any future promotion, rebranding, derivative generation or consumer migration from that version. Reconsider the design from first principles, **not** as Frame Relay v2.

The current approved, source-pinned GoreeCloud UI icon/wordmark/artwork remains the earlier November 6 Aperture Weave, used as the **interim active product identity only**. A distinct *new* GoreeCloud UI identity is still requested. The permanent, founder-provided GoreeCloud **umbrella blue circular-G** must remain unchanged and must never be conflated with this product-specific identity.

The founder separately instructed: **"Do not generate any images here."** Preserve this instruction throughout this design conversation. A later deliberate off-chat visual design/inspection workflow is not permission to generate or post images here.

## Diagnosis — what failed in Frame Relay

Source inspection and founder rejection support these findings:

- The new mark simply illustrated three literal material concepts using **three offset, rounded colored frame paths**, rather than an ownable, instantly recognizable symbol.
- The dark rounded-square app tile and violet/teal/white treatment made the icon look like generic developer-tool branding; this is a design assessment, **not** a verified trademark or market-uniqueness claim.
- The wordmarks relied on generic system text without a demonstrable custom wordmark rhythm, letter-shaping, or optical relationship to the symbol.
- The interface artwork was a formulaic block-and-label composition explaining Cloud Canvas, Surface and Lens, rather than original, emotionally compelling product artwork.
- Integrity checks confirmed source safety, not design merit. Passing SVG metadata parsing, hash tests and graphic-color contrast checks cannot imply the founder considers the visual result premium.
- The project incorrectly moved to a fully scripted family of six assets before testing **one strong core symbol** with the founder.

These are qualitative observations and process corrections, not newly approved colors, icon dimensions, typography, or layout tokens.

## Mandatory direction for the next concept

1. **Design the idea before drawing the icon.** Define a concise brand thesis, what GoreeCloud UI uniquely represents, its relationship to the umbrella, and why its visual identity should be recognizable without words.
2. **Do not recycle the rejected frame motif.** Do not use three nested/offset open-window paths, small blocks standing in for Canvas/Surface/Lens, a generic cube, a generic shield, an orbit of gradient blobs, borrowed symbols, or decorative effects that merely simulate premium quality.
3. **Commit to a distinctive silhouette.** Evaluate the primary mark in one color first, with its shape and negative space clear at favicon sizes. Color should be purposeful and subordinate to the symbol. No new compulsory GoreeCloud palette is authorized by this brief.
4. **Design real typography.** A wordmark needs deliberate proportions, tracking, optical alignment and credible standalone typography. A default system-font label next to a symbol is not enough for final approval.
5. **Treat browser favicon, launcher and artwork as different design problems.** A 16px favicon may require a specifically simplified optical master; a launcher tile needs balanced shape and masking; artwork needs conceptual substance beyond diagrammatic UI rectangles.
6. **Keep every other GoreeCloud product distinct.** Check GoreeShield (privacy), Wardveil (cybersecurity), GoreeCloud Mesh (integration), and the permanent umbrella mark for possible confusion, without redefining their identities.
7. **Use verified GoreeCloud UI foundations.** Honor existing approved design language and platform accessibility requirements. Sophistication must survive light/dark contexts, high zoom, reduced motion, contrast, and various device sizes.
8. **No images in chat.** All discussion, planning and approvals can begin as text; original visual proposals should be inspected only through an explicitly authorized separate design workflow when appropriate.

## Evaluation and approval gates

| Gate | Pass criterion | Current status |
| --- | --- | --- |
| A. Founder design critique | Frame Relay explicitly rejected; failure recorded, original sources preserved | **Completed for rejection** |
| B. New design rationale | A distinct visual thesis with reasons it is unique to GoreeCloud UI; compare against known GoreeCloud products | **Not started** |
| C. Core-mark exploration | Deliberate visual concepts evaluated for originality, silhouette and wordmark potential; no reuse of rejected Frame Relay forms | **Not started** |
| D. Founder review | Actual visual presentation, explicit accept/revise/reject decision and exact candidate identifier; **do not infer approval from a generic continuation request** | **Required** |
| E. Access and compatibility | Browser-size favicon checks at 16/24/32px, light/dark contrast, high zoom, packaging, launcher mask and native app tests | **Blocked on D** |
| F. Final asset source | New separate identity masters, PNG/ICO derivatives, provenance, source hashes, security and rendering CI | **Blocked on D** |
| G. Product adoption | Independently verified migration PRs for `gc-ui`, websites and authorized consumers, with rollback and unchanged umbrella | **Blocked on D–F** |

For each visual concept, a designer must be able to explain **why this exact shape** belongs to GoreeCloud UI, what distinguishes it from the umbrella logo and common app-logo conventions, and what remains legible when reduced to 16px. Reject concepts that sound coherent in a written explanation but look generic in actual rendering.

## Repositories and risk boundaries

- **Central brand authority:** `GoreeCloud/brand-assets`. Archive at `products/gc-ui/candidates/frame-relay-v1/`; machine-readable `manifest.json` must say `founder-rejected-archived`, `founderAcceptance=rejected`, `rollout.stage=blocked-rejected`. Immutable historical vector hashes remain.
- **Consumer design authority:** `GoreeCloud/gc-ui`. Keep active historical Aperture Weave hashes and `lab/index.html` references unchanged until a *different* design is explicitly approved.
- **Tracking:** [Brand issue #18](https://github.com/GoreeCloud/brand-assets/issues/18) remains open for an *entirely new* replacement design; [GC UI visual acceptance issue #7](https://github.com/GoreeCloud/gc-ui/issues/7) stays open. Update Todoist approval and rollout dependencies only with verified progress.
- **Never claim:** rejected Frame Relay represents the new direction, failed visual approval is a pass, source tests validate premium quality, or a local preview constitutes a release.

This brief is an evaluation foundation, **not a new aesthetic specification or an approved visual design**.
