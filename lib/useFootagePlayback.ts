'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Shared playback rules for every piece of decorative footage on the site.
 *
 * Both bands (the reef header and the ropes band) need exactly these rules,
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
 *
 * WHERE `playing` COMES FROM, and why it matters. Nothing here sets `playing`
 * by hand. The one effect below subscribes to the <video> element's own `play`
 * and `pause` events, and every other path — the observer, the reduced-motion
 * branch, the toggle — only ever calls `v.play()` or `v.pause()` and lets the
 * resulting event update the state.
 *
 * That is deliberate, for two reasons:
 *
 *  - The element is the single source of truth. Setting `playing` optimistically
 *    alongside a play() call lets the two drift whenever the browser pauses the
 *    video on its own — a hidden tab, low power mode, a failed autoplay promise.
 *    The button then shows the wrong icon, which is worse than useless on a
 *    control whose whole job is to say what the video is doing.
 *  - Calling setState synchronously in an effect body triggers a cascading
 *    render, which React's `react-hooks/set-state-in-effect` rule flags as an
 *    error. The fix is not to silence it: an effect should subscribe to an
 *    external system and set state from the callback, which is what this does.
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

    /**
     * Data saver counts the same as reduced motion.
     *
     * Measured on a 390px viewport: the header clip is 820 KB and it is the
     * largest single thing a visitor downloads, arriving before they have
     * read a word. The clip is decorative -- the page says exactly the same
     * thing without it, and the poster still shows -- so someone who has
     * asked their phone to use less data should not be spending most of
     * their page weight on it.
     *
     * `preload="none"` already stops the fetch until a band is in view, and
     * `reduced` short-circuits before the observer is created, so nothing is
     * fetched at all here.
     *
     * `saveData` is Chromium-only. Elsewhere it reads undefined, this is
     * false, and behaviour is exactly as before -- which is the right way
     * round for a progressive enhancement: the default is the richer
     * experience, and the signal can only opt out of it.
     */
    type Conn = EventTarget & { saveData?: boolean };
    const conn = (navigator as Navigator & { connection?: Conn }).connection;
    const saveData = () => Boolean(conn?.saveData);

    const sync = () => setReduced(mq.matches || saveData());
    sync();
    mq.addEventListener('change', sync);

    /*
      Subscribe to the connection too, not just read it once.
      Reduced motion is watched for CHANGES, and data saver has to be watched
      the same way or the two signals behave differently for no reason a
      visitor could guess. Measured before this listener existed: with the
      page already open, turning data saver on and scrolling to the second
      band still fetched 741 KB and autoplayed it.
      `connection` is an EventTarget where it exists at all, but it is
      Chromium-only, so guard the subscription rather than assuming it.
    */
    conn?.addEventListener?.('change', sync);

    return () => {
      mq.removeEventListener('change', sync);
      conn?.removeEventListener?.('change', sync);
    };
  }, []);

  // The only place `playing` is written. See the note above.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);

    // The element may already be running by the time this attaches.
    if (!v.paused) setPlaying(true);

    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, []);

  useEffect(() => {
    const el = bandRef.current;
    const v = videoRef.current;
    if (!el || !v) return;

    if (reduced) {
      v.pause(); // the `pause` listener clears `playing`
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          if (userPausedRef.current) return; // their choice outranks autoplay
          // A rejected promise fires no `play` event, so `playing` stays false.
          void v.play().catch(() => {});
        } else {
          v.pause();
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
      void v.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      v.pause();
    }
  }, []);

  return { reduced, playing, videoRef, bandRef, toggle };
}
