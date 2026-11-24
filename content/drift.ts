/**
 * The sea-life layer: creatures cut out of the Firefly footage and drifting
 * faintly behind the page.
 *
 * Decorative only. The layer is aria-hidden and pointer-events-none, sits at
 * z-0 under the content, and clips itself — nothing here can affect reading,
 * clicking or page width.
 *
 * Depth is faked the way distance works underwater: things further away are
 * smaller, fainter and softer. The point is that someone notices it on the
 * second visit, not the first — if a creature competes with the copy, it is
 * too strong.
 *
 * On opacity: the page is light (#f7f6f2) and most of these creatures are
 * mid-tone, so anything under about 0.2 disappears entirely rather than
 * reading as subtle. A first pass at 0.09–0.2 was invisible on screen.
 * Sharp creatures sit around 0.36–0.46; the blurred schools, which carry
 * much more area, stay at 0.2–0.26.
 *
 * Nothing belongs above roughly 8% down: the video band at the top of the
 * page is opaque and would simply cover it.
 *
 * Cut from frame 3.5s of the night clip with a luminance key (the creatures
 * are lit against near-black, so brightness alone separates them). See
 * README → "The sea-life layer" for how to cut another one.
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
  { src: '/img/sea/jelly.webp',     top: '9%',  left: '2%',  width: 'min(130px, 17vw)', opacity: 0.4,  blur: 0.4, path: 'b', duration: 34, delay: 0 },
  { src: '/img/sea/school.webp',    top: '15%', left: '74%', width: 'min(380px, 44vw)', opacity: 0.26, blur: 1.2, path: 'c', duration: 46, delay: 3, flip: true },
  { src: '/img/sea/turtle.webp',    top: '24%', left: '80%', width: 'min(210px, 27vw)', opacity: 0.44, path: 'a', duration: 38, delay: 1 },
  { src: '/img/sea/clownfish.webp', top: '34%', left: '3%',  width: 'min(120px, 16vw)', opacity: 0.46, path: 'b', duration: 29, delay: 5 },
  { src: '/img/sea/school.webp',    top: '45%', left: '-5%', width: 'min(340px, 42vw)', opacity: 0.22, blur: 1.4, path: 'a', duration: 52, delay: 2 },
  { src: '/img/sea/jelly.webp',     top: '56%', left: '86%', width: 'min(160px, 21vw)', opacity: 0.38, blur: 0.3, path: 'c', duration: 41, delay: 6, flip: true },
  { src: '/img/sea/turtle.webp',    top: '68%', left: '1%',  width: 'min(170px, 23vw)', opacity: 0.36, blur: 0.4, path: 'b', duration: 44, delay: 0, flip: true },
  { src: '/img/sea/clownfish.webp', top: '79%', left: '89%', width: 'min(105px, 14vw)', opacity: 0.42, path: 'a', duration: 31, delay: 4, flip: true },
  { src: '/img/sea/school.webp',    top: '90%', left: '68%', width: 'min(320px, 40vw)', opacity: 0.2,  blur: 1.6, path: 'c', duration: 49, delay: 7 },
];

/** Case studies are shorter, so fewer and fainter. */
export const caseDrift: readonly Drifter[] = [
  { src: '/img/sea/school.webp',    top: '11%', left: '75%', width: 'min(320px, 40vw)', opacity: 0.22, blur: 1.3, path: 'c', duration: 47, delay: 1, flip: true },
  { src: '/img/sea/turtle.webp',    top: '32%', left: '0%',  width: 'min(180px, 25vw)', opacity: 0.36, blur: 0.4, path: 'a', duration: 39, delay: 4 },
  { src: '/img/sea/jelly.webp',     top: '58%', left: '87%', width: 'min(140px, 19vw)', opacity: 0.38, path: 'b', duration: 36, delay: 2, flip: true },
  { src: '/img/sea/clownfish.webp', top: '80%', left: '4%',  width: 'min(110px, 15vw)', opacity: 0.44, path: 'c', duration: 33, delay: 6 },
];
