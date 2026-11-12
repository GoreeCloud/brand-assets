/**
 * Mandatory human-look preparation: renders BOTH rejected candidate families
 * from exact source vectors, actual 16px graphics, and wordmark lockups.
 *
 * Usage: node scripts/render-brand-visual-audit.mjs /tmp/goreecloud-art-audit
 * Offline. Writes only to an explicit external output directory; never
 * changes source masters, candidates, app assets or the public website.
 */
import sharp from 'sharp';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {join,resolve} from 'node:path';

const root=new URL('../',import.meta.url);
const OUT=resolve(process.argv[2]||'/tmp/goreecloud-visual-review');
if(OUT===new URL('../',import.meta.url).pathname||OUT.includes('/products/'))throw Error('Unsafe output path');
mkdirSync(OUT,{recursive:true});
const products=['goreeshield','wardveil','mesh','maps','projects','analytics','gateway'];
const families=['foundation-v1','signalform-v2'];
const svgFile=(product,family,name)=>readFileSync(new URL('products/'+product+'/candidates/'+family+'/'+name,root));
const esc=x=>x.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const headings={foundation:'Foundation v1 — REJECTED VISUAL',signal:'Signalform v2 — REJECTED VISUAL'};

async function iconSheet(){
 const W=7*240,H=2*330+26;
 const body=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
   <rect width="100%" height="100%" fill="#F3F6FB"/>
   ${families.map((f,row)=>'<text x="24" y="'+(row*330+32)+'" font-family="Inter,sans-serif" font-size="20" font-weight="720" fill="#243451">'+(row===0?headings.foundation:headings.signal)+'</text>').join('')}
   ${families.map((f,row)=>products.map((p,i)=>'<text x="'+(240*i+120)+'" y="'+(row*330+296)+'" font-family="Inter,sans-serif" font-size="17" text-anchor="middle" fill="#243451">'+esc(p)+'</text>').join('')).join('')}
   </svg>`;
 const parts=[];
 for(const [row,f] of families.entries())for(const [i,p]of products.entries()){
   const icon=await sharp(svgFile(p,f,'app-icon.svg')).resize(190,190).png().toBuffer();
   parts.push({input:icon,top:row*330+70,left:i*240+25});
 }
 await sharp(Buffer.from(body)).composite(parts).png().toFile(join(OUT,'v1-v2-source-icons.png'));
}
async function tinySheet(){
 const W=7*230,H=2*255+60;
 const body=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
 <rect width="100%" height="100%" fill="#F3F6FB"/>
 <text x="20" y="30" font-family="Inter,sans-serif" font-weight="700" font-size="19" fill="#253451">Actual 16px raster, shown magnified with NEAREST-NEIGHBOR for internal shape critique</text>
 ${families.map((f,r)=>'<text x="20" y="'+(r*255+72)+'" font-family="Inter,sans-serif" font-weight="700" font-size="16" fill="#253451">'+(r===0?'V1 rejected':'V2 rejected')+'</text>').join('')}
 </svg>`;
 const comps=[];
 for(const [r,f] of families.entries())for(const [i,p]of products.entries()){
  const png=await sharp(svgFile(p,f,'app-icon.svg')).resize(16,16).png().toBuffer();
  const nearest=await sharp(png).resize(128,128,{kernel:'nearest'}).png().toBuffer();
  comps.push({input:nearest,left:i*230+52,top:r*255+88});
 }
 await sharp(Buffer.from(body)).composite(comps).png().toFile(join(OUT,'v1-v2-actual-16px.png'));
}
async function wordmarks(){
 const W=1600,H=7*270+120;
 const bg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="#F2F5FA"/>
  <rect x="800" width="800" height="${H}" fill="#14213D"/>
  <text x="20" y="34" font-family="Inter,sans-serif" font-size="20" fill="#253451">LIGHT WORDMARKS</text>
  <text x="820" y="34" font-family="Inter,sans-serif" font-size="20" fill="#FFFFFF">DARK WORDMARKS</text>
  </svg>`;
 const parts=[];
 for(let i=0;i<products.length;i++)for(let r=0;r<families.length;r++){
  const version=families[r];
  const y=i*270+r*126+59;
  const name=r===0?'logo.svg':'logo-dark.svg';
  // First column light versions, second dark versions for both families.
  for(let j=0;j<2;j++){
   const file=j===0?'logo.svg':'logo-dark.svg';
   const img=await sharp(svgFile(products[i],version,file)).resize({width:748}).png().toBuffer();
   parts.push({input:img,left:j*800+22,top:y});
  }
 }
 await sharp(Buffer.from(bg)).composite(parts).png().toFile(join(OUT,'v1-v2-wordmarks-light-dark.png'));
}

await iconSheet();
await tinySheet();
await wordmarks();
writeFileSync(join(OUT,'README.txt'),'GoreeCloud visual audit proof renders; V1/V2 founder-rejected proposals. Not official, not for deployment.\n');
console.log('VISUAL AUDIT EVIDENCE WRITTEN:',OUT,'(3 sheets; none published)');
