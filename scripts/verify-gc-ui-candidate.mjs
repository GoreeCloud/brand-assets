/** Candidate, not an official asset source replacement. */
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

const dir=new URL('../products/gc-ui/candidates/',import.meta.url);
const manifest=JSON.parse(readFileSync(new URL('manifest.json',dir),'utf8'));
assert.equal(manifest.schema,'gc-ui-original-identity-candidate.v1');
assert.equal(manifest.status,'candidate-not-approved');
const names=Object.keys(manifest.assets).sort();
assert.deepEqual(names,[
 'aperture-app-icon.svg','aperture-interface-artwork.svg',
 'aperture-logo-dark.svg','aperture-logo.svg','aperture-symbol.svg'
]);
assert.deepEqual(readdirSync(dir).filter(name=>name.endsWith('.svg')).sort(),names);
for(const filename of names){
 const bytes=readFileSync(new URL(filename,dir));
 const source=bytes.toString('utf8');
 assert.equal(createHash('sha256').update(bytes).digest('hex'),manifest.assets[filename].sha256,filename+' integrity');
 assert.equal(bytes.length,manifest.assets[filename].size,filename+' byte count');
 assert.match(source,/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*viewBox=/,filename+' safe SVG root');
 assert.match(source,/<title id="title">/,filename+' accessible title');
 assert.match(source,/<desc id="desc">/,filename+' accessible description');
 assert.doesNotMatch(source,/<script\b|<foreignObject\b|<image\b|<iframe\b|\bon[a-z]+\s*=|\bhref\s*=|url\(\s*['"]?(?:https?:|data:|javascript:)/i,filename+' no active or external content');
 assert.ok(!source.includes('<style'),filename+' no stylesheet imports');
}
console.log('PASS five original GC UI brand candidate vectors and SHA-256 pins (unapproved)');
