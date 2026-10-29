/**
 * Validate checked-in platform icon derivatives and provenance manifests.
 * This does not certify visual accessibility or a deployed consumer app.
 */
import sharp from 'sharp';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const SIZES=[16,32,48,64,128,192,256,512];
const ICO_SIZES=[16,32,48,256];
const PNG_SIGNATURE=Buffer.from('89504e470d0a1a0a','hex');
const hash=buffer=>createHash('sha256').update(buffer).digest('hex');
const gitBlobId=bytes=>createHash('sha1').update('blob '+bytes.length).update(Buffer.from([0])).update(bytes).digest('hex');
let checked=0;
for(const product of ['gc-ui','search','music','notify','photos']){
 const folder=new URL('../products/'+product+'/',import.meta.url);
 const raster=new URL('raster/',folder);
 const manifest=JSON.parse(await readFile(new URL('asset-index.json',raster),'utf8'));
 assert.equal(manifest.schema_version,1);
 assert.equal(manifest.product,product);
 const source=await readFile(new URL('app-icon.svg',folder));
 assert.equal(manifest.source_git_blob_sha,gitBlobId(source));
 assert.equal(Object.keys(manifest.files).length,9);
 const pngs=new Map();
 for(const size of SIZES){
   const name='icon-'+size+'.png';
   const bytes=await readFile(new URL(name,raster));
   const spec=manifest.files[name];
   assert.ok(bytes.subarray(0,8).equals(PNG_SIGNATURE),name+' invalid PNG header');
   const meta=await sharp(bytes).metadata();
   assert.equal(meta.format,'png');
   assert.equal(meta.width,size);
   assert.equal(meta.height,size);
   assert.equal(spec.width,size);
   assert.equal(spec.height,size);
   assert.equal(spec.mime,'image/png');
   assert.equal(spec.bytes,bytes.length);
   assert.equal(spec.sha256,hash(bytes));
   pngs.set(size,bytes);
   checked++;
 }
 const ico=await readFile(new URL('favicon.ico',raster));
 const icoSpec=manifest.files['favicon.ico'];
 assert.equal(icoSpec.sha256,hash(ico));
 assert.equal(icoSpec.bytes,ico.length);
 assert.equal(icoSpec.mime,'image/x-icon');
 assert.equal(ico.readUInt16LE(0),0);
 assert.equal(ico.readUInt16LE(2),1);
 assert.equal(ico.readUInt16LE(4),ICO_SIZES.length);
 for(let i=0;i<ICO_SIZES.length;i++){
   const size=ICO_SIZES[i], at=6+i*16;
   assert.equal(ico[at]||256,size);
   assert.equal(ico[at+1]||256,size);
   assert.equal(ico.readUInt16LE(at+6),32);
   const length=ico.readUInt32LE(at+8),offset=ico.readUInt32LE(at+12);
   assert.ok(ico.subarray(offset,offset+length).equals(pngs.get(size)));
 }
 checked++;
}
console.log('PASS '+checked+' PNG/ICO files and provenance hashes across 5 products');
