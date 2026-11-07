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


export const nav = [
  { href: '#work', label: 'Work' },
  { href: '#tools', label: 'Tools' },
  { href: '#data', label: 'Data' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const;

export const iconLinks = [
  { href: links.linkedin, label: 'LinkedIn', glyph: 'in' },
  { href: links.github, label: 'GitHub', glyph: 'GH' },
  { href: links.studio, label: 'M Studio', glyph: 'M' },
] as const;

export const hero = {
  eyebrow: 'MEGAN SMALL · BUSINESS SYSTEMS & WEB · SOUTHERN MAINE',
  headlinePlain: 'Ran the business. ',
  headlineAccent: 'Built the software it runs on.',
  /** Three plain columns: where she came from, what she built, what's next. */
  story: [
    {
      label: 'Ran',
      title: 'The Maine Cleaning Co.',
      body: `${YEARS_IN_BUSINESS_WORD} years of crews, scheduling, quotes, billing and payroll, from 2018 to now.`,
      proof: [] as readonly { label: string; href: string }[],
    },
    {
      label: 'Built',
      title: 'BrightBase and more',
      body: 'When the apps we paid for didn\'t fit, BrightBase replaced them. Then came websites, a marketplace and data models.',
      proof: [
        { label: 'BrightBase', href: '/work/brightbase/' },
        { label: 'linx', href: '/work/linx/' },
        { label: 'maineclean.co', href: '/work/maineclean/' },
        { label: 'Power BI', href: '#data' },
      ],
    },
    {
      label: 'Next',
      title: 'A business systems role',
      body: 'Full-time work designing and building systems for a team, while finishing a B.S. in Business Analytics & AI at USM.',
      proof: [] as readonly { label: string; href: string }[],
    },
  ],
  status: 'Open to roles designing and building business systems',
  links: [
    { href: '#work', label: 'See the work', current: true },
    { href: '#contact', label: 'Résumé' },
    { href: `mailto:${profile.email}`, label: 'Email' },
  ],
} as const;

/** What I offer, each with the projects that prove it. Shown in the hero. */
export const offers = [
  {
    title: 'Business systems',
    line: 'I map how the work really flows, then build the system around it.',
    proof: [
      { label: 'BrightBase', href: '/work/brightbase/' },
      { label: 'Agent Command Center', href: '/work/agent-command-center/' },
    ],
  },
  {
    title: 'Websites & web apps',
    line: 'Booking sites, marketplaces and tools people actually use.',
    proof: [
      { label: 'maineclean.co', href: '/work/maineclean/' },
      { label: 'linx', href: '/work/linx/' },
      { label: 'M Linx Guide', href: '/work/m-linx-guide/' },
    ],
  },
  {
    title: 'Data & reporting',
    line: 'Messy records turned into numbers a business can act on.',
    proof: [
      { label: 'Power BI models', href: '#data' },
      { label: 'Operations data', href: '#data' },
    ],
  },
] as const;

/** The path, oldest first. Shown in About. */
export const timeline = [
  { year: '2013', title: 'Administrative assistant', where: 'SMCC Office of the President' },
  { year: '2014', title: 'Lead dental assistant', where: 'Southern Maine practices' },
  { year: '2018', title: 'Founded a cleaning company', where: 'The Maine Cleaning Co.' },
  { year: '2026', title: 'Built BrightBase, started M Studio', where: 'Systems and web work' },
  { year: 'Now', title: 'B.S. Business Analytics & AI', where: 'University of Southern Maine' },
] as const;

export const about = {
  eyebrow: 'ABOUT',
  heading: "Hi, I'm Meg.",
  paragraphs: [
    'My software work started with problems in my own cleaning business: booking, quoting, scheduling and keeping customer information in one place. Connecting those pieces became the work I love most.',
    "Now I want to do it full-time, as part of a team, while I finish a B.S. in Business Analytics and AI at the University of Southern Maine. Off the clock, I'm with my kids and our dog near the water.",
  ],
} as const;

export const footer = {
  left: `${profile.name} · ${profile.location}`,
  right: 'Figures from Jobber invoices and visit exports. Screens shown with customer details removed.',
} as const;
