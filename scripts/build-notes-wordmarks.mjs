/** Rebuild both Notes wordmarks from the central original SVG source. */
import {readFile, writeFile} from 'node:fs/promises';
const folder=new URL('../products/notes/',import.meta.url);
const icon=await readFile(new URL('app-icon.svg',folder),'utf8');
if(!icon.startsWith('<svg xmlns="http://www.w3.org/2000/svg"') ||
   !icon.includes('viewBox="0 0 512 512"')){
  throw Error('Unexpected Notes icon source; refusing to generate wordmarks');
}
const inner=icon.slice(icon.indexOf('>')+1,icon.lastIndexOf('</svg>'));
for(const [file,dark] of [['logo.svg',false],['logo-dark.svg',true]]){
  const primary=dark?'#F2F4FB':'#1B2030';
  const secondary=dark?'#CED5E5':'#505B70';
  const lines=[
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 670 158" role="img" aria-labelledby="wordmark-title wordmark-desc">',
    '<title id="wordmark-title">GoreeCloud Notes</title>',
    '<desc id="wordmark-desc">GoreeCloud Notes wordmark and its original page-and-bookmark icon.</desc>',
    '<svg x="12" y="13" width="132" height="132" viewBox="0 0 512 512">'+inner+'</svg>',
    '<text x="165" y="83" fill="'+primary+'" font-family="system-ui, Arial, sans-serif" font-size="58" font-weight="750" letter-spacing="-1.8">GoreeCloud</text>',
    '<text x="171" y="122" fill="'+secondary+'" font-family="system-ui, Arial, sans-serif" font-size="22" font-weight="750" letter-spacing="7">NOTES</text>',
    '</svg>',''
  ];
  await writeFile(new URL(file,folder),lines.join('\n'));
  console.log('GENERATED notes/'+file);
}
