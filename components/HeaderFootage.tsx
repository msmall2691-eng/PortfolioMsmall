'use client';

import { headerClip } from '@/content/ambient';
import { useFootagePlayback } from '@/lib/useFootagePlayback';
import { FootageToggle } from './FootageToggle';

/**
 * The footage that opens the page, directly under the sticky header: the
 * octopus reef, with the turtle, the manta behind it and fish schools on
 * both sides.
 *
 * This was the rope/piling shot until Megan compared the two and picked the
 * reef — the octopus is the stronger first impression. The ropes moved down
 * to FootageBand. Both still come from the same 4K master, so they match.
 *
 * Playback rules live in useFootagePlayback, shared with FootageBand:
 * reduced motion never fetches the file and shows the poster instead, and
 * the pause control is required by WCAG 2.2.2 because this loops. Do not
 * remove it.
 *
 * HOW A DARK CLIP MEETS A LIGHT PAGE. The page is a warm off-white; this
 * footage is near-black underwater video. It does NOT fade into the page —
 * it sits on its own near-black plate (--color-deep) and feathers into
 * that. Fading a dark clip toward #f6f4ee washes both edges to a dead grey
 * and makes the band look like a loading error; landing it on the plate
 * keeps the clip's density and turns the whole band into a deliberate dark
 * slab between two light sections. The page/plate boundary is then a crisp
 * horizontal edge, which is the point of using it as punctuation.
 */
export function HeaderFootage() {
  const { playing, videoRef, bandRef, toggle } = useFootagePlayback();

  return (
    <section aria-label="Header footage" className="relative w-full overflow-hidden">
      <div
        ref={bandRef}
        className="relative h-[clamp(300px,46vw,560px)] w-full overflow-hidden bg-deep"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 block size-full object-cover object-center"
          src={headerClip.src}
          poster={headerClip.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        />
        {/* Lands BOTH edges on the plate colour (--color-deep, #0b1118).
            Without the top fade the footage started on a hard cut directly
            under the translucent sticky header; without the bottom one the
            brightest part of the clip ran straight into the light page.
            Keep both. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #0b1118 0%, rgba(11,17,24,0.70) 6%, rgba(11,17,24,0.20) 15%, rgba(11,17,24,0) 36%, rgba(11,17,24,0.55) 74%, #0b1118 100%)',
          }}
        />

        <FootageToggle
          playing={playing}
          onToggle={toggle}
          pauseLabel={headerClip.pauseLabel}
          playLabel={headerClip.playLabel}
        />
      </div>

    </section>
  );
}
