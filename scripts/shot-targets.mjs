/**
 * What the scheduled screenshot job captures, and what must never be in shot.
 *
 * Kept apart from the script so the rules are reviewable on their own.
 */

/**
 * Text that must not appear inside any captured frame.
 *
 * These are matched against the LIVE DOM, not against fixed pixel positions,
 * which is the whole point: if a client redesigns and their name moves, a
 * hard-coded crop box would keep "working" while quietly putting the name
 * back on Megan's portfolio. Matching the DOM means the job notices.
 */
export const FORBIDDEN = [
  { label: 'client name', re: /Nash\s+Construction/i },
  { label: 'client name', re: /The\s+Remote\s+Admin/i },
  { label: 'client name', re: /Arrowhead\s+Explorers/i },
  { label: 'client domain', re: /nashconstructionnh\.com/i },
  { label: 'client domain', re: /the-remote-admin\.com/i },
  { label: 'business email', re: /office@mainecleaningco\.com/i },
  // Any North American phone number that is not a 555 placeholder.
  { label: 'phone number', re: /(?<!\d)(?!555)\d{3}[-.\s]\d{3}[-.\s]\d{4}(?!\d)/ },
  { label: 'phone number', re: /\((?!555)\d{3}\)\s?\d{3}[-.\s]\d{4}/ },
];

/**
 * `thirdParty` marks a site Megan does not own. Only those get the logo
 * check: her own wordmark on her own site is not a leak, and treating it as
 * one made the job refuse to update maineclean.co for no reason.
 *
 * `crop` is the region of the 2560x1440 capture that is kept.
 *
 * For Megan's own sites that is the whole hero. For client sites it is framed
 * to leave their wordmark, logo and phone out — chosen by looking, because
 * erasing a logo was tried and left visible streaks where the surrounding
 * art had been.
 *
 * `redact` boxes have their text replaced by `with`, drawn in the sampled
 * colour over a sampled background. Used only for Megan's own number on her
 * own site, where the number is the only thing to remove and cropping it out
 * would cost the whole header.
 */
export const TARGETS = [
  {
    name: 'maineclean',
    url: 'https://maineclean.co',
    out: 'public/img/tmcc-demo.webp',
    crop: [0, 0, 2560, 1440],
    // Megan's own number, shown twice in the hero. Hers to publish, but the
    // portfolio keeps every number a 555 placeholder, so it goes.
    replace: [{ find: /(?<!\d)\d{3}[-.\s]\d{3}[-.\s]\d{4}(?!\d)/g, with: '555-0100' }],
  },
  {
    name: 'mstudio',
    url: 'https://mlinx.studio',
    out: 'public/img/mstudio-live.webp',
    crop: [0, 0, 2560, 1440],
    replace: [],
  },
  {
    name: 'client-contractor',
    url: 'https://nashconstructionnh.com',
    out: 'public/img/client-contractor.webp',
    thirdParty: true,
    /*
      Headline and sector line, stopping well above the paragraph that names
      them. The first version of this ended at y=1049 and their name begins
      at y=1048 -- a one-pixel overlap that looked perfectly fine by eye and
      that the gate refused. Hence the 28px of margin; keep it.
    */
    crop: [0, 220, 1422, 1020],
    replace: [],
  },
  {
    name: 'client-admin',
    url: 'https://the-remote-admin.com',
    out: 'public/img/client-admin.webp',
    thirdParty: true,
    // the typographic half of the hero; their logo fills the right side
    crop: [0, 380, 1400, 1167],
    replace: [],
  },
];
