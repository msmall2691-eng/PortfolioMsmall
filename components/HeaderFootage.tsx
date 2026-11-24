'use client';

import { Container } from './ui';
import { headerClip } from '@/content/ambient';
import { useFootagePlayback } from '@/lib/useFootagePlayback';

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
 */
export function HeaderFootage() {
  const { playing, videoRef, bandRef, toggle } = useFootagePlayback();

  return (
    <section aria-label="Header footage" className="relative w-full overflow-hidden">
      <div
        ref={bandRef}
        className="relative h-[clamp(300px,46vw,560px)] w-full overflow-hidden bg-[#061019]"
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
        {/* Deepens the lower half and lands it on the page colour. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(7,13,20,0) 38%, rgba(7,13,20,0.55) 72%, #070d14 100%)',
          }}
        />
      </div>

      <Container className="flex items-center justify-end gap-3 pt-2.5 pb-1">
        <span className="text-[12px] tracking-[0.02em] text-neutral-500">
          {headerClip.credit}
        </span>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          className="cursor-pointer rounded-[8px] border border-rule-outline bg-surface px-2.5 py-1.5 font-[inherit] text-[12px] font-semibold text-ink hover:border-accent"
        >
          {playing ? headerClip.pauseLabel : headerClip.playLabel}
        </button>
      </Container>
    </section>
  );
}
