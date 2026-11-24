/**
 * The ambient footage band that opens the page, above the intro.
 *
 * Decorative. The page reads exactly the same with the video removed, which
 * is why the <video> is aria-hidden and there is no heading here.
 *
 * The clip is AI-generated, so it carries a visible credit — the same rule
 * the product mocks follow for invented data. Keep the credit.
 *
 * 1920×810 H.264 CRF 27, 1.37 MB, from source 2.0–5.5s. Both the clip and
 * that window were picked by measuring sharpness, not by eye: this footage
 * runs 22–92 on the same metric within a single clip, and the first cut
 * shipped used a stretch scoring ~30. Read README → "Video" before changing
 * the clip, the window, or the (deliberately absent) edge fades.
 */
export const ambient = {
  src: '/video/reef-night.mp4',
  poster: '/img/reef-night-poster.webp',
  alt: 'Bioluminescent reef footage',
  credit: 'Generated with Adobe Firefly',
  pauseLabel: 'Pause background footage',
  playLabel: 'Play background footage',
} as const;
