/**
 * Large artwork panels behind individual sections.
 *
 * This is the thing likeakinginc.com does that this site did not: every
 * one of their sections carries a big illustration on black, so the page
 * reads as a series of scenes rather than a document. Reading their saved
 * page, that plus heavy scroll-reveal IS the effect — their CSS has no
 * blend modes, no masks, no keyframes at all.
 *
 * All four panels are cut from Megan's own artwork, 900px wide, with alpha
 * that fades toward the text and softens at top and bottom so a panel
 * never ends on a straight line.
 *
 * READABILITY COMES FIRST. These sit at z-0 behind content, are
 * aria-hidden, and run at low opacity. Every one of them was checked with
 * the same contrast pass the rest of the site uses — if you add or
 * brighten one, re-run it. A panel that makes body copy fail AA is worse
 * than no panel, and the failure is invisible: the text still renders
 * perfectly, it is just unreadable. That exact bug shipped here once
 * before, at 1.37:1.
 *
 * `side` is the edge the panel is anchored to, so it sits opposite the
 * column the copy is in.
 */

export type SectionArt = {
  src: string;
  side: 'left' | 'right';
  /** Low on purpose. Raising this is how you break the contrast pass. */
  opacity: number;
  /** CSS width; a min() so phones get a proportionate panel, not a crop. */
  width: string;
  /** Nudge down from the top of its section. */
  top: string;
};

export const sectionArt: Record<string, SectionArt> = {
  projects: {
    src: '/img/art/art-octopus.webp',
    side: 'right',
    opacity: 0.46,
    width: 'min(680px, 56vw)',
    top: '2%',
  },
  about: {
    src: '/img/art/art-reefglow.webp',
    side: 'left',
    opacity: 0.42,
    width: 'min(640px, 54vw)',
    top: '6%',
  },
  toolkit: {
    src: '/img/art/art-anemone.webp',
    side: 'right',
    opacity: 0.4,
    width: 'min(620px, 52vw)',
    top: '10%',
  },
  resume: {
    src: '/img/art/art-deep.webp',
    side: 'left',
    opacity: 0.36,
    width: 'min(640px, 54vw)',
    top: '4%',
  },
};
