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

`public/video/reef-night.mp4` is the ambient band that **opens the page**,
above the intro (`content/ambient.ts`, `components/Ambient.tsx`). It is
decorative — the page reads the same without it, which is why the `<video>`
is `aria-hidden` and the section has no heading.

AI-generated in Adobe Firefly, with a visible credit. Keep the credit: it is
the same honesty rule the product mocks follow for invented data.

**1920×810 H.264, CRF 27 — 1.37 MB**, 3.5 seconds.

### Both the clip and the window were chosen by measurement

This footage varies enormously shot to shot, so do not pick by eye:

- Source sharpness (Laplacian variance) runs **22–92** *within a single
  clip*. The first daylight cut shipped used its softest stretch, scoring
  ~30, and looked blurry for exactly that reason.
- The night clip holds **70–92** across source 2.0–5.5s. That window is what
  is encoded.

Re-measure before changing the clip or the window.

One trap: Laplacian variance over-rewards the bioluminescent particles, so it
rates the night clip high even on frames where the subject is motion-blurred.
Use it to shortlist, then look at the frames.

Compression is not the limiter here. CRF 24, 26 and 28 all measured the same
sharpness (88.5–88.6) — the ceiling is the source. Raise CRF before dropping
resolution. VP9/WebM came out *bigger* on this footage, so MP4 only.

The source is 1920×1080 and the band only shows a horizontal slice, so it is
cropped to 810 tall at encode time rather than by CSS; encoding full height
spends bits on rows nobody sees. Full 1920 width is kept.

### No fades or tint over the footage

An earlier pass faded both edges to `--color-page` and laid a `#f7f6f2/12`
tint on top, tuned for the bright daylight clip. Over dark footage that
greyed the image out and read as blur. A dark band against a light page wants
**crisp edges**. If a light clip is ever used here, that trade reverses.

### Playback

Above the fold, so it loads on arrival rather than on scroll — the page's
heaviest asset. The 83 KB poster paints first and the video streams in
behind it. Rules, in priority order:

1. `prefers-reduced-motion` wins — no autoplay, and the file is never
   downloaded at all.
2. **An explicit pause wins over autoplay.** `userPausedRef` records it and
   the `IntersectionObserver` checks it before calling `play()`. Without that
   the band restarts itself on scrolling away and back, which defeats the
   control. Do not remove it.
3. Otherwise it plays only while on screen and pauses on the way out.

**The pause control is required, not decoration.** WCAG 2.2.2 says motion
that plays automatically for more than five seconds must be pausable, and
this loops. Keep it visible and keyboard reachable. The credit sits below the
band, never over it — grey-on-footage is unreadable.

## The sea-life layer

Creatures cut out of the Firefly footage, drifting faintly behind every page
(`content/drift.ts`, `components/Drift.tsx`, keyframes in `globals.css`).
Nine on the home page, four on each case study.

Decorative and inert: the layer is `aria-hidden`, `pointer-events-none`, sits
at `z-0` under `<main>` (`z-10`) and the header (`z-20`), and clips itself so
nothing can widen the document.

### Cutting another creature

The night clip lights its creatures against near-black, so brightness alone
separates them — no segmentation model needed. Per creature: crop tight
around it in a frame, build alpha from luminance with a soft knee, zero
anything below a floor (this is what kills the grey rectangle), feather by
about a pixel, then trim to the alpha bounding box.

Two things that went wrong first time and are worth not repeating:

- **Crop tight.** A loose box drags in background water and whatever is
  behind the subject, and the key cannot tell them apart. The first turtle
  came out with a visible rectangle of haze and a piece of the octopus.
- **The floor matters more than the threshold.** Without it, low-level haze
  survives at low alpha and reads as a dirty box on a light page.

Assets live in `public/img/sea/`, WebP with alpha, 99 KB for all four.

### Tuning

- **Opacity.** The page is light and these creatures are mid-tone, so
  anything under about 0.2 vanishes rather than reading as subtle — a first
  pass at 0.09–0.2 was invisible on screen. Sharp creatures sit at 0.36–0.46;
  the blurred schools, which cover far more area, stay at 0.2–0.26.
- **Nothing above ~8% down.** The video band at the top is opaque and would
  simply cover it.
- **Keep to the edges.** The centre column is copy, and much of the page is
  opaque white cards that hide anything behind them.
- **Depth** is faked the way distance works underwater: further away means
  smaller, fainter and softer (`blur`).

### Motion

Three keyframe paths at 29–52s with staggered delays, so the loops never
visibly line up. Only `transform` and `opacity` animate.

Each path rests at the origin at 0% **and** 100%, so the resting pose is the
laid-out position — but that alone does **not** stop them. The global
`prefers-reduced-motion` rule only collapses `animation-duration` to
`0.01ms`, and an *infinite* animation at that duration completes thousands of
cycles per rendered frame, so every frame samples an arbitrary point on the
path. Measured: three different transforms across 25 frames, one of them
`translate(6.9px, -24px)` — mid-drift. That is jitter, the opposite of the
intent.

`.drift` therefore carries an explicit `animation: none !important` under
`prefers-reduced-motion: reduce`. Keep it; the keyframe symmetry is not a
substitute.

The `flip` option uses the independent `scale` property, **not**
`transform: scaleX(-1)`. The keyframes animate `transform`, and a running
animation beats an inline transform — the flip would silently do nothing.

## The deep-water theme

The site is dark (`--color-page: #070d14`). It reads as a dive: mooring ropes
at the surface, then descent into dark water where the sea life drifts, with
the reef footage as a deep moment just before the résumé.

**Two colour families are deliberately still light. Keep them that way:**

- `--color-paper-*` — the résumé card. A white sheet on a dark ground reads
  as a document on a desk.
- `--color-mock-*` — the product mocks and the phone/browser frames. Those
  are screenshots of light software; darkening them would misrepresent the
  product.

The accent ramp was brightened: the old `#5546c9` is unreadable on this
ground. `--color-neutral-300` is body copy.

**Everything inside the résumé card must use `--color-paper-*` tokens.** The
neutral ramp now points at a dark ground, so borrowing from it puts light
grey on white paper. `text-neutral-800` did exactly that and measured
**1.37:1** — effectively invisible — which is why `--color-paper-body`
exists. `--color-paper-soft` was also darkened from `#75798c` (4.13:1, under
AA, and already so before the dark theme) to `#5f6373` (5.72:1).

A contrast pass over the built page measures every distinct text/background
pair against WCAG AA. It currently reports **0 failures across 55 pairs**;
the closest pass is 5.12:1. Re-run it after any colour change.

Hardcoded light values outside the token block had to move with it — the two
sticky headers' glass, the résumé section ground, and `themeColor` in
`app/layout.tsx`. Grep for `#f7f6f2` before assuming a theme change is done.

## The dive header

`components/DiveHeader.tsx` — dock pilings and ropes dropping into the water,
under the sticky header. A **still image**, not video: the clip that looked
like this scene turned out to be the reef artwork. 80 KB, against ~1.4 MB for
video of the same thing. Motion is a slow CSS sway, stopped outright under
`prefers-reduced-motion`.

## Cutting sea life out of the artwork

The artwork's water is **lit teal, not black**, so a plain luminance key
leaves a visible rectangle — the first pass did exactly that. Each cutout is
a luminance key **multiplied by a radial falloff**, so edges dissolve instead
of ending. On this dark ground the leftover dark-teal residue disappears.

Two were cut and then dropped: the **manta ray** and a close crop of the
**octopus**. Both sit in the bright light shaft, where nothing separates them
from the water. Don't re-add them from that source.

Seven creatures, 144 KB total, in `public/img/sea/`.

Opacity runs much higher than the old light-page version (which needed
0.36–0.46 just to be visible): bright creatures on a near-black ground sit at
0.5–0.72, distant ones at 0.38–0.45 with blur.

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
