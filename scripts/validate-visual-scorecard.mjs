#!/usr/bin/env node
/**
 * Validate completeness of human visual evidence, not visual quality itself.
 * A passing pre-preview scorecard cannot confer founder approval or justify
 * canonical promotion. No external contact, network or account actions.
 */
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {SUBJECTS} from './identity-promotion-policy.mjs';

export const CRITERIA=[
  'recognizability','distinctiveness','optical-craft',
  'brand-coherence','native-small-size','wordmark'
];
export function evaluateScorecard(card,{stage='prepreview'}={}){
  const failures=[];
  if(card?.schema_version!==1)failures.push('schema_version must be 1');
  if(typeof card?.family!=='string'||!card.family.trim())failures.push('family name required');
  if(!Array.isArray(card?.reviewers)||card.reviewers.length===0)failures.push('a real reviewer must be recorded');
  else for(const reviewer of card.reviewers){
    if(!reviewer||typeof reviewer.name!=='string'||reviewer.name.trim().length<3
       ||typeof reviewer.role!=='string'||reviewer.role.trim().length<3
       ||!/\d{4}-\d\d-\d\d/.test(reviewer.reviewed_at||'')){
      failures.push('each reviewer needs name, role and dated review evidence');
    }
  }
  if(JSON.stringify(card?.required_criteria)!==JSON.stringify(CRITERIA))failures.push('review criteria cannot be silently omitted');
  if(!card?.products||Object.keys(card.products).sort().join(',')!==[...SUBJECTS].sort().join(',')){
    failures.push('all seven products require distinct human assessments');
  }
  for(const slug of SUBJECTS){
    const entry=card?.products?.[slug];
    if(!entry){failures.push(slug+': missing review');continue}
    if(typeof entry.notes!=='string'||entry.notes.trim().length<30)
      failures.push(slug+': substantive design observations required (30+ characters)');
    if(entry.decision!=='INTERNAL-REVIEW-PASSED')
      failures.push(slug+': no explicit internal visual acceptance');
    if(!Array.isArray(entry.defects))failures.push(slug+': defects must be a list');
    else if(entry.defects.some(d=>(d?.severity||'').toLowerCase()==='critical'&&(d?.resolved!==true)))
      failures.push(slug+': unresolved critical visual defect');
    for(const criterion of CRITERIA){
      const score=entry.scores?.[criterion];
      if(!Number.isInteger(score)||score<4||score>5)
        failures.push(slug+': '+criterion+' must receive explicit 4 or 5 out of 5');
    }
  }
  if(stage==='prepreview'){
    if(card?.status!=='internally-accepted-for-founder-preview')
      failures.push('status must explicitly indicate only internal visual acceptance');
    if(card?.founder_approval!==false)
      failures.push('a pre-preview scorecard cannot set or imply founder approval');
  }else if(stage==='official'){
    // A self-reported JSON record does not establish GitHub owner identity.
    failures.push('Automatic official approval is forbidden: require verified founder review and a separate PR');
  }else failures.push('Unknown review stage: '+stage);
  return failures;
}
if(process.argv[1]?.endsWith('/validate-visual-scorecard.mjs')){
  const args=process.argv.slice(2);
  const idx=args.indexOf('--file');
  const file=idx<0?null:args[idx+1];
  const stage=args.includes('--official')?'official':'prepreview';
  if(!file){console.error('Usage: node scripts/validate-visual-scorecard.mjs --file <private-review.json> [--official]');process.exit(2)}
  let data;
  try{data=JSON.parse(readFileSync(resolve(file),'utf8'))}
  catch(e){console.error('Cannot open review file: '+e.message);process.exit(2)}
  const errors=evaluateScorecard(data,{stage});
  if(errors.length){
    console.error('BLOCKED: visual-review evidence incomplete or insufficient:');
    for(const e of errors)console.error(' - '+e);
    process.exit(1);
  }
  console.log('PASS: internal human visual-review record is structurally complete. This is NOT proof of artistic quality or founder approval.');
}
