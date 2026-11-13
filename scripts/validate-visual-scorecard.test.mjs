import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluateScorecard,CRITERIA} from './validate-visual-scorecard.mjs';
import {SUBJECTS} from './identity-promotion-policy.mjs';

function syntheticFixture(){
  return {
    schema_version:1,family:'test-not-real-artwork',status:'internally-accepted-for-founder-preview',
    founder_approval:false,reviewers:[{name:'Synthetic QA Fixture',role:'Test Only',reviewed_at:'2026-11-13'}],
    required_criteria:[...CRITERIA],
    products:Object.fromEntries(SUBJECTS.map(x=>[x,{
      scores:Object.fromEntries(CRITERIA.map(c=>[c,4])),
      defects:[],
      notes:'Synthetic test record solely to validate the scorecard schema and logic.',
      decision:'INTERNAL-REVIEW-PASSED'
    }]))
  };
}
test('complete synthetic internal card passes only evidence structure',()=>{
  assert.deepEqual(evaluateScorecard(syntheticFixture()),[]);
});
test('Founder approval is NEVER established by a self-declared scorecard',()=>{
  assert.ok(evaluateScorecard(syntheticFixture(),{stage:'official'}).some(x=>x.includes('Automatic official approval')));
});
test('Missing product evidence is rejected',()=>{
  const x=syntheticFixture();delete x.products.gateway;
  assert.ok(evaluateScorecard(x).some(y=>y.includes('all seven products')));
});
test('No rating below 4 for any dimension can pass a pre-presentation review',()=>{
  const x=syntheticFixture();x.products.maps.scores['native-small-size']=3;
  assert.ok(evaluateScorecard(x).some(y=>y.includes('maps: native-small-size')));
});
test('Unresolved severe optical design defects block acceptance',()=>{
  const x=syntheticFixture();
  x.products.wardveil.defects=[{severity:'critical',description:'Looks like generic W',resolved:false}];
  assert.ok(evaluateScorecard(x).some(y=>y.includes('wardveil: unresolved critical')));
});
test('No reviewer or fabricated founder-approval status',()=>{
  const x=syntheticFixture();x.reviewers=[];x.founder_approval=true;
  assert.ok(evaluateScorecard(x).length>=2);
});
test('No empty names, scores, status, or artwork observations',()=>{
  const x=syntheticFixture();x.products.mesh.notes='nice';x.products.projects.decision='PENDING';
  assert.ok(evaluateScorecard(x).length>=2);
});
test('The mandatory six visual review axes cannot be silently dropped',()=>{
  const x=syntheticFixture();x.required_criteria.pop();
  assert.ok(evaluateScorecard(x).some(y=>y.includes('criteria cannot')));
});
