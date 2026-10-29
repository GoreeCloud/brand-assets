# Mandatory official brand assets for GoreeCloud applications and services

| Field | Value |
| --- | --- |
| Origin | Founder direction, October 29, 2026 |
| Scope | Every first-party GoreeCloud application and service |
| Status | Mandatory target requirement; implementation is evaluated per product |
| Central repository | [GoreeCloud/brand-assets](https://github.com/GoreeCloud/brand-assets) |
| Document owner | GoreeCloud founder |
| Source format | UTF-8 Markdown |

## Founder requirement

As GoreeCloud's founder, **I require every GoreeCloud application and service to have its own official icon, logo, artwork, favicon, and any other applicable visual identity assets.** Official assets must be maintained in the public GitHub repository `GoreeCloud/brand-assets` and be used properly everywhere the product appears.

**This requirement applies without exception to development, prototypes, pre-alpha, alpha, beta, release candidates, and stable releases.** A development build cannot substitute default framework icons, arbitrary stock artwork, or an unrelated service's branding for its GoreeCloud identity.

**If an official asset does not exist, I require it to be created and integrated.** Record missing work accurately until the real asset and its usage are verified.

## Asset coverage

- **Product icon:** recognizable, original mark for app launchers, navigation, shortcuts, package identity, desktop/mobile app bundles, and management consoles as applicable.
- **Logo and wordmark:** product-specific identities for headers, login/onboarding, documentation, store/publication and other appropriate surfaces; provide light- and dark-background variants where needed.
- **Favicon:** browser-facing pages and PWAs must reference a working, product-specific favicon in supported formats and resolutions.
- **Artwork:** provide appropriate first-party illustrations, banners, splash/background images, promotional or preview imagery when the surface calls for them. Avoid unused or purely decorative filler.
- **Distribution derivatives:** maintain format/size variants for the platforms the product actually supports, including SVG and applicable PNG/ICO/adaptive/maskable app icons.

A headless service still needs its official icon and logo in the central library; web favicon derivatives become necessary when it has a web interface. Do not invent unsupported client targets merely to fill a checklist.

## Canonical ownership and consumption

1. Maintain every official source asset and its verified derivatives in this repository, grouped by a stable product identifier. A product repository may contain **byte-identical, revision-pinned distribution copies** to support offline/native operation; these do not become competing masters.
2. Preserve original source files, approved usage guidance, provenance, copyright/licensing details, and any historical source mapping. Never invent an approval, license, or earlier publication.
3. Design missing product artwork to be original and consistent with GoreeCloud UI, while respecting any existing approved product identity. Do not copy third-party or predecessor branding and claim it is GoreeCloud-owned.
4. Apply [GoreeCloud UI](https://github.com/GoreeCloud/gc-ui) as the interface/experience design authority, while this repository remains the authority for brand graphic source assets.
5. Keep logos legible in Light (the default application appearance), Dark, high contrast, and forced colors. Product theme accents must not silently recolor official marks. Use accessible names and meaningful alternative text where needed.
6. Include the correct images and metadata in actual product websites, browser icons, native app packages, splash/login screens and documentation; verify displayed results rather than merely checking file existence.
7. Track applicable variants and absent assets per product. `official`, `candidate`, `missing`, `not applicable`, `untested`, and `verified` must reflect observed evidence.

## Missing-asset implementation sequence

Inspect the actual product repository and central asset inventory; document the existing identity and required platforms; create original assets where missing; save source and necessary derivatives in `GoreeCloud/brand-assets`; update consumers from a pinned revision; validate visual appearance and native/web metadata; record the verified result and outstanding gaps.

## Acceptance gates

A product must not be declared compliant unless all applicable canonical assets are stored here, the product consumes the correct identity and derivatives, favicon/launcher paths and formats work, relevant contrast/accessibility requirements are met, and platform-specific testing verifies real display. Missing files are **noncompliance**, not a permanent development exemption.

Documentation, file hashes, and CI checks provide supporting evidence only. A commit does not certify user interface rendering, app-store packaging, production deployment, or universal ecosystem compliance.

## Verified source status (October 29, 2026)

The central `GoreeCloud/brand-assets` repository existed with a brief README before this record. Four existing GC UI vector files were independently inspected in `GoreeCloud/gc-ui` and published to `products/gc-ui/` with exact original Git blob identities. These are recoveries of existing artwork, not new AI-generated identity designs. See [GC UI provenance](../products/gc-ui/README.md). Raster sizes and other consumer integrations require their own verification.

The previous `GoreeCloud/gc-ui/docs/BRANDING.md` pointed to a different repository, `GoreeCloud/branding-assets`, which was not found during the connected GitHub review; those historical statements must be preserved as provenance, not treated as proof of an accessible current master.

This record captures the founder's mandatory product requirement and implementation gates. It does not independently authorize releases, override GoreeCloud source-of-truth safeguards, or certify any application.
