/**
 * Conservative source-path similarity guard for an explicitly founder-rejected
 * SVG mark. It detects the *same three vector paths* despite CSS palette,
 * title, path-order and whitespace changes. It is not a perceptual matcher,
 * a trademark opinion, or a substitute for founder visual review.
 *
 * Works on source strings only. No rendering, network or external packages.
 */
const pathToken=/[AaCcHhLlMmQqSsTtVvZz]|[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g;
export function canonicalPathData(pathData){
  if(typeof pathData!=="string"||pathData.length>20000)return null;
  const tokens=pathData.match(pathToken);
  if(!tokens||tokens.length<4)return null;
  const leftovers=pathData.replace(pathToken,"").replace(/[\s,]/g,"");
  if(leftovers) return null;
  return tokens.join("|");
}
export function svgPathFingerprints(svg){
  const found=new Set();
  if(typeof svg!=="string")return found;
  for(const m of svg.matchAll(/<path\b[^>]*>/gi)){
    const attr=m[0].match(/\bd\s*=\s*(["'])([\s\S]*?)\1/i);
    if(!attr)continue;
    const canonical=canonicalPathData(attr[2]);
    if(canonical)found.add(canonical);
  }
  return found;
}
export function containsRejectedFrameGeometry(svg,sourcePaths){
  if(!(sourcePaths instanceof Set)||sourcePaths.size!==3)
    throw new Error("Expected three original rejected paths");
  const actual=svgPathFingerprints(svg);
  return [...sourcePaths].every(path=>actual.has(path));
}
