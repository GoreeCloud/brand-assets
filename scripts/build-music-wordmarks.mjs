import {readFile,writeFile} from 'node:fs/promises';
const dir=new URL('../products/music/',import.meta.url);
const icon=(await readFile(new URL('app-icon.svg',dir),'utf8'));
const inner=icon
 .replace(/^<svg\b[^>]*>\s*/,'')
 .replace(/\s*<\/svg>\s*$/,'')
 .replace(/<title\b[^>]*>[\s\S]*?<\/title>/,'')
 .replace(/<desc\b[^>]*>[\s\S]*?<\/desc>/,'');
if(!inner.includes('id="ring"'))throw Error('Missing expected official Music icon geometry');
for(const [variant,primary,muted] of [
 ['logo.svg','#17263F','#495C76'],
 ['logo-dark.svg','#F5F9FF','#BBD0EA']
]){
 const logo=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 158" role="img" aria-labelledby="logo-title logo-desc">
<title id="logo-title">GoreeCloud Music logo</title>
<desc id="logo-desc">GoreeCloud Music wordmark and its official violet-aqua record icon.</desc>
<svg x="14" y="14" width="130" height="130" viewBox="0 0 512 512">
${inner.trim()}
</svg>
<text x="166" y="84" fill="${primary}" font-family="system-ui, Arial, sans-serif" font-size="59" font-weight="750" letter-spacing="-1.8">GoreeCloud</text>
<text x="170" y="123" fill="${muted}" font-family="system-ui, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="7">MUSIC</text>
</svg>
`;
 await writeFile(new URL(variant,dir),logo);
 console.log('GENERATED products/music/'+variant);
}
