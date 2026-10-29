import {readFile,writeFile} from 'node:fs/promises';
const base=new URL('../products/messenger/',import.meta.url);
const source=await readFile(new URL('app-icon.svg',base),'utf8');
const inner=source.replace(/^<svg\b[^>]*>\s*/,'').replace(/\s*<\/svg>\s*$/,'')
 .replace(/<title\b[^>]*>[\s\S]*?<\/title>/,'')
 .replace(/<desc\b[^>]*>[\s\S]*?<\/desc>/,'');
if(!inner.includes('id="violet"'))throw new Error('Unknown Messenger vector source');
for(const [file,primary,secondary] of [
 ['logo.svg','#18243E','#5B627F'],
 ['logo-dark.svg','#FAF9FF','#C9CEEE']
]){
 const logo=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 710 155" role="img" aria-labelledby="title desc">
<title id="title">GoreeCloud Messenger</title>
<desc id="desc">GoreeCloud Messenger wordmark with overlapping official violet and teal conversations.</desc>
<svg x="14" y="14" width="125" height="125" viewBox="0 0 512 512">
${inner.trim()}
</svg>
<text x="166" y="83" fill="${primary}" font-family="system-ui, Arial, sans-serif" font-size="58" font-weight="750" letter-spacing="-1.8">GoreeCloud</text>
<text x="171" y="122" fill="${secondary}" font-family="system-ui, Arial, sans-serif" font-size="21" font-weight="750" letter-spacing="6">MESSENGER</text>
</svg>
`;
 await writeFile(new URL(file,base),logo);
 console.log('GENERATED '+file);
}
