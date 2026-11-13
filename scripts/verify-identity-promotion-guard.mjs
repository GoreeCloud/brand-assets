#!/usr/bin/env node
/**
 * Mandatory approval namespace gate.  Run from PR CI with --base <SHA>.
 * No personal tokens, network calls, or native-binary execution.
 */
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {evaluate,repoRoot,REJECTED,SUBJECTS} from './identity-promotion-policy.mjs';

const args=process.argv.slice(2);
const idx=args.indexOf('--base');
const arg=idx===-1?null:args[idx+1];
let changed=[];
if(idx!==-1){
  if(!/^[0-9a-f]{40}$/.test(arg||'')){
    console.error('FAIL: --base must be a real 40-character lowercase Git SHA');
    process.exit(2);
  }
  let base=arg;
  if(/^0+$/.test(base)){
    // Root/initial push needs a complete parent diff, not an empty gate.
    base=execFileSync('git',['rev-parse','HEAD^'],{cwd:repoRoot,encoding:'utf8'}).trim();
  }
  const raw=execFileSync('git',['diff','--no-renames','--name-only','-z',base,'HEAD'],{
    cwd:repoRoot,encoding:'utf8',maxBuffer:16*1024*1024
  });
  changed=raw.split('\0').filter(Boolean);
}
const findings=evaluate(changed);
// Candidate-only new versions can be submitted for review, but they must
// explicitly remain unapproved, with a source manifest. CI cannot certify art.
const newCandidateFamilies=new Set();
for(const path of changed){
  const parts=path.split('/');
  if(parts[0]==='products'&&SUBJECTS.includes(parts[1])&&parts[2]==='candidates'&&
     parts[3]&&!REJECTED.includes(parts[3])){
    newCandidateFamilies.add([parts[1],parts[3]].join('/'));
  }
}
for(const id of newCandidateFamilies){
  const rel='products/'+id.replace('/','/candidates/')+'/manifest.json';
  try{
    const m=JSON.parse(readFileSync(new URL('../'+rel,import.meta.url),'utf8'));
    if(m.approved!==false||!/candidate|study|unapproved/i.test(m.status||'')||/\bofficial\b/i.test(m.status||'')&&!/NOT official|NOT an official/i.test(m.status||'')){
      findings.push(rel+': new family must be explicitly unapproved in source manifest');
    }
  }catch(e){findings.push(rel+': source manifest missing or invalid ('+(e.code||'invalid')+')')}
}
if(findings.length){
  console.error('FAIL GoreeCloud seven-product brand approval boundary:');
  for(const item of findings)console.error(' - '+item);
  console.error('These checks do NOT approve artwork; explicit founder visual acceptance and a separate canonical promotion are required.');
  process.exit(1);
}
console.log('PASS: '+changed.length+' inspected paths; rejected V1/V2 untouched and no unapproved candidate was promoted to an official seven-product master.');
console.log('Note: source-integrity PASS is NOT artistic quality approval.');
