import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import sharp from 'sharp';

const base=new URL('../products/gc-ui/candidates/flowframe-v2/',import.meta.url);
const read=(name)=>readFileSync(new URL(name,base));
const sha=(buf)=>createHash('sha256').update(buf).digest('hex');
const manifest=JSON.parse(read('manifest.json'));
assert.match(manifest.status,/NOT founder approved/);
const vectors=['app-icon.svg','favicon.svg','symbol.svg','logo.svg','logo-dark.svg','artwork.svg'];
assert.deepEqual(Object.keys(manifest.files).sort(),[...vectors].sort());
assert.deepEqual(read('app-icon.svg'),read('favicon.svg'),'favicon must be a byte-identical scalable icon');
const approved=readFileSync(new URL('../products/gc-ui/app-icon.svg',import.meta.url));
assert.notEqual(sha(approved),sha(read('app-icon.svg')),'v2 must be an actually new identity');
for(const name of vectors){
 const bytes=read(name);const svg=bytes.toString('utf8');
 assert.ok(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'));
 assert.match(svg,/<title/);assert.match(svg,/viewBox="/);
 assert.doesNotMatch(svg,/<script|<foreignObject|<image|xlink:href|(?:href|src)\s*=\s*["']https?:|url\(https?:/i,name);
 assert.equal(sha(bytes),manifest.files[name],name+' source hash mismatch');
 const metadata=await sharp(bytes).metadata();
 assert.equal(metadata.format,'svg',name+' SVG parser failed');
}
for(const name of ['symbol.svg','app-icon.svg','logo.svg','logo-dark.svg','artwork.svg'])
 assert.ok(read(name).length>400,name+' is unexpectedly tiny');
const raster=JSON.parse(read('raster/asset-index.json'));
assert.equal(raster.product,'gc-ui/candidates/flowframe-v2');
assert.equal(Object.keys(raster.files).length,9);
console.log('PASS original Flowframe v2 proposal: six pinned SVGs, independent silhouette and nine raster assets');
