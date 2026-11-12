/**
 * Explicit separation between integrity tests and founder visual approval.
 * A rejected visual family must not be treated as an approved source merely
 * because its SVGs parse or the GitHub workflow passes.
 */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const here=new URL('../',import.meta.url);
const read=rel=>readFileSync(new URL(rel,here),'utf8');
const state=JSON.parse(read('docs/identity-visual-review-status.json'));
const products=['goreeshield','wardveil','mesh','maps','projects','analytics','gateway'];

assert.equal(state.schema_version,1);
assert.equal(state.status,'visual-rework-required');
assert.equal(state.founder_visual_approval,false);
assert.deepEqual(state.products,products);
assert.equal(state.required_pre_presentation_checks.length,8);
assert.ok(read(state.visual_approval_document).includes('FOUNDATION V1 REJECTED; SIGNALFORM V2 REJECTED'));
for(const version of ['foundation-v1','signalform-v2']){
  assert.equal(state.families[version].review_status,'rejected');
  assert.equal(state.families[version].premium_acceptance,false);
  for(const product of products){
    const manifest=JSON.parse(read('products/'+product+'/candidates/'+version+'/manifest.json'));
    assert.match(manifest.status,/NOT an official|NOT official/);
    if(Object.prototype.hasOwnProperty.call(manifest,'approved'))assert.equal(manifest.approved,false);
  }
}
if(process.argv.includes('--require-founder-approval')){
  throw new Error('Release blocked: V1 and V2 explicitly rejected by founder visual review. Passing CI is not approval.');
}
console.log('PASS: seven products in V1/V2 remain visually rejected, unapproved candidates; no inferred founder approval.');
