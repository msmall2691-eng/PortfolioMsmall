/**
 * Profile, links and the few numbers that appear in more than one place.
 *
 * Anything stated twice on the page is derived from here so the two copies
 * can never drift apart.
 */

/**
 * Years running The Maine Cleaning Company.
 *
 * NOTE (open item from the design handoff): the portfolio copy says 8 and
 * mlinx.studio says 10. Set the true number here once and every mention on
 * the page updates — hero lede, About copy, About facts, Toolkit, résumé
 * summary. See README.md → "Before launch".
 */
export const YEARS_IN_BUSINESS = 8;
export const YEARS_IN_BUSINESS_WORD = 'Eight';

/** The public address of this site. Used for share previews and the canonical URL. */
export const siteUrl = 'https://megan.mlinx.studio';

export const profile = {
  name: 'Megan Small',
  fullName: 'Megan M. Small',
  shortName: 'Meg',
  location: 'North Waterboro, Maine',
  locationShort: 'North Waterboro, ME',
  email: 'megan.small@maine.edu',
  discipline: 'Business Systems · Workflow and UX · Front-End Development',
  resumePath: '/Megan-Small-Resume.pdf',
  resumeFilename: 'Megan-Small-Resume.pdf',
} as const;

export const links = {
  linkedin: 'https://www.linkedin.com/in/megan-small-75b806410/',
  linkedinLabel: 'in/megan-small-75b806410',
  github: 'https://github.com/msmall2691-eng',
  githubLabel: 'msmall2691-eng',
  studio: 'https://mlinx.studio',
  studioLabel: 'mlinx.studio',
  maineclean: 'https://www.maineclean.co',
  serviceAreas: 'https://www.maineclean.co/service-areas',
  powerbi: 'https://github.com/msmall2691-eng/powerbi-portfolio',
  powerbiUsm:
    'https://github.com/msmall2691-eng/powerbi-portfolio/tree/main/USM-Academic-Progress',
  powerbiStack:
    'https://github.com/msmall2691-eng/powerbi-portfolio/tree/main/Software-Stack',
} as const;

/**
 * Guard for links whose destination is not public yet. A link marked
 * `pending: true` renders as plain text while this is false. Nothing on the
 * site uses it today: every link points at a public page.
 */
export const PENDING_LINKS_ARE_PUBLIC = false;

export const nav = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#tools', label: 'Tools' },
  { href: '#data', label: 'Data' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const;

export const iconLinks = [
  { href: links.linkedin, label: 'LinkedIn', glyph: 'in' },
  { href: links.github, label: 'GitHub', glyph: 'GH' },
  { href: links.studio, label: 'M Studio', glyph: 'M' },
] as const;

export const hero = {
  // Derived from profile.discipline so the hero and the résumé card always
  // state the same thing. Change it in one place: profile.discipline.
  eyebrow: profile.discipline.toUpperCase(),
  headlinePlain: 'Building the systems ',
  headlineAccent: 'small businesses run on.',
  lede: `Websites, workflows and the data underneath, shaped by ${YEARS_IN_BUSINESS.toLocaleString()} years running a cleaning company.`,
  status: 'Open to roles designing and building business systems',
  links: [
    { href: '#work', label: 'Selected work', current: true },
    { href: '#contact', label: 'Résumé' },
    { href: `mailto:${profile.email}`, label: 'Email' },
  ],
} as const;

export const workIndex = [
  { n: '01', title: 'BrightBase', description: 'Affordable multi-tenant platform, built in-house', year: '2026', href: '#work' },
  { n: '02', title: 'linx', description: 'Marketplace for rental turnover cleanings', year: '2026', href: '/work/linx/' },
  { n: '03', title: 'Agent Command Center', description: 'AI agents that draft while a person approves', year: '2026', href: '/work/agent-command-center/' },
  { n: '04', title: 'maineclean.co', description: 'Booking site with instant estimates', year: 'Live', href: '#more' },
  { n: '05', title: 'Free tools', description: 'Eight no-signup tools for service businesses', year: 'Live', href: '#tools' },
  { n: '06', title: 'M Linx Guide', description: 'Digital guest guides for rental hosts', year: '2026', href: '/work/m-linx-guide/' },
] as const;

export const about = {
  eyebrow: 'ABOUT',
  heading: "Hi, I'm Meg.",
  paragraphs: [
    'My software work started with problems in my own cleaning business: booking, quoting, scheduling and keeping customer information in one place. Connecting those pieces became the work I love most.',
    "Now I want to do it full-time, as part of a team, while I finish a B.S. in Business Analytics and AI at the University of Southern Maine. Off the clock, I'm with my kids and our dog near the water.",
  ],
  facts: [
    { value: `${YEARS_IN_BUSINESS} yrs`, label: 'Running a service business' },
    { value: '1,000+', label: 'Customers served' },
    { value: '7,000+', label: 'Service visits, all time' },
    { value: '2028', label: 'B.S. expected, USM' },
  ],
} as const;

export const footer = {
  left: `${profile.name} · ${profile.location}`,
  right: 'Figures from Jobber invoices and visit exports. Screens shown with customer details removed.',
} as const;
