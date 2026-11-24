'use client';

import { bandClip } from '@/content/ambient';
import { useFootagePlayback } from '@/lib/useFootagePlayback';
import { FootageToggle } from './FootageToggle';

/**
 * Full-bleed footage lower down the page, used as the transition into the
 * closing section rather than as a feature of its own: dock pilings and
 * mooring ropes dropping away into the water, the camera descending.
 *
 * This was the page header until Megan picked the reef for that slot. The
 * two still come from one 4K master, which is what keeps them looking like
 * one film instead of two stock clips.
 *
 * This slot is much wider than the clip, so object-cover drops about a
 * third of the height. `objectPosition` keeps the top, where the waterline
 * and the knots are — see content/ambient.ts for why that is done in CSS
 * rather than by re-cutting.
 *
 * Playback rules live in useFootagePlayback, shared with HeaderFootage. The
 * pause control is required by WCAG 2.2.2 because this loops — keep it
 * keyboard reachable and always visible.
 */
export function FootageBand() {
  const { playing, videoRef, bandRef, toggle } = useFootagePlayback();

  return (
    <section aria-label="Ambient footage" className="relative w-full">
      <div
        ref={bandRef}
        className="relative h-[clamp(230px,30vw,430px)] w-full overflow-hidden"
        /* Behind the poster while it loads, so the band never flashes white. */
        style={{ backgroundColor: '#0d2430' }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 block size-full object-cover"
          style={{ objectPosition: bandClip.objectPosition }}
          src={bandClip.src}
          poster={bandClip.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        />

        {/*
          No wash over the footage itself. An earlier pass laid a #f7f6f2/12
          tint on top, tuned for a bright daylight clip. Over dark footage
          that greyed the image out and read as blur, which is exactly what
          it was mistaken for. If a light clip is ever used here, that trade
          reverses.
        */}

        <FootageToggle
          playing={playing}
          onToggle={toggle}
          pauseLabel={bandClip.pauseLabel}
          playLabel={bandClip.playLabel}
        />
      </div>

      {/* Feathers both edges of the section into the page colour. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #070d14 0%, rgba(7,13,20,0) 14%, rgba(7,13,20,0) 86%, #070d14 100%)',
        }}
      />

    </section>
  );
}
