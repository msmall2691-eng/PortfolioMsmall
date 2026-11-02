// Rebuilds public/Megan-Small-Resume.pdf from resume/resume.html.
// Run from the repo root:  node resume/build-pdf.mjs   (needs Playwright + Chromium)
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('file://' + path.join(here, 'resume.html'));
await page.waitForTimeout(400);
await page.pdf({
  path: path.join(here, '..', 'public', 'Megan-Small-Resume.pdf'),
  format: 'Letter',
  preferCSSPageSize: true,
  printBackground: true,
  tagged: true,
});
await browser.close();
console.log('Wrote public/Megan-Small-Resume.pdf');
