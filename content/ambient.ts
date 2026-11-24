/**
 * The ambient footage band, sitting after the work and before the résumé.
 *
 * Decorative. The page reads exactly the same with the video removed, which
 * is why the <video> is aria-hidden and there is no heading here.
 *
 * The clip is AI-generated, so it carries a visible credit — the same rule
 * the product mocks follow for invented data. Keep the credit.
 *
 * 1920×810 H.264 CRF 27, 0.69 MB, from source 5.3–8.0s.
 *
 * BOTH the clip and that window are picked by MEASURING sharpness, never by
 * eye, and never by a clip's average. Laplacian variance per second, then cut
 * the best run. Two mistakes already shipped from skipping that:
 *   1. The first cut used a stretch scoring ~30 inside a clip that ranges
 *      22–92. It read as blurry on the live site, and it was.
 *   2. This clip was rejected once on its 61.9 average. Scanned per second it
 *      runs 42 → 147, with everything good in the last three seconds. The
 *      average hid the only part worth using.
 * Read README → "Video" before changing the clip, the window, or the
 * (deliberately absent) edge fades.
 */
export const ambient = {
  src: '/video/reef-night.mp4',
  poster: '/img/reef-night-poster.webp',
  alt: 'Bioluminescent reef footage',
  credit: 'Generated with Adobe Firefly',
  pauseLabel: 'Pause background footage',
  playLabel: 'Play background footage',
} as const;

/**
 * The surface band at the very top (components/DiveHeader.tsx).
 *
 * A still, not a clip: the video that looked like this scene turned out to
 * be the reef artwork. 1920×1080 WebP, 80 KB — against ~1.4 MB for video of
 * the same thing.
 */
export const dive = {
  src: '/img/dive-ropes.webp',
  credit: 'Generated with Adobe Firefly',
} as const;
