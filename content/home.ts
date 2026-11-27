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
    { when: '2018 – now', what: 'Operations & systems manager (owner)', where: 'The Maine Cleaning Co.' },
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
    alt: 'The Maine Cleaning Co. homepage: "The Way Cleaning Should Be" over coastal footage, with an estimate button',
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
    alt: 'The mlinx.studio homepage: "Websites, web apps and custom tools for small businesses" over underwater footage',
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
  /**
   * Real captures of live sites. `href` is OPTIONAL and is left off for
   * client work on purpose: a link to a client's domain names them exactly
   * as plainly as a label would, which is the thing the rule is about.
   */
  thumbs?: readonly { src: string; alt: string; href?: string }[];
};

export const moreWork: readonly MoreRow[] = [
  /*
    CLIENT WORK IS DESCRIBED, NOT NAMED. Megan's rule is no client names on
    the site, and that has to cover more than the label: a link to a client's
    domain names them just as plainly, and so does a screenshot with their
    wordmark in the header.
    The row carries no client names and no client domains. It DOES carry
    screenshots, captured from the live sites and framed so that no wordmark,
    logo or phone number is in shot -- for one that meant the typographic
    half of the hero, for the other everything above the paragraph that names
    them. Both are real pixels from real sites; nothing is painted out, which
    is why they do not look censored. Erasing the logo was tried first and
    looked exactly as bad as it sounds.
    If a client ever redesigns, re-crop from the live site and check the new
    frame -- do not assume the old crop box still excludes the name.
  */
  {
    title: 'Client websites',
    line: 'Two marketing sites for small New Hampshire businesses — a general contractor and an admin-services firm. Designed, built, migrated off their old hosts with redirects, and shipped.',
    links: [],
    thumbs: [
      { src: '/img/client-contractor.webp', alt: 'A general contractor site: a full-bleed streetscape behind the headline "Built on 50 Years of Experience."' },
      { src: '/img/client-admin.webp', alt: 'An admin-services site: a serif headline reading "Administrative office support for contractors and small service-based businesses"' },
    ],
  },
  {
    title: 'Childcare launch',
    line: 'Brand, website, a 16-page parent guide and a social calendar for a family childcare business opening its doors.',
    links: [],
  },
  {
    title: 'Smaller builds',
    line: 'Airbnb & VRBO turnover sync, a tide and water app for a lobsterman, a family check-in kiosk, a Twenty CRM build.',
    links: [],
  },
];

/** Counted from git across nine repos, Jan 1 to Nov 7, 2026. Bots excluded. */
export const github = {
  /** A real capture of the live profile page, re-shoot it if it changes. */
  shot: {
    src: '/img/github-profile.webp',
    alt: 'The GitHub profile for msmall2691-eng: a README headed "Mainer | Web designer | Systems guru" and a selected-work table',
  },
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
  /**
   * NOTE: no longer rendered. The Toolkit section (content/skills.ts) owns
   * #skills on the page now; this compact list stood in while Toolkit was
   * unmounted. Kept so the section can be restored without rewriting it.
   */
  skills: [
    { name: 'Build', items: 'Python · FastAPI · SQL · PostgreSQL · React · TypeScript · Next.js · Tailwind' },
    { name: 'Connect', items: 'REST APIs · webhooks · Stripe Connect · Twilio · Google Calendar · iCal' },
    { name: 'Analyze', items: 'Requirements · process mapping · fit-gap analysis · user stories · UAT · change management · Power BI · DAX' },
    { name: 'Ship', items: 'Git & GitHub · automated tests · CI · Docker · Railway · Vercel' },
    { name: 'AI', items: 'Claude API & Agent SDK · Claude Code · Gemini API · prompt design' },
    { name: 'Platforms', items: 'Jobber · HubSpot · Airtable · Zapier · Make · Jira · QuickBooks · Excel · Google Workspace · Microsoft 365' },
  ],
} as const;
