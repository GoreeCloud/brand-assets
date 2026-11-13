# Premium product identity — source, human review and adoption gates

**Status:** Engineering acceptance process, not a logo selection or authorization to deploy.
**Current founder direction:** Neither Foundation v1 nor Signalform v2 meets the requested premium identity standard; both remain rejected. No candidate is official.

## Why the previous approach was insufficient

A generated PNG, a valid SVG, a stable favicon hash and a successful Chrome screenshot are necessary technical evidence, but do **not** demonstrate artistic quality. Previous releases of the brand proposal incorrectly used that evidence as if it supported a premium-quality conclusion.

Every proposed family must instead pass distinct stages:

| Stage | Evidence | Can an automated test grant passage? |
| --- | --- | --- |
| 0 — Source and trust | Original SVG source, provenance, explicit candidate state; no third-party imports or external scripts | Yes, technical verification only |
| 1 — Native-size behavior | Real 16/24/32/48/128/512px icons on light and dark surfaces; lockups; diagnostics | Automated exports, **human judgment required** |
| 2 — Human art direction | Seven product-specific reviews, six rated dimensions, named reviewer and written observations; no unresolved critical defects | Only records **completeness**; scores are human decisions |
| 3 — Founder preview | Internally reviewed artifacts may be shown to the founder without suggesting approval or functionality | Never purely automated |
| 4 — Founder approval | Actual explicit acceptance of each chosen visual identity (source/revision) | **Cannot be established by a repository JSON flag** |
| 5 — Official master promotion | Deliberately approved canonical asset changes, source SHA pins, provenance, technical validation and rollback | Requires separate founder-approved change and human review |
| 6 — Consumer adoption | Real web/favicon/PWA/Android/desktop sources and actual native/device test results | Product dependent; deployment evidence required |

The first four are approval/quality boundaries, not GitHub green-check milestones.

## New objective quality evidence

Run the local/offline tool:

```sh
npm ci
npm run visual:kit -- --family signalform-v2 --out /tmp/goreecloud-review-unique-directory
```

Outputs are locally generated, not uploaded automatically. The requested destination must not exist, preventing silent overwrites. The kit produces:

- Five visual proof sheets: actual-size icons on **light and dark** surfaces, an enlarged **16px diagnostic** with nearest-neighbor scaling, simultaneous light/dark wordmarks, and simulated square/round-rectangle/circular launcher crops (not native package verification).
- A source-pinned `audit-data.json` identifying the candidate family, original source hashes, bounded symbol geometry, optical centroid estimates, native raster opacity and warnings.
- Seven sets of actual-size PNGs at **16, 24, 32, 48, 128 and 512 pixels**, allowing reviewers to inspect unscaled outputs.
- A seven-product `manual-review-template.json` with all numeric ratings `null`, status pending, no implied founder approval and fields for substantive reviewer findings.

The metrics cannot assert originality, aesthetics, uniqueness of an abstract mark, user comprehension or trademark freedom. A warning-free report is **not** an accepted logo.

## Human visual scorecard

Use the generated private template to record separate **1–5** ratings for each product's recognizability, distinctiveness, optical craft, brand coherence, native small-size legibility and wordmark. Each field must be **4 or 5**, there must be substantive observations, no unresolved critical defects and a recorded actual reviewer before internal qualification.

```sh
node scripts/validate-visual-scorecard.mjs --file /path/to/completed-manual-review.json
```

This validation checks **record completeness** only. It cannot know that somebody actually looked at the graphics and cannot authenticate the reviewer's identity. Founder acceptance must come from an explicit real approval outside this CLI, not from hand-editing a JSON flag. The validator intentionally refuses its `--official` mode.

## Repository promotion guard

The seven frozen subject products are GoreeShield, Wardveil, GoreeCloud Mesh, GoreeCloud Maps, GoreeCloud Projects, GoreeCloud Analytics and GoreeCloud Gateway. The protected source paths are:

- Existing permanent umbrella logo and verified GC UI/Browser/Search masters.
- All seven products' historical `candidates/foundation-v1/` and `candidates/signalform-v2/` evidence.
- Every non-candidate **canonical product asset** path under the seven products.

The PR workflow runs:

```sh
node scripts/verify-identity-promotion-guard.mjs --base <40-character-Git-base-SHA>
```

The guard inspects changed Git paths and current review status. A newly proposed identity is permitted **only** within a separate versioned `candidates/<new-family>/` directory with a manifest saying `approved: false`. Existing rejected sources and canonical assets cannot be replaced or silently promoted through these PRs.

This is a **repository maintenance safeguard**, not a substitute for protected branches, authenticated owner review, signature/provenance validation or native consumer tests. In a future approved promotion, the guard requires a deliberately reviewed policy change; updating a version number alone cannot convey founder consent.

## Current source of truth and next priority

1. Keep V1/V2 marked **rejected** in `docs/identity-visual-review-status.json`; preserve the historical PR source.
2. Treat uncommitted explorations as private experiments, **not** new approved brand names or marks.
3. Improve the actual shape semantics, optical spacing and originality first, with native-size proof and a written editorial review.
4. Only surface a revised proposal to the founder when the art-directed quality audit has been completed; do not deploy a fresh comparison preview merely because CI passes.
5. Preserve existing production, DNS, official sources and adopted icons until a specific approved consumer rollout is verified.

**Four distinct GoreeCloud responsibilities remain unchanged:** GoreeShield = privacy, Wardveil = cybersecurity, GoreeCloud Mesh = integration, GoreeCloud UI = visual/interaction design authority. Product-specific colors may differ; no hue is a mandatory global application theme.


### Platform icon caveats

Apple's [current app-icon guidance](https://developer.apple.com/design/human-interface-guidelines/app-icons)
emphasizes a unique readable concept, simple shapes, centered content, system
masking and crisp vector source. It cautions against overly detailed or
UI-screenshot-derived symbols. Android's [adaptive icon documentation](https://developer.android.com/develop/ui/compose/system/icon_design_adaptive)
requires separate foreground/background layers and a 66×66 safe zone inside
a 108×108 source area. The review kit's mask montages are only optical
**simulations**; a pre-rounded 512px SVG tile is NOT evidence of a valid
Android adaptive icon or modern iOS layered icon. Actual platform-targeted
exports remain a separate accepted-master rollout deliverable.
