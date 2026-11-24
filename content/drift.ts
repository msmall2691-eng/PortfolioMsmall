/**
 * The sea-life layer: creatures cut from the high-resolution reef artwork,
 * drifting behind the page.
 *
 * Decorative only. The layer is aria-hidden and pointer-events-none, sits at
 * z-0 under the content, and clips itself — nothing here can affect reading,
 * clicking or page width.
 *
 * CUTTING THEM OUT. The artwork's water is lit teal, not black, so a plain
 * luminance key leaves a visible rectangle — the first pass did exactly that.
 * Each cutout is therefore luminance key MULTIPLIED BY a radial falloff, so
 * the edges dissolve instead of ending. On this dark ground the leftover
 * dark-teal residue disappears. Two creatures were cut and then dropped: the
 * manta ray and a close crop of the octopus both sit in the bright light
 * shaft, where nothing separates them from the water. Do not re-add them
 * from that source.
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
  { src: '/img/sea/jelly.webp',      top: '8%',  left: '3%',  width: 'min(110px, 15vw)', opacity: 0.6,  path: 'b', duration: 34, delay: 0 },
  { src: '/img/sea/eel.webp',        top: '14%', left: '76%', width: 'min(210px, 28vw)', opacity: 0.4,  blur: 0.8, path: 'c', duration: 46, delay: 3, flip: true },
  { src: '/img/sea/turtle.webp',     top: '22%', left: '79%', width: 'min(240px, 30vw)', opacity: 0.7,  path: 'a', duration: 38, delay: 1 },
  { src: '/img/sea/clownfish.webp',  top: '31%', left: '4%',  width: 'min(120px, 16vw)', opacity: 0.72, path: 'b', duration: 29, delay: 5 },
  { src: '/img/sea/jelly2.webp',     top: '40%', left: '88%', width: 'min(95px, 13vw)',  opacity: 0.45, blur: 0.7, path: 'c', duration: 43, delay: 2 },
  { src: '/img/sea/anglerfish.webp', top: '49%', left: '-1%', width: 'min(230px, 29vw)', opacity: 0.6,  path: 'a', duration: 50, delay: 4 },
  { src: '/img/sea/clownfish2.webp', top: '58%', left: '85%', width: 'min(115px, 15vw)', opacity: 0.68, path: 'b', duration: 31, delay: 6, flip: true },
  { src: '/img/sea/jelly.webp',      top: '66%', left: '6%',  width: 'min(85px, 12vw)',  opacity: 0.42, blur: 0.9, path: 'c', duration: 47, delay: 1, flip: true },
  { src: '/img/sea/turtle.webp',     top: '75%', left: '82%', width: 'min(175px, 24vw)', opacity: 0.5,  blur: 0.5, path: 'a', duration: 44, delay: 0, flip: true },
  { src: '/img/sea/eel.webp',        top: '84%', left: '2%',  width: 'min(185px, 25vw)', opacity: 0.38, blur: 1.0, path: 'b', duration: 52, delay: 7 },
  { src: '/img/sea/clownfish.webp',  top: '92%', left: '89%', width: 'min(100px, 14vw)', opacity: 0.62, path: 'c', duration: 33, delay: 3, flip: true },
];

/** Case studies are shorter, so fewer and fainter. */
export const caseDrift: readonly Drifter[] = [
  { src: '/img/sea/eel.webp',        top: '10%', left: '78%', width: 'min(200px, 27vw)', opacity: 0.38, blur: 0.9, path: 'c', duration: 47, delay: 1, flip: true },
  { src: '/img/sea/turtle.webp',     top: '28%', left: '0%',  width: 'min(200px, 27vw)', opacity: 0.6,  path: 'a', duration: 39, delay: 4 },
  { src: '/img/sea/jelly.webp',      top: '47%', left: '87%', width: 'min(100px, 14vw)', opacity: 0.55, path: 'b', duration: 36, delay: 2, flip: true },
  { src: '/img/sea/anglerfish.webp', top: '66%', left: '2%',  width: 'min(200px, 26vw)', opacity: 0.55, path: 'c', duration: 48, delay: 6 },
  { src: '/img/sea/clownfish2.webp', top: '84%', left: '84%', width: 'min(110px, 15vw)', opacity: 0.65, path: 'a', duration: 32, delay: 0, flip: true },
];
