/**
 * The two pieces of decorative footage on the page.
 *
 * ONE SOURCE. Both are cut from the same 4K master — 3840x2160, 60fps,
 * 28.7s — which is itself a dive: surface and mooring ropes at 0-7s, a cut
 * to black at 8s, reef at 9-23s, open water at 24-28s. That is why the two
 * bands blend: same lighting, same palette, same artist, one film. If either
 * is ever replaced, replace both from one source or they will stop matching.
 *
 * Both are decorative. The page reads exactly the same with the video
 * removed, which is why each <video> is aria-hidden and neither carries a
 * heading. Both are AI-generated, so both carry a visible credit — the same
 * rule the product mocks follow for invented data. Keep the credits.
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
 * The band in use here scored LOWEST of its three candidates (415 against
 * 499 and 665) and was still the right pick: the other two were tight
 * close-ups whose texture filled every pixel, and behind page content that
 * reads as noise. Calm dark areas are the point. Scan per-second, then look.
 */

/** The reef band, after the work and before the resume. 1920x810, 1.0 MB. */
export const ambient = {
  src: '/video/reef-night.mp4',
  poster: '/img/reef-night-poster.webp',
  alt: 'Bioluminescent reef footage',
  credit: 'Generated with Adobe Firefly',
  pauseLabel: 'Pause background footage',
  playLabel: 'Play background footage',
} as const;

/**
 * The surface band at the very top (components/DiveHeader.tsx). 1920x840,
 * 1.3 MB. The camera descends during the shot, so the header dives on its
 * own; it used to be a still with a CSS sway standing in for that.
 */
export const dive = {
  src: '/video/dive-ropes.mp4',
  poster: '/img/dive-ropes-poster.webp',
  credit: 'Generated with Adobe Firefly',
  pauseLabel: 'Pause surface footage',
  playLabel: 'Play surface footage',
} as const;
