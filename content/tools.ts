/** The free tools on mlinx.studio/tools, and small self-contained builds. */

const TOOLS_URL = 'https://mlinx.studio/tools';

export const toolsSection = {
  eyebrow: 'M STUDIO TOOLS',
  heading: 'Free tools',
  intro: 'Eight small tools for service businesses, live on mlinx.studio. No signup.',
  caseStudy: '/work/m-studio-tools/',
  allHref: TOOLS_URL,
} as const;

export type Tool = { id: string; title: string; blurb: string };

export const tools: readonly Tool[] = [
  { id: 'quote', title: 'Instant quote', blurb: 'A live price range' },
  { id: 'invoice', title: 'Invoice maker', blurb: 'Print a clean PDF' },
  { id: 'sitecheck', title: 'Website check', blurb: 'Real Lighthouse scores' },
  { id: 'cost', title: 'Cost of manual work', blurb: 'Yearly cost and payback' },
  { id: 'sig', title: 'Email signature', blurb: 'Paste into Gmail or Outlook' },
  { id: 'vcard', title: 'Digital card', blurb: 'Contact file and QR' },
  { id: 'qr', title: 'QR code', blurb: 'Links or WiFi login' },
  { id: 'utm', title: 'Tracked link', blurb: 'Campaign tags for any link' },
];

export const toolHref = (id: string) => `${TOOLS_URL}?tool=${id}`;

/* --- Small builds ------------------------------------------------------ */

export const buildsSection = {
  eyebrow: 'SMALL BUILDS',
  heading: 'Smaller builds',
} as const;

export type SmallBuild = {
  title: string;
  summary: string;
  stack: string;
  link?: { href: string; label: string };
};

export const smallBuilds: readonly SmallBuild[] = [
  {
    title: 'Airbnb & VRBO turnover sync',
    summary: 'Reads a rental’s booking calendar and schedules the clean for checkout day, with no duplicates.',
    stack: 'Python · iCal · from BrightBase',
  },
  {
    title: 'Family portal & check-in kiosk',
    summary: 'Parents sign in with a code to see the day; a tablet by the door checks families in and out.',
    stack: 'Next.js · Supabase',
  },
  {
    title: 'Private guest guide',
    summary: 'A rental guide where door codes only show for guests holding the right link.',
    stack: 'Next.js · Supabase',
    link: { href: '/work/m-linx-guide/', label: 'Case study →' },
  },
  {
    title: 'Twenty CRM build',
    summary: 'An earlier version of BrightBase on open-source Twenty CRM, with custom objects for properties, quotes and jobs.',
    stack: 'Twenty · open source',
  },
  {
    title: 'Knowledge Extractor',
    summary: 'Turns exported AI chats into an organized Obsidian knowledge base.',
    stack: 'Replit',
  },
];
