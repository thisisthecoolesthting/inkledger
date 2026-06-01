#!/usr/bin/env node
/** Quick internal link audit — run after build: node scripts/verify-site-links.mjs */
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const src = join(root, 'src');

function walk(dir, ext, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, ext, out);
    else if (p.endsWith(ext)) out.push(p);
  }
  return out;
}

const built = new Set();
if (existsSync(dist)) {
  for (const f of walk(dist, '.html')) {
    let rel = f.slice(dist.length).replace(/\\/g, '/');
    if (rel.endsWith('/index.html')) rel = rel.slice(0, -'/index.html'.length) || '/';
    else rel = rel.replace(/\.html$/, '');
    if (!rel.startsWith('/')) rel = '/' + rel;
    built.add(rel.replace(/\/$/, '') || '/');
    built.add((rel.replace(/\/$/, '') || '/') + '/');
  }
}

const hrefRe = /href=["']([^"'#?]+)["']/g;
const internal = new Set();
for (const f of [...walk(src, '.astro'), ...walk(src, '.md')]) {
  const text = readFileSync(f, 'utf8');
  let m;
  while ((m = hrefRe.exec(text))) {
    const h = m[1];
    if (h.startsWith('/') && !h.startsWith('//')) internal.add(h.replace(/\/$/, '') || '/');
  }
}

const IGNORE = new Set(['/favicon.svg', '/rss.xml', '/sitemap.xml']);
const missing = [...internal].filter((h) => {
  const bare = h.replace(/\/$/, '') || '/';
  if (bare === '/' || IGNORE.has(bare)) return false;
  return !built.has(bare) && !built.has(bare + '/');
});

console.log(`Built routes: ${built.size}`);
console.log(`Internal hrefs scanned: ${internal.size}`);
if (missing.length) {
  console.error('Missing routes:');
  missing.sort().forEach((h) => console.error('  ', h));
  process.exit(1);
}
console.log('All scanned internal links resolve to built pages.');
