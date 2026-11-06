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
  { href: '#data', label: 'Data' },
  { href: '#skills', label: 'Toolkit' },
  { href: '#contact', label: 'Résumé & contact' },
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
  lede: `Websites, workflows, integrations and the data underneath — shaped by ${YEARS_IN_BUSINESS.toLocaleString()} years running a cleaning company, and designed for the people who actually use the tools.`,
  status: 'Open to roles designing and building business systems',
  links: [
    { href: '#work', label: 'Selected work', current: true },
    { href: '#contact', label: 'Résumé' },
    { href: `mailto:${profile.email}`, label: 'Email' },
    { href: links.linkedin, label: 'LinkedIn ↗', external: true },
    { href: links.github, label: 'GitHub ↗', external: true },
    { href: links.studio, label: 'mlinx.studio ↗', external: true },
  ],
} as const;

export const workIndex = [
  { n: '01', title: 'BrightBase', description: 'Affordable multi-tenant platform, built in-house', year: '2026', href: '#work' },
  { n: '02', title: 'maineclean.co', description: 'Booking site with instant estimates', year: 'Live', href: '#more' },
  { n: '03', title: 'Service-area graph', description: 'Interactive map of services and communities', year: 'Live', href: '#more' },
  { n: '04', title: 'M Studio', description: 'Sites and tools for small businesses', year: '2026', href: '#more' },
  { n: '05', title: 'M Linx Guide', description: 'Digital guest guides for rental hosts', year: '2026', href: '#more' },
] as const;

export const about = {
  eyebrow: 'ABOUT',
  heading: "Hi, I'm Meg.",
  paragraphs: [
    'My software work started with everyday problems in my own cleaning business: booking, quoting, scheduling and keeping customer information in one place. Connecting those pieces became the work I love most.',
    "Now the work is understanding how a business really runs, then designing and building the systems around it. I'm stepping back from running the cleaning company to do this work full-time, as part of a team. I'm also finishing a B.S. in Business Analytics and AI at the University of Southern Maine, with a minor in Computer Science. Off the clock, you'll find me with my kids and our dog near the water, fishing when the day allows.",
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
