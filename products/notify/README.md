# GoreeCloud Notify — existing identity source recovery

**Status (October 29, 2026):** The existing native bell icon is selected as the canonical source, with original light/dark wordmarks and PNG/ICO derivatives; native/web consumer source unification has now merged with CI; additional artwork and rendered/deployment verification remain pending.

As GoreeCloud's founder, I require one coherent, official GoreeCloud Notify identity across the native Linux application, web companion and any future client. Source files already used by my applications must be inspected and preserved before I change their visual identity.

## Verified existing sources

| Existing consumer source | Source-matched central preservation copy | Git blob SHA |
| --- | --- | --- |
| [Linux app icon](https://github.com/GoreeCloud/notify/blob/main/packaging/linux/com.goreecloud.Notify.svg) | [candidates/linux-app-icon.svg](candidates/linux-app-icon.svg) | `cd95f8f3e578b70691e738f63646ff9c06e2d7f3` |
| [Pre-migration web favicon](https://github.com/GoreeCloud/notify/blob/bd4ccdae0028e9fb118431a481be53a5d5747f08/web/favicon.svg) | [candidates/web-favicon.svg](candidates/web-favicon.svg) | `296eb78deb3eddff5a45b076c5cbb3b896e7c3ea` |

Both copies were made byte-for-byte from existing first-party sources and retain exact original Git blob identities. The Linux SVG is a purple rounded tile with a white bell and mint notification dot. The web favicon is a dark rounded tile with a violet-teal outlined bell. They are **different products of the existing implementation**, not confirmed interchangeable variants of the same master.

## Canonical identity

- [app-icon.svg](app-icon.svg) is an exact copy of the existing official Linux bell icon with Git blob `cd95f8f3e578b70691e738f63646ff9c06e2d7f3`.
- [logo.svg](logo.svg) and [logo-dark.svg](logo-dark.svg) are newly authored lockups based on this same bell source; run `npm run logos:build` to regenerate them.
- [raster/asset-index.json](raster/asset-index.json) records eight PNG exports and an ICO favicon with source and derivative checksums.
- The previous web favicon remains under `candidates/` for history; it is **not** a second master.

## Required reconciliation

1. Preserve both historical consumer sources and their provenance. The native bell is designated the current master; the archived web favicon is not a separate official identity.
2. Integrate the official bell and wordmark consistently across native and web, with the mandatory default Light and optional Dark, high-contrast and appropriate platform launcher surfaces. Existing notification functionality must not change.
3. Complete any missing application-specific artwork and platform adaptive derivatives, and verify the published raster icons and source manifest in actual consuming applications.
4. The [Notify PR #19](https://github.com/GoreeCloud/notify/pull/19) updated the local web favicon and sidebar from the native source, passed 21 web and 2 packaging tests locally, passed GitHub CI, and merged as [46dce41d](https://github.com/GoreeCloud/notify/commit/46dce41de25191182630c8f21d629effdb2c2fdd). Native/web icons now share Git blob `cd95f8f3e578b70691e738f63646ff9c06e2d7f3`. Real rendered desktop/browser acceptance and deployment remain outstanding.
5. Only then change the [adoption ledger](../../docs/ADOPTION-LEDGER.md) from candidate evidence to verified product-level implementation.

The candidates directory is a preservation archive for source audit, **not** a rival official brand directory. The governing requirement remains [official brand assets for every application and service](../../docs/ASSET-REQUIREMENT.md).
