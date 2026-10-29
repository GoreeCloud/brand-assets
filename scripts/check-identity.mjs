import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

const expected={
  'app-icon.svg':'d3d2f4f2ae241e172691de8c8f6bef628331a350',
  'gc-ui-symbol.svg':'613dfb1747f251d86a1faa6e12c83836b2a950b7',
  'gc-ui-logo.svg':'95a7b63c6928d4e2d79f6afbd41025bc887d7c1c',
  'gc-ui-logo-dark.svg':'9c36aec87107552fa703798a2b09adb610175572'
};

let failures=0;
for(const [name,sha] of Object.entries(expected)){
  try{
    const data=readFileSync(new URL('../products/gc-ui/'+name,import.meta.url));
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
