/**
 * The home page, compact version (Nov 7, 2026 audit): who Meg is and her
 * experience first, four projects, then everything else as one short list.
 * Case studies, tools, Power BI and Wrapped all stay live; they are linked
 * from here rather than shown in full.
 */
import { links, profile, YEARS_IN_BUSINESS_WORD } from './site';

export const intro = {
  name: profile.name,
  role: 'Business systems & web developer · Southern Maine',
  line: `${YEARS_IN_BUSINESS_WORD} years running a cleaning company, and the software it now runs on. Looking for a full-time role designing and building business systems.`,
  experience: [
    { when: '2018 – now', what: 'Owner & operator', where: 'The Maine Cleaning Co.' },
    { when: '2026', what: 'Built BrightBase · founded M Studio', where: 'Systems and web work' },
    { when: 'In progress', what: 'B.S. Business Analytics & AI', where: 'University of Southern Maine' },
    { when: 'Earlier', what: 'Administrative assistant · lead dental assistant', where: 'SMCC · Southern Maine practices' },
  ],
} as const;

export type Project = {
  title: string;
  tag: string;
  line: string;
  img: string;
  alt: string;
  position?: string;
  href: string;
  extra?: { label: string; href: string };
};

export const projects: readonly Project[] = [
  {
    title: 'BrightBase',
    tag: 'Operations app',
    line: 'Leads, quotes, scheduling, a crew phone app, billing and payouts in one place.',
    img: '/img/bb-requests.webp',
    alt: 'BrightBase lead inbox with requests from the website, Facebook and phone. Demo data.',
    position: 'top left',
    href: '/work/brightbase/',
  },
  {
    title: 'linx',
    tag: 'Marketplace web app',
    line: 'Rental owners post cleanings, vetted cleaners bid, and Stripe pays them.',
    img: '/img/linx-landing.webp',
    alt: 'linx landing page with a sample turnover and three bids',
    position: 'top',
    href: '/work/linx/',
  },
  {
    title: 'maineclean.co',
    tag: 'Website · live demo',
    line: 'The cleaning company site with an instant price and online booking, kept online as a demo.',
    img: '/img/tmcc-demo.webp',
    alt: 'The Maine Cleaning Co. website homepage',
    position: 'top left',
    href: '/work/maineclean/',
    extra: { label: 'Code', href: 'https://github.com/msmall2691-eng/maine-cleaning-co' },
  },
  {
    title: 'Agent Command Center',
    tag: 'AI internal tool',
    line: 'AI assistants that draft work for me to approve before anything changes.',
    img: '/img/acc-console.webp',
    alt: 'Agent Command Center console',
    position: 'top left',
    href: '/work/agent-command-center/',
  },
  {
    title: 'mlinx.studio',
    tag: 'Studio website · live',
    line: 'My studio site: live client previews, eight free tools and live Maine weather.',
    img: '/img/mstudio-live.webp',
    alt: 'mlinx.studio homepage showing a live preview of a client site',
    position: 'top',
    href: '/work/m-studio-tools/',
    extra: { label: 'Visit', href: 'https://mlinx.studio' },
  },
  {
    title: 'M Linx Guide',
    tag: 'Product · live',
    line: 'Phone guidebooks for rental guests, with door codes kept out of the public page.',
    img: '/img/guide-phones.webp',
    alt: 'Two phone screens from a live guest guide',
    position: 'center',
    href: '/work/m-linx-guide/',
  },
];

export type MoreRow = {
  title: string;
  line: string;
  links: readonly { label: string; href: string }[];
  /** Small real captures of the live sites, each linking to the site. */
  thumbs?: readonly { src: string; alt: string; href: string }[];
};

export const moreWork: readonly MoreRow[] = [
  {
    title: 'Power BI models',
    line: 'Four models built from real job and bank records, cleaned and anonymized.',
    links: [{ label: 'GitHub ↗', href: links.powerbi }],
  },
  {
    title: 'Client websites',
    line: 'Built and hosted for two small businesses in New Hampshire.',
    links: [
      { label: 'Nash Construction ↗', href: 'https://nashconstructionnh.com' },
      { label: 'The Remote Admin ↗', href: 'https://the-remote-admin.com' },
    ],
    thumbs: [
      { src: '/img/client-nash.webp', alt: 'Nash Construction homepage', href: 'https://nashconstructionnh.com' },
      { src: '/img/client-remote-admin.webp', alt: 'The Remote Admin homepage', href: 'https://the-remote-admin.com' },
    ],
  },
  {
    title: 'Smaller builds',
    line: 'Airbnb & VRBO turnover sync, a family check-in kiosk, a Twenty CRM build.',
    links: [],
  },
];

/** Counted from git across nine repos, Jan 1 to Nov 7, 2026. Bots excluded. */
export const github = {
  stats: '2,084 commits across 9 repos in 2026, including work done with Claude Code.',
  repos: [
    { label: 'maine-cleaning-co', line: 'Website and quoting platform', href: 'https://github.com/msmall2691-eng/maine-cleaning-co' },
    { label: 'powerbi-portfolio', line: 'Four Power BI projects', href: links.powerbi },
    { label: 'PortfolioMsmall', line: 'The code for this site', href: 'https://github.com/msmall2691-eng/PortfolioMsmall' },
  ],
  privateNote: 'BrightBase and linx are private because they handle real customer and payment data. Happy to walk through them.',
} as const;

export const aboutShort = {
  paragraphs: [
    'My software work started with problems in my own cleaning business: booking, quoting, scheduling and keeping customer information in one place. Connecting those pieces became the work I love most.',
    'Now I want to do it full-time on a team. Off the clock, I am with my kids and our dog near the water.',
  ],
  skills: [
    { name: 'Build', items: 'Python · FastAPI · SQL · PostgreSQL · React · TypeScript · Next.js · Tailwind' },
    { name: 'Connect', items: 'REST APIs · webhooks · Stripe Connect · Twilio · Google Calendar · iCal' },
    { name: 'Analyze', items: 'Requirements · process mapping · user stories · UAT · Power BI · DAX' },
    { name: 'Ship', items: 'Git & GitHub · automated tests · CI · Docker · Railway · Vercel' },
    { name: 'Platforms', items: 'Jobber · HubSpot · Airtable · Zapier · QuickBooks · Google Workspace · Microsoft 365' },
  ],
} as const;
