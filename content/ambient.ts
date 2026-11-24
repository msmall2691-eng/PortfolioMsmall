/**
 * The ambient footage band that carries the page from the work into the
 * closing résumé section.
 *
 * Decorative. The page reads exactly the same with the video removed, which
 * is why the <video> is aria-hidden and there is no heading here.
 *
 * The clip is AI-generated, so it carries a visible credit — the same rule
 * the product mocks follow for invented data. Keep the credit.
 *
 * 1920×810 H.264 CRF 28, 1.56 MB. The window (source 2.0–6.5s) and the
 * clip itself were both chosen by measuring sharpness, not by eye — this
 * footage varies a lot shot to shot. See README → "Video" before changing
 * either.
 */
export const ambient = {
  src: '/video/reef-night.mp4',
  poster: '/img/reef-night-poster.webp',
  alt: 'Bioluminescent reef footage',
  credit: 'Generated with Adobe Firefly',
  pauseLabel: 'Pause background footage',
  playLabel: 'Play background footage',
} as const;
