# GoreeCloud AI — product visual identity

| Attribute | Status |
| --- | --- |
| Product | GoreeCloud AI — personal self-hosted multimodel AI workspace |
| Official master | `GoreeCloud/brand-assets/products/ai/` |
| Origin | Original GoreeCloud SVG artwork created for the 2026-11-04 rebrand |
| Design system | `GoreeCloud/gc-ui` (GC UI semantic colors, Iris/Aqua family) |
| Technology attribution | GoreeCloud AI uses LibreChat; upstream ownership and licenses remain intact |
| Lifecycle | New source candidate; client build, live screenshot and distribution acceptance outstanding |

## Identity

The compact mark depicts a luminous intelligence spark framed by two conversation arcs. Its own navy app tile, iris-blue and aqua geometry coordinate with the GoreeCloud UI design language while remaining a distinct GoreeCloud AI identity. It does **not** reuse the LibreChat logo, the GC UI symbol, or third-party icons.

- `app-icon.svg`: square product icon for browser/PWA and app surfaces
- `logo.svg`: horizontal GoreeCloud AI wordmark for light backgrounds
- `logo-dark.svg`: high-contrast horizontal wordmark for dark backgrounds
- `artwork/conversation-orbits.svg`: decorative authentication/onboarding image with an accessible title
- `raster/`: deterministic 16–512px PNG and multi-size favicon.ico derivatives and hash manifest

All SVGs are first-party vector sources, contain no scripts, external images or runtime network requests, and preserve transparent or opaque backgrounds according to intended usage. Wordmark typography uses system fonts, following GC UI's native typographic direction.

## Ownership, integrity and usage

`GoreeCloud/brand-assets` owns these sources. The AI repository is a revision-pinned consumer and should carry source-identical copies plus approved raster derivatives under the web assets directory. The `scripts/check-identity.mjs` and `scripts/verify-raster-icons.mjs` checks validate the central source/vector and raster identities; consumer checks must compare copies with these exact masters.

## Acceptance outstanding

Source work is not a deployed product. Verify built frontend assets, sign-in/recovery/2FA, landing and navigation, dark/light/forced-colors, multiple screen sizes, actual favicon/PWA behavior, accessibility, caching and upstream build attribution. Production must be built from the Git commit containing the consumer assets; the prebuilt upstream Docker image does not automatically pick up source changes. Release and screenshot acceptance remain open until independently observed.
