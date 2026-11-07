/**
 * Work section: the BrightBase case study, the selected-work grid,
 * the turnover spotlight and the smaller builds.
 *
 * Every number in the product mocks is sample data and must stay fake.
 * No client names, addresses, gate codes or phone numbers anywhere.
 */
import { links } from './site';

export const caseStudy = {
  eyebrow: 'FEATURED PROJECT',
  heading: 'BrightBase: the software my cleaning company runs on',
  summary:
    'Scheduling, a crew phone app, rental turnovers, billing and payouts in one place. None of the apps I tried fit, so I designed and built it, then moved the whole company onto it.',
  href: '/work/brightbase/',
  mockAlt:
    "BrightBase office dashboard beside the cleaner's phone app showing today's job at a property",
  facts: [
    { value: 'Daily', label: 'used by the office and crews' },
    { value: '96%', label: 'visits with a cleaner assigned' },
    { value: '4,100+', label: 'automated tests' },
  ],
} as const;

/* --- Selected work grid ------------------------------------------------ */

export type SelectedWork = {
  tag: string;
  title: string;
  description: string;
  /** Which part of the Work area the card belongs to. */
  group: 'systems' | 'websites';
  /** 'browser' frames one screenshot; 'phones' fans three phone screens; 'image' fills the panel. */
  frame: 'browser' | 'phones' | 'image';
  img?: string;
  url?: string;
  alt: string;
  objectPosition?: string;
  stage: string;
  href: string;
  /** True when the destination is not publicly reachable yet. */
};

export const selectedWork: readonly SelectedWork[] = [
  {
    group: 'systems',
    tag: 'WEB APP · MARKETPLACE',
    title: 'linx',
    description:
      'An app where rental owners post cleanings and vetted cleaners bid on them.',
    frame: 'image',
    img: '/img/linx-flow.webp',
    alt: 'Diagram of a turnover moving through linx',
    objectPosition: 'center',
    stage: '#141726',
    href: '/work/linx/',
  },
  {
    group: 'systems',
    tag: 'AI · INTERNAL TOOL',
    title: 'Agent Command Center',
    description:
      'AI assistants for my business, code and school that draft work for me to approve.',
    frame: 'browser',
    img: '/img/acc-console.webp',
    url: 'command center',
    alt: 'Agent Command Center console',
    objectPosition: 'left top',
    stage: 'radial-gradient(120% 90% at 0% 0%, #3d5a4a 0%, #1f3330 60%, #172320 100%)',
    href: '/work/agent-command-center/',
  },
  {
    group: 'websites',
    tag: 'WEBSITE · LIVE',
    title: 'maineclean.co',
    description:
      'The cleaning company’s website, where customers get an instant price and book.',
    frame: 'browser',
    img: '/img/tmcc-estimate.webp',
    url: 'maineclean.co',
    alt: 'Instant estimate form on maineclean.co',
    objectPosition: 'right top',
    stage: 'radial-gradient(120% 90% at 0% 0%, #3a5a8a 0%, #24304f 60%, #1e2540 100%)',
    href: '/work/maineclean/',
  },
  {
    group: 'websites',
    tag: 'PRODUCT · LIVE',
    title: 'M Linx Guide',
    description:
      'Phone guidebooks for rental guests, with door codes shown only to the right guest.',
    frame: 'phones',
    alt: 'Three guest-guide layouts on phones',
    stage: 'radial-gradient(120% 90% at 100% 0%, #8a6a4a 0%, #3b3245 55%, #22243a 100%)',
    href: '/work/m-linx-guide/',
  },
];

/* --- Client sites ------------------------------------------------------ */

export const clientSites = [
  {
    name: 'Nash Construction',
    tag: 'CLIENT · NASHUA, NH',
    description:
      'Rebuilt off Wix and moved to Vercel.',
    img: '/img/client-nash.webp',
    url: 'nashconstructionnh.com',
    href: 'https://nashconstructionnh.com',
  },
  {
    name: 'The Remote Admin',
    tag: 'CLIENT · SOUTHERN NH',
    description:
      'Built to match an existing brand.',
    img: '/img/client-remote-admin.webp',
    url: 'the-remote-admin.com',
    href: 'https://the-remote-admin.com',
  },
] as const;

export const phoneShots = [
  { src: '/img/gg-tiles.jpg', rotate: -6, lift: 6, z: 1 },
  { src: '/img/gg-bento.jpg', rotate: 0, lift: -2, z: 2 },
  { src: '/img/gg-book.jpg', rotate: 6, lift: 6, z: 1 },
] as const;

/* --- Turnover spotlight ------------------------------------------------ */

/* --- More builds ------------------------------------------------------- */

