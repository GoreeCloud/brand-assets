import {readFile,writeFile} from 'node:fs/promises';
const root=new URL('../products/notify/',import.meta.url);
const icon=await readFile(new URL('app-icon.svg',root),'utf8');
const inner=icon.replace(/^<\?xml[^>]*>\s*/,'').replace(/^<svg\b[^>]*>\s*/,'').replace(/\s*<\/svg>\s*$/,'');
if(!inner.includes('M46 83c7-9'))throw new Error('Expected canonical Notify bell geometry');
for(const [name,primary,muted] of [
 ['logo.svg','#182740','#53637A'],
 ['logo-dark.svg','#F7FAFF','#BCD2EA']
]){
 const source=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 156" role="img" aria-labelledby="wordmark-title wordmark-desc">
<title id="wordmark-title">GoreeCloud Notify</title>
<desc id="wordmark-desc">GoreeCloud Notify with the official mint-accented violet notification bell icon.</desc>
<svg x="12" y="14" width="126" height="126" viewBox="0 0 128 128">
${inner.trim()}
</svg>
<text x="159" y="85" fill="${primary}" font-family="system-ui, Arial, sans-serif" font-size="59" font-weight="750" letter-spacing="-1.7">GoreeCloud</text>
<text x="165" y="123" fill="${muted}" font-family="system-ui, Arial, sans-serif" font-size="22" font-weight="750" letter-spacing="7">NOTIFY</text>
</svg>
`;
 await writeFile(new URL(name,root),source);
 console.log('GENERATED '+name);
}
