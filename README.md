# Megan Small — Portfolio

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

## Deploying to Vercel

Import the repo on Vercel and accept the detected Next.js defaults. `output: 'export'`
means the build produces static files; no serverless functions are created.

For a custom domain (e.g. `msmall.org`), add it under **Project → Settings → Domains**
and point the registrar at the records Vercel shows.

---

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

| File | Holds |
| --- | --- |
| `content/site.ts` | Profile, links, nav, hero, about, footer |
| `content/work.ts` | Case study, selected work, turnover spotlight, more builds |
| `content/mock.ts` | Sample data for the BrightBase product mocks |
| `content/data.ts` | KPIs, the three charts, the DAX sample |
| `content/skills.ts` | Toolkit groups and credentials |
| `content/resume.ts` | Web résumé and contact row |

### Things stated in more than one place

These are defined once and derived everywhere, so the copies cannot drift:

- **Years in business** — `YEARS_IN_BUSINESS` / `YEARS_IN_BUSINESS_WORD` in
  `content/site.ts`. Feeds the hero lede, the About fact row, the Toolkit's
  Operations group and the résumé summary.
- **Email, links, résumé path** — `profile` and `links` in `content/site.ts`.

---

## Before launch

Open items carried over from the design handoff. Each one is marked with a
`NOTE (open item)` comment at the exact line in `content/`.

### 1. Links that still point at private claude.ai artifacts

Five links are not reachable by a signed-out visitor — a recruiter clicking one
would hit a sign-in wall. **The site currently renders them as plain text rather
than as dead links.**

They are listed in `pendingLinks` in `content/site.ts`:

- Operations analytics dashboard
- USM dashboard
- Tool-consolidation write-up
- M Studio case study
- M Linx Guide case study

Once every one of those is public (or replaced with a self-hosted page), flip one
line in `content/site.ts`:

```ts
export const PENDING_LINKS_ARE_PUBLIC = true;
```

That restores them as real links, brings back the "View project ↗" call to action
on the two affected Selected-work cards, and re-shows the two links in the Data
section. If only *some* become public, move those out of `pendingLinks` and drop
the `pending: true` flag on their entries instead.

### 2. Years running the business — 8 or 10?

The portfolio copy says 8; mlinx.studio says 10. Set the true number once in
`content/site.ts` (`YEARS_IN_BUSINESS` and `YEARS_IN_BUSINESS_WORD`) and every
mention updates together.

### 3. BrightBase automated-test count

The case study says "19 for the ledger alone" but never gives the project total.
Confirm it on GitHub and add it to `requirement.note` in `content/work.ts`.

### 4. USM dashboard description

Currently generic ("A dashboard designed and built independently for University
of Southern Maine coursework"). Replace with a one-line summary of what it
actually shows — see `builds` in `content/work.ts`.

### 5. Power BI report PDF

Not included in the handoff. When ready, drop it in `public/` and add a link in
the Data section.

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

## Design tokens

All colour, radius and layout tokens come from the Nocturne theme in the handoff
and live in the `@theme` block in `app/globals.css`. Change them there, not in
components.

Fonts are Inter (400/500/600/700) and JetBrains Mono (400/500), self-hosted via
`next/font` — no runtime request to Google Fonts.
