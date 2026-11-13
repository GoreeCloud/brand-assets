#!/usr/bin/env node
/**
 * Private, static optical-review kit for candidate symbols. NOT an
 * image-generation or automatic art-approval system. Uses pinned sharp.
 */
import sharp from 'sharp';
import {readFileSync,writeFileSync,mkdirSync,existsSync,realpathSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve,join,relative,isAbsolute,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {SUBJECTS,REJECTED} from './identity-promotion-policy.mjs';

const ROOT=fileURLToPath(new URL('../',import.meta.url));
const args=process.argv.slice(2);
const value=name=>{const i=args.indexOf(name);return i<0?null:args[i+1]};
const family=value('--family')||'signalform-v2';
if(!/^[a-z][a-z0-9-]{3,42}$/.test(family))throw Error('Invalid family name');
const outArg=value('--out');
if(!outArg)throw Error('Required: --out /private/new/empty/directory [--family signalform-v2]');
const OUT=resolve(outArg);
const rootReal=realpathSync(ROOT);
if(OUT===rootReal||OUT.startsWith(rootReal+sep))throw Error('Never put review exports inside source-controlled master repository');
if(existsSync(OUT))throw Error('Review output must be a NEW path; refusing to overwrite prior evidence');
mkdirSync(OUT,{recursive:true});

const sha=b=>createHash('sha256').update(b).digest('hex');
const escapeXml=x=>x.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const candidate=(slug)=>new URL('products/'+slug+'/candidates/'+family+'/',new URL('../',import.meta.url));
const SIZES=[16,24,32,48,128,512];
const sourceRecords=[],stats=[];
const iconBuffers=new Map();
for(const slug of SUBJECTS){
  const dir=candidate(slug);
  const meta=JSON.parse(readFileSync(new URL('manifest.json',dir),'utf8'));
  if(meta.product!==slug||meta.approved===true||!/candidate|unapproved|study/i.test(meta.status||'')){
    throw Error(slug+': invalid or promoted source status');
  }
  const icon=readFileSync(new URL('app-icon.svg',dir));
  const symbol=readFileSync(new URL('symbol.svg',dir));
  for(const [file,bytes] of [['app-icon.svg',icon],['symbol.svg',symbol]]){
    if(sha(bytes)!==meta.files[file])throw Error(slug+'/'+file+': source hash mismatch');
  }
  const rgba=await sharp(symbol,{density:200}).resize(512,512).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  let weightedX=0,weightedY=0,mass=0,left=512,right=-1,top=512,bottom=-1;
  for(let y=0;y<rgba.info.height;y++)for(let x=0;x<rgba.info.width;x++){
    const a=rgba.data[(y*rgba.info.width+x)*rgba.info.channels+3];
    if(a>18){
      weightedX+=x*a;weightedY+=y*a;mass+=a;
      left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);
    }
  }
  const centroid=mass?{x:Math.round(weightedX/mass),y:Math.round(weightedY/mass)}:null;
  const metrics={product:slug,source_sha256:sha(icon),symbol_sha256:sha(symbol),
    bounds:{left,right,top,bottom},alpha_centroid:centroid,
    optical_offset_px:centroid?{x:centroid.x-256,y:centroid.y-256}:null,
    rendered_sizes:{},warnings:[]};
  if(!centroid)metrics.warnings.push('Symbol is completely blank');
  if(centroid && (Math.abs(centroid.x-256)>45||Math.abs(centroid.y-256)>45))
    metrics.warnings.push('Potential optical offset over 45px: requires visual review');
  const dest=join(OUT,slug);
  mkdirSync(dest,{recursive:true});
  const renders=new Map();
  for(const size of SIZES){
    const png=await sharp(icon,{density:384}).resize(size,size).png().toBuffer();
    writeFileSync(join(dest,'icon-'+size+'.png'),png);
    const pixels=await sharp(png).ensureAlpha().raw().toBuffer({resolveWithObject:true});
    let opaque=0;
    for(let i=3;i<pixels.data.length;i+=pixels.info.channels)if(pixels.data[i]>=64)opaque++;
    metrics.rendered_sizes[String(size)]={sha256:sha(png),opaque_fraction:Math.round(opaque/(size*size)*1000)/1000};
    renders.set(size,png);
  }
  const sourceWordmarks=[];
  for(const f of ['logo.svg','logo-dark.svg']){
    const bytes=readFileSync(new URL(f,dir));
    if(sha(bytes)!==meta.files[f])throw Error(slug+'/'+f+': source hash mismatch');
    sourceWordmarks.push(bytes);
  }
  stats.push(metrics);sourceRecords.push({product:slug,family,status:meta.status,source_sha256:sha(icon)});
  iconBuffers.set(slug,{renders,wordmarks:sourceWordmarks});
}
// Native-size assets on white and dark surfaces; not visually scaled up.
for(const mode of ['light','dark']){
  const W=1400,H=SUBJECTS.length*172+105;
  const paper=mode==='light'?'#F7F9FE':'#13213D';
  const label=mode==='light'?'#223352':'#F3F6FF';
  const markers=[250,355,480,605,765];
  const headers=['16 px','24 px','32 px','48 px','128 px'];
  const body='<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'">'+
    '<rect width="100%" height="100%" fill="'+paper+'"/>'+
    '<text x="30" y="36" fill="'+label+'" font-family="Inter,sans-serif" font-size="22" font-weight="700">'+
       'Native icon sizes / '+escapeXml(family)+' / '+mode+' (NOT approved)'+
    '</text>'+headers.map((h,i)=>'<text x="'+markers[i]+'" y="78" fill="'+label+'" font-family="Inter,sans-serif" font-size="15">'+h+'</text>').join('')+
    SUBJECTS.map((s,i)=>'<text x="30" y="'+(i*172+144)+'" fill="'+label+'" font-family="Inter,sans-serif" font-size="19">'+escapeXml(s)+'</text>').join('')+
    '</svg>';
  const comps=[];
  for(const [row,slug]of SUBJECTS.entries()){
    for(const [i,size] of [16,24,32,48,128].entries()){
      comps.push({input:iconBuffers.get(slug).renders.get(size),left:markers[i],top:row*172+106});
    }
  }
  await sharp(Buffer.from(body)).composite(comps).png().toFile(join(OUT,'native-sizes-'+mode+'.png'));
}
// Magnification is diagnostic only; it is never a substitute for native-size inspection.
{
  const W=SUBJECTS.length*204,H=310;
  const bg='<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'">'+
    '<rect width="100%" height="100%" fill="#F4F7FD"/>'+
    '<text x="20" y="33" font-size="17" font-family="Inter,sans-serif" fill="#243757">Actual 16px raster ×8 nearest-neighbor (pixel diagnostic only)</text>'+
    SUBJECTS.map((s,i)=>'<text x="'+(i*204+102)+'" y="265" font-size="15" text-anchor="middle" font-family="Inter,sans-serif" fill="#243757">'+escapeXml(s)+'</text>').join('')+
    '</svg>';
  const comps=[];
  for(const [i,slug]of SUBJECTS.entries()){
    const img=await sharp(iconBuffers.get(slug).renders.get(16)).resize(128,128,{kernel:'nearest'}).png().toBuffer();
    comps.push({input:img,left:204*i+38,top:86});
  }
  await sharp(Buffer.from(bg)).composite(comps).png().toFile(join(OUT,'pixel-artifact-diagnostics.png'));
}
// Lockups rendered on actual light/dark panels, no candidate labels baked into the source.
{
  const W=1600,H=SUBJECTS.length*204+90;
  const bg='<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'">'+
    '<rect width="800" height="'+H+'" fill="#F7F9FE"/><rect x="800" width="800" height="'+H+'" fill="#13213D"/>'+
    '<text x="24" y="39" fill="#253653" font-family="Inter,sans-serif" font-size="20">LIGHT LOCKUP</text>'+
    '<text x="826" y="39" fill="#FFFFFF" font-family="Inter,sans-serif" font-size="20">DARK LOCKUP</text>'+
    '</svg>';
  const comps=[];
  for(const [i,slug] of SUBJECTS.entries())for(let variant=0;variant<2;variant++){
    const b=iconBuffers.get(slug).wordmarks[variant];
    comps.push({input:await sharp(b).resize({width:760}).png().toBuffer(),
      left:variant*800+19,top:i*204+72});
  }
  await sharp(Buffer.from(bg)).composite(comps).png().toFile(join(OUT,'wordmarks-light-dark.png'));
}
// Approximate launcher crop behavior, not native Android/iOS compliance.
{
  const W=1200,H=SUBJECTS.length*176+78;
  const paper='<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'">'+
   '<rect width="100%" height="100%" fill="#EDF3FB"/>'+
   '<text x="24" y="36" font-family="Inter,sans-serif" font-size="20" fill="#172440">SIMULATED launcher crops (not production adaptive icon packages)</text>'+
   ['Square','Round rectangle','Circle'].map((x,i)=>
     '<text x="'+(300+i*265)+'" y="66" font-family="Inter,sans-serif" font-size="16" fill="#3E5474">'+x+'</text>').join('')+
   SUBJECTS.map((x,i)=>'<text x="22" y="'+(i*176+152)+'" font-family="Inter,sans-serif" font-size="17" fill="#172440">'+escapeXml(x)+'</text>').join('')+
   '</svg>';
  const comps=[];
  const mask=async(type,bytes)=>{
    if(type==='square')return bytes;
    const markup=type==='circle'
     ?'<circle cx="76" cy="76" r="76" fill="white"/>'
     :'<rect width="152" height="152" rx="40" fill="white"/>';
    const maskSvg=Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="152" height="152">'+markup+'</svg>');
    return await sharp(bytes).composite([{input:maskSvg,blend:'dest-in'}]).png().toBuffer();
  };
  for(const [row,slug] of SUBJECTS.entries()){
    const base=await sharp(iconBuffers.get(slug).renders.get(512)).resize(152,152).png().toBuffer();
    for(const [i,type] of ['square','rounded','circle'].entries()){
      comps.push({input:await mask(type,base),left:300+i*265,top:row*176+92});
    }
  }
  await sharp(Buffer.from(paper)).composite(comps).png().toFile(join(OUT,'platform-crop-simulations.png'));
}
const report={
  schema_version:1,
  family,
  review_status:REJECTED.includes(family)?'FOUNDER REJECTED':'NOT YET VISUALLY ACCEPTED',
  founder_approved:false,
  test_scope:'Objective image properties only. NOT a human aesthetic or legal assessment.',
  screenshots:['native-sizes-light.png','native-sizes-dark.png','pixel-artifact-diagnostics.png','wordmarks-light-dark.png','platform-crop-simulations.png'],
  sources:sourceRecords,
  metrics:stats
};
writeFileSync(join(OUT,'audit-data.json'),JSON.stringify(report,null,2)+'\n');
const template={
  schema_version:1,family,status:'pending-independent-visual-review',founder_approval:false,
  reviewers:[],required_criteria:['recognizability','distinctiveness','optical-craft','brand-coherence','native-small-size','wordmark'],
  products:Object.fromEntries(SUBJECTS.map(slug=>[slug,{
    scores:{recognizability:null,distinctiveness:null,'optical-craft':null,'brand-coherence':null,
      'native-small-size':null,wordmark:null},
    defects:[],notes:'',decision:'PENDING'
  }]))
};
writeFileSync(join(OUT,'manual-review-template.json'),JSON.stringify(template,null,2)+'\n');
console.log('REVIEW KIT: '+OUT+' / 7 products / '+SIZES.join(',')+'px / 5 review sheets / metrics / unapproved manual-review template');
