/**
 * The free browser tools live on mlinx.studio/tools, and the small,
 * self-contained builds pulled out of larger systems.
 */

const TOOLS_URL = 'https://mlinx.studio/tools';

export const toolsSection = {
  eyebrow: 'FREE TOOLS · MLINX.STUDIO',
  heading: 'Eight tools anyone can use, no signup',
  intro:
    'Small, single-purpose tools for service businesses, built in Next.js and TypeScript and live on mlinx.studio. Each one answers one question on one screen, and most run entirely in the browser.',
  allHref: TOOLS_URL,
  featured: {
    img: '/img/tools-quote.webp',
    alt: 'The instant quote tool on mlinx.studio showing a live price range',
    caption: 'The instant quote: service and size in, a price range with explained line items out.',
  },
} as const;

export type Tool = { id: string; title: string; blurb: string; tech: string };
export type ToolGroup = { label: string; tools: readonly Tool[] };

export const toolGroups: readonly ToolGroup[] = [
  {
    label: 'Win & bill',
    tools: [
      { id: 'quote', title: 'Instant quote', blurb: 'Service and size in, a live price range you can send a customer.', tech: 'Pricing logic · live updates' },
      { id: 'invoice', title: 'Invoice maker', blurb: 'Build an invoice or proposal, then print it to a clean PDF in one click.', tech: 'Print stylesheet · PDF' },
    ],
  },
  {
    label: 'Brand & share',
    tools: [
      { id: 'sig', title: 'Email signature', blurb: 'Your details in, a styled signature ready to paste into Gmail or Outlook.', tech: 'Email-safe HTML' },
      { id: 'vcard', title: 'Digital card', blurb: 'Your details in, a .vcf contact file and a scan-to-save QR code.', tech: 'vCard · QR' },
      { id: 'qr', title: 'QR code', blurb: 'Any link, or your WiFi login, as a real QR code to download and print.', tech: 'qrcode library · PNG' },
      { id: 'utm', title: 'Tracked link', blurb: 'Add campaign tags to any link for tracking in emails, ads and bios.', tech: 'UTM parameters' },
    ],
  },
  {
    label: 'Site & ops',
    tools: [
      { id: 'sitecheck', title: 'Website check', blurb: 'Paste any URL for a real Lighthouse speed, SEO and accessibility report.', tech: 'Server route · PageSpeed Insights API' },
      { id: 'cost', title: 'Cost of manual work', blurb: 'Hours and people in, the yearly cost out, and how fast automation pays for itself.', tech: 'Payback calculator' },
    ],
  },
];

export const toolHref = (id: string) => `${TOOLS_URL}?tool=${id}`;

/* --- Small builds ------------------------------------------------------ */

export const buildsSection = {
  eyebrow: 'SMALL BUILDS',
  heading: 'Pieces that work on their own',
  intro:
    'Self-contained features, each small enough to set up for another business without the rest of the system around it.',
} as const;

export type SmallBuild = {
  title: string;
  tag: string;
  summary: string;
  details: readonly string[];
  stack: string;
  img?: { src: string; alt: string };
  link?: { href: string; label: string };
};

export const smallBuilds: readonly SmallBuild[] = [
  {
    title: 'Airbnb & VRBO turnover sync',
    tag: 'FROM BRIGHTBASE · PYTHON',
    summary:
      'Paste a rental’s calendar link once. Every 15 minutes the sync reads new reservations and puts a turnover clean on the schedule for checkout day.',
    details: [
      'Accepts the webcal links Airbnb and VRBO hand out',
      'Follows the calendar standard, where an all-day checkout date is exclusive',
      'One record per reservation, so a re-read never makes a duplicate job',
      'A dead or failing feed shows as stale instead of going quiet',
      'Refuses feed links that point at private or internal network addresses',
    ],
    stack: 'Python · icalendar · scheduled jobs · Google Calendar',
    link: { href: '#turnovers', label: 'See it in the BrightBase spotlight ↑' },
  },
  {
    title: 'Family portal & check-in kiosk',
    tag: 'NEXT.JS · SUPABASE',
    summary:
      'Built for a small home childcare program. Families sign in with a four-digit code to see the day; a tablet by the door signs a whole family in or out with a tap or a printed QR badge.',
    details: [
      'Daily notes, meals, naps, attendance and a photo journal per child',
      'Staff dashboard for logs, attendance fixes, schedules and families',
      'Signed-cookie sessions and rate-limited sign-in',
      'Photos in a private bucket, served through short-lived links',
      'A demo mode with sample families, so nothing real is needed to try it',
    ],
    stack: 'Next.js · TypeScript · Supabase · Tailwind',
  },
  {
    title: 'Guest guide with private details',
    tag: 'NEXT.JS · SUPABASE',
    summary:
      'A phone-friendly guide for rental guests. Door codes and other private details only appear when the link carries the right key.',
    details: [
      'The key sits after the # in the link, so it never reaches the server',
      'Its own database and access rules, separate from every other product',
      'Four switchable themes and an intake questionnaire for hosts',
    ],
    stack: 'Next.js · Supabase row-level security · Vercel',
    link: { href: '/work/m-linx-guide/', label: 'Read the case study →' },
  },
];
