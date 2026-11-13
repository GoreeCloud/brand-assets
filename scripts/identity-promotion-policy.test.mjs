import test from 'node:test';
import assert from 'node:assert/strict';
import {auditChanges,auditStatus,evaluate,loadStatus,SUBJECTS,REJECTED} from './identity-promotion-policy.mjs';

test('the live founder visual-review status is explicitly rejected',()=>{
  assert.deepEqual(auditStatus(loadStatus()),[]);
  assert.equal(SUBJECTS.length,7);
  assert.deepEqual(REJECTED,['foundation-v1','signalform-v2']);
});
test('ordinary documentation, PR workflow and status updates can proceed',()=>{
  assert.deepEqual(evaluate(['README.md','.github/workflows/verify-brand-identity.yml',
    'docs/IDENTITY-VISUAL-AUDIT-2026-11-12.md','scripts/render-brand-visual-audit.mjs']),[]);
});
test('a source-authored NEW identity concept is permitted only in candidate namespace',()=>{
  assert.deepEqual(auditChanges(SUBJECTS.map(x=>'products/'+x+'/candidates/untested-v4/app-icon.svg')),[]);
});
test('unapproved seven-product canonical icons, artwork, raster and wordmarks cannot silently be created',()=>{
  const names=['app-icon.svg','favicon.svg','logo.svg','logo-dark.svg','artwork.svg',
    'raster/icon-192.png','branding/custom.json'];
  for(const product of SUBJECTS)for(const name of names){
    assert.equal(auditChanges(['products/'+product+'/'+name]).length,1,product+'/'+name);
  }
});
test('both rejected V1 and V2 histories are immutable',()=>{
  for(const product of SUBJECTS)for(const version of REJECTED)
    assert.equal(auditChanges(['products/'+product+'/candidates/'+version+'/app-icon.svg']).length,1);
});
test('founder permanent mark and other verified approved identity source slots are protected',()=>{
  for(const path of ['brand/goreecloud/profile-logo-1024.png','products/gc-ui/app-icon.svg',
    'products/browser-mobile/logo.svg','products/search/favicon.svg'])
    assert.equal(auditChanges([path]).length,1,path);
});
test('review status cannot be self-promoted by simply changing machine-readable metadata',()=>{
  for(const key of ['approved','premium','status']){
    const m=structuredClone(loadStatus());
    if(key==='approved')m.founder_visual_approval=true;
    if(key==='premium')m.families['signalform-v2'].premium_acceptance=true;
    if(key==='status')m.status='approved';
    assert.ok(auditStatus(m).length>0);
  }
});
test('malformed or absolute git paths are refused',()=>{
  assert.equal(auditChanges(['/products/maps/app-icon.svg']).length,1);
  assert.equal(auditChanges(['products/../maps/app-icon.svg']).length,1);
  assert.equal(auditChanges(['products\\maps\\app-icon.svg']).length,1);
});
test('unrelated products remain outside this seven-product visual-approval scope',()=>{
  assert.deepEqual(auditChanges(['products/notify/app-icon.svg','products/photos/README.md']),[]);
});
