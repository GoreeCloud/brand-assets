# Licensing scope and asset-rights inventory

**Status:** Source and documentation license selected; official artwork and mark copyright grants require separate rights verification. This is a rights assessment and inventory, **not** an assertion that the entire visual library is cleared for external redistribution.

## Root license: Apache-2.0, with explicit asset exclusions

The [root Apache License 2.0](../LICENSE) applies to the copyright interests GoreeCloud controls in this repository's original **software and non-graphical materials**: `scripts/` source, configuration, validation/testing programs, GitHub workflow definitions, and original written documentation (including README and project guidance). It does not grant rights beyond the author's actual ownership, override upstream contributions, or replace existing third-party license obligations.

**Visual brand assets are not covered by that Apache-2.0 grant solely because they are present in this repository.** Until a documented asset-specific grant has been adopted, do not assume public visibility permits external reproduction, modification or redistribution of official icons, wordmarks, logos, illustrations, wallpapers, vector candidates, or their PNG/ICO/WebP derivatives. Consumers within the verified GoreeCloud ecosystem should continue to use source-pinned, appropriately authorized copies under existing product/brand governance; such reuse is not a blanket public license.

Separate trademark and false-endorsement restrictions apply to the GoreeCloud name, official umbrella circle-G mark, the GoreeCloud UI identity and product marks. Apache-2.0 Section 6 does not convey trademark permission. An eventual open copyright license for eligible artwork would not itself grant trademark rights.

## Source groups and evidence boundaries

| Source group | Verified source/provenance | Current external copyright grant |
| --- | --- | --- |
| `scripts/`, `.github/workflows/`, original `docs/` and Markdown | GoreeCloud-authored source/recorded operational prose, with Git history and pinned validation | Apache-2.0 to extent rights are controlled by GoreeCloud; separate original/third-party excerpts remain subject to their rights |
| `brand/goreecloud/profile-logo-1024.png` | Exact **founder-supplied** permanent 41,682-byte PNG, SHA-256 `ac5c76fda60abbf5fc65957b18a3b4053dccb4b3cb42687dcd0bb428709c69e8`, original Git blob `ce1a975bd0500bc7f79386926decb1be3523b992` | No new public copyright or trademark license granted here; founder must verify rights and intended reuse terms |
| `brand/goreecloud/logo.svg`, `app-icon.svg`, `favicon.svg`, `raster/`, `artwork/` | Vector approximations, direct raster derivatives and supporting art derived from the permanent official source; [master and source verification](../brand/goreecloud/README.md) | Same unresolved public artwork/mark rights; source fidelity does not create redistribution permission |
| `products/gc-ui/` | Previously approved Aperture Weave vectors and source-pinned rasters; later rejected Frame Relay **historical experiment** also retained; GC UI's new design remains pending | No new graphic copyright or trademark grant; rejected archival content is never approved for product adoption |
| `products/browser/`, `products/browser-mobile/` | Source-pinned founder-approved Prism Tabs v5 identity; wordmark variations and raster derivatives | Graphic grant not selected; preserve historical founder visual approval and consumer/source identity |
| `products/tv-launcher/` | GoreeCloud-authored vector sources and four original procedurally generated local WebP wallpapers; generators use Pillow, NumPy and system typography | Graphic and wallpaper grant not selected; review artwork ownership and distribution of rendered text before public grant |
| `products/ai-chatroom/`, `messenger/`, `music/`, `notes/` | Documented first-party original design source, vector masters and generated derivatives | Graphic grant not selected; design/release approval distinct from copyright reuse |
| `products/notify/`, `photos/`, `search/` | Existing first-party application vector sources recovered with recorded Git blob provenance, plus original derivatives | Confirm each originating source's contributors and license before granting independent third-party use |
| `products/gc-ui/candidates/` and other candidates | Historical approved/interim or explicitly **rejected** design explorations | No public graphic grant; archived does not mean adopted or available as an approved mark |
| `package.json`, `package-lock.json` | Private developer package; `sharp@0.34.5` is an external development dependency and is installed by `npm ci`, not vendored | Governing root code license does not override Sharp or its transitive dependency licenses |

The [per-file rights manifest](ASSET-RIGHTS-MANIFEST.json) provides a source-pinned inventory of 161 current vector, raster, ICO and WebP files across the brand and product trees, with an explicit pending copyright/trademark review status for each. It is updated when assets change, and the repository CI checks every listed Git blob and completeness. This enforces *visibility of the unlicensed art gap*, not permission to redistribute any image.

This mapping is **group-level** and based on inspected current-source evidence. Before public art licensing, inventory each relevant source and generated derivative, confirm creator/rightsholder authority, check inherited licenses, font/image/stock provenance, attribution, and relevant existing consumer distribution terms. A root software license is insufficient proof that those checks are complete.

## Next rights decisions

1. Confirm the founder/rightsholder's intended **copyright license** for the permanent umbrella master separately from trademark and endorsement permissions. Do not edit its bytes, geometry, color or SHA-256 pin.
2. For each first-party original product icon, logo, illustration and generated raster, record the appropriate copyright license (for example, a suitable Creative Commons license for art where authorized), exceptions, and source/derivative mapping. Do not auto-select a media license solely from source availability.
3. Verify third-party code or source-derived graphics and bundled font licenses, publish suitable notices or `LICENSES/` texts if applicable, and reconcile downstream product packaging without changing canonical visual approval.
4. Add proportionate CI that asserts source-to-license mapping and README references. CI can verify a file's presence or integrity, **not** ownership of copyright, legal compatibility, render quality or trademark rights.

The active GoreeCloud licensing remediation task remains open until these graphic rights are verified and licensed appropriately.
