# GoreeCloud — permanent umbrella identity source

**Founder-supplied official logo**, November 11, 2026. This directory belongs to the **GoreeCloud umbrella brand**, not the **GoreeCloud UI** product.

- Canonical original raster: [profile-logo-1024.png](profile-logo-1024.png)
- Input: exactly the original 1024 × 1024 transparent RGBA PNG, 41,682 bytes
- SHA-256: `ac5c76fda60abbf5fc65957b18a3b4053dccb4b3cb42687dcd0bb428709c69e8`
- Git blob SHA-1: `ce1a975bd0500bc7f79386926decb1be3523b992`
- Principal exact pixel colors: `#F7FAFF`, `#3B82F6`, `#174EA6`
- The source image is immutable identity evidence, not a freely interchangeable product mark.

**Now available on this source branch (consumer rollout is separate):**

- [logo.svg](logo.svg): hand-traced **vector derivative** of the unchanged original permanent G. The SVG matches the supplied image geometry/colors closely, but is not byte-identical to the original PNG and is subject to source-image visual comparison.
- [app-icon.svg](app-icon.svg) and [favicon.svg](favicon.svg): source-identical SVG copies for consumers.
- [raster/favicon.ico](raster/favicon.ico): actual six-size ICO (16, 32, 48, 64, 128, 256 pixels).
- [raster/asset-index.json](raster/asset-index.json): eight PNG sizes (16–512) and the ICO with SHA-256 per-file hashes.
- [artwork/connected-world.svg](artwork/connected-world.svg): new supporting umbrella artwork repeating the unmodified G motif and four distinct pillars.

**Source integrity:** the original `profile-logo-1024.png` is the exact founder-uploaded 41,682-byte master; **raster derivatives are resized directly from those original bytes**, not from the vector approximation. The source PNG is not overwritten by raster or SVG generation. The rebuild/check command `python3 scripts/build-goreecloud-raster.py --check` uses Pillow and the original SHA-256 pin. CI `node scripts/verify-goreecloud-umbrella.mjs` validates original source, vector geometry, six ICO sizes, and all nine raster hashes. Track consumer/deployment acceptance in [issue #17](https://github.com/GoreeCloud/brand-assets/issues/17).

**Separate work:** a completely new GoreeCloud UI logo, icon, favicon and artwork is requested in [issue #18](https://github.com/GoreeCloud/brand-assets/issues/18). Do not use the umbrella circle-G as the GC UI identity.

The repository's software licensing does not itself waive brand, trademark or other rights in the official logo. No production cutover is implied.
