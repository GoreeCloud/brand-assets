/**
 * Rebuild PNG and ICO delivery assets from the official SVG masters.
 * This script intentionally never edits source identity vectors.
 */
import sharp from 'sharp';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

const ICON_SIZES=[16,32,48,64,128,192,256,512];
const ICO_SIZES=[16,32,48,256];
const PRODUCTS=['gc-ui','search','music'];
const sha256=buffer=>createHash('sha256').update(buffer).digest('hex');
const gitBlobId=buffer=>createHash('sha1')
  .update('blob '+buffer.length).update(Buffer.from([0])).update(buffer).digest('hex');

function makeIco(rasters){
 const sizes=[...rasters.keys()];
 const header=Buffer.alloc(6+sizes.length*16);
 header.writeUInt16LE(1,2);
 header.writeUInt16LE(sizes.length,4);
 let offset=header.length;
 for(const [i,size] of sizes.entries()){
   const image=rasters.get(size), at=6+i*16;
   header[at]=size===256?0:size;
   header[at+1]=size===256?0:size;
   header.writeUInt16LE(1,at+4);
   header.writeUInt16LE(32,at+6);
   header.writeUInt32LE(image.length,at+8);
   header.writeUInt32LE(offset,at+12);
   offset+=image.length;
 }
 return Buffer.concat([header,...sizes.map(size=>rasters.get(size))]);
}
for(const slug of PRODUCTS){
 const folder=new URL('../products/'+slug+'/',import.meta.url);
 const source=await readFile(new URL('app-icon.svg',folder));
 const rasters=new Map();
 const files={};
 await mkdir(new URL('raster/',folder),{recursive:true});
 for(const size of ICON_SIZES){
   const png=await sharp(source,{density:384})
     .resize(size,size,{fit:'contain'})
     .png({compressionLevel:9})
     .toBuffer();
   const file='icon-'+size+'.png';
   rasters.set(size,png);
   await writeFile(new URL('raster/'+file,folder),png);
   files[file]={sha256:sha256(png),mime:'image/png',width:size,height:size,bytes:png.length};
   console.log('GENERATED '+slug+'/raster/'+file);
 }
 const ico=makeIco(new Map(ICO_SIZES.map(size=>[size,rasters.get(size)])));
 await writeFile(new URL('raster/favicon.ico',folder),ico);
 files['favicon.ico']={sha256:sha256(ico),mime:'image/x-icon',sizes:ICO_SIZES.map(v=>v+'x'+v),bytes:ico.length};
 const manifest={
   schema_version:1,
   product:slug,
   source:'../app-icon.svg',
   source_git_blob_sha:gitBlobId(source),
   generator:'npm run icons:build (sharp 0.34.5)',
   files
 };
 await writeFile(new URL('raster/asset-index.json',folder),JSON.stringify(manifest,null,2)+'\n');
 console.log('GENERATED '+slug+'/raster/favicon.ico + provenance manifest');
}
