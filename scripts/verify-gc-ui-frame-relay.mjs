/**
 * Source-only security/integrity review of the November 15, 2026 GoreeCloud UI
 * Frame Relay proposal. Rendering and founder approval remain separate gates.
 */
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";

const dir=new URL("../products/gc-ui/candidates/frame-relay-v1/",import.meta.url);
const manifest=JSON.parse(readFileSync(new URL("manifest.json",dir),"utf8"));
assert.equal(manifest.schema,"gc-ui-brand-refresh-candidate.v1");
assert.equal(manifest.status,"proposed-unapproved-source-only");
assert.equal(manifest.founderAcceptance,"pending");
assert.equal(manifest.consumerAdoption,"not-started");
assert.equal(manifest.rollout.stage,"do-not-promote");
assert.equal(manifest.rollout.umbrellaBrand,"unchanged");
const required=[
 "app-icon.svg","artwork.svg","favicon.svg",
 "logo-dark.svg","logo-light.svg","symbol.svg"
];
assert.deepEqual(Object.keys(manifest.files).sort(),required);
assert.deepEqual(readdirSync(dir).filter(n=>n.endsWith(".svg")).sort(),required);

function contrast(a,b) {
  const luminance=hex=>{
    const components=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255);
    const v=components.map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);
    return .2126*v[0]+.7152*v[1]+.0722*v[2];
  };
  const x=luminance(a),y=luminance(b);
  return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}
for(const [fg,bg] of [
 ["#A09AFF","#171D2A"],["#57D1CB","#171D2A"],["#F2F4FB","#171D2A"],
 ["#544DCE","#FFFFFF"],["#0D828C","#FFFFFF"],["#34466E","#FFFFFF"],
 ["#096F7C","#FFFFFF"]
])assert.ok(contrast(fg,bg)>=3,fg+" does not meet a 3:1 graphic contrast candidate floor on "+bg);

for(const name of required) {
  const data=readFileSync(new URL(name,dir));
  const source=data.toString("utf8");
  const expected=manifest.files[name];
  const sha=createHash("sha1").update("blob "+data.length+"\0").update(data).digest("hex");
  assert.equal(data.length,expected.bytes,name+" byte count");
  assert.equal(sha,expected.gitBlobSha1,name+" pinned Git blob");
  assert.match(source,/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*viewBox=/,name+" vector root");
  assert.match(source,/<title id="title">/,name+" title");
  assert.match(source,/<desc id="desc">/,name+" description");
  assert.match(source,/<\/svg>\s*$/,name+" closing root");
  assert.doesNotMatch(source,/<script\b|<foreignObject\b|<image\b|<iframe\b|<style\b|\bon[a-z]+\s*=|\bxlink:href\s*=|\bhref\s*=|url\(\s*['"]?(?:https?:|data:|javascript:)|@import/i,name+" active/external SVG forbidden");
  assert.doesNotMatch(source,/\bdata:image\/|\bbase64,|<circle\b/i,name+" no embedded external imagery or circular-G substitute");
  if(["app-icon.svg","favicon.svg","symbol.svg"].includes(name)) {
    assert.match(source,/viewBox="0 0 256 256"/);
    for(const key of ["M71 28h105","M139 80h40","M111 111h44"]){
      assert.ok(source.includes(key),name+" lost shared three-frame geometry");
    }
  }
  if(name==="favicon.svg")assert.doesNotMatch(source,/<text\b/,"favicon must remain text-free at small sizes");
  if(name.startsWith("logo-")) {
    assert.match(source,/viewBox="0 0 900 220"/);
    assert.match(source,/>GoreeCloud<\/text>/);
    assert.match(source,/>UI<\/text>/);
    assert.match(source,/>DESIGN LANGUAGE<\/text>/);
    assert.doesNotMatch(source,/<image\b/);
  }
  if(name==="artwork.svg") {
    assert.match(source,/viewBox="0 0 1280 760"/);
    for(const material of ["CANVAS / CONTEXT","SURFACE / READABILITY","LENS / ACTION"]){
      assert.ok(source.includes(material), "artwork missing "+material);
    }
    assert.match(source,/CONCEPT STUDY \/ NOT LIVE UI/);
  }
  console.log("PASS safe pinned candidate",name);
}
const review=readFileSync(new URL("review.html",dir),"utf8");
assert.match(review,/<meta http-equiv="Content-Security-Policy"/);
assert.match(review,/Not approved\./);
assert.doesNotMatch(review,/<script\b|\b(?:https?:\/\/|data:image\/|onload\s*=|onclick\s*=)/i,
  "local review page must not fetch external content, embed data images or execute scripts");
for(const asset of required){
  const link=asset==="favicon.svg" ? 'href="./favicon.svg"' : 'src="./'+asset+'"';
  assert.ok(review.includes(link),asset+" missing from local review page");
}
console.log("PASS offline source-only review page links all six pinned candidate vectors");
console.log("PASS six new GoreeCloud UI identity candidate vectors; founder review, rasterization and consumer migration remain pending");
