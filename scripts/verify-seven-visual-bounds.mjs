/**
 * Image-backed visual boundary smoke tests for seven review-only candidates.
 * Detects blank/flattened tiny icons and cropped wordmarks. Not a substitute
 * for human contrast, screen-reader or product approval assessment.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {readFileSync} from 'node:fs';

const SLUGS=['goreeshield','wardveil','mesh','maps','projects','analytics','gateway'];
const prefix=slug=>new URL('../products/'+slug+'/candidates/foundation-v1/',import.meta.url);

async function rgba(file){
  return await sharp(readFileSync(file)).ensureAlpha().raw().toBuffer({resolveWithObject:true});
}
function bounds({data,info},alphaThreshold=64){
  let left=info.width,top=info.height,right=-1,bottom=-1,pixels=0;
  for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++){
    const a=data[(y*info.width+x)*info.channels+3];
    if(a>alphaThreshold){
      left=Math.min(x,left);right=Math.max(x,right);
      top=Math.min(y,top);bottom=Math.max(y,bottom);pixels++;
    }
  }
  return {left,top,right,bottom,pixels};
}
for(const slug of SLUGS){
  test(slug+' 16px native PNG retains distinct shape, transparent corners and center',async()=>{
    const img=await rgba(new URL('raster/icon-16.png',prefix(slug)));
    const {data,info}=img;
    assert.equal(info.width,16);assert.equal(info.height,16);
    const at=(x,y)=>data.subarray((y*16+x)*info.channels,(y*16+x)*info.channels+4);
    for(const [x,y] of [[0,0],[15,0],[0,15],[15,15]])assert.equal(at(x,y)[3],0,'corner must be transparent');
    assert.equal(at(8,8)[3],255,'center must be opaque');
    const b=bounds(img);
    assert.ok(b.pixels>=180,'unexpectedly blank/vanishing icon');
    const palette=new Set();
    for(let y=0;y<16;y++)for(let x=0;x<16;x++){
      const p=at(x,y);
      if(p[3]>64)palette.add([p[0],p[1],p[2]].join(','));
    }
    assert.ok(palette.size>=40,'icon palette collapsed or became a flat block');
  });
  for(const name of ['logo.svg','logo-dark.svg']){
    test(slug+' '+name+' renders readable content without cropping canvas',async()=>{
      const img=await rgba(new URL(name,prefix(slug)));
      const box=bounds(img);
      assert.equal(img.info.width,1100);assert.equal(img.info.height,170);
      assert.ok(box.pixels>1000,'blank/failed wordmark');
      assert.ok(box.left>=8 && box.top>=8,'text touches top or left canvas edge');
      assert.ok(box.right<=img.info.width-18,'wordmark clipped against right canvas');
      assert.ok(box.bottom<=img.info.height-10,'wordmark clipped against lower canvas');
    });
  }
  test(slug+' conceptual artwork renders a nonempty original background',async()=>{
    const img=await rgba(new URL('artwork.svg',prefix(slug)));
    assert.equal(img.info.width,1280);assert.equal(img.info.height,720);
    const box=bounds(img);
    assert.ok(box.pixels>400000,'concept art suspiciously empty');
    assert.ok(box.left===0 && box.top===0 && box.right===1279 && box.bottom===719,
      'canvas no longer fills its intended presentation format');
  });
}
