import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const base = (process.env.BASE_URL || '').replace(/\/+$/, '');
if (!base) throw new Error('set BASE_URL to the live site root (e.g. https://example.com/latticewire/)');

const keyFile = readdirSync(resolve('public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('no 32-hex IndexNow key file found in public/');
const key = keyFile.replace(/\.txt$/, '');
const keyLocation = `${base}/${keyFile}`;

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return res.text();
}

const urlList = [];
const indexHtml = await fetchText(`${base}/sitemap-index.xml`);
const locs = [...indexHtml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
const submaps = locs.filter((u) => /sitemap.*\.xml/.test(u));
if (submaps.length) {
  for (const sm of submaps) {
    const smHtml = await fetchText(sm);
    urlList.push(...[...smHtml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim()));
  }
} else {
  urlList.push(...locs);
}

const host = new URL(base).hostname;
const unique = [...new Set(urlList.map((u) => new URL(u).toString()))].filter((u) => new URL(u).hostname === host);

if (!unique.length) throw new Error('no sitemap URLs found on host ' + host);

const payload = { host, key, keyLocation, urlList: unique };
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
const body = await res.text();
console.log(`indexnow ${host}: HTTP ${res.status} ${res.statusText}${body ? ' — ' + body.slice(0, 120) : ''}`);
console.log(`  urls=${unique.length} keyLocation=${keyLocation}`);
process.exit(res.ok ? 0 : 1);
