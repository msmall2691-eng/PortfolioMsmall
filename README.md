# Megan Small — Portfolio

**Live: https://megan.mlinx.studio**

Single-page portfolio and résumé. Static site, no backend, no sign-in anywhere.

Built from the `design_handoff_portfolio` package: the HTML prototype in that
handoff was a design reference, and this repo is the production recreation in
the stack the handoff recommended.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · static export (`output: 'export'`)

---

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

To produce the deployable site:

```bash
npm run build
```

That writes a fully static site to `out/`. There is no server component to run —
any static host will serve it.

```bash
npm run typecheck
```

---

## Deploying

Already deployed. Vercel project **`msmall`** (team `msmall2691-engs-projects`) is
connected to this repo, so **any push to `main` builds and ships automatically**.

- Production: https://megan.mlinx.studio
- Vercel default: https://msmall-kappa.vercel.app

`output: 'export'` means the build produces static files — no serverless functions,
nothing to keep warm.

`mlinx.studio` sits on Vercel's own nameservers, so the subdomain's DNS record and
TLS certificate are managed by Vercel. Adding another subdomain later needs no
registrar changes: add it under **Project → Settings → Domains**.

---

## Résumé PDF

`public/Megan-Small-Resume.pdf` is generated from `resume/resume.html`. Edit the
HTML, then run `node resume/build-pdf.mjs` (needs Playwright with Chromium) and
commit both files. Keep it two pages, keep its links on megan.mlinx.studio, and
keep it in step with `content/resume.ts`.

## Sharing

Link previews use `public/og.jpg` (1200×630) and the URLs in `app/layout.tsx`,
built from `siteUrl` in `content/site.ts`. The favicon is `app/icon.svg`.

## How it's organised

```
app/
  layout.tsx        fonts, metadata, <html> shell
  page.tsx          section order
  globals.css       design tokens (@theme) + base styles
components/         one file per section, plus shared primitives in ui.tsx
content/            ALL copy and data — typed, no JSX
public/             résumé PDF and images
```

**Copy and data live in `content/`, never in components.** To change a number, a
project description, a résumé bullet or a link, edit the content file. Components
only decide how things look.

| File | Holds | On the page? |
| --- | --- | --- |
| `content/home.ts` | Intro, projects, more work, GitHub, about | **Yes** |
| `content/data.ts` | KPIs, the three charts, the DAX sample | **Yes** |
| `content/site.ts` | Profile, links, nav, hero, about, footer | **Yes** (profile/links/nav) |
| `content/caseStudies.ts` | The `/work/[slug]/` case studies | **Yes** |
| `content/skills.ts` | Toolkit groups and credentials | **Yes** — `#skills` |
| `content/resume.ts` | Web résumé and contact row | **Yes** — `#resume` |
| `content/work.ts` | Case study, selected work, more builds | No — see below |
| `content/mock.ts` | Sample data for the BrightBase product mocks | No — see below |
| `content/tools.ts` | M Studio tools list | No — see below |

### Page order

`app/page.tsx` renders, in order: `Intro`, `Projects`, `About`, **`Toolkit`**,
`DataSection`, `MoreWork`, **`ResumeSection`**.

`Toolkit` and `ResumeSection` were remounted in Nov 2026 after the Nov 7
compact rewrite had left them orphaned. Each one owns an anchor that a compact
stand-in in `components/Home.tsx` had been holding, so remounting meant handing
the anchor back:

- **`Toolkit` owns `#skills`.** The About section's inline skills column was
  removed; About is now a two-column grid (headshot + prose). The data it used,
  `aboutShort.skills`, is kept in `content/home.ts` but is no longer rendered.
- **`ResumeSection` owns `#contact`** (on its inner `Container`; the `<section>`
  is `#resume`). It supersedes `Home.tsx`'s `Contact` strip, which is no longer
  rendered — `ResumeSection` carries the same PDF download plus the full résumé
  card and a four-link contact row. The `Contact` export is left in place so the
  strip can be restored.

Mounting both without that handover would put two `id="skills"` and two
`id="contact"` on one page, and show the skills and contact blocks twice.

### Sections still not mounted

Complete and typechecked, but imported by no route:

`Work.tsx` · `Hero.tsx` · `About.tsx` · `CodeYear.tsx` · `BrightBaseMock.tsx` ·
`ToolsSection.tsx`

Keep their content files truthful anyway: mounting a stale section is worse
than mounting none. To put one back, import it in `app/page.tsx`, add it to
`nav` in `content/site.ts`, and check first whether its anchors collide with a
section already on the page.

### Things stated in more than one place

These are defined once and derived everywhere, so the copies cannot drift:

- **Years in business** — `YEARS_IN_BUSINESS` / `YEARS_IN_BUSINESS_WORD` in
  `content/site.ts`. Feeds the hero lede, the About fact row, the Toolkit's
  Operations group and the résumé summary.
- **Email, links, résumé path** — `profile` and `links` in `content/site.ts`.

---

## Before launch

Open items carried over from the design handoff. Items 3, 4 and 5 are closed. Each one is marked with a
`NOTE (open item)` comment at the exact line in `content/`.

### 1. Case studies live on this site

The M Studio Tools and M Linx Guide case studies are pages at
`/work/m-studio-tools/` and `/work/m-linx-guide/`, written in
`content/caseStudies.ts` and rendered by `app/work/[slug]/page.tsx`. They replaced
private claude.ai links, so no link on the site depends on Claude's sharing
settings. The operations dashboard entry points at the Data section.

### 2. Years running the business — ✅ done

Settled at **8**. All five role-targeted résumés (Nov 2026) open with "Eight
years running a cleaning company", and 2018–2026 agrees. `YEARS_IN_BUSINESS`
in `content/site.ts` already said 8, so nothing changed here. If mlinx.studio
still says 10, that is the side to correct.

### 3. BrightBase automated-test count — ✅ done

Counted against `msmall2691-eng/Bright-Space` @ `5789aa6`: 2,656 backend pytest
functions across 365 files, 1,522 frontend cases across 200 files — 4,178 total,
and `test_sub_payouts.py` has exactly 19, confirming the ledger figure. Both
suites run in CI on every pull request.

The copy says "4,100+" so it stays true as the suite grows. Re-count and update
`requirement.note` in `content/work.ts` if you ever want the exact number.

### 4. USM dashboard description — ✅ done

Replaced from the real model in `msmall2691-eng/powerbi-portfolio`: degree
progress, a Fall 2026 workload view over 73 deadlines, and a what-if parameter
for terms remaining at any credit load. Links to that public repo.

### 5. Power BI — ✅ done, and better than planned

The handoff expected a PDF. `msmall2691-eng/powerbi-portfolio` is public and
holds four **.pbip** projects instead — TMDL semantic models and PBIR reports,
so every table, measure and visual is readable and diffable in Git. That beats
a flat export, so the Data section links to the repo rather than hosting a PDF.

Two things on the page come from that repo and need re-checking if it changes:
the "68 DAX measures across 4 models" KPI, and the DAX sample, which must stay
copied verbatim from a measure that is actually published. An earlier draft
showed a "Rebook Rate" measure that does not exist in the model.

---

## Privacy rules — keep these

- No client names, addresses, gate codes, phone numbers, revenue-by-client or
  private links anywhere on the page.
- Every figure in the product mocks (`content/mock.ts`) and in the turnover
  spotlight is **invented sample data** and must stay that way. The office mock
  carries a visible "sample data" badge on that promise.
- Google reviews show first name + last initial only.
- Screenshots have customer details removed.

---

## Accessibility and behaviour

- Nav links are smooth-scroll anchors; `prefers-reduced-motion` is respected for
  both scrolling and transitions.
- The sticky header wraps to two or three rows on narrow screens, so
  `components/HeaderOffset.tsx` publishes its measured height as `--header-h`
  and the `.section-anchor` utility uses it as the scroll offset. Anchors land
  clear of the header at every width. CSS fallbacks cover the no-JS case.
- The case-study and résumé panels stay mounted and toggle the `hidden`
  attribute, so `aria-controls` always resolves to a real element.
- Chart tabs use `role="tablist"` / `role="tab"` with `aria-selected`.
- External links open in a new tab with `rel="noopener"`.
- The résumé downloads from a plain `<a download>` to `/Megan-Small-Resume.pdf` —
  no sign-in, no JavaScript required.
- Focus ring: 2px `#9184d9`, 3px offset, on `:focus-visible`.

### Chart scaling

`barWidth()` in `content/data.ts` scales percentage charts against a full 100%
track and count charts against their own largest row. Crew coverage is a
percentage metric, so 95.9% renders as 95.9% of the track — not as a full bar.
Keep that distinction if you add a chart.

---

## Images

Source screenshots were 4.7 MB of PNG. They are resized and re-encoded as WebP
(0.55 MB total) at roughly 2× their largest rendered size.

`next/image` optimisation is off (`images.unoptimized`) because a static export
has no server to optimise at request time — so the files in `public/img/` are
already the optimised versions. If you replace one, size it yourself: about 2×
its CSS display width, WebP, quality ~82.

---

## Video

`public/video/reef-day.mp4` is the ambient band between More work and the
résumé (`content/ambient.ts`, `components/Ambient.tsx`). It is decorative —
the page reads the same without it, which is why the `<video>` is
`aria-hidden` and the section has no heading.

The clip is AI-generated in Adobe Firefly and carries a visible credit. Keep
the credit: it is the same honesty rule the product mocks follow for invented
data.

Encoded from a 1080p original to **854×480 H.264, CRF 31** — 377 KB, trimmed
to its calmest six seconds. VP9/WebM was tried and came out *bigger* on this
footage, so MP4 is the only source. Re-check that before adding a format.

The band costs **nothing** on first paint: `preload="none"` means the file is
not fetched until something asks to play. Playback rules, in order:

1. `prefers-reduced-motion` wins — no autoplay, and the file is never
   downloaded at all.
2. Otherwise an `IntersectionObserver` plays it only while the band is on
   screen and pauses it on the way out.
3. The pause control always overrides.

**The pause control is required, not decoration.** WCAG 2.2.2 says motion that
plays automatically for more than five seconds must be pausable, and this
loops. Keep it visible and keyboard reachable; do not hide it behind a hover.

The band's edges fade to whatever sits either side — top to `#f7f6f2`
(`--color-page`), bottom to `#efece5` (the résumé section), and the band's
own section carries `#efece5` so the two run together with no seam. If either
colour changes, change the matching gradient stop with it.

The credit sits *below* the band, not over it. An earlier pass overlapped it
onto the footage and grey-on-blue was unreadable.

## Design tokens

All colour, radius and layout tokens come from the Nocturne theme in the handoff
and live in the `@theme` block in `app/globals.css`. Change them there, not in
components.

## Fonts

Inter and JetBrains Mono are **committed to the repo** in `app/fonts/` and loaded
with `next/font/local`.

They are deliberately not loaded with `next/font/google`, which fetches from
Google at build time: that makes the build fail if the font request fails, which
it did here. Local files mean the build needs no network at all and cannot break
on someone else's service.

Both files are variable fonts — one file covers the whole weight range (Inter
400–700, JetBrains Mono 400–500) — and carry the `latin` subset, 78 KB together.

`latin` covers every character on the page, including é/É, –, —, ’, ·, ° and the
↑ ↓ arrows. Four characters fall back to the system font: → ↗ ▪ ●. Those are
absent from Google's `latin-ext` subset too, so they fell back in the original
design prototype as well — this is not a regression.

If you add copy needing other scripts, download that subset's woff2 into
`app/fonts/` and add it to the `src` array in `app/layout.tsx`.
