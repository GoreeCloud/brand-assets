import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

const read = (name)=>readFileSync(new URL('../brand/goreecloud/'+name,import.meta.url));
const sha = (buf)=>createHash('sha256').update(buf).digest('hex');
const master=read('logo.svg');
assert.equal(sha(read('profile-logo-1024.png')),'ac5c76fda60abbf5fc65957b18a3b4053dccb4b3cb42687dcd0bb428709c69e8','original permanent PNG must stay exact');
for (const name of ['app-icon.svg','favicon.svg']) assert.deepEqual(read(name),master,name+' must match logo.svg');
const svg=master.toString('utf8');
for(const required of [
 'width="1024" height="1024" viewBox="0 0 1024 1024"',
 'rx="236" fill="#F7FAFF"',
 'r="316" fill="#3B82F6"',
 'r="182" fill="#F7FAFF"',
 'r="84" fill="#3B82F6"',
 'r="50" fill="#F7FAFF"',
 'fill="#174EA6"',
 'r="26" fill="#F7FAFF"'
])assert.ok(svg.includes(required),'GoreeCloud geometry missing '+required);
assert.doesNotMatch(svg,/<script|<foreignObject|<image|(?:href|src)\s*=\s*["']https?:|url\(https?:/i);
const artwork=read('artwork/connected-world.svg').toString('utf8');
for(const word of ['GoreeShield','Wardveil','GoreeCloud Mesh','GoreeCloud UI'])
 assert.ok(artwork.includes(word),'missing four-pillar art distinction '+word);
assert.doesNotMatch(artwork,/<script|<foreignObject|<image|(?:href|src)\s*=\s*["']https?:|url\(https?:/i);
const index=JSON.parse(read('raster/asset-index.json').toString('utf8'));
assert.equal(index.original_uploaded_png_sha256,'ac5c76fda60abbf5fc65957b18a3b4053dccb4b3cb42687dcd0bb428709c69e8');
assert.equal(Object.keys(index.files).length,9);
for(const [name,expected] of Object.entries(index.files)) assert.equal(sha(read('raster/'+name)),expected,'raster pin '+name);
const ico=read('raster/favicon.ico');
assert.equal(ico.readUInt16LE(0),0);assert.equal(ico.readUInt16LE(2),1);
assert.equal(ico.readUInt16LE(4),6,'favicon must contain six display resolutions');
const sizes=[];
for(let i=0;i<6;i++){const offset=6+i*16;const px=ico[offset]||256;sizes.push(px);
 const bytes=ico.readUInt32LE(offset+8),position=ico.readUInt32LE(offset+12);
 assert.ok(bytes>30&&position>=6+6*16&&position+bytes<=ico.length);
}
assert.deepEqual(sizes.sort((a,b)=>a-b),[16,32,48,64,128,256]);
console.log('PASS exact original permanent-G PNG, traced vector, conceptual artwork, 9 pinned resized rasters and six-size favicon');
