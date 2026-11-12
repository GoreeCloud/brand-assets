/** Prevent silent promotion, source copying, or mutation of known approved identities. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

const sha=b=>createHash('sha256').update(b).digest('hex');
const files = new Map(Object.entries({
  'brand/goreecloud/profile-logo-1024.png':'ac5c76fda60abbf5fc65957b18a3b4053dccb4b3cb42687dcd0bb428709c69e8',
  'products/gc-ui/app-icon.svg':'a1bf6370761f247a56666c0d61ba615dce3e5789c6e7845c630caecf6d9de418',
  'products/browser-mobile/app-icon.svg':'d99784423ac237a01b520153953842cbfecf1a838f2d2fcfaa9a0d2eff704769',
  'products/search/app-icon.svg':'74db42cf6b20c9527614471b6cc6cea004c39c28f385ad7c499f374161406dc0',
  'products/goreeshield/candidates/foundation-v1/manifest.json':'72eab330b11043f1b30584d3be6028884e8e7e74b57a0d763aa3d6921fa07652',
  'products/wardveil/candidates/foundation-v1/manifest.json':'337ce4cbe18e13c9a97d278367026e575f221005121d69428ae3d4eed35f3dd5',
  'products/mesh/candidates/foundation-v1/manifest.json':'2fc10c61b4e009dc992fb90ff47765e9611434df073735668e977637d66a3cbb',
  'products/maps/candidates/foundation-v1/manifest.json':'74a2c4dab2fd5729c8299d765a6cdd2c344f3e4ebef99fcb0d2b6afcea1b135a',
  'products/projects/candidates/foundation-v1/manifest.json':'eed3d0c30dba7563f4e78496674c8a08235e0135fbbc1c95e24c28d570d84f50',
  'products/analytics/candidates/foundation-v1/manifest.json':'4a9eeba564045a16701ff7192fb7036455aebe653b29314393cc07f1d5c64690',
  'products/gateway/candidates/foundation-v1/manifest.json':'885845822498b522d9a459668b99c1fff4ee6a718988a638977ca726a052a81f',
}));
const slugs=['goreeshield','wardveil','mesh','maps','projects','analytics','gateway'];
test('Permanent umbrella master, existing official assets, and every v1 candidate remain byte-identical',()=>{
 for(const [path,pinned] of files){
   assert.equal(sha(readFileSync(new URL('../'+path,import.meta.url))),pinned,path+' was changed');
 }
});
test('All seven Signalform v2 symbols are actual new designs and remain unapproved',()=>{
 for(const slug of slugs){
  const old=readFileSync(new URL('../products/'+slug+'/candidates/foundation-v1/app-icon.svg',import.meta.url));
  const p=new URL('../products/'+slug+'/candidates/signalform-v2/',import.meta.url);
  const icon=readFileSync(new URL('app-icon.svg',p));
  const metadata=JSON.parse(readFileSync(new URL('manifest.json',p)));
  assert.notEqual(sha(old),sha(icon),slug+' still uses v1 art');
  assert.equal(metadata.approved,false);
  assert.match(metadata.status,/NOT an official brand master/);
  assert.equal(metadata.family,'signalform-v2');
 }
});
