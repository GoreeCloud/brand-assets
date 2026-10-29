import {readdirSync,readFileSync} from 'node:fs';
let issues=0,total=0;
for(const product of ['gc-ui','search','music','music/artwork','notify','photos']){
 const directory=new URL('../products/'+product+'/',import.meta.url);
 for(const file of readdirSync(directory).filter(v=>v.endsWith('.svg'))){
  const svg=readFileSync(new URL(file,directory),'utf8');
  const valid=svg.replace(/^<\?xml[^>]*>\s*/,'').startsWith('<svg xmlns="http://www.w3.org/2000/svg"')
    && svg.includes('viewBox="')
    && (svg.includes('<title')||svg.includes('aria-label='))
    && !svg.includes('<script')
    && !svg.includes('<foreignObject')
    && !svg.includes('<image');
  total++;
  if(!valid){issues++;console.error('FAIL '+product+'/'+file);}
  else console.log('PASS '+product+'/'+file);
 }
}
console.log('SVG checks:',total,'failures:',issues);
if(issues)process.exitCode=1;
