'use client';

import { Container } from './ui';
import { ambient } from '@/content/ambient';
import { useFootagePlayback } from '@/lib/useFootagePlayback';

/**
 * Full-bleed ambient footage, used as the transition into the closing
 * section rather than as a feature of its own.
 *
 * It is meant to read as texture, not as content: the video is aria-hidden
 * because nothing is lost by skipping it, and the clip was chosen for its
 * calm dark areas rather than its sharpness score — see content/ambient.ts
 * for why the highest-scoring candidate was the wrong one.
 *
 * Cut from the same 4K master as the dive header, which is what makes the
 * two bands look like one film instead of two stock clips.
 *
 * Playback rules live in useFootagePlayback, shared with DiveHeader. The
 * pause control is required by WCAG 2.2.2 because this loops — keep it
 * keyboard reachable and always visible.
 */
export function Ambient() {
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
          src={ambient.src}
          poster={ambient.poster}
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

      </div>

      {/* Sits below the band, not over it: grey-on-video is unreadable. */}
      <Container className="flex items-center justify-end gap-3 pt-2.5 pb-1">
        <span className="text-[12px] tracking-[0.02em] text-neutral-500">
          {ambient.credit}
        </span>
        {/* Absolute, so it spans the whole section and feathers both edges
            into the page colour. Out of flow — the flex row is unaffected. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #070d14 0%, rgba(7,13,20,0) 14%, rgba(7,13,20,0) 86%, #070d14 100%)',
          }}
        />

        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          className="cursor-pointer rounded-[8px] border border-rule-outline bg-surface px-2.5 py-1.5 font-[inherit] text-[12px] font-semibold text-ink hover:border-accent"
        >
          {playing ? ambient.pauseLabel : ambient.playLabel}
        </button>
      </Container>
    </section>
  );
}
