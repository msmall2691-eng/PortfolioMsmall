'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Shared playback rules for every piece of decorative footage on the site.
 *
 * Both bands (the surface header and the reef band) need exactly these rules,
 * and one of them has already shipped a bug here, so the logic lives in one
 * place rather than being copied.
 *
 * Priority order:
 *  1. prefers-reduced-motion wins — no autoplay, and with preload="none" the
 *     file is never fetched at all. The poster still shows.
 *  2. Otherwise it plays only while on screen, and pauses on the way out.
 *  3. An explicit pause always wins, and survives scrolling away and back.
 *
 * The pause control is not optional decoration: WCAG 2.2.2 requires that
 * motion which plays automatically for more than five seconds can be paused,
 * and these loop forever. Keep it keyboard reachable and always visible —
 * do not hide it behind a hover.
 */
export function useFootagePlayback() {
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const bandRef = useRef<HTMLDivElement | null>(null);

  /**
   * Set once the visitor presses pause, cleared only when they press play.
   * A ref, not state, so the observer callback always reads the current
   * value instead of one captured when the effect last ran.
   *
   * Without this the observer called play() on every intersection, so a
   * paused band restarted itself as soon as it scrolled out of view and
   * back — and at a 0.2 threshold, sometimes without leaving the screen at
   * all. That defeats the pause control WCAG 2.2.2 requires.
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

  return { reduced, playing, videoRef, bandRef, toggle };
}
