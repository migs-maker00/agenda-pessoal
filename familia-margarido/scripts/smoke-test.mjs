#!/usr/bin/env node
/** Smoke test — Família Margarido™ */
const BASE = process.env.BASE || 'http://localhost:5174';

const paths = [
  '/',
  '/css/styles.css',
  '/js/data.js',
  '/js/app.js',
  '/assets/coat-of-arms.svg',
];

const requiredInHtml = [
  'FAMÍLIA MARGARIDO',
  'id="dinastia"',
  'id="genealogia"',
  'id="ranking"',
  'id="historia"',
  'id="arquivos"',
  'id="crest"',
  'id="members-grid"',
  'id="dashboard-grid"',
  'easter-hidden-btn',
];

const requiredInData = [
  'monique', 'rafael', 'maria-antonia', 'maria', 'pedrinho',
  'toninho', 'margarete', 'sofia', 'evaristo', 'ana-cristina', 'edileusa',
  'RANKING_CATEGORIES', 'GENEALOGY', 'DOCUMENTS', 'TIMELINE',
];

let failed = 0;

async function check(path) {
  const url = BASE + path;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`FAIL ${path} → ${res.status}`);
    failed++;
    return null;
  }
  console.log(`OK   ${path} → ${res.status}`);
  return path.endsWith('.js') || path === '/' ? res.text() : null;
}

async function main() {
  console.log(`Testing ${BASE}\n`);
  let html = '';
  let dataJs = '';

  for (const p of paths) {
    const body = await check(p);
    if (p === '/') html = body || '';
    if (p === '/js/data.js') dataJs = body || '';
  }

  for (const s of requiredInHtml) {
    if (!html.includes(s)) {
      console.error(`FAIL HTML missing: ${s}`);
      failed++;
    } else {
      console.log(`OK   HTML contains: ${s}`);
    }
  }

  for (const s of requiredInData) {
    if (!dataJs.includes(s)) {
      console.error(`FAIL data.js missing: ${s}`);
      failed++;
    } else {
      console.log(`OK   data.js contains: ${s}`);
    }
  }

  console.log(failed ? `\n${failed} failure(s)` : '\nAll checks passed.');
  process.exit(failed ? 1 : 0);
}

main().catch(e => { console.error(e); process.exit(1); });
