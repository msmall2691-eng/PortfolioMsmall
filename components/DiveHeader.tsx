import { Container } from './ui';
import { dive } from '@/content/ambient';

/**
 * The surface: dock pilings and mooring ropes dropping away into the water,
 * directly under the sticky header. It opens the dive that the rest of the
 * page descends through — ropes at the top, deep reef below.
 *
 * A still image, not video. The clip that looked like this turned out to be
 * the reef artwork, so the ropes exist only as a frame; the motion here is
 * CSS instead, which is also ~80 KB against ~1.4 MB.
 *
 * The movement is a very slow vertical drift plus a breath of scale, so the
 * ropes sway rather than sit. `prefers-reduced-motion` stops it — see the
 * `.dive-sway` override in globals.css.
 *
 * The bottom edge fades to --color-page so the surface dissolves into the
 * dark rather than ending on a line.
 */
export function DiveHeader() {
  return (
    <section aria-label="Surface" className="relative w-full overflow-hidden">
      <div className="relative h-[clamp(300px,46vw,560px)] w-full overflow-hidden bg-[#061019]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={dive.src}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="dive-sway absolute inset-0 block size-full scale-[1.06] object-cover object-center"
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

      <Container className="flex items-center justify-end pt-2.5 pb-1">
        <span className="text-[12px] tracking-[0.02em] text-neutral-500">
          {dive.credit}
        </span>
      </Container>
    </section>
  );
}
