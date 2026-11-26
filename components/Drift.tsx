import type { Drifter } from '@/content/drift';

/**
 * The drifting sea-life layer. No JavaScript: the motion is CSS keyframes.
 *
 * Reduced motion is handled by an explicit `animation: none` override in
 * globals.css, NOT by the global rule that shortens animation-duration to
 * 0.01ms — that leaves an infinite animation running and sampling random
 * points on its path, which measured as visible jitter.
 *
 * Must be the first child of a box that is `relative` AND `overflow-hidden`:
 * it fills that box, is clipped by it so nothing can widen the document, and
 * sits at z-0, so the content in that box needs `relative z-10` above it.
 *
 * On a case study that box is the whole page wrapper. On the home page it is
 * an individual DARK section — a light band is opaque and would simply bury
 * the layer. See content/drift.ts.
 */
export function Drift({ items }: { items: readonly Drifter[] }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {items.map((d, i) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={`${d.src}-${i}`}
          src={d.src}
          alt=""
          loading="lazy"
          decoding="async"
          className={`drift drift-${d.path} absolute block max-w-none`}
          style={{
            top: d.top,
            left: d.left,
            width: d.width,
            opacity: d.opacity,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            filter: d.blur ? `blur(${d.blur}px)` : undefined,
            // The independent `scale` property, NOT transform: scaleX(-1).
            // The keyframes animate `transform`, and a running animation
            // wins over an inline transform — the flip would silently do
            // nothing. `scale` composes with it instead.
            ...(d.flip ? { scale: '-1 1' } : null),
          }}
        />
      ))}
    </div>
  );
}
