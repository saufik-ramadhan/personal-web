// A review gate for CV facts, evidence and all five website translations.
// --record acknowledges a completed human/agent translation review; it does
// not translate prose, publish the site or regenerate CVs.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baselinePath = path.join(root, 'profile-sync.json');
const record = process.argv.includes('--record');
const cvArg = process.argv.indexOf('--cv-dir');
const cv = path.resolve(cvArg < 0 ? path.join(root, '../output/KCCI-Tailored-Applications') : process.argv[cvArg + 1]);
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/js/content.js'), 'utf8'), context);
const { LANGS, UI, SECTIONS, CONTENT: c } = JSON.parse(JSON.stringify(context.window.SITE));
const codes = LANGS.map(l => l.code);
assert.deepEqual(codes, ['en', 'id', 'ko', 'ja', 'zh']);
const hash = x => crypto.createHash('sha256').update(typeof x === 'string' ? x : JSON.stringify(x)).digest('hex');

function translations(value, key = 'content') {
  if (!value || typeof value !== 'object') return;
  // `id` also names a record identifier; it alone is not a locale object.
  if (codes.filter(code => code !== 'id').some(code => Object.hasOwn(value, code))) {
    for (const code of codes) assert.equal(typeof value[code] === 'string' && !!value[code].trim(), true, `${key}: missing ${code}`);
    return;
  }
  for (const [k, v] of Object.entries(value)) translations(v, `${key}.${k}`);
}
translations({ UI, SECTIONS, CONTENT: c });
assert.equal(c.certifications.length, 0, 'Only publish independently confirmed certifications');
assert(!JSON.stringify(c).includes('20XX'), 'Remove example facts');
assert(c.meta.name.includes('사우픽 라마단'), 'Retain the user-confirmed Korean spelling');
assert(c.about.skills[0].items.includes('ESP-NOW'), 'Hardware skills must come first');
for (const skill of ['C#', 'WPF']) assert(c.about.skills.some(g => g.items.includes(skill)), `Missing ${skill}`);
assert.equal(c.languages[1].level, undefined, 'Do not infer a proficiency rating from the test score');
const projects = [...c.electronics, ...c.software, ...c.design];
for (const item of projects) {
  for (const image of item.images || []) assert(fs.existsSync(path.join(root, image)), `Missing ${image}`);
  for (const key of ['link', 'demo']) if (item[key]) assert(/^https:\/\//.test(item[key]), `Invalid ${item.id || item.title.en} ${key}`);
}
for (const code of codes) {
  const thesis = c.electronics.find(p => p.id === 'THESIS');
  for (const fact of ['ESP32', 'ESP-NOW', 'MPR', '240', '25', '100%', '5444']) assert(thesis.desc[code].includes(fact), `Thesis ${code}: missing ${fact}`);
  assert(thesis.link.endsWith('/esp32-olsrv2-thesis'));
  const lens = c.software.find(p => p.id === 'LENS');
  assert(lens.desc[code].includes('Qt') && lens.desc[code].includes('12') && !lens.desc[code].includes('WPF'), `LensaLAN ${code}: keep the actual stack`);
  assert(c.electronics.find(p => p.id === 'REFLOW').desc[code].includes('120'), `REFLOW ${code}: retain prototype limit`);
}

const sourceFiles = ['candidate_facts.json', 'project_catalog.json', 'cv_entries.json'];
const hasCV = sourceFiles.every(f => fs.existsSync(path.join(cv, 'data', f)));
const old = fs.existsSync(baselinePath) ? JSON.parse(fs.readFileSync(baselinePath, 'utf8')) : null;
let sources = old?.cv_source_sha256;
if (hasCV) {
  const read = f => JSON.parse(fs.readFileSync(path.join(cv, 'data', f), 'utf8'));
  const facts = read(sourceFiles[0]), catalog = read(sourceFiles[1]), entries = read(sourceFiles[2]);
  sources = Object.fromEntries(sourceFiles.map(f => [f, hash(read(f))]));
  assert.equal(c.meta.name, `${facts.name} (${facts.korean_transliteration})`);
  assert.equal(c.meta.email, facts.email);
  assert.equal(c.education.length, facts.education.length);
  facts.education.forEach((f, i) => {
    assert.equal(c.education[i].period, `${f.start.replace('-', '.')} - ${f.end.replace('-', '.')}`);
    if (f.gpa) for (const code of codes) assert(c.education[i].detail[code].includes(f.gpa));
  });
  assert.equal(c.experience.length, facts.employment.length);
  facts.employment.forEach((f, i) => {
    const item = c.experience[i];
    assert.equal(item.company, f.company);
    for (const code of codes) {
      assert(item.period[code].startsWith(f.start.replace('-', '.')));
      if (f.end !== 'Present') assert(item.period[code].endsWith(f.end.replace('-', '.')));
    }
  });
  for (const id of ['THESIS', 'REFLOW', 'IMU', 'LENS', 'MAGICK']) {
    const item = projects.find(p => p.id === id);
    assert(item, `Missing ${id}`);
    assert.equal(item.link, catalog[id].source);
    assert.equal(item.year, catalog[id].EN.period);
    if (['THESIS', 'REFLOW', 'LENS', 'MAGICK'].includes(id)) assert.equal(item.stack.join(', '), catalog[id].EN.tech);
    for (const language of ['EN', 'KO']) assert(catalog[id][language]?.blocks.length > 0);
  }
  const pairs = new Map();
  for (const e of entries) { if (!pairs.has(e.job_id)) pairs.set(e.job_id, []); pairs.get(e.job_id).push(e); }
  for (const [job, pair] of pairs) {
    assert.deepEqual(pair.map(e => e.language).sort(), ['EN', 'KO'], `${job}: missing CV translation`);
    assert.deepEqual(pair[0].selected_project_ids, pair[1].selected_project_ids, `${job}: project selection differs by language`);
  }
} else {
  assert(!record, 'Cannot record CV synchronization without the CV source bundle');
  console.log('CV source bundle absent: checking the last reviewed website baseline only. Cross-workspace synchronization is not verified.');
}
const baseline = { schema: 1, reviewed_date: new Date().toISOString().slice(0, 10), locales: codes, cv_source_sha256: sources, website_content_sha256: hash({ UI, SECTIONS, CONTENT: c }) };
if (record) {
  fs.writeFileSync(baselinePath, JSON.stringify(baseline, null, 2) + '\n');
  console.log('Recorded reviewed CV and multilingual website fingerprints.');
} else {
  assert(old, 'No reviewed baseline; review all translations then run --record');
  assert.deepEqual(sources, old.cv_source_sha256, 'CV changed: update/review both CV languages and all five website locales, then record');
  assert.equal(baseline.website_content_sha256, old.website_content_sha256, 'Website profile changed: review CV and all locales, then record');
}
console.log(`Profile check passed: ${codes.length} locales, ${c.education.length} education records, ${c.experience.length} employers, ${projects.length} portfolio entries.`);
