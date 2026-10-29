import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

const expected={
  'products/gc-ui/app-icon.svg':'d3d2f4f2ae241e172691de8c8f6bef628331a350',
  'products/gc-ui/gc-ui-symbol.svg':'613dfb1747f251d86a1faa6e12c83836b2a950b7',
  'products/gc-ui/gc-ui-logo.svg':'95a7b63c6928d4e2d79f6afbd41025bc887d7c1c',
  'products/gc-ui/gc-ui-logo-dark.svg':'9c36aec87107552fa703798a2b09adb610175572',
  'products/search/app-icon.svg':'d56a102da96080950efcf89ad84efdf975f571f6',
  'products/search/logo.svg':'8f385c95322e4ef53c00ab23f5138c403486d065',
  'products/search/logo-dark.svg':'7ce6b0e7f8c8b079ea14c6134043f7679c2ec844',
  'products/notify/candidates/linux-app-icon.svg':'cd95f8f3e578b70691e738f63646ff9c06e2d7f3',
  'products/notify/candidates/web-favicon.svg':'296eb78deb3eddff5a45b076c5cbb3b896e7c3ea',
  'products/photos/candidates/linux-app-icon.svg':'0413b92b28ab75255a6dbfbf522ac6aa10f13c19'
};

let failures=0;
for(const [name,sha] of Object.entries(expected)){
  try{
    const data=readFileSync(new URL('../'+name,import.meta.url));
    const actual=createHash('sha1').update('blob '+data.length).update(Buffer.from([0])).update(data).digest('hex');
    if(actual!==sha)throw new Error('source identity mismatch: '+actual);
    console.log('PASS '+name);
  }catch(error){
    console.error('FAIL '+name+': '+error.message);
    failures++;
  }
}
if(failures)process.exitCode=1;
console.log('Source identity files checked:',Object.keys(expected).length);
