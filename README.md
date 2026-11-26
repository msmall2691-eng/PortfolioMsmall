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

`app/page.tsx` renders, in order: `HeaderFootage`, `Intro`, `Projects`,
`DataSection`, `MoreWork`, `FootageBand`, **`Toolkit`**, `About`,
**`ResumeSection`**, `SiteFooter` — alternating dark and light bands with a
`Seam` at each junction. See **Alternating light and dark bands** below.

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

Two decorative bands, **both cut from one 4K master**:

| | file | size | where |
|---|---|---|---|
| surface | `public/video/dive-ropes.mp4` | 1920×840, 1.2 MB, 3.2s | top of the page, `components/DiveHeader.tsx` |
| reef | `public/video/reef-night.mp4` | 1920×810, 1.0 MB, 4.0s | after the work, before the résumé, `components/Ambient.tsx` |

Both are `aria-hidden` with no heading — the page reads the same without
them. Both are AI-generated in Adobe Firefly and carry a visible credit.
Keep the credits: same honesty rule the product mocks follow for invented
data.

**Replace both from one source, or not at all.** The master is itself a
dive — surface and mooring ropes 0–7s, a cut to black at 8s, reef 9–23s,
open water 24–28s — which is why the two bands look like one film instead
of two stock clips. Cutting a new band from a different source breaks that.

### Picking a window: measure, then disobey the measurement

Laplacian variance counts **texture density**, not quality. It has been
wrong here three times:

1. The first cut shipped a stretch scoring ~30 inside a clip ranging 22–92.
   It read as blurry, and it was.
2. A clip was rejected on its 61.9 whole-clip average. Scanned per second it
   ran 42 → 147 — the average hid the only usable part. **Always scan
   per-second; never judge a clip by its mean.**
3. The top-scoring candidate of all — 1857, roughly 4× anything else —
   scored that way because it had `CORAL HEALTH GOOD` telemetry graphics
   burned into the frame. Hard-edged UI text is pure high-frequency detail.

The reef band actually shipped scored **lowest** of its three candidates
(415 against 499 and 665). The other two were tight close-ups whose texture
filled every pixel, which behind page content reads as noise. For a
background, calm dark areas are the point.

### Check for scene cuts before shipping a window

A window that crosses a cut reads as a glitch on loop. Sample frames and
compare each to the previous one; a cut is an outlier against the median:

```
header, first attempt   worst frame-diff 44.6 vs median 7.2   -> CUT at 3.25s
header, after trimming  worst 10.6 vs median 7.2              -> ordinary motion
reef band               worst 16.8 vs median 6.0              -> clean
```

`ffmpeg`'s `select='gt(scene,0.25)'` found nothing on either clip — this
footage is too uniformly blue for it. Measure frame difference directly.

### Trimming

`-c copy` is a stream copy: it re-encodes nothing. Trimming from 0 with
`-t` is therefore lossless, and was verified by hashing decoded frames
before and after. Only go back to the 4K master when the window itself
needs to change.

### No tint over the footage

An earlier pass laid a `#f7f6f2/12` tint on the band, tuned for a bright
daylight clip. Over dark footage that greyed the image out and read as
blur — which is exactly what it got mistaken for. If a light clip is ever
used, that trade reverses.

### Playback

Both bands share `lib/useFootagePlayback.ts`. It lives in one place
because the pause-persistence rule below was already got wrong once.

1. `prefers-reduced-motion` wins — no autoplay, and with `preload="none"`
   **neither file is downloaded at all**. Those visitors load 190 KB of
   decoration instead of 2.4 MB. The poster still paints.
2. **An explicit pause beats autoplay.** `userPausedRef` records it and the
   `IntersectionObserver` checks it before calling `play()`. Without that
   the band restarts itself on scrolling away and back, defeating the
   control. Do not remove it.
3. Otherwise it plays only while on screen, and pauses on the way out.

**The pause control is required, not decoration.** WCAG 2.2.2 says motion
that plays automatically for more than five seconds must be pausable, and
these loop. Keep both visible and keyboard reachable. Credits sit below
each band, never over it — grey-on-footage is unreadable.

## The sea-life layer

Creatures cut out of the Firefly footage, drifting faintly behind the dark
parts of a page (`content/drift.ts`, `components/Drift.tsx`, keyframes in
`globals.css`). Five on the home page, six on each case study.

Decorative and inert: the layer is `aria-hidden`, `pointer-events-none`, sits
at `z-0` under the content (`z-10`) and the header (`z-20`), and clips itself
so nothing can widen the document.

**On the home page it is mounted per dark section, not once per page.** It
was one list of thirteen positioned in percentages of the whole document,
which assumed the whole document was one dark ground. Half the page is a
light band now, and a light band is opaque: eight of the thirteen were being
fetched and then painted behind a white surface where nothing could see
them, and which five survived was down to the page height. Each list is
positioned against its own section box now — stable under any copy change,
and the creatures appear only in the dark scenes, which is the point of
keeping a dark identity at all. The host section needs
`relative overflow-hidden`, and its content needs `relative z-10`.

### The artwork panels are gone

There were four `SectionArt` panels, behind Projects, About, Skills and the
résumé. Three of those sections are light bands now, and a panel cut from
dark artwork reads as a bruise across a white section and takes the contrast
down with it in patches. The fourth, on About, was the worst of them: About
is a 180px portrait beside 72ch of copy, so the panel had nowhere to sit
except under the paragraphs, and the octopus was plainly legible through the
body text. The component and `content/sectionArt.ts` are deleted;
`public/img/art/*.webp` are kept, unused, for a future section with a spare
column.

### Cutting and tuning

See **Cutting sea life out of the artwork** below — it carries the current
numbers and the pass/fail gate. (An older version of this section described
tuning for a *light* page and is gone; the site is dark.)

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

The site's ground is dark (`--color-page: #070d14`). It reads as a dive: the
reef footage opening the page, descent into dark water where the sea life
drifts, mooring ropes and the waterline in the middle. The page alternates
dark and light bands down its length — see **Alternating light and dark
bands** below; everything in this section is the dark half.

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

A contrast pass over the built page measures text against the background it
actually sits on: the page is screenshotted twice, once normally and once
with every glyph made transparent, so the second image IS the background.
Each text node is measured over its own `Range.getClientRects()`, not over
its element box — an element box includes the empty half of a `<p>`, the
element's own border-bottom and any child `<img>`, and all three produced
false failures (a 2px accent underline inside a link box measured 1.18:1
against the link text above it).

It currently reports **0 failures over 204 text nodes at 1440 and 178 at
390**. Worst cases: **5.27:1** in the light bands (11px `neutral-500`
labels) and **5.73:1** in the dark bands (the 11px `EXPERIENCE` eyebrow);
the worst single background pixel anywhere behind text is 4.66:1, under a
28px heading, against a 3:1 floor. Re-run it after any colour change.

Hardcoded light values outside the token block had to move with it — the two
sticky headers' glass, the résumé section ground, and `themeColor` in
`app/layout.tsx`. Grep for `#f7f6f2` before assuming a theme change is done.

## Alternating light and dark bands

The page was dark end to end, which made eight sections read as one long
scroll. It alternates now — dark header footage and intro, light Projects,
dark Data, light More work, the ropes footage, light Skills, dark About,
light Résumé down to the footer — so each section reads as a deliberate
scene. The dark identity is still the page's; light is the counterpoint.

**One class does a light band.** `band-light` in `app/globals.css`
re-points the theme variables, and every component inside keeps the class
names it already had: `text-neutral-300` is still body copy, `bg-card` is
still a card. That works because Tailwind v4 compiles a utility to
`color: var(--color-neutral-300)`, so overriding the variable on a wrapper
overrides every utility beneath it. No parallel `light:` class set to keep
in sync, and no component knows which band it is in — Toolkit and Projects
were not written for this and needed no class changes.

The light values continue the paper family: `--color-paper-band` is the
ground, `--color-paper-card` the raised sheet, `--color-paper` still the
résumé card. The accent flips from the brightened violet (which measures
1.7:1 on a light ground) back toward the brand violet, darkened to clear AA.

**`band-light` goes OUTSIDE the `[data-reveal]` element, never on it.** On
it, the ground starts at opacity 0 and fades in with the content — a
full-bleed flash at every junction.

### Junctions

A light section butted against a dark one is a hard rule across the
viewport, and it makes the two read as two different websites stacked.
`components/Seam.tsx` dissolves them over ~104px by fading the light
ground's ALPHA in and out, not by interpolating between two hex values:
interpolating passes through a dead grey midpoint, and an alpha fade means
the dark end matches the dark band exactly by construction, glows and
drifting sea life included. One faint ruler of ticks and one 40px accent
bar on the gutter are the whole decoration.

`.band-y` is deliberately smaller than it looks like it should be, because
a seam is whitespace too. At 96px the gap between two sections came to
324px and read as a missing section.

**The footage bands fade to whatever is adjacent.** `HeaderFootage` still
lands both edges on `#070d14`; `FootageBand` now sits between two light
bands, so both of its edges fade to `--color-paper-band` and it reads as a
window of deep water opening in a white page. It gets no seam — the
dissolve is already being done by its own gradient, and doing it twice
reads as a grey stripe. Move either band and the stops move with it.

## The dive header

`components/DiveHeader.tsx` — dock pilings and mooring ropes dropping away
into the water, under the sticky header.

**Real video, not a still.** An earlier note here claimed the rope clip
"turned out to be the reef artwork". That was wrong: the footage exists,
it is 3840×2160 at 60fps, and the camera descends during the shot — so the
header dives on its own rather than faking it with a CSS sway. The old
`.dive-sway` keyframes and `dive-ropes.webp` are gone.

At phone width the band is 390×300 (ratio 1.30) against a 2.29 video, so
`object-cover` crops ~43% horizontally. Checked: the centre crop keeps both
ropes, the waterline and the pilings. Re-check if the clip is ever
reframed, because a subject off-centre would be cut.

## Cutting sea life out of the artwork

Luminance key **multiplied by a radial falloff**, so edges dissolve instead
of ending. That is necessary but **not sufficient**, and the eye cannot
tell you which: `jelly.webp` shipped as a visible rectangle and went
unnoticed until it happened to land against the bright lower edge of the
header.

### The gate — run this on every new cutout

Composite onto `--color-page` **at the opacity it is actually rendered
at**, then measure the outermost ring of pixels.

Use the **median** lift, not the maximum. A rectangle lifts the whole ring;
the maximum is tripped by any creature whose body simply reaches the crop
edge, which is fine and normal. Measuring the max first time reported all
seven assets as broken, which was wrong — the median showed only two were.

> Pass: median lift < 1.0 **and** under half the ring more than 2 above
> page luma.

```
jelly.webp (old)   median 2.79, 54% of ring   -> rectangle, replaced
jelly2.webp (old)  median 1.03, 32%           -> marginal, replaced
anglerfish, clownfish, clownfish2, eel, turtle
                   median ~0.00               -> fine, kept
replacements       median 0.00,  0%           -> pass
```

### A border test is not enough

It only sees the outer ring, so haze **inside** the crop passes it — a
light shaft that never reaches the edge is invisible to it. Second measure:
take pixels whose alpha came out under 0.15 (background that should have
keyed away) and ask how far above page luma they still sit. **Reject on p95
above 6.**

Re-cut from the full-resolution source artwork, all twelve creatures passed
the border test — manta included — and the manta was still wrong:

```
manta        border 0.01   haze p95 10.31   <- reject
turtle       border 0.00   haze p95  5.38
jellyR       border 0.00   haze p95  3.64
octopus      border 0.00   haze p95  5.15
```

The existing warning about the manta and the light shaft was correct, and
the border test alone would have overruled it. Run both.

### The source decides it, not the feather

Of nine candidate crops, only the three from the dark 26s frame passed.
Everything cut from the **lit** reef frames failed and could not be
rescued:

```
turtle 23.5    anemone 30.9    manta 7.0    (threshold: 2.0)
```

This is the constraint behind the look generally: an asset has to be
*authored* against near-black. The manta and a close crop of the octopus
sit in the bright light shaft and fail for that reason — dropped twice,
once by eye and once by measurement. Do not re-add them from that source.

### Placement

Eight creatures in `public/img/sea/`, ~134 KB. Bright creatures on the
near-black ground sit at 0.5–0.72 opacity, distant ones at 0.38–0.45 with
blur; further away means smaller, fainter, softer. Keep clear of the centre
column, which is copy. On a case study, where the layer still spans the
whole page, nothing goes above ~11% down — the header covers it, and a
creature in its fade is exactly how the `jelly.webp` rectangle got spotted.

Percentages are of the box the layer is mounted in, which on the home page
is one dark section and on a case study is the whole page.

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
