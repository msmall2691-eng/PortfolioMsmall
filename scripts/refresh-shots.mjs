/**
 * Re-capture the live sites shown on the portfolio.
 *
 * Run: node scripts/refresh-shots.mjs [--check]
 *   --check  capture and verify, but write nothing
 *
 * WHY THIS EXISTS. The screenshots on the page were a year out of date and
 * nobody noticed, because nothing re-checked them. Two of Megan's own sites
 * had been fully redesigned while the portfolio still showed the old ones.
 *
 * THE SAFETY GATE IS THE POINT, not the screenshotting. Client names must
 * not appear on the portfolio, and a fixed crop box cannot promise that: if
 * a client redesigns, the box keeps "working" while quietly framing their
 * name. So before anything is written, every forbidden string is located in
 * the LIVE DOM, its pixel rectangle measured, and the job refuses to write a
 * file if any of them lands inside the kept region.
 *
 * A refusal is the job doing its work. Re-frame the crop in shot-targets.mjs
 * and run again; do not widen the rules to make it pass.
 */
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { FORBIDDEN, TARGETS } from './shot-targets.mjs';

const CHECK_ONLY = process.argv.includes('--check');
const VIEWPORT = { width: 1280, height: 720 };
const SCALE = 2; // capture is VIEWPORT * SCALE, so 2560x1440

/** Every pixel rect in the page whose text matches a forbidden rule. */
/**
 * Runs INSIDE the page. Exported so the test exercises the same function
 * that ships, rather than a copy that can drift from it.
 */
export function scanPage({ serialised, thirdParty }) {
  const rules = serialised.map((r) => ({ label: r.label, re: new RegExp(r.source, r.flags) }));
  const hits = [];
  /*
    Flatten every text node into ONE string, keeping a map back to the node
    and offset each character came from, then match over the flat string.

    Matching node by node, which is the obvious way, has two holes, and both
    were reproduced before this was rewritten:

      1. A name split by inline markup -- `Nash <span>Construction</span>`
         -- lives in two text nodes, so neither one matches and the gate
         reports the frame clean while the name is plainly visible.
      2. `re.exec()` on a non-global expression returns only the FIRST
         match in a node. Two numbers in one paragraph, first outside the
         crop and second inside, and the gate passes.

    Concatenating without separators means text from unrelated blocks
    becomes adjacent, so a paragraph ending "Nash" followed by one starting
    "Construction" is flagged. That is a false positive, and it is the
    direction to err in: a false positive costs a re-frame, a false
    negative puts a client's name on the page.
  */
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const map = [];
  let flat = '';
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const text = n.nodeValue || '';
    if (!text) continue;
    map.push({ node: n, start: flat.length, end: flat.length + text.length });
    flat += text;
  }
  const locate = (i) => {
    for (const e of map) if (i >= e.start && i < e.end) return { node: e.node, offset: i - e.start };
    return null;
  };

  for (const { label, re } of rules) {
    const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
    let m;
    while ((m = g.exec(flat)) !== null) {
      if (m[0].length === 0) { g.lastIndex += 1; continue; } // never spin
      const a = locate(m.index);
      const b = locate(m.index + m[0].length - 1);
      if (!a || !b) continue;
      const range = document.createRange();
      range.setStart(a.node, a.offset);
      range.setEnd(b.node, b.offset + 1);
      for (const r of range.getClientRects()) {
        if (r.width < 1 || r.height < 1) continue;
        hits.push({ label, text: m[0], x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height });
      }
    }
  }
  // Logos are images, not text, so match them separately -- and only on
  // sites Megan does not own. Her own wordmark on her own site is fine.
  if (thirdParty) for (const el of document.querySelectorAll('img, svg, [class*="logo" i], [id*="logo" i]')) {
    const hay = `${el.getAttribute('alt') || ''} ${el.getAttribute('src') || ''} ${el.className?.baseVal ?? el.className ?? ''} ${el.id || ''}`;
    if (!/logo|wordmark|brand/i.test(hay)) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) continue;
    hits.push({ label: 'logo', text: hay.trim().slice(0, 60), x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height });
  }
  return hits;
}

async function findForbidden(page, rules, thirdParty) {
  return page.evaluate(scanPage, {
    serialised: rules.map((r) => ({ label: r.label, source: r.re.source, flags: r.re.flags })),
    thirdParty,
  });
}

/** Swap text in the live DOM so it renders in the site's own type. */
async function applyReplacements(page, rules) {
  if (!rules?.length) return 0;
  return page.evaluate((serialised) => {
    const rules = serialised.map((r) => ({ re: new RegExp(r.source, r.flags), with: r.with }));
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const todo = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) todo.push(n);
    let count = 0;
    for (const n of todo) {
      const before = n.nodeValue;
      let after = before;
      for (const r of rules) after = after.replace(r.re, r.with);
      if (after !== before) { n.nodeValue = after; count += 1; }
    }
    return count;
  }, rules.map((r) => ({ source: r.find.source, flags: r.find.flags, with: r.with })));
}

const overlaps = (hit, [cx0, cy0, cx1, cy1]) => {
  const x0 = hit.x * SCALE, y0 = hit.y * SCALE;
  const x1 = x0 + hit.w * SCALE, y1 = y0 + hit.h * SCALE;
  return x0 < cx1 && x1 > cx0 && y0 < cy1 && y1 > cy0;
};

const main = async () => {
  const browser = await chromium.launch();
  const problems = [];
  const written = [];

  for (const t of TARGETS) {
    const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: SCALE });
    try {
      await page.goto(t.url, { waitUntil: 'networkidle', timeout: 60_000 });
      await page.waitForTimeout(2500);

      // Replace first, THEN look for forbidden text. Checking the page as
      // the camera will actually see it is the only check worth having.
      const swapped = await applyReplacements(page, t.replace);
      await page.waitForTimeout(250);

      const hits = await findForbidden(page, FORBIDDEN, Boolean(t.thirdParty));
      const unhandled = hits.filter((h) => overlaps(h, t.crop));

      if (unhandled.length) {
        problems.push(
          `${t.name} (${t.url})\n` +
            unhandled
              .map((h) => `    ${h.label}: "${h.text}" at ${Math.round(h.x)},${Math.round(h.y)}`)
              .join('\n'),
        );
        console.log(`  ${t.name}: REFUSED — ${unhandled.length} forbidden item(s) inside the crop`);
        continue;
      }

      const [cx0, cy0, cx1, cy1] = t.crop;
      const shot = await page.screenshot({
        clip: { x: cx0 / SCALE, y: cy0 / SCALE, width: (cx1 - cx0) / SCALE, height: (cy1 - cy0) / SCALE },
      });
      const raw = `/tmp/shot-${t.name}.png`;
      await writeFile(raw, shot);
      console.log(
        `  ${t.name}: ${swapped} text node(s) replaced, ` +
          `${hits.length} forbidden on page, ${unhandled.length} inside the crop`,
      );
      written.push({ t, raw });
    } catch (err) {
      problems.push(`${t.name} (${t.url})\n    capture failed: ${String(err).slice(0, 140)}`);
      console.log(`  ${t.name}: FAILED — ${String(err).slice(0, 90)}`);
    } finally {
      await page.close();
    }
  }
  await browser.close();

  if (problems.length) {
    console.error('\nNOT WRITING ANYTHING. Forbidden content was in frame, or a capture failed:\n');
    console.error(problems.map((p) => '  ' + p).join('\n\n'));
    console.error('\nRe-frame the crop in scripts/shot-targets.mjs. Do not loosen the rules.\n');
    process.exit(1);
  }
  if (CHECK_ONLY) {
    console.log(`\n--check: all ${written.length} frames clean. Nothing written.`);
    return;
  }

  // PNG -> WebP with ffmpeg rather than adding an image library. The repo
  // ships WebP and these are large photographic captures.
  for (const { t, raw } of written) {
    await mkdir(dirname(t.out), { recursive: true });
    /*
      Normalised to 1280x720 so every capture lands at the size the page
      already expects, whatever the crop was. lanczos because these are
      photographic and the default scaler softens text in the screenshots.
    */
    execFileSync('ffmpeg', [
      '-y', '-loglevel', 'error', '-i', raw,
      '-vf', 'scale=1280:720:flags=lanczos',
      '-quality', '88', t.out,
    ]);
    console.log(`  wrote ${t.out}`);
  }
  console.log(`\nAll ${written.length} frames clean and written.`);
};

/*
  Only run when this file IS the command. Without the guard, importing it --
  which the gate test does, so the test exercises the shipped function rather
  than a copy -- would silently fire the whole capture-and-write job.
*/
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
