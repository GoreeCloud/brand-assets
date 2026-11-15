/**
 * Deny exact-byte reuse of any explicitly rejected GoreeCloud UI image
 * outside its preserved source archive. This enforces the existing founder
 * decision; it does not assess visual quality or approve replacement designs.
 *
 * No network access, writes, rendered images or dependencies required.
 */
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const archive = join(root,"products/gc-ui/candidates/frame-relay-v1");
const manifest = JSON.parse(readFileSync(join(archive,"manifest.json"),"utf8"));
assert.equal(manifest.schema,"gc-ui-brand-refresh-candidate.v1");
assert.equal(manifest.status,"founder-rejected-archived");
assert.equal(manifest.founderAcceptance,"rejected");
assert.equal(manifest.rollout.stage,"blocked-rejected");
assert.equal(manifest.consumerAdoption,"not-started");
assert.equal(manifest.rollout.umbrellaBrand,"unchanged");

function gitBlobSha(buffer) {
  return createHash("sha1")
    .update("blob "+buffer.length+"\0").update(buffer).digest("hex");
}

const rejected = new Map();
for (const [name, pin] of Object.entries(manifest.files)) {
  assert.match(name,/^[a-z0-9-]+\.svg$/,"Archive name must be a basename");
  assert.match(pin.gitBlobSha1,/^[a-f0-9]{40}$/,"Archive SHA must be exact");
  const data = readFileSync(join(archive,name));
  assert.equal(gitBlobSha(data),pin.gitBlobSha1,name+" archived identity hash");
  assert.equal(data.length,pin.bytes,name+" immutable archived byte length");
  assert.ok(!rejected.has(pin.gitBlobSha1),"Duplicate rejected asset SHA");
  rejected.set(pin.gitBlobSha1,name);
}
assert.equal(rejected.size,6,"A missing archived source weakens the rejection boundary");

const artExtensions = new Set([
  ".svg",".png",".ico",".jpg",".jpeg",".webp",".avif",".gif"
]);
function inspectTree(directory, matches, counts) {
  for (const entry of readdirSync(directory,{withFileTypes:true})) {
    const full = join(directory,entry.name);
    if (resolve(full)===resolve(archive)) continue; // only preserved archive excluded
    const info = lstatSync(full);
    assert.ok(!info.isSymbolicLink(),"Unreviewed symlink in brand source tree: "+relative(root,full));
    if (info.isDirectory()) {
      inspectTree(full,matches,counts);
      continue;
    }
    if (!info.isFile()) continue;
    const ext = entry.name.slice(entry.name.lastIndexOf(".")).toLowerCase();
    if (!artExtensions.has(ext)) continue;
    counts.checked++;
    const sha = gitBlobSha(readFileSync(full));
    if (rejected.has(sha))
      matches.push({path:relative(root,full),rejectedSource:rejected.get(sha)});
  }
}

// Exact-byte control on *all product/umbrella images*, not just gc-ui.
// Rejected designs must never be repurposed as another product's logo.
const matches=[],counts={checked:0};
for (const folder of ["products","brand"]) inspectTree(join(root,folder),matches,counts);
assert.deepEqual(matches,[],"Found founder-rejected Frame Relay bytes outside the archive");
assert.ok(counts.checked>6,"No public brand assets were inspected");
console.log("PASS no rejected GoreeCloud UI SVG has been promoted or reused across "+counts.checked+" product/umbrella graphic assets; archive remains immutable");
