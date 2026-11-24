'use client';

import { Container } from './ui';
import { dive } from '@/content/ambient';
import { useFootagePlayback } from '@/lib/useFootagePlayback';

/**
 * The surface: dock pilings and mooring ropes dropping away into the water,
 * directly under the sticky header. It opens the dive that the rest of the
 * page descends through — ropes at the top, deep reef below.
 *
 * This was a still image until the real footage turned up. An earlier note
 * here claimed the rope video "turned out to be the reef artwork"; that was
 * wrong. The rope footage exists and is 4K, and the camera descends during
 * the shot, so the header now dives on its own instead of faking it with a
 * CSS sway.
 *
 * It is cut from the same 4K master as the reef band, which is why the two
 * match: one source, one lighting setup, one palette.
 *
 * Playback rules live in useFootagePlayback — reduced motion never fetches
 * the file and shows the poster instead, and the pause control is required
 * by WCAG 2.2.2 because this loops. Do not remove it.
 *
 * The bottom edge fades to --color-page so the surface dissolves into the
 * dark rather than ending on a line.
 */
export function DiveHeader() {
  const { playing, videoRef, bandRef, toggle } = useFootagePlayback();

  return (
    <section aria-label="Surface" className="relative w-full overflow-hidden">
      <div
        ref={bandRef}
        className="relative h-[clamp(300px,46vw,560px)] w-full overflow-hidden bg-[#061019]"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 block size-full object-cover object-center"
          src={dive.src}
          poster={dive.poster}
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
          {dive.credit}
        </span>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          className="cursor-pointer rounded-[8px] border border-rule-outline bg-surface px-2.5 py-1.5 font-[inherit] text-[12px] font-semibold text-ink hover:border-accent"
        >
          {playing ? dive.pauseLabel : dive.playLabel}
        </button>
      </Container>
    </section>
  );
}
