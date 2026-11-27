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

### Page order

`app/page.tsx` renders, in order: `HeaderFootage`, `Intro`, `Projects`,
`DataSection`, `MoreWork`, `FootageBand`, `Toolkit`, `About`, `ResumeSection`.

Everything that **is** the work runs together — Projects, the Power BI models,
the smaller builds — rather than being split up by About and Skills the way it
was. Skills follows, because by then there is evidence behind the claims.
About is 55 words of biography and comes after the case is made. The résumé
and contact details close it. `FootageBand` sits between the work block and
Skills as the one breather in the middle.

### Anchors: four, and each goes somewhere different

`nav` in `content/site.ts` is **Work · Skills · About · Résumé**. It was seven,
and three were broken in ways only measurement showed:

- "More" landed at 4562px and "GitHub" at 4611px — 49px apart, because
  `#github` is a `<div>` inside the `#more` section. Two items, one place.
- "Contact" landed at 5541px while the email row was at 6534px, so the one
  link a hiring manager needs put them a full screen *above* the contact
  details. `#contact` now sits on the "Get in touch" block, and that block
  moved above the résumé card.
- `#resume`, the largest section on the page, had no entry at all.

**Rule for anything added:** the target must be a `<section>`, not a div inside
one, and somewhere no other item already goes. "Data" and "More" are
deliberately absent — both are work, both reachable by scrolling on from Work.

### Deleted: the six unmounted sections

`Work.tsx`, `Hero.tsx`, `About.tsx`, `CodeYear.tsx`, `BrightBaseMock.tsx` and
`ToolsSection.tsx` were complete, typechecked and imported by nothing. They are
gone, along with the three content files only they read — `content/work.ts`,
`content/mock.ts` and `content/tools.ts`.

They were not deleted for tidiness. `content/work.ts` still carried both client
names and their domains after those names came off the page: nothing rendered
it and the built HTML was clean, but it sat one `import` from being live again.
Dead code that holds data you have promised not to publish is a liability, not
a spare part. Git history has them if a section is ever wanted back.

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

The copy says "4,100+" so it stays true as the suite grows. The exact figure
lived in `content/work.ts`, which has been deleted; re-count from the suites
above if you ever want it.

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
- Every figure in the product mocks and in the turnover spotlight is
  **invented sample data** and must stay that way. (`content/mock.ts` held
  these and is deleted along with the components that read it; the rule stands
  for anything that replaces them.)
- **Client work is described, not named** — and that covers more than the
  label. A link to a client's domain names them just as plainly, and so does a
  screenshot with their wordmark in it. Megan's call, Nov 2026; it cost two
  live sites with working links and real screenshots, which is a real loss of
  proof and was taken deliberately.
- **Check screenshots, not just text.** Four real phone numbers and a business
  email were live on this site inside images, where no text search would ever
  find them — two of the numbers belonged to clients. Replacements follow the
  mock convention: `555-xxxx`, `example.com`.
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
| reef | `public/video/reef-night.mp4` | 1920×810, 820 KB, CRF 31 | top of the page, `components/HeaderFootage.tsx` |
| ropes | `public/video/dive-ropes.mp4` | 1920×840, 741 KB, CRF 31 | between the work and Skills, `components/FootageBand.tsx` |

The reef opens the page and the ropes sit lower down. That is Megan's call,
made after seeing both, and it inverts the original surface-then-deep idea —
do not "fix" the order back on the assumption it was a mistake.

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

## The sea-life layer — removed

Cutouts of Firefly creatures used to drift behind every page
(`content/drift.ts`, `components/Drift.tsx`). They are gone, with the four
`SectionArt` artwork panels (`content/sectionArt.ts`).

Both were keyed to a near-black ground. On the off-white page the cutouts read
as grey smudges — the luminance gate that admitted them cannot be met on a
light background at all — and a dark-cut panel on white is a bruise. The
images are still in `public/img/art/`.

Two findings from that work are kept below because they are about *method*,
not about this theme: the cutout gate under **Cutting sea life out of the
artwork**, and this one, which cost real time to find.

**An infinite animation is not stopped by `prefers-reduced-motion` alone.**
The global rule only collapses `animation-duration` to `0.01ms`, and an
infinite animation at that duration completes thousands of cycles per rendered
frame, so every frame samples an arbitrary point on the path. Measured: three
different transforms across 25 frames, one of them `translate(6.9px, -24px)`
— mid-drift. That is jitter, the exact opposite of the intent. Any looping
animation added here needs an explicit `animation: none !important` under
`prefers-reduced-motion: reduce`. Keyframe symmetry is not a substitute.

## The light theme

The page is warm off-white (`--color-page: #f6f4ee`) with dark text, built on
the `paper` token family the résumé card already used rather than a second,
parallel system. One accent, indigo `#4b3dc4`. `--color-cyan` is gone.

It was near-black (`#070d14`) until Nov 2026. Megan asked for simpler and
"maybe not dark everywhere"; two complete variants were built and measured —
this one and an alternating light/dark rhythm, still on the
`alternating-theme` branch — and this is the one she picked. It is genuinely
simpler and not only lighter: **+219 / −1628 lines**.

**The footage stays dark, and feathers onto its own plate.** Both clips fade
to `--color-deep: #0b1118`, not to the page. A dark clip fading toward
off-white washes grey at both edges; against the plate it reads as a
deliberate panel. This also fixed something the dark theme hid — the product
screenshots in the project cards were dark-on-dark and now read properly,
which matters more than the mood to someone scanning the work in thirty
seconds.

**Two colour families are deliberately still light. Keep them that way:**

- `--color-paper-*` — the résumé card.
- `--color-mock-*` — the product mocks and phone/browser frames. Those are
  screenshots of light software; recolouring them would misrepresent it.

**Measure contrast after any colour change; do not eyeball it.** A past bug
put `text-neutral-800` on the white résumé card at **1.37:1** — text that
renders perfectly and is invisible. `--color-paper-soft` was likewise `#75798c`
(4.13:1, under AA) before being darkened to `#5f6373`.

The current pass reports **0 of 186 text nodes below AA on the home page**,
worst 5.15:1; **0 failures across all six case studies**, worst 5.43:1. Two
independent methods agree on those numbers — sampling rendered pixels, and
computing from the declared colour up the background chain. Prefer running
both: each misses things the other catches.

## The header footage

`components/HeaderFootage.tsx` (was `DiveHeader.tsx`) — the reef clip under
the sticky header.

**Fade both edges, not one.** The gradient faded the bottom into the page over
28% of the height and the top over **0%**, so the band began on a hard
horizontal line directly beneath the translucent header. That edge, not the
video, was what read as abrupt. Both edges now land on `--color-deep`.

**Real video, not a still.** The footage is 3840×2160 at 60fps and the camera
moves during the shot, so the bands move on their own rather than faking it
with a CSS sway. The old `.dive-sway` keyframes and `dive-ropes.webp` are gone.

**Match the placeholder to the page.** The box behind the `<video>` was
`#061019` against a `#070d14` page — a near-miss rather than a match, visible
while the clip loads and anywhere the box is not fully covered. It is bound to
a token now. Check that the token actually resolves rather than assuming it
does: a mistyped Tailwind token fails silently and looks like a design choice.

`object-cover` crops hard at phone width. Re-check the crop whenever a clip is
reframed, because a subject off-centre would be cut.

## Cutting sea life out of the artwork

> **Historical.** Nothing on the site uses these cutouts now — `Drift` and
> `SectionArt` are deleted. Kept because the gate below is a method, and
> because it caught two failures that looked fine to the eye. If cutouts ever
> come back, run it again; the numbers were tuned for a dark ground and would
> need redoing for this one.


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
column, which is copy. Nothing above ~11% down — the header covers it, and
a creature in its fade is exactly how the `jelly.webp` rectangle got
spotted.

## Keeping the live screenshots current

`.github/workflows/refresh-shots.yml` re-captures all four live sites every
Monday, and on demand from the Actions tab. It exists because the shots went
a year stale once and nobody noticed: two of Megan's own sites had been
fully redesigned while the portfolio still showed the old ones.

Run it locally:

```
npm install --no-save playwright && npx playwright install chromium
node scripts/refresh-shots.mjs --check   # capture and verify, write nothing
node scripts/refresh-shots.mjs           # ... and write the WebPs
```

**The gate is the point, not the screenshotting.** Client names must not
appear on this site, and a fixed crop box cannot promise that: if a client
redesigns, the box keeps "working" while quietly framing their name. So
every forbidden string in `scripts/shot-targets.mjs` is located in the LIVE
DOM, its pixel rectangle measured, and the run **fails and writes nothing**
if any of them falls inside a kept frame. One violation blocks all four.

Verified by deliberately widening a crop until a client's name fell inside
it: the run exits 1 and the file on disk stays byte-identical.

A red run means a site changed and a crop needs re-framing in
`scripts/shot-targets.mjs`. Re-frame it. Do not widen the rules to make it
pass — that is the one change that turns this from a safeguard into
decoration.

Two details worth keeping:

- **Text is swapped in the DOM before the shot, not painted over after.**
  Megan's phone number on maineclean.co becomes `555-0100` by editing the
  text node, so it renders in the site's own font, weight and colour. The
  painted-pixel version needed correct coordinates, had to guess the
  background, and broke whenever the layout moved.
- **The logo check only runs on sites Megan does not own** (`thirdParty` in
  the target). Her own wordmark on her own site is not a leak, and treating
  it as one made the job refuse to update maineclean.co for no reason.

The workflow pushes straight to `main`, which is only safe because of the
gate above.

## Type scale

One `sectionHeading` token in `components/ui.tsx`, used by every `<h2>` that
titles a section. Import it; do not write a size next to an `<h2>`.

The ladder is **42 → 32 → 16.5 → 15**: her name, section headings, headings
inside a card, body. At narrow widths the h1 clamps to 32, so the section
floor is 24 and not 26 — at 26 there were only 6px between them and the ladder
collapsed exactly where the page is hardest to scan.

There were three scales before this, written inline, with the same 22px string
duplicated in two files. Measured, the page ran 42 · 22 · 22 · 22 · 22 · 22 ·
36 · 36: five sections barely above the 15px body copy, two at 36, and an
`<h2>` at **11px** carrying the eyebrow style — a heading smaller than body
text, announcing a section that did not exist.

**A heading inside a card is not a section heading.** It is an `<h3>` at
16.5px, like the skill-group titles.

## Linting

`eslint.config.mjs` ignores `.claude/**`, and that is not optional. The
directory holds scratch git worktrees from isolated agent runs, each a full
checkout. `.gitignore` hides them from git and says nothing to eslint: with
two present, `npm run lint` went from clean to **11,121 problems**, every one
in a duplicate of this same source. Lint output that size is lint output
nobody reads, which is how a real finding gets lost.

`eslint-config-next` is pinned to the same version as `next`. Version 16 ships
flat config directly — do not wrap it in `FlatCompat`, which crashes config
validation with a circular-reference error inside `JSON.stringify` whose
message (`property 'react' closes the circle`) says nothing about the cause.

## Design tokens

All colour, radius and layout tokens live in the `@theme` block in
`app/globals.css`. Change them there, not in components.

They began as the Nocturne theme from the handoff, which was dark; the ramp was
re-pointed for the light page in Nov 2026 and made monotonic. Hardcoded values
outside the token block have to move with it — the sticky headers' glass, the
résumé ground, and `themeColor` in `app/layout.tsx` have each been missed
before. Grep for a raw hex before assuming a theme change is finished.

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
