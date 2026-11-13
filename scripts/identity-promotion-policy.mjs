/**
 * Source policy for the seven founder-rejected identity families.
 *
 * Integrity validation != visual approval.  This module only blocks dangerous
 * changes to historical evidence and unpublished official master slots.
 * Future founder approval MUST be handled by a separate reviewed change.
 */
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

export const SUBJECTS=Object.freeze([
  'goreeshield','wardveil','mesh','maps','projects','analytics','gateway'
]);
export const REJECTED=Object.freeze(['foundation-v1','signalform-v2']);
const REPO=new URL('../',import.meta.url);
export const loadStatus=()=>JSON.parse(readFileSync(new URL('docs/identity-visual-review-status.json',REPO),'utf8'));
const subjectSet=new Set(SUBJECTS);

export function auditStatus(state){
  const failures=[];
  if(state?.schema_version!==1)failures.push('expected controlled review status schema v1');
  if(state?.founder_visual_approval!==false)failures.push('founder approval must remain false for rejected families');
  if(state?.status!=='visual-rework-required')failures.push('rejected families cannot be treated as released');
  if(JSON.stringify(state?.products)!==JSON.stringify(SUBJECTS))failures.push('seven product coverage changed');
  for(const version of REJECTED){
    const family=state?.families?.[version];
    if(family?.review_status!=='rejected'||family?.premium_acceptance!==false){
      failures.push(version+' has not retained founder rejection');
    }
  }
  return failures;
}
export function auditChanges(paths){
  const blocked=[];
  for(let value of paths){
    // Normalize diff paths, not arbitrary user-supplied filesystem operations.
    if(typeof value!=='string'||value.startsWith('/')||value.includes('\\')||value.includes('../')||value.includes('//')){
      blocked.push(String(value)+': malformed changed path');continue;
    }
    const path=value.replace(/^\.\//,'');
    if(path==='brand/goreecloud/profile-logo-1024.png'){
      blocked.push(path+': founder-permanent GoreeCloud G master is outside identity candidate scope');continue;
    }
    if(/^products\/(gc-ui|browser-mobile|search)\/(app-icon|favicon|logo|symbol|artwork)(?:\.|\/)/i.test(path)){
      blocked.push(path+': existing verified official identity source is not in redesign scope');continue;
    }
    const parts=path.split('/');
    if(parts[0]!=='products'||!subjectSet.has(parts[1]))continue;
    const sub=parts.slice(2);
    if(sub[0]==='candidates'){
      if(REJECTED.includes(sub[1])){
        blocked.push(path+': founder-rejected historical candidate family must remain immutable');continue;
      }
      // A future new, explicitly unapproved version is permitted here; the
      // review-state tests still block retroactive misrepresentation.
      continue;
    }
    if(sub.length){
      // These product canonical slots are intentionally missing/pending. Do
      // not infer founder approval from a new file, a PR, or a SHA-256 test.
      blocked.push(path+': product official namespace requires a separate verified founder-approval PR');
    }
  }
  return blocked;
}
export function evaluate(paths,state=loadStatus()){
  return [...auditStatus(state),...auditChanges(paths)];
}
export const repoRoot=fileURLToPath(REPO);
