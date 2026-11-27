/**
 * The gate's own test. Reproduces every way a flattened-text matcher has
 * been found to miss forbidden text, against the function that ships.
 *
 * Each case here was a real miss first, run against the real scanPage, and
 * only then fixed. Do not delete one because it looks obvious; it looked
 * obvious afterwards every time.
 *
 * Run: node scripts/gate.test.mjs
 */
import { chromium } from 'playwright';
import { FORBIDDEN } from './shot-targets.mjs';
import { scanPage } from './refresh-shots.mjs';

const serialised = FORBIDDEN.map((r) => ({ label: r.label, source: r.re.source, flags: r.re.flags }));
const browser = await chromium.launch();
const page = await browser.newPage();

async function scan(body) {
  await page.setContent(`<!doctype html><body style="margin:0;font:20px sans-serif">${body}</body>`);
  const hits = await page.evaluate(scanPage, { serialised, thirdParty: true });
  return { hits, texts: hits.map((h) => h.text) };
}

const name = (t) => /Nash\s+Construction/i.test(t);
const phone = (t) => /\d{3}.\d{3}.\d{4}/.test(t);

const results = [];
const check = (ok, what, detail) => {
  results.push([ok, what]);
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${what}${detail ? `  ${detail}` : ''}`);
};

// 1. A name split by inline markup lives in two text nodes; matching node by
//    node finds neither half.
{
  const { hits, texts } = await scan('<p>Nash <span>Construction</span> builds things.</p>');
  check(texts.some(name), 'a name split across text nodes by inline markup is caught');
  check(hits.length > 0 && hits.every((h) => h.w > 0 && h.h > 0), 'every hit carries a measured pixel rectangle');
}

// 2. re.exec() on a non-global expression returns only the FIRST match in a
//    string. Two numbers in one paragraph, the second one inside the crop.
{
  const { texts } = await scan('<p>Call 207 572 0502 or 603 714 8370 today.</p>');
  const n = texts.filter(phone).length;
  check(n >= 2, 'both numbers inside one text node are caught', `(${n}/2)`);
}

// 3. A rendered line break is a space the text nodes do not contain, so
//    joining them with nothing gives "NashConstruction" and \s+ fails.
//    All three of these shipped as misses.
for (const [what, html] of [
  ['a <br> between the two words', '<p>Nash<br>Construction builds things.</p>'],
  ['two adjacent block elements', '<div>Nash</div><div>Construction</div>'],
  ['a heading above a paragraph', '<h1>Nash</h1><p>Construction, est. 1976</p>'],
]) {
  const { texts } = await scan(html);
  check(texts.some(name), `a name broken across lines is caught: ${what}`);
}

// 4. The opposite error: inserting separators everywhere would break a
//    number whose digits sit in adjacent spans with no gap between them.
{
  const { texts } = await scan('<p><span>207</span>-<span>432</span>-<span>9492</span></p>');
  check(texts.some(phone), 'a number split across spans with no rendered gap is still caught');
}

// 5. A clean page must stay clean, or the weekly job fails on nothing.
{
  const { hits } = await scan('<h1>Craftsmanship you can stand on</h1><p>Design, build, finish. Call 555-0100.</p>');
  check(hits.length === 0, 'a page with nothing forbidden on it produces no hits', JSON.stringify(hits.map((h) => h.text)));
}

await browser.close();
const failed = results.filter(([ok]) => !ok).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
