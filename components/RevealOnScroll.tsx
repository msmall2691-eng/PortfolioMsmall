'use client';

import { useEffect } from 'react';

/**
 * Scroll reveal for the whole page: sections rise and fade in as they come
 * into view, instead of simply being there.
 *
 * Mounted once. One IntersectionObserver watches every `[data-reveal]`
 * element on the page rather than one observer per section, and each
 * element is unobserved the moment it has been revealed — a reveal is a
 * one-way door, nothing re-hides on the way back up.
 *
 * PROGRESSIVE ENHANCEMENT, and this part matters. The CSS that hides
 * `[data-reveal]` is scoped to `html.reveal-ready`, and this component is
 * the only thing that ever sets that class. So:
 *
 *   - no JavaScript  -> the class is never set -> nothing is ever hidden
 *   - JS fails to run -> same
 *   - reduced motion -> we return before setting it, so nothing is hidden
 *
 * Written the other way round — hide by default, reveal with JS — a
 * scripting failure would leave a visitor looking at a blank page with the
 * content technically present but at opacity 0. For a portfolio someone is
 * reading in order to decide whether to hire Megan, that is the one
 * failure mode worth engineering against.
 *
 * The threshold is deliberately small and the root margin negative at the
 * bottom, so a section starts moving a little before it is fully on
 * screen; waiting until it is centred reads as laggy.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const root = document.documentElement;

    // Honour the OS setting: no hiding, no animation, no observer at all.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    root.classList.add('reveal-ready');

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target); // one-way: never re-hide
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
    );

    for (const el of targets) io.observe(el);

    return () => {
      io.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);

  return null;
}
