import {readFile,writeFile} from 'node:fs/promises';
const base=new URL('../products/photos/',import.meta.url);
const src=await readFile(new URL('app-icon.svg',base),'utf8');
const inner=src.replace(/^<svg\b[^>]*>\s*/,'').replace(/\s*<\/svg>\s*$/,'');
if(!inner.includes('M18 94V42'))throw new Error('Unexpected canonical Photos source');
for(const [file,primary,muted] of [
 ['logo.svg','#222342','#545477'],
 ['logo-dark.svg','#FAF9FF','#CECEED']
]){
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 668 156" role="img" aria-labelledby="title desc">
<title id="title">GoreeCloud Photos</title>
<desc id="desc">GoreeCloud Photos logo with its violet image-frame icon.</desc>
<svg x="16" y="16" width="124" height="124" viewBox="0 0 128 128">
${inner}
</svg>
<text x="164" y="85" fill="${primary}" font-family="system-ui, Arial, sans-serif" font-size="59" font-weight="750" letter-spacing="-1.7">GoreeCloud</text>
<text x="168" y="123" fill="${muted}" font-family="system-ui, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="7">PHOTOS</text>
</svg>
`;
 await writeFile(new URL(file,base),svg);
 console.log('GENERATED '+file);
}
