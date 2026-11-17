import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";

const text = (path) => readFileSync(path, "utf8");
const license = text("LICENSE");
const notice = text("NOTICE");
const map = text("docs/LICENSE-SCOPE-AND-ASSET-RIGHTS.md");
const readme = text("README.md");
const identity = text("docs/GOREECLOUD-IDENTITY-BOUNDARIES-2026-11-11.md");
const pkg = JSON.parse(text("package.json"));

assert.match(license, /Apache License\s+Version 2\.0, January 2004/);
assert.match(license, /Grant of Patent License/);
assert.match(license, /Trademarks/);
assert.match(notice, /Copyright 2026 GoreeCloud/);
assert.match(notice, /does not automatically license any original/);
assert.match(map, /founder-supplied.*permanent/i);
assert.match(map, /No new public copyright or trademark license granted here/i);
assert.match(map, /products\/tv-launcher/);
assert.match(map, /rejected/i);
assert.match(readme, /\[Apache License 2\.0\]\(LICENSE\)/);
assert.match(readme, /\[asset-rights map\]\(docs\/LICENSE-SCOPE-AND-ASSET-RIGHTS\.md\)/);
assert.match(readme, /root software license does not automatically license official images/i);
assert.match(identity, /supporting artwork are published in the central library/i);
assert.doesNotMatch(identity, /SVG\/favicon\/artwork derivatives and the new GC UI identity remain pending/i);
assert.equal(pkg.private, true);
assert.equal(pkg.license, "SEE LICENSE IN LICENSE");

const umbrella = "brand/goreecloud/profile-logo-1024.png";
assert.equal(existsSync(umbrella), true);
const expected = "ac5c76fda60abbf5fc65957b18a3b4053dccb4b3cb42687dcd0bb428709c69e8";
const actual = createHash("sha256").update(readFileSync(umbrella)).digest("hex");
assert.equal(actual, expected, "Permanent original umbrella logo master must never be rewritten");

const manifest = JSON.parse(text("docs/ASSET-RIGHTS-MANIFEST.json"));
assert.equal(manifest.schema_version, 1);
assert.ok(Array.isArray(manifest.assets) && manifest.assets.length > 100);
const expectedAssets = new Map();
for (const asset of manifest.assets) {
  assert.match(asset.path, /^(?:brand|products)\/[a-zA-Z0-9_./-]+\.(?:svg|png|ico|webp|jpe?g|gif)$/i);
  assert.equal(asset.external_artwork_license, null);
  assert.equal(asset.review_state, "copyright_and_trademark_review_required");
  assert.match(asset.git_blob_sha1, /^[0-9a-f]{40}$/);
  assert.equal(expectedAssets.has(asset.path), false, `Duplicate rights manifest path: ${asset.path}`);
  expectedAssets.set(asset.path, asset.git_blob_sha1);
}

function imageFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) return imageFiles(path);
    if (entry.isFile() && /\.(svg|png|ico|webp|jpe?g|gif)$/i.test(entry.name)) return [path];
    return [];
  });
}

const currentAssets = [...imageFiles("brand"), ...imageFiles("products")].sort();
assert.deepEqual([...expectedAssets.keys()].sort(), currentAssets, "Visual asset inventory incomplete or stale");
for (const path of currentAssets) {
  const bytes = readFileSync(path);
  const blobSha = createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");
  assert.equal(blobSha, expectedAssets.get(path), `Rights inventory source has changed: ${path}`);
}

console.log("Brand-source Apache-2.0 license, notices, scoped asset rights, and exact original PNG and per-file rights inventory verified");
