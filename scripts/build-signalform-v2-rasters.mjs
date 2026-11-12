/** Deterministic, candidate-only platform export; canonical brand masters untouched. */
import sharp from 'sharp';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

const PRODUCTS=['goreeshield','wardveil','mesh','maps','projects','analytics','gateway'];
const VERSION='signalform-v2';
const SIZES=[16,32,48,64,128,192,256,512];
const ICO_SIZES=[16,32,48,256];
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
function ico(images){
 const header=Buffer.alloc(6+images.length*16);
 header.writeUInt16LE(1,2);
 header.writeUInt16LE(images.length,4);
 let offset=header.length;
 images.forEach(([size,buffer],i)=>{
   const at=6+16*i;
   header[at]=size===256?0:size;
   header[at+1]=size===256?0:size;
   header.writeUInt16LE(1,at+4);
   header.writeUInt16LE(32,at+6);
   header.writeUInt32LE(buffer.length,at+8);
   header.writeUInt32LE(offset,at+12);
   offset+=buffer.length;
 });
 return Buffer.concat([header,...images.map(([,b])=>b)]);
}
for(const product of PRODUCTS){
 const folder=new URL('../products/'+product+'/candidates/'+VERSION+'/',import.meta.url);
 const master=await readFile(new URL('app-icon.svg',folder));
 const manifest=JSON.parse(await readFile(new URL('manifest.json',folder),'utf8'));
 if(sha(master)!==manifest.files['app-icon.svg'])throw Error(product+' source mismatch');
 if(manifest.status.indexOf('NOT an official')<0)throw Error('candidate approval status changed unexpectedly');
 const destination=new URL('raster/',folder);
 await mkdir(destination,{recursive:true});
 const render=new Map(),files={};
 for(const size of SIZES){
   const png=await sharp(master,{density:384}).resize(size,size,{fit:'contain'}).png({compressionLevel:9}).toBuffer();
   render.set(size,png);
   const filename='icon-'+size+'.png';
   await writeFile(new URL(filename,destination),png);
   files[filename]={sha256:sha(png),mime:'image/png',width:size,height:size,bytes:png.length};
 }
 const icoFile=ico(ICO_SIZES.map(n=>[n,render.get(n)]));
 await writeFile(new URL('favicon.ico',destination),icoFile);
 files['favicon.ico']={sha256:sha(icoFile),mime:'image/x-icon',sizes:ICO_SIZES.map(n=>n+'x'+n),bytes:icoFile.length};
 const index={schema_version:2,product,status:'unapproved signalform-v2 candidate',
    source:'../app-icon.svg',source_sha256:sha(master),
    generator:'node scripts/build-signalform-v2-rasters.mjs (sharp@0.34.5)',
    files};
 await writeFile(new URL('asset-index.json',destination),JSON.stringify(index,null,2)+'\n');
 console.log('GENERATED '+product+': 8 PNG, 4-resolution ICO, pinned manifest');
}
