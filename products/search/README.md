# GoreeCloud Search identity

**State (2026-10-29):** The official Search app icon was recovered without visual changes from the existing Search web companion's `web/public/favicon.svg` and published as [app-icon.svg](app-icon.svg).

- Original consumer: [GoreeCloud/search/web/public/favicon.svg](https://github.com/GoreeCloud/search/blob/main/web/public/favicon.svg)
- Exact source and central Git blob SHA: `d56a102da96080950efcf89ad84efdf975f571f6`
- Meaning: the existing Search icon combines a violet diamond and a teal search lens on a dark rounded-square background.
- The web companion already points to `/favicon.svg`, and its server has a favicon route. The central source is the authority for future changes; the existing consumer copy remains byte-identical for offline hosting.

**New first-party wordmarks (October 29, 2026):** [logo.svg](logo.svg) for light backgrounds and [logo-dark.svg](logo-dark.svg) for dark backgrounds were created in this central repository using the existing, verified Search icon without recoloring its signature diamond/lens. Both editable SVGs were rendered locally for inspection and verified by Git blob comparison. They are newly authored, not copies of an earlier approved upstream logo, and have **not** been verified as integrated in the Search client.

**Still required:** artwork appropriate to actual surfaces, platform-specific launcher/PWA derivatives where supported, app-header/native integration of the wordmarks, and runtime/native visual checks. Do not claim product-wide compliance from the existence of these files alone.

The requirement applies even during development and alpha. Follow the [central asset requirement](../../docs/ASSET-REQUIREMENT.md), and review the user-facing Search client and any native package before promotion.
