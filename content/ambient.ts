/**
 * The two pieces of decorative footage on the page.
 *
 * ONE SOURCE. Both are cut from the same 4K master — 3840x2160, 60fps,
 * 28.7s — which is itself a dive: surface and mooring ropes at 0-7s, a cut
 * to black at 8s, reef at 9-23s, open water at 24-28s. That is why the two
 * blend: same lighting, same palette, same artist, one film. If either is
 * ever replaced, replace both from one source or they will stop matching.
 *
 * ORDER. The reef opens the page and the ropes sit lower down. That is
 * Megan's call, made after seeing both: the octopus is the stronger first
 * impression. It does invert the original surface-then-deep idea, so do not
 * "fix" the order back on the assumption it was a mistake.
 *
 * Both are decorative. The page reads exactly the same with the video
 * removed, which is why each <video> is aria-hidden and neither carries a
 * heading. Both are AI-generated and the disclosure for both now lives as
 * one line in the site footer (content/site.ts, `footer.footage`) rather
 * than on a strip under each band. Keep it — same honesty rule the product
 * mocks follow for invented data.
 *
 * PICKING A WINDOW. Measure, but do not obey the measurement. Laplacian
 * variance counts texture density, not quality, and it has been wrong here
 * three times:
 *   1. The first cut shipped a stretch scoring ~30 inside a clip ranging
 *      22-92, and it visibly read as blurry.
 *   2. A clip was rejected on its 61.9 whole-clip average when scanned
 *      per-second it ran 42 -> 147; the average hid the only usable part.
 *   3. The top-scoring candidate of all (1857, roughly 4x any other) scored
 *      that high because it had "CORAL HEALTH GOOD" telemetry graphics burned
 *      into the frame. Hard-edged UI text is pure high-frequency detail.
 * The reef clip scored LOWEST of its three candidates (415 against 499 and
 * 665) and was still the right pick: the other two were tight close-ups
 * whose texture filled every pixel, and behind page content that reads as
 * noise. Calm dark areas are the point. Scan per-second, then look.
 */

/**
 * The header, at the very top (components/HeaderFootage.tsx).
 * 1920x810, 1.0 MB, from master 11.0-15.0s.
 *
 * The slot is about 2.29:1 and the clip is 2.37:1, so object-cover trims
 * roughly 3% off the sides. Harmless — the octopus is centred.
 */
export const headerClip = {
  src: '/video/reef-night.mp4',
  poster: '/img/reef-night-poster.webp',
  pauseLabel: 'Pause header footage',
  playLabel: 'Play header footage',
} as const;

/**
 * The band lower down, after the work and before the resume
 * (components/FootageBand.tsx). 1920x840, 1.2 MB, from master 0.15-3.3s.
 * The camera descends during the shot.
 *
 * This slot is much wider than the clip — about 3.33:1 against 2.29:1 — so
 * object-cover drops roughly 31% of the height. `objectPosition` keeps the
 * TOP of the frame, because that is where the waterline and the rope knots
 * are; the lost part is the dark water below them. Re-cutting the clip to
 * 1920x576 would avoid the crop, but that needs the 4K master and would
 * cost a second encode, so the CSS does it losslessly instead.
 */
export const bandClip = {
  src: '/video/dive-ropes.mp4',
  poster: '/img/dive-ropes-poster.webp',
  objectPosition: 'center 22%',
  pauseLabel: 'Pause background footage',
  playLabel: 'Play background footage',
} as const;
