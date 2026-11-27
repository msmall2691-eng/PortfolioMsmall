// Rebuilds public/Megan-Small-Resume.pdf from resume/resume.html.
// Run from the repo root:  node resume/build-pdf.mjs   (needs Playwright + Chromium)
//
// Pass a path to render somewhere else instead, so a draft can be checked
// before it replaces the PDF the site serves:
//   node resume/build-pdf.mjs /tmp/preview.pdf
//
// Before writing, the rendered page is checked for client names. The résumé
// is downloadable from the portfolio, so the same rule applies to it as to
// the page: client work is described, not named. This check exists because
// the rule was once kept on the site and broken in the PDF -- a PDF that was
// built somewhere else and dropped into public/, where no text search over
// the repo would ever have found it.
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { FORBIDDEN } from '../scripts/shot-targets.mjs';

// Only the rules that identify someone else. Megan's own phone number and
// address belong on a résumé and are deliberately there; the phone rule in
// FORBIDDEN is for screenshots of web pages, not for this.
const CLIENT_RULES = FORBIDDEN.filter(
  (r) => r.label === 'client name' || r.label === 'client domain' || r.label === 'business email',
);

const here = path.dirname(fileURLToPath(import.meta.url));
const out = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(here, '..', 'public', 'Megan-Small-Resume.pdf');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('file://' + path.join(here, 'resume.html'));
await page.waitForTimeout(500);

// innerText, not the HTML source: it flattens the rendered tree, so a name
// split by inline markup ("Nash <span>Construction</span>") still reads as
// one string. That split is exactly how the screenshot gate was first fooled.
const text = await page.evaluate(() => document.body.innerText);
const hits = CLIENT_RULES.filter((r) => r.re.test(text)).map(
  (r) => `${r.label}: ${text.match(r.re)[0]}`,
);
if (hits.length) {
  await browser.close();
  console.error('Refusing to write the résumé. The rendered page contains:');
  for (const h of hits) console.error('  - ' + h);
  console.error('\nDescribe the client by sector instead, as content/resume.ts does.');
  process.exit(1);
}

await page.pdf({
  path: out,
  format: 'Letter',
  preferCSSPageSize: true,
  printBackground: true,
  tagged: true,
});
await browser.close();
console.log('Wrote ' + out);
