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
    tag: 'Operations app · in daily use',
    line: 'Scheduling, a crew phone app, billing and payouts in one place.',
    img: '/img/bb-schedule.webp',
    alt: 'BrightBase office schedule, client names removed',
    position: 'top left',
    href: '/work/brightbase/',
  },
  {
    title: 'linx',
    tag: 'Marketplace web app',
    line: 'Rental owners post cleanings and vetted cleaners bid on them.',
    img: '/img/linx-flow.webp',
    alt: 'linx flow: posted, on the bench, bids, awarded, done, paid',
    href: '/work/linx/',
  },
  {
    title: 'maineclean.co',
    tag: 'Website · live',
    line: 'The company site, where customers get an instant price and book.',
    img: '/img/tmcc-estimate.webp',
    alt: 'maineclean.co instant estimate form',
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
];

export type MoreRow = {
  title: string;
  line: string;
  links: readonly { label: string; href: string }[];
};

export const moreWork: readonly MoreRow[] = [
  {
    title: 'M Linx Guide',
    line: 'Phone guidebooks for rental guests, with door codes shown only to the right guest.',
    links: [{ label: 'Case study', href: '/work/m-linx-guide/' }],
  },
  {
    title: 'Free tools',
    line: 'Eight small tools for service businesses: quotes, invoices, site checks and more.',
    links: [
      { label: 'Case study', href: '/work/m-studio-tools/' },
      { label: 'Open the tools ↗', href: links.studio },
    ],
  },
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
