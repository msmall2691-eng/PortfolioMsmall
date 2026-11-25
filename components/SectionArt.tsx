import { sectionArt } from '@/content/sectionArt';

/**
 * One artwork panel behind a section. Server component, no JavaScript.
 *
 * Decorative and inert: aria-hidden, pointer-events-none, z-0 behind the
 * content, and the parent clips it so nothing can widen the document.
 *
 * The parent section must be `relative` and `overflow-hidden`, or the
 * panel will escape and add horizontal scroll on phones.
 */
export function SectionArt({ name }: { name: keyof typeof sectionArt }) {
  const art = sectionArt[name];
  if (!art) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={art.src}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute block max-w-none"
        style={{
          top: art.top,
          width: art.width,
          opacity: art.opacity,
          ...(art.side === 'left' ? { left: '-4%' } : { right: '-4%' }),
        }}
      />
    </div>
  );
}
