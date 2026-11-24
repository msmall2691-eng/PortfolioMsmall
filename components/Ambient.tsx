'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from './ui';
import { ambient } from '@/content/ambient';

/**
 * Full-bleed ambient footage, used as the transition into the closing
 * section rather than as a feature of its own.
 *
 * It is meant to read as texture, not as content: the top and bottom edges
 * fade into the page colour so the band blends into the scroll instead of
 * sitting on it as a pasted rectangle, and the video is aria-hidden because
 * nothing is lost by skipping it.
 *
 * Playback rules, in priority order:
 *  1. prefers-reduced-motion wins — no autoplay, and the file is never
 *     fetched at all.
 *  2. Otherwise it plays only while on screen and pauses on the way out.
 *  3. The pause control always overrides.
 *
 * The control is not optional decoration: WCAG 2.2.2 requires that motion
 * which plays automatically for more than five seconds can be paused, and
 * this loops. Keep it keyboard reachable and always visible — do not hide
 * it behind a hover.
 */
export function Ambient() {
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const bandRef = useRef<HTMLDivElement | null>(null);
  /**
   * Set once the visitor presses pause, and only cleared when they press
   * play again. A ref, not state, so the observer callback always reads the
   * current value instead of one captured when the effect last ran.
   *
   * Without this the observer called play() on every intersection, so a
   * paused band restarted itself as soon as it scrolled out of view and
   * back — and with a 0.2 threshold, sometimes without leaving the screen
   * at all. That defeats the pause control WCAG 2.2.2 requires.
   */
  const userPausedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = bandRef.current;
    const v = videoRef.current;
    if (!el || !v) return;

    if (reduced) {
      v.pause();
      setPlaying(false);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          if (userPausedRef.current) return; // their choice outranks autoplay
          v.play().then(
            () => setPlaying(true),
            () => setPlaying(false),
          );
        } else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPausedRef.current = false;
      v.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    } else {
      userPausedRef.current = true;
      v.pause();
      setPlaying(false);
    }
  }, []);

  return (
    /* Opens the page, directly under the sticky header. Both edges meet
       --color-page, so it reads as the top of the scroll, not a banner. */
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
          No fades and no wash over the footage. An earlier pass faded both
          edges to the light page colour and laid a #f7f6f2/12 tint on top —
          tuned for the bright daylight clip. Over dark footage that greyed
          the image out and read as blur, which is exactly what it was
          mistaken for. Against a light page a dark band wants crisp edges.
          If a light clip is ever used here, that trade reverses.
        */}

      </div>

      {/* Sits below the band, not over it: grey-on-video is unreadable. */}
      <Container className="flex items-center justify-end gap-3 pt-2.5 pb-1">
        <span className="text-[12px] tracking-[0.02em] text-neutral-500">
          {ambient.credit}
        </span>
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
