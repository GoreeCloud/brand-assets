import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

const expected={
  'brand/goreecloud/profile-logo-1024.png':'ce1a975bd0500bc7f79386926decb1be3523b992',
  'brand/goreecloud/logo.svg':'c171733ccb86ba5349f27a5d64f5ff8db59a82f4',
  'brand/goreecloud/app-icon.svg':'c171733ccb86ba5349f27a5d64f5ff8db59a82f4',
  'brand/goreecloud/favicon.svg':'c171733ccb86ba5349f27a5d64f5ff8db59a82f4',
  'brand/goreecloud/artwork/connected-world.svg':'1e71e0829a45d218132dad7f33e77d0c27b66f4e',
  'products/gc-ui/app-icon.svg':'f931dada18f8743706981ea6eb1e61f426d96170',
  'products/gc-ui/gc-ui-symbol.svg':'a38257a5242cd9741dfd1c5c87285b56cddeb868',
  'products/gc-ui/gc-ui-logo.svg':'6522c7955a227490408e453fd23845af2bbeffc1',
  'products/gc-ui/gc-ui-logo-dark.svg':'46ce79ed0d6200dd6a49f1f2f02c2fa57c8adb89',
  'products/gc-ui/artwork/interface-constellation.svg':'7be3cffde81c43aeb037d62f8225f9bd993b0338',
  'products/search/app-icon.svg':'d56a102da96080950efcf89ad84efdf975f571f6',
  'products/search/logo.svg':'8f385c95322e4ef53c00ab23f5138c403486d065',
  'products/search/logo-dark.svg':'7ce6b0e7f8c8b079ea14c6134043f7679c2ec844',
  'products/notify/candidates/linux-app-icon.svg':'cd95f8f3e578b70691e738f63646ff9c06e2d7f3',
  'products/notify/candidates/web-favicon.svg':'296eb78deb3eddff5a45b076c5cbb3b896e7c3ea',
  'products/photos/candidates/linux-app-icon.svg':'0413b92b28ab75255a6dbfbf522ac6aa10f13c19',
  'products/music/app-icon.svg':'95584a3859a6bde32161892eed1302ac544369d7',
  'products/music/logo.svg':'bc474645bc8d8372bf60fc252c8228a995ef4034',
  'products/music/logo-dark.svg':'2e5b625d95e7db214257cf8c5b1d1834abef447b',
  'products/music/artwork/library-hero.svg':'26e23e471b8ed2acf44389205e620fac02784755',
  'products/notify/app-icon.svg':'cd95f8f3e578b70691e738f63646ff9c06e2d7f3',
  'products/notify/logo.svg':'3b292de275815b855e06010b3cd83fccc146063e',
  'products/notify/logo-dark.svg':'ff09790832571536c5db62f08df3fd52678a9e0d',
  'products/photos/app-icon.svg':'3231d720b1ae17a2c49f4d58e98c60acd331118a',
  'products/photos/logo.svg':'88091928819ba91539240fc024d3d0dc54eab1fb',
  'products/photos/logo-dark.svg':'9195bb3dfcdd545c8beae0e9a8d8d61452a07b5f',
  'products/messenger/app-icon.svg':'3422fc05429233a22b7f543a69cb9d78c2fd91d4',
  'products/messenger/logo.svg':'2169ba4d003fa36beb4c6ff6ec2c66a2d9e4cd5d',
  'products/messenger/logo-dark.svg':'61195af10615b917438fab22eb6357b0e2e86fa6',
  'products/browser-mobile/app-icon.svg':'c82371aa6fadd45eb26610bf4907e64122d15b12',
  'products/browser-mobile/logo.svg':'f21054e801b5ed909004d69220418153e0367961',
  'products/browser-mobile/logo-dark.svg':'2bdf175bc963e437717294283de5fc88df230d2b',
  'products/browser-mobile/symbol.svg':'d5f96e5dfac25588f4c4a95ac3277adc33d3cafa',
  'products/browser-mobile/monochrome.svg':'56fd59404c83ac8c26416c3a824f8511cf2191d2',
  'products/browser/logo.svg':'5380ea8aebdddc1415ad20742b0b94c5793d3755',
  'products/browser/logo-dark.svg':'734348ecd3d7464d6254a6342a7e2c34fec4844e'
};

let failures=0;
for(const [name,sha] of Object.entries(expected)){
  try{
    const data=readFileSync(new URL('../'+name,import.meta.url));
    const actual=createHash('sha1').update('blob '+data.length).update(Buffer.from([0])).update(data).digest('hex');
    if(actual!==sha)throw new Error('source identity mismatch: '+actual);
    console.log('PASS '+name);
  }catch(error){
    console.error('FAIL '+name+': '+error.message);
    failures++;
  }
}
// The founder's permanent GoreeCloud umbrella source must not be modified.
try {
  const png=readFileSync(new URL('../brand/goreecloud/profile-logo-1024.png',import.meta.url));
  if (!png.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) ||
      png.readUInt32BE(16)!==1024 || png.readUInt32BE(20)!==1024 ||
      png[24]!==8 || png[25]!==6) {
    throw new Error('expected original 1024x1024 8-bit RGBA PNG');
  }
  const actual=createHash('sha256').update(png).digest('hex');
  if (actual!=='ac5c76fda60abbf5fc65957b18a3b4053dccb4b3cb42687dcd0bb428709c69e8')
    throw new Error('original umbrella PNG SHA-256 mismatch');
  console.log('PASS founder permanent GoreeCloud umbrella logo master');
} catch (e) {
  console.error('FAIL founder permanent GoreeCloud umbrella logo master: '+e.message);
  failures++;
}
if(failures)process.exitCode=1;
console.log('Source identity files checked:',Object.keys(expected).length);
