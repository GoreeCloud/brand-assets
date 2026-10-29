/**
 * Validate preserved pre-migration vectors without promoting them to masters.
 * Integrity SHA pins are separately verified by check-identity.mjs.
 */
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';

const candidates=[
  'products/notify/candidates/linux-app-icon.svg',
  'products/notify/candidates/web-favicon.svg',
  'products/photos/candidates/linux-app-icon.svg'
];
for(const name of candidates){
 const svg=readFileSync(new URL('../'+name,import.meta.url),'utf8');
 assert.match(svg,/<svg\s[^>]*xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*>/);
 assert.match(svg,/\bviewBox="/);
 assert.doesNotMatch(svg,/<script\b|<foreignObject\b|<image\b|\bon[a-z]+\s*=|\bhref\s*=/i);
 console.log('PASS source candidate '+name);
}
console.log('Candidate vector checks:',candidates.length);
