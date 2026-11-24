/**
 * The generative-video experiment shown between More work and the résumé.
 *
 * Both clips are AI-generated in Adobe Firefly and are labelled as such on
 * the page. The site's honesty rule (see README → "Privacy rules") is that
 * nothing invented is presented as real — a generated reef is no exception.
 *
 * The two takes are the same scene re-prompted, which is the actual point of
 * the section: it shows prompt iteration, not sea life.
 *
 * Encoded from the 1080p originals to 854×480 H.264 at CRF 31 — 562 KB and
 * 377 KB. WebM/VP9 was tried and came out BIGGER on this footage (dark, full
 * of fine particles), so MP4 is the only source. See README → "Video".
 */

export const lab = {
  eyebrow: 'SIDE EXPERIMENT',
  heading: 'Playing with generative video',
  line: 'Two takes on one reef, both made in Adobe Firefly. Same scene, re-prompted: the second pass asked for something slower and more realistic. Both are AI-generated — nothing here was filmed.',
  note: 'Prompt design sits in my toolkit for work reasons. This is where I practise it with nothing at stake.',
  /** Shown instead of autoplay when the OS asks for reduced motion. */
  reducedNote: 'Your system asks for reduced motion, so this stays still until you press play.',
} as const;

export type LabTake = {
  id: string;
  label: string;
  sub: string;
  detail: string;
  src: string;
  poster: string;
  alt: string;
};

export const labTakes: readonly LabTake[] = [
  {
    id: 'night',
    label: 'First pass',
    sub: 'Bioluminescent',
    detail: 'Heavy on glow and colour, and quicker than I wanted it.',
    src: '/video/reef-night.mp4',
    poster: '/img/reef-night-poster.webp',
    alt: 'Generated video: an octopus and a sea turtle over a glowing night reef.',
  },
  {
    id: 'day',
    label: 'Re-prompted',
    sub: 'Daylight, slower',
    detail: 'Asked for realism and a slower drift. Sunlight through the surface did most of the work.',
    src: '/video/reef-day.mp4',
    poster: '/img/reef-day-poster.webp',
    alt: 'Generated video: an octopus and a sea turtle on a sunlit reef.',
  },
];
