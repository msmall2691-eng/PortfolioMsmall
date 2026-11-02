'use client';

import { useEffect } from 'react';

/**
 * Publishes the sticky header's real height as `--header-h`, which the
 * `.section-anchor` utility uses as its scroll offset.
 *
 * The header wraps to two or three rows on narrow screens, so a fixed
 * offset would drop every anchored section behind it. CSS alone cannot
 * read an element's height; this keeps the offset exact at any width and
 * through any content change. Without JS the media-query fallbacks in
 * globals.css still land close.
 */
export function HeaderOffset() {
  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;

    const apply = () => {
      const h = Math.round(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--header-h', `${h}px`);
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(header);
    window.addEventListener('resize', apply);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', apply);
    };
  }, []);

  return null;
}
