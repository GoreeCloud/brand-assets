# Browser Mobile identity exploration — browser-tabs design audit

**Status:** Founder-directed visual exploration. All assets remain **unapproved candidates**. The current canonical icon, Android source and installed application are unchanged by this draft.

## Current visual revision — Prism Tabs v4

The founder reported additional visual/UI issues in v3 without specifying which elements, so this is an **independent design audit**, not a claim that the founder endorsed the fixes.

![Prism Tabs v4 color candidate](prism-tabs-v4.svg)

**[Prism Tabs v4 · revised app icon](prism-tabs-v4.svg)** — [transparent foreground](prism-tabs-v4-symbol.svg) — [monochrome feasibility study](prism-tabs-v4-monochrome.svg)

V4 addresses the most visible issues found when comparing v3 at 128px, 48px, 32px and 24px:

| Issue observed in v3 | V4 design response |
| --- | --- |
| Active tab looked like a raised handle over a dark suitcase-shaped box | Reduced the top-cap height relative to browser body, positioned tabs on a common rail and used a brighter translucent viewport |
| Inconsistent visual weight: pale caps against a heavy dark panel | Balanced Iris/Lagoon caps, lighter glass body and an integrated rim |
| Too much empty or accidental decoration below the browser chrome | Removed the wave/sketch stroke entirely; kept a quiet diffuse glass glow |
| Address bar read like a floating bright sticker | Integrated a more proportionate rounded address capsule with a subdued search indicator |
| Background tabs were too close together and merged at small sizes | Shifted and elevated the inactive caps; increased their height so the three-tab hierarchy lasts longer as the icon shrinks |
| Three-dimensional polish lacked a clear hierarchy | Used one selected Lagoon tab, two quieter background tabs, and less competing internal detail |

**Evidence and limits:** The color v3/v4 SVGs were rendered locally at **128px, 48px, 32px and 24px**, using pinned `sharp`; transparent and monochrome v4 sources were also rasterized at those sizes. The color design remains coherent at 128/48px and the address bar is readable at 32px; three-way tab separation and fine details are still challenging at 24px. The monochrome study is **not ready** for Android themed icons: when small, its cap outlines still resemble a compact box. The artwork's adaptive-mask safety and real launcher/header rendering have **not** been verified. No generated preview PNG is committed. No image-generation service, external icon or fonts are used.

This revision is intended for the founder to critique. Passing source checks does not establish aesthetic acceptance or license promotion to the existing Android app.


## Previous direction — Prism Tabs v3 (preserved for comparison)

On November 6, 2026, the founder clarified that Prism Tabs v2 looks like a **notepad or sketch icon**, not a browser. The next iteration must read as **real browser tabs**. Version 3 responds by changing the underlying silhouette—not just the finish.

![Prism Tabs v3 browser tab strip candidate](prism-tabs-v3.svg)

**[Prism Tabs v3 · full-color app icon](prism-tabs-v3.svg)**

The new arrangement has three visible curved tab caps at the top, distinct inactive Iris/cobalt tabs, one selected Lagoon tab that joins a single browser canvas, a legible URL/address capsule beneath the tabs, and a deliberate empty viewing area. The notebook-like wavy page mark from v1/v2 is removed. The design uses the established Iris / Lagoon / navy direction without external artwork, scripts or fonts.

### Source studies

- [Prism Tabs v3 — full-color icon](prism-tabs-v3.svg): **previous candidate, now superseded by v4**.
- [Prism Tabs v3 — transparent foreground](prism-tabs-v3-symbol.svg): a candidate header/adaptive-icon glyph without the outer tile.
- [Prism Tabs v3 — monochrome study](prism-tabs-v3-monochrome.svg): early Android themed-icon feasibility artwork. **Needs further development**; the overlapping cap outlines lose separation at small sizes and this is not an approved themed icon.
- [Prism Tabs v2](prism-tabs-v2.svg), [v2 transparent](prism-tabs-v2-symbol.svg), [v2 monochrome](prism-tabs-v2-monochrome.svg), [Prism Tabs v1](prism-tabs.svg): retained for provenance and direct comparison, **not preferred**.
- [Aurora Horizon](aurora-horizon.svg) and [Facet Portal](facet-portal.svg): first-round alternatives retained, but the founder asked to continue improving Prism Tabs.

### Practical design review

The color v2 and v3 source SVGs were rendered locally with the pinned `sharp` dependency at **128px, 48px and 32px**. V3 retains the active/inactive tab distinction at 128/48px and the tab-strip silhouette and address bar remain visible at 32px. Transparent and monochrome v3 studies were also rendered at those sizes. The monochrome study is **not** visually accepted; small-sized contours still need adjustment. No raster review files are committed, and no AI image-generation service is used.

These are source-only candidate graphics. This internal legibility check is not founder aesthetic approval, Android adaptive-mask verification, accessibility acceptance, app installation or a Stable product release.

## Acceptance gates

1. Founder reviews the v4 **browser-tab silhouette** and confirms whether it is sufficiently browser-like or requests another revision.
2. Refine the monochrome foreground; test Android mask/theme behavior with real launcher renders at 24/32/48/128px and light/dark modes.
3. Design a coordinated central **master icon, transparent header symbol, and light/dark wordmarks** from the accepted geometry. Preserve original and rejected work in git history.
4. Pin the approved central identity in `GoreeCloud/browser-mobile`, implement adaptive/monochrome launcher and header vectors, then run Android builds, unit tests, Lint and actual-device visual inspection.
5. Only after verified founder acceptance promote to canonical brand sources and synchronize the required project records. Do not merge this draft merely because CI checks pass.

**Explicit boundary:** This branch and PR must remain draft and unmerged. No existing icon or production artwork is overwritten by this exploration.
