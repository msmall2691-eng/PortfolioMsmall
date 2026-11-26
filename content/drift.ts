/**
 * The sea-life layer: creatures cut from the high-resolution reef artwork,
 * drifting behind the page.
 *
 * Decorative only. The layer is aria-hidden and pointer-events-none, sits at
 * z-0 under the content, and clips itself — nothing here can affect reading,
 * clicking or page width.
 *
 * A SECOND SOURCE, used sparingly. glowjelly*.webp come from a different
 * piece of Megan's artwork — an octopus lit GREEN rather than blue. Only
 * the jellyfish were taken from it: they are translucent and teal, so they
 * sit inside the existing palette. The red fan coral, green neon worm and
 * brain coral in that same image all pass both gates but introduce colours
 * the rest of the page does not have; left out on purpose, not by oversight.
 *
 * The octopus itself CANNOT be cut from it. Its body is mid-tone against a
 * lit background, so a luminance key reads it as mostly background: even at
 * the gentlest curve tried (p3 floor, gamma 0.45) only 6.5% of its pixels
 * clear half alpha, against 1.7% at the normal setting. It would be
 * invisible at drift opacity. That image works whole, as a background, or
 * not at all.
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
 * POSITIONS ARE RELATIVE TO THE BOX THE LAYER IS MOUNTED IN. On the home
 * page that is a single dark section (see the note on `introDrift` below);
 * on a case study it is still the whole page, where nothing belongs in the
 * top ~7% because the header footage is opaque and covers it.
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

/**
 * THE HOME PAGE LIST WAS THIRTEEN CREATURES SPREAD DOWN THE WHOLE PAGE.
 * It is five now, in two lists, and the reason is the alternating bands.
 *
 * That list was positioned in percentages of the ENTIRE document, on the
 * assumption that the whole document was one dark ground. Half the page is
 * a light band now, and a light band is opaque, so eight of those thirteen
 * were lazily fetched and then painted behind an opaque white surface where
 * nothing could ever see them. The other five sat in the dark sections by
 * luck, and any future copy edit that changed the page height would have
 * reshuffled which five.
 *
 * So the layer moved INTO the dark sections it belongs to, and each list is
 * positioned against its own section box rather than the document. That is
 * stable under any amount of copy change, it is five images instead of
 * thirteen, and the creatures now only appear in the dark scenes — which is
 * the point of keeping a dark identity at all.
 *
 * `caseDrift` below is unchanged: a case study is still dark end to end.
 */

/** Behind the intro, under the header footage. */
export const introDrift: readonly Drifter[] = [
  { src: '/img/sea/turtle.webp',     top: '2%',  left: '83%', width: 'min(230px, 26vw)', opacity: 0.5, path: 'a', duration: 38, delay: 1 },
  { src: '/img/sea/jelly.webp',      top: '44%', left: '0%',  width: 'min(100px, 13vw)', opacity: 0.5, path: 'b', duration: 34, delay: 0 },
  { src: '/img/sea/eel.webp',        top: '58%', left: '88%', width: 'min(170px, 22vw)', opacity: 0.3, blur: 0.9, path: 'c', duration: 46, delay: 3, flip: true },
];

/** Behind the Power BI section. */
export const dataDrift: readonly Drifter[] = [
  { src: '/img/sea/anglerfish.webp', top: '6%',  left: '-3%', width: 'min(200px, 24vw)', opacity: 0.42, blur: 0.4, path: 'a', duration: 50, delay: 4 },
  { src: '/img/sea/glowjelly2.webp', top: '62%', left: '90%', width: 'min(105px, 14vw)', opacity: 0.48, path: 'c', duration: 45, delay: 2, flip: true },
];

/** Case studies are shorter, so fewer and fainter. */
export const caseDrift: readonly Drifter[] = [
  { src: '/img/sea/eel.webp',        top: '10%', left: '78%', width: 'min(200px, 27vw)', opacity: 0.38, blur: 0.9, path: 'c', duration: 47, delay: 1, flip: true },
  { src: '/img/sea/turtle.webp',     top: '28%', left: '0%',  width: 'min(200px, 27vw)', opacity: 0.6,  path: 'a', duration: 39, delay: 4 },
  { src: '/img/sea/jelly.webp',      top: '47%', left: '87%', width: 'min(100px, 14vw)', opacity: 0.55, path: 'b', duration: 36, delay: 2, flip: true },
  { src: '/img/sea/anglerfish.webp', top: '66%', left: '2%',  width: 'min(200px, 26vw)', opacity: 0.55, path: 'c', duration: 48, delay: 6 },
  { src: '/img/sea/clownfish2.webp', top: '84%', left: '84%', width: 'min(110px, 15vw)', opacity: 0.65, path: 'a', duration: 32, delay: 0, flip: true },
  { src: '/img/sea/glowjelly2.webp', top: '58%', left: '3%',  width: 'min(90px, 13vw)',  opacity: 0.5,  blur: 0.5, path: 'b', duration: 44, delay: 3 },
];
