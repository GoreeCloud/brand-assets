import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync,readFileSync,existsSync,rmSync,symlinkSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import sharp from 'sharp';
import {SUBJECTS} from './identity-promotion-policy.mjs';

test('native-size quality kit exports exact-size source artifacts but never claims approval',async t=>{
  const parent=mkdtempSync(join(tmpdir(),'gc-premium-kit-test-'));
  t.after(()=>rmSync(parent,{recursive:true,force:true}));
  const out=join(parent,'kit');
  const script=new URL('render-premium-review-kit.mjs',import.meta.url);
  const proc=spawnSync(process.execPath,[script.pathname,'--family','signalform-v2','--out',out],
    {encoding:'utf8',timeout:60000});
  assert.equal(proc.status,0,proc.stderr);
  assert.ok(existsSync(join(out,'audit-data.json')));
  const data=JSON.parse(readFileSync(join(out,'audit-data.json'),'utf8'));
  assert.equal(data.review_status,'FOUNDER REJECTED');
  assert.equal(data.founder_approved,false);
  assert.deepEqual(data.sources.map(x=>x.product),SUBJECTS);
  assert.equal(data.screenshots.length,5);
  for(const image of data.screenshots){
    const meta=await sharp(join(out,image)).metadata();
    assert.equal(meta.format,'png');
    assert.ok(meta.width>1000 && meta.height>300);
  }
  for(const slug of SUBJECTS)for(const size of [16,24,32,48,128,512]){
    const file=join(out,slug,'icon-'+size+'.png');
    const meta=await sharp(file).metadata();
    assert.equal(meta.width,size);assert.equal(meta.height,size);
  }
  const manual=JSON.parse(readFileSync(join(out,'manual-review-template.json'),'utf8'));
  assert.equal(manual.status,'pending-independent-visual-review');
  assert.equal(manual.founder_approval,false);
  assert.equal(manual.reviewers.length,0);
  for(const slug of SUBJECTS){
    assert.equal(manual.products[slug].decision,'PENDING');
    assert.ok(Object.values(manual.products[slug].scores).every(x=>x===null));
  }
  // No accidental overwrite and no output in source-controlled tree.
  const twice=spawnSync(process.execPath,[script.pathname,'--family','signalform-v2','--out',out],{encoding:'utf8'});
  assert.notEqual(twice.status,0);
  const indirect=join(parent,'linked-repository');
  symlinkSync(new URL('../',import.meta.url).pathname,indirect,'dir');
  const unsafe=spawnSync(process.execPath,[script.pathname,'--family','signalform-v2',
    '--out',join(indirect,'unwanted-output')],{encoding:'utf8'});
  assert.notEqual(unsafe.status,0,'symlink alias must not bypass source-output boundary');
});
