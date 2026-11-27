/**
 * The gate's own test. Reproduces the two ways a node-by-node matcher
 * misses forbidden text, against the function that actually ships.
 *
 * Run: node scripts/_gate-test.mjs
 */
import { chromium } from 'playwright';
import { FORBIDDEN } from './shot-targets.mjs';
import { scanPage } from './refresh-shots.mjs';

const HTML = `<!doctype html><body style="margin:0;font:20px sans-serif">
  <p>Nash <span>Construction</span> builds things.</p>
  <p>Call 207 572 0502 or 603 714 8370 today.</p>
</body>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(HTML);

const hits = await page.evaluate(scanPage, {
  serialised: FORBIDDEN.map((r) => ({ label: r.label, source: r.re.source, flags: r.re.flags })),
  thirdParty: true,
});
await browser.close();

const texts = hits.map((h) => h.text);
const split = texts.some((t) => /Nash\s+Construction/i.test(t));
const phones = texts.filter((t) => /\d{3}.\d{3}.\d{4}/.test(t));
const boxed = hits.length > 0 && hits.every((h) => h.w > 0 && h.h > 0);

console.log('hits:', JSON.stringify(texts));
const results = [
  [split, 'a name split across text nodes by inline markup is caught'],
  [phones.length >= 2, `both numbers inside one text node are caught (${phones.length}/2)`],
  [boxed, 'every hit carries a measured pixel rectangle'],
];
for (const [ok, what] of results) console.log(`${ok ? 'PASS' : 'FAIL'}  ${what}`);
process.exit(results.every(([ok]) => ok) ? 0 : 1);
