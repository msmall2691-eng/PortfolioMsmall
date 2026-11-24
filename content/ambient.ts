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
 * Encoded from a 1080p original to 854×480 H.264 CRF 31 (377 KB). See
 * README → "Video" before replacing it.
 */
export const ambient = {
  src: '/video/reef-day.mp4',
  poster: '/img/reef-day-poster.webp',
  alt: 'Underwater reef footage',
  credit: 'Generated with Adobe Firefly',
  pauseLabel: 'Pause background footage',
  playLabel: 'Play background footage',
} as const;
