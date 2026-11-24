import type { Drifter } from '@/content/drift';

/**
 * The drifting sea-life layer. No JavaScript: the motion is CSS keyframes,
 * which the stylesheet's global `prefers-reduced-motion` rule already stills.
 * The keyframes rest at the origin at 0% and 100%, so a visitor who asks for
 * reduced motion sees the creatures parked exactly where they are laid out.
 *
 * Must be the first child of a `relative` page wrapper. It takes the full
 * page box, clips itself so nothing can widen the document, and sits at z-0
 * — the header is z-20 and `<main>` is lifted to z-10, so this stays behind
 * everything that matters.
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
