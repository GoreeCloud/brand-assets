# GoreeCloud Notify — existing identity source recovery

**Status (October 29, 2026):** Candidate asset recovery only. No canonical Notify identity selection, app migration, new artwork approval, or deployment is claimed.

As GoreeCloud's founder, I require one coherent, official GoreeCloud Notify identity across the native Linux application, web companion and any future client. Source files already used by my applications must be inspected and preserved before I change their visual identity.

## Verified existing sources

| Existing consumer source | Source-matched central preservation copy | Git blob SHA |
| --- | --- | --- |
| [Linux app icon](https://github.com/GoreeCloud/notify/blob/main/packaging/linux/com.goreecloud.Notify.svg) | [candidates/linux-app-icon.svg](candidates/linux-app-icon.svg) | `cd95f8f3e578b70691e738f63646ff9c06e2d7f3` |
| [Web favicon](https://github.com/GoreeCloud/notify/blob/main/web/favicon.svg) | [candidates/web-favicon.svg](candidates/web-favicon.svg) | `296eb78deb3eddff5a45b076c5cbb3b896e7c3ea` |

Both copies were made byte-for-byte from existing first-party sources and retain exact original Git blob identities. The Linux SVG is a purple rounded tile with a white bell and mint notification dot. The web favicon is a dark rounded tile with a violet-teal outlined bell. They are **different products of the existing implementation**, not confirmed interchangeable variants of the same master.

## Required reconciliation

1. Preserve both sources and their provenance. Do not erase an existing deployed icon or label one candidate official without evaluating actual current usage.
2. Establish one reviewed product icon/wordmark direction compatible with GoreeCloud UI and with default Light, optional Dark, high-contrast, and platform launcher surfaces. Keep web/native branding coordinated; existing app functionality must not change.
3. Create missing logo lockups, applicable artwork, favicon/raster/adaptive derivatives, and source manifest under this central brand repository.
4. Integrate a pinned canonical revision in each supported native/web app, then test the actual desktop and browser surfaces, packaging paths, accessibility, and favicon loading.
5. Only then change the [adoption ledger](../../docs/ADOPTION-LEDGER.md) from candidate evidence to verified product-level implementation.

The candidates directory is a preservation archive for source audit, **not** a rival official brand directory. The governing requirement remains [official brand assets for every application and service](../../docs/ASSET-REQUIREMENT.md).
