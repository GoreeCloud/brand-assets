/** Build first-party AI Chatroom light/dark wordmarks from the central icon. */
import {readFile, writeFile} from 'node:fs/promises';
const folder = new URL('../products/ai-chatroom/', import.meta.url);
const icon = await readFile(new URL('app-icon.svg', folder), 'utf8');
if (!icon.startsWith('<svg xmlns="http://www.w3.org/2000/svg"') ||
    !icon.includes('viewBox="0 0 512 512"') ||
    !icon.includes('</svg>')) {
  throw new Error('Unexpected AI Chatroom icon source; refusing to make wordmarks');
}
const inner = icon.slice(icon.indexOf('>') + 1, icon.lastIndexOf('</svg>'));
for (const [file, dark] of [['logo.svg', false], ['logo-dark.svg', true]]) {
  const main = dark ? '#F2F4FB' : '#1B2030';
  const subtle = dark ? '#CED5E5' : '#505B70';
  const lines = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 770 160" role="img" aria-labelledby="wordmark-title wordmark-description">',
    '<title id="wordmark-title">AI Chatroom</title>',
    '<desc id="wordmark-description">AI Chatroom wordmark and original double-conversation mark.</desc>',
    '<svg x="8" y="8" width="144" height="144" viewBox="0 0 512 512">' + inner + '</svg>',
    '<text x="170" y="96" fill="' + main + '" font-family="system-ui, Arial, sans-serif" font-size="61" font-weight="750" letter-spacing="-2">AI Chatroom</text>',
    '<text x="176" y="130" fill="' + subtle + '" font-family="system-ui, Arial, sans-serif" font-size="18" font-weight="750" letter-spacing="5">GOREECLOUD</text>',
    '</svg>', '',
  ];
  await writeFile(new URL(file, folder), lines.join('\n'));
  console.log('GENERATED ai-chatroom/' + file);
}
