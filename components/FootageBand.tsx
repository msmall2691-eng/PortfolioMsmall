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
 *
 * BOTH EDGES NOW FADE TO THE LIGHT BAND COLOUR, not to the page dark.
 * This band sits between More work and Skills, and both of those are light
 * bands, so it is the dark scene in the middle of the light half of the
 * page: a window of deep water opening in a white page, which is also what
 * the clip is — the waterline and the mooring ropes dropping away.
 *
 * That is why there is no <Seam> on either side of it. The dissolve the
 * seam would do is already being done here, by the band's own gradient, and
 * doing it twice would read as a grey stripe above and below the footage.
 * If this band is ever moved between two DARK sections, both stops go back
 * to #070d14 — matching whatever is adjacent is the whole job of these
 * gradients.
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

          Feathers both edges of the band into the LIGHT band colour. The
          stops are the same eased ramp components/Seam.tsx uses, so this
          junction and every other junction on the page dissolve at the same
          rate.

          This lives INSIDE the band div and BEFORE the toggle, so the
          toggle's z-10 is above it. As a sibling after the band it painted
          over the control: the button sat at bottom-3, inside the bottom
          feather, under a nearly opaque stop. It still worked (the overlay
          is pointer-events-none) but it was dimmed, and against a light
          feather it would have been washed out instead.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg,' +
              ' var(--color-paper-band) 0%,' +
              ' color-mix(in srgb, var(--color-paper-band) 94%, transparent) 4%,' +
              ' color-mix(in srgb, var(--color-paper-band) 48%, transparent) 13%,' +
              ' color-mix(in srgb, var(--color-paper-band) 8%, transparent) 24%,' +
              ' transparent 34%,' +
              ' transparent 66%,' +
              ' color-mix(in srgb, var(--color-paper-band) 8%, transparent) 76%,' +
              ' color-mix(in srgb, var(--color-paper-band) 48%, transparent) 87%,' +
              ' color-mix(in srgb, var(--color-paper-band) 94%, transparent) 96%,' +
              ' var(--color-paper-band) 100%)',
          }}
        />

        <FootageToggle
          playing={playing}
          onToggle={toggle}
          pauseLabel={bandClip.pauseLabel}
          playLabel={bandClip.playLabel}
        />
      </div>
    </section>
  );
}
