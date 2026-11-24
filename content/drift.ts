/**
 * The sea-life layer: creatures cut from the high-resolution reef artwork,
 * drifting behind the page.
 *
 * Decorative only. The layer is aria-hidden and pointer-events-none, sits at
 * z-0 under the content, and clips itself — nothing here can affect reading,
 * clicking or page width.
 *
 * CUTTING THEM OUT, AND PROVING IT WORKED. Luminance key multiplied by a
 * radial falloff. That is necessary but NOT sufficient, and eyeballing it
 * does not tell you which — jelly.webp shipped with a visible rectangle and
 * went unnoticed until it happened to land against the bright lower edge of
 * the header.
 *
 * The test: composite the cutout onto --color-page at the opacity it is
 * actually rendered at, then look at the outermost ring of pixels. A
 * rectangle lifts the WHOLE ring, so use the MEDIAN lift, not the max — the
 * max is tripped by any creature whose body simply reaches the crop edge,
 * which is fine and normal. Gate: median lift < 1.0 and under half the ring
 * more than 2 above page luma. The assets here measure 0.00 / 0%.
 *
 * A BORDER TEST IS NOT ENOUGH. It only sees the outer ring, so it misses
 * haze sitting INSIDE the crop — a light shaft that never reaches the edge
 * passes it. Second measure: take the pixels whose alpha came out under
 * 0.15 (background that should have keyed away to nothing) and ask how far
 * above page luma they still sit. Reject on p95 above 6.
 *
 * Re-cut from the full-resolution source artwork, every creature passed the
 * border test, manta included — and the manta was still wrong. Its haze p95
 * is 10.31 against 1.3-5.5 for everything that passes, and the glow is
 * plainly visible once composited. The warning below was right and the
 * border test alone would have overruled it.
 *
 * What actually decides it is the SOURCE, not the feather. Creatures cut
 * from the dark 26s frame all pass. Everything cut from the lit reef frames
 * fails and cannot be rescued — turtle 23.5, anemone 30.9 against a
 * threshold of 2. The manta ray and a close crop of the octopus sit in the
 * bright light shaft and fail the same way; they were dropped twice, once by
 * eye and once by measurement. Do not re-add them from that source.
 *
 * OPACITY. The page is now near-black, and these creatures are relatively
 * bright, so they carry much higher opacity than the old light-page version
 * (which needed 0.36–0.46 just to be visible at all). Distant ones are
 * smaller, fainter and blurred.
 *
 * Nothing belongs in the top ~7%: the dive header is opaque and covers it.
 */

export type Drifter = {
  src: string;
  /** Percent down the whole page. */
  top: string;
  /** Percent across. Keep clear of the centre column, where the copy is. */
  left: string;
  /** CSS width — a min() so phones get a proportionate creature, not a crop. */
  width: string;
  opacity: number;
  /** Further away = softer. */
  blur?: number;
  /** Which drift path; the three differ in direction and travel. */
  path: 'a' | 'b' | 'c';
  /** Seconds. Long and uneven, so the loops never visibly line up. */
  duration: number;
  delay: number;
  /** Mirror it, so the same cutout does not read as a repeat. */
  flip?: boolean;
};

/** The long home page: spread out, alternating sides. */
export const homeDrift: readonly Drifter[] = [
  { src: '/img/sea/jelly.webp',      top: '11%', left: '3%',  width: 'min(110px, 15vw)', opacity: 0.6,  path: 'b', duration: 34, delay: 0 },
  { src: '/img/sea/eel.webp',        top: '14%', left: '76%', width: 'min(210px, 28vw)', opacity: 0.4,  blur: 0.8, path: 'c', duration: 46, delay: 3, flip: true },
  { src: '/img/sea/turtle.webp',     top: '22%', left: '79%', width: 'min(240px, 30vw)', opacity: 0.7,  path: 'a', duration: 38, delay: 1 },
  { src: '/img/sea/clownfish.webp',  top: '31%', left: '4%',  width: 'min(120px, 16vw)', opacity: 0.72, path: 'b', duration: 29, delay: 5 },
  { src: '/img/sea/minnow.webp',     top: '40%', left: '88%', width: 'min(95px, 13vw)',  opacity: 0.45, blur: 0.7, path: 'c', duration: 43, delay: 2 },
  { src: '/img/sea/anglerfish.webp', top: '49%', left: '-1%', width: 'min(230px, 29vw)', opacity: 0.6,  path: 'a', duration: 50, delay: 4 },
  { src: '/img/sea/clownfish2.webp', top: '58%', left: '85%', width: 'min(115px, 15vw)', opacity: 0.68, path: 'b', duration: 31, delay: 6, flip: true },
  { src: '/img/sea/jelly.webp',      top: '66%', left: '6%',  width: 'min(85px, 12vw)',  opacity: 0.42, blur: 0.9, path: 'c', duration: 47, delay: 1, flip: true },
  { src: '/img/sea/turtle.webp',     top: '75%', left: '82%', width: 'min(175px, 24vw)', opacity: 0.5,  blur: 0.5, path: 'a', duration: 44, delay: 0, flip: true },
  { src: '/img/sea/eel.webp',        top: '84%', left: '2%',  width: 'min(185px, 25vw)', opacity: 0.38, blur: 1.0, path: 'b', duration: 52, delay: 7 },
  { src: '/img/sea/driftfish.webp',  top: '92%', left: '89%', width: 'min(100px, 14vw)', opacity: 0.62, path: 'c', duration: 33, delay: 3, flip: true },
];

/** Case studies are shorter, so fewer and fainter. */
export const caseDrift: readonly Drifter[] = [
  { src: '/img/sea/eel.webp',        top: '10%', left: '78%', width: 'min(200px, 27vw)', opacity: 0.38, blur: 0.9, path: 'c', duration: 47, delay: 1, flip: true },
  { src: '/img/sea/turtle.webp',     top: '28%', left: '0%',  width: 'min(200px, 27vw)', opacity: 0.6,  path: 'a', duration: 39, delay: 4 },
  { src: '/img/sea/jelly.webp',      top: '47%', left: '87%', width: 'min(100px, 14vw)', opacity: 0.55, path: 'b', duration: 36, delay: 2, flip: true },
  { src: '/img/sea/anglerfish.webp', top: '66%', left: '2%',  width: 'min(200px, 26vw)', opacity: 0.55, path: 'c', duration: 48, delay: 6 },
  { src: '/img/sea/clownfish2.webp', top: '84%', left: '84%', width: 'min(110px, 15vw)', opacity: 0.65, path: 'a', duration: 32, delay: 0, flip: true },
];
