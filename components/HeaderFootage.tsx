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
 * The bottom edge fades to --color-page so the footage dissolves into the
 * dark rather than ending on a line.
 *
 * BOTH EDGES STAY DARK, unlike FootageBand's. The page alternates light and
 * dark bands now, but this clip's neighbours are both still dark — the
 * sticky header above it, the intro below it — so #070d14 is still the
 * colour it has to land on. The rule for both bands is the same: fade to
 * whatever is actually adjacent.
 */
export function HeaderFootage() {
  const { playing, videoRef, bandRef, toggle } = useFootagePlayback();

  return (
    <section aria-label="Header footage" className="relative w-full overflow-hidden">
      <div
        ref={bandRef}
        className="relative h-[clamp(300px,46vw,560px)] w-full overflow-hidden bg-page"
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
        {/* Lands BOTH edges on the page colour. The bottom fade was always
            here; the top one is new. Without it the footage started on a
            hard horizontal cut directly under the translucent sticky
            header — the bottom faded over 28% of the height and the top
            over 0%, which is what read as an abrupt start. Keep both. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #070d14 0%, rgba(7,13,20,0.62) 5%, rgba(7,13,20,0.18) 13%, rgba(7,13,20,0) 34%, rgba(7,13,20,0.55) 72%, #070d14 100%)',
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
