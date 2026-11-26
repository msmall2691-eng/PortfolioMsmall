import { Container } from './ui';

/**
 * The junction between a dark band and a light one.
 *
 * This is the part of an alternating page that is easy to get wrong. Butt a
 * light section against a dark one and you get a hard horizontal rule across
 * the viewport — the single cheapest-looking thing a page like this can do,
 * and it makes the two sections read as two different websites stacked.
 *
 * So the grounds dissolve into each other over ~130px, and the dissolve is
 * done by FADING THE LIGHT GROUND IN AND OUT rather than interpolating
 * between two hex values. That matters:
 *
 *   - Interpolating #070d14 -> #f1f1ed passes through a dead grey-brown
 *     midpoint and looks like a smudge.
 *   - Fading the light colour's ALPHA over whatever is behind means the
 *     dark end matches the dark band exactly, by construction, including
 *     the two radial glows in `.page-glow` and the drifting sea life
 *     underneath. There is no colour to keep in sync and nothing to get
 *     wrong when a token changes. The light end is opaque, so it matches
 *     the band it meets exactly too.
 *
 * The stops are eased, not linear: the dark end holds, then the light rises
 * quickly near the top of the light band. A linear ramp spends half its
 * height in the muddy middle and reads as fog.
 *
 * On top of that, two marks that make the junction look intended rather
 * than accidental:
 *
 *   - A faint ruler of 1px ticks, masked to appear only across the middle
 *     of the blend. Slate at 30% reads as a lift on the dark half and a
 *     shade on the light half, so one colour works in both directions.
 *   - One 40px accent bar on the container gutter, at the midpoint. That is
 *     the whole accent budget for the junction; see the restraint note in
 *     README.
 *
 * Decorative and inert: aria-hidden, no text, no height dependency on
 * content. Rendered BETWEEN the `[data-reveal]` wrappers in app/page.tsx,
 * not inside them, so a seam never slides in — the ground under a section
 * must already be correct before that section arrives.
 */
export function Seam({ to }: { to: 'light' | 'dark' }) {
  // Alpha of --color-paper-band, from the dark end to the light end.
  const ramp = [
    [0, 0],
    [22, 2],
    [40, 8],
    [56, 22],
    [72, 48],
    [86, 78],
    [95, 94],
    [100, 100],
  ] as const;

  const stops = (to === 'light' ? ramp : ramp.map(([at, a]) => [100 - at, a] as const).reverse())
    .map(
      ([at, a]) =>
        `color-mix(in srgb, var(--color-paper-band) ${a}%, transparent) ${at}%`,
    )
    .join(', ');

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative h-[clamp(76px,8vw,104px)] w-full overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${stops})` }}
    >
      {/* Two mask layers intersected, so the ticks fade out sideways AND
          vertically and never end on a visible edge. Where
          `mask-composite` is unsupported the layers union instead, which
          just shows the full 30px tick — a harmless fallback. */}
      <div
        className="absolute inset-x-0 top-1/2 h-[30px] -translate-y-1/2"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(120,138,152,0.34) 0 1px, transparent 1px 32px)',
          maskImage:
            'linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent), linear-gradient(180deg, transparent, #000 50%, transparent)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent), linear-gradient(180deg, transparent, #000 50%, transparent)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />
      <Container className="absolute inset-x-0 top-1/2 -translate-y-1/2">
        <span className="block h-[2px] w-10 bg-accent" />
      </Container>
    </div>
  );
}
