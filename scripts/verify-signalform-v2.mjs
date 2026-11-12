/** Fail closed: candidate image safety, identity separation, source pins and platform assets. */
import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

const slugs=['goreeshield','wardveil','mesh','maps','projects','analytics','gateway'];
const vectors=['app-icon.svg','symbol.svg','logo.svg','logo-dark.svg','favicon.svg','artwork.svg'];
const sizes=[16,32,48,64,128,192,256,512];
const icoSizes=[16,32,48,256];
const sha=b=>createHash('sha256').update(b).digest('hex');
const base=p=>new URL('../products/'+p+'/candidates/signalform-v2/',import.meta.url);
const read=(p,f)=>readFileSync(new URL(f,base(p)));
const allIcons=new Set(),smallRasterHashes=new Set();

test('Signalform v2 candidate families do not inherit canonical status or duplicate icon masters',()=>{
 assert.equal(slugs.length,7);
 for(const p of slugs){
   const meta=JSON.parse(read(p,'manifest.json'));
   assert.equal(meta.product,p);
   assert.match(meta.status,/NOT an official/);
   assert.match(meta.provenance,/no external image service/);
   assert.equal(meta.approved,false);
   assert.equal(meta.family,'signalform-v2');
   assert.deepEqual(Object.keys(meta.files).sort(),vectors.slice().sort());
   const svg=read(p,'app-icon.svg');
   assert.equal(sha(svg),meta.files['app-icon.svg']);
   assert.deepEqual(svg,read(p,'favicon.svg'));
   allIcons.add(sha(svg));
 }
 assert.equal(allIcons.size,7,'Each product must have a distinct icon');
});

for(const product of slugs){
 test(product+': six safe parseable and source-pinned review-only SVGs',async()=>{
   const manifest=JSON.parse(read(product,'manifest.json'));
   for(const name of vectors){
     const raw=read(product,name),text=raw.toString('utf8');
     assert.equal(sha(raw),manifest.files[name],name+' source SHA');
     assert.ok(text.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'));
     assert.match(text,/<title id="title">/);
     assert.match(text,/<desc id="desc">/);
     assert.match(text,/viewBox="0 0 /);
     assert.doesNotMatch(text,/<script|<foreignObject|<image\b|xlink:href|href\s*=\s*["']https?:|url\(\s*https?:|@import|<iframe|<style/i);
     const m=await sharp(raw).metadata();
     assert.equal(m.format,'svg');
     if(name==='app-icon.svg'||name==='favicon.svg'||name==='symbol.svg'){
       assert.equal(m.width,512);assert.equal(m.height,512);
     }
     if(name==='artwork.svg'){assert.equal(m.width,1280);assert.equal(m.height,760)}
     if(name==='logo.svg'||name==='logo-dark.svg'){
       assert.equal(m.width,1120);assert.equal(m.height,170);
     }
   }
 });
 test(product+': 8 pinned PNGs and a valid four-resolution favicon',async()=>{
   const index=JSON.parse(read(product,'raster/asset-index.json'));
   assert.equal(index.product,product);
   assert.match(index.status,/unapproved/);
   assert.equal(index.source_sha256,sha(read(product,'app-icon.svg')));
   assert.equal(Object.keys(index.files).length,9);
   for(const size of sizes){
     const name='icon-'+size+'.png',raw=read(product,'raster/'+name);
     assert.equal(sha(raw),index.files[name].sha256,name+' SHA');
     const m=await sharp(raw).metadata();
     assert.equal(m.format,'png');
     assert.equal(m.width,size);assert.equal(m.height,size);
     assert.equal(m.hasAlpha,true);
     assert.ok(raw.length>100,name+' surprisingly empty');
     if(size===16)smallRasterHashes.add(sha(raw));
   }
   const ico=read(product,'raster/favicon.ico');
   assert.equal(sha(ico),index.files['favicon.ico'].sha256);
   assert.equal(ico.readUInt16LE(0),0);
   assert.equal(ico.readUInt16LE(2),1);
   assert.equal(ico.readUInt16LE(4),4);
   const decoded=[];
   for(let i=0;i<icoSizes.length;i++){
     const at=6+i*16,width=ico[at]||256,height=ico[at+1]||256;
     decoded.push(width);assert.equal(height,width);
     const offset=ico.readUInt32LE(at+12),length=ico.readUInt32LE(at+8);
     assert.ok(length>100&&offset>=70&&offset+length<=ico.length);
     const m=await sharp(ico.subarray(offset,offset+length)).metadata();
     assert.equal(m.width,width);assert.equal(m.height,width);
   }
   assert.deepEqual(decoded,icoSizes);
 });
}

test('Signalform v2 16px exported app icons remain distinct after rasterization',()=>{
 assert.equal(smallRasterHashes.size,7,'16px variants have collapsed to identical artwork');
});
