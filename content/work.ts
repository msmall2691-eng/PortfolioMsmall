/**
 * Work section: the BrightBase case study, the selected-work grid,
 * the turnover spotlight and the smaller builds.
 *
 * Every number in the product mocks is sample data and must stay fake.
 * No client names, addresses, gate codes or phone numbers anywhere.
 */
import { links } from './site';

export const caseStudy = {
  eyebrow: 'FEATURED CASE STUDY',
  heading: 'From service apps that didn’t fit to one operations system',
  summary:
    'I tested one field-service, scheduling and CRM app after another, and none fit how The Maine Cleaning Company worked. Every stage of a job lived somewhere different, and a person carried the data between them. So I specified, built and rolled out BrightBase, an affordable system of our own: it schedules rental turnovers from booking calendars, texts clients, pulls leads into one place and connects to Google Workspace.',
  credit:
    'Requirements, data model, review, testing and rollout were mine end to end, built with an AI coding agent (Claude Code) and reviewed line by line.',
  stack: 'Python · FastAPI · React · PostgreSQL · Stripe · Twilio · Google APIs',
  mockAlt:
    "BrightBase office dashboard beside the cleaner's phone app showing today's job at a property",
} as const;

export const beforeAfter = [
  { before: 'Overlapping apps for jobs, CRM, phone and booking', after: 'One system; Jobber is the last being retired' },
  { before: 'Subcontractor pay typed into the bank by hand', after: 'Every payout tracked to paid, with 1099 totals' },
  { before: '74% of visits with a cleaner recorded (2023)', after: '96% (2025)' },
  { before: 'Website requests created duplicate clients', after: 'One intake path with duplicate checks' },
] as const;

export const glanceStats = {
  label: 'The Maine Cleaning Co. at a glance',
  items: [
    { value: '$1.08M', label: 'collected since 2023' },
    { value: '4,916', label: 'visits since 2023' },
  ],
} as const;

/** Google reviews. First name + last initial only — never full names. */
export const reviews = {
  label: 'What BrightBase was built to protect',
  items: [
    {
      quote: 'The level of communication is phenomenal and the knowledge of the cleaners is incredible!',
      who: 'Erin P., Google review',
      when: 'Sep 2022',
    },
    {
      quote: 'I have had to cancel and reschedule a few times and they have always been kind and accommodating.',
      who: 'Eva B., Google review',
      when: 'Sep 2024',
    },
    {
      quote:
        'We have used Megan and her team for all our Air BnB turnovers and have been lucky to have such a professional overseeing the cleaning services.',
      who: 'Jessica M., Google review',
      when: 'Sep 2021',
    },
  ],
} as const;

export const steps = [
  { n: '01', title: 'Mapped the process', description: 'Request to paid, with the office and crews: 4 systems, 3 manual handoffs.' },
  { n: '02', title: 'Found the breaks', description: 'Bank records, visit exports and payroll screens showed where data got retyped or lost.' },
  { n: '03', title: 'Wrote the requirements', description: 'Business rules, user stories and acceptance criteria, each tied to a test.' },
  { n: '04', title: 'Built and rolled out', description: 'Phased releases alongside the old tools until the numbers matched.' },
] as const;

/* --- Expandable case detail ------------------------------------------- */

export const pains = [
  { title: 'Overlapping tools', description: 'Two field-service apps, three CRMs and two automation tools billed in the same year.' },
  { title: 'Payroll by hand', description: 'The time clock didn’t connect to payroll, so hours were re-keyed every period.' },
  { title: 'No payout ledger', description: 'Subcontractor pay was typed into the bank by hand — no ledger, no running 1099 total.' },
  { title: 'Unassigned visits', description: 'In 2023, 26% of completed visits had no cleaner recorded.' },
  { title: 'Duplicate records', description: 'Automatic client creation from the website produced duplicate clients and properties.' },
  { title: 'Silent failure', description: 'A misrouted phone webhook dropped inbound calls for months before anyone noticed.' },
] as const;

export const caseShots = [
  {
    src: '/img/bb-schedule.webp',
    alt: 'BrightBase office schedule, client names removed',
    caption: 'Office schedule, color-coded by service type',
  },
  {
    src: '/img/bb-marketplace.webp',
    alt: 'BrightBase crew marketplace',
    caption: 'Crew view: open jobs and what each subcontractor is owed',
  },
] as const;

export const requirement = {
  heading: 'Sample requirement: the subcontractor payout ledger',
  intro:
    'In September 2026 we moved from employees to subcontractors. Hourly payroll was the wrong shape — a subcontractor is paid per job. The ledger records what’s owed for completed work, tracks it to paid, and keeps year-to-date totals for 1099s.',
  rules: [
    { id: 'Rule', text: 'Paid per job at the agreed rate — never by the hour. Only completed work creates an amount owed.' },
    { id: 'FR-3', text: 'Payouts move only forward: due → sent → paid, or void. Paid and void are final.' },
    { id: 'FR-6', text: 'Year-to-date totals per subcontractor, by the year the work was done, flagged at the 1099 threshold.' },
    { id: 'NFR-1', text: 'Generating twice for the same period creates no duplicates — enforced by the database.' },
  ],
  /**
   * Test counts verified against msmall2691-eng/Bright-Space @ 5789aa6
   * (2 Nov 2026) by counting declared test functions:
   *   backend  2,656 pytest functions across 365 files
   *   frontend 1,522 vitest/jest cases across 200 files
   *   total    4,178 — and test_sub_payouts.py has exactly 19, which is
   *                   where the ledger figure below comes from.
   * Both suites run in CI (.github/workflows/ci.yml) on every pull request.
   * The copy says "4,100+" so it stays true as the suite grows. Parametrized
   * cases execute more than once, so this is a floor, not a ceiling.
   */
  note: 'Every acceptance criterion maps to a named automated test — 19 for the payout ledger alone, out of 4,100+ across the project, all run in CI on every pull request.',
} as const;

export const rollout = {
  heading: 'How it rolled out',
  intro:
    'No big bang. Each change was its own pull request, gated by automated tests, and the crew app shipped in five phases while Connecteam kept running until the two agreed for a full pay period.',
  phases: [
    { n: '1', title: 'Today, Schedule & checklists' },
    { n: '2', title: 'Accept or decline jobs' },
    { n: '3', title: 'Open-jobs board' },
    { n: '4', title: 'Weekly availability' },
    { n: '5', title: 'Training docs' },
  ],
} as const;

export const whatsNext = {
  heading: "What's next",
  body:
    'Retire Jobber after one full billing cycle in BrightBase, and add an alert on every outside integration — a misrouted phone webhook once failed silently for months, and that shouldn’t happen again.',
} as const;

/* --- Selected work grid ------------------------------------------------ */

export type SelectedWork = {
  tag: string;
  title: string;
  description: string;
  /** 'browser' frames one screenshot; 'phones' fans three phone screens; 'image' fills the panel. */
  frame: 'browser' | 'phones' | 'image';
  img?: string;
  url?: string;
  alt: string;
  objectPosition?: string;
  stage: string;
  href: string;
  /** True when the destination is not publicly reachable yet. */
  pending?: boolean;
};

export const selectedWork: readonly SelectedWork[] = [
  {
    tag: 'MARKETPLACE · STRIPE CONNECT',
    title: 'linx: a marketplace for rental turnovers',
    description:
      'Owners post the clean between guests, vetted cleaners bid, the owner awards. Row-locked awards, Stripe Connect payouts and 900+ automated tests.',
    frame: 'image',
    img: '/img/linx-flow.webp',
    alt: 'Diagram of a turnover moving through linx',
    objectPosition: 'center',
    stage: '#141726',
    href: '/work/linx/',
  },
  {
    tag: 'AI AGENTS · CLAUDE AGENT SDK',
    title: 'Agent Command Center',
    description:
      'Fifteen AI agents in three crews, for the business, code and school. Reads run on their own; every write waits for approval.',
    frame: 'browser',
    img: '/img/acc-console.webp',
    url: 'command center',
    alt: 'Agent Command Center console',
    objectPosition: 'left top',
    stage: 'radial-gradient(120% 90% at 0% 0%, #3d5a4a 0%, #1f3330 60%, #172320 100%)',
    href: '/work/agent-command-center/',
  },
  {
    tag: 'LIVE · MAINECLEAN.CO',
    title: 'Booking site with instant estimates',
    description:
      'Customers get a price by property type, size and frequency, then book — wired into BrightBase intake.',
    frame: 'browser',
    img: '/img/tmcc-estimate.webp',
    url: 'maineclean.co',
    alt: 'Instant estimate form on maineclean.co',
    objectPosition: 'right top',
    stage: 'radial-gradient(120% 90% at 0% 0%, #3a5a8a 0%, #24304f 60%, #1e2540 100%)',
    href: links.maineclean,
  },
  {
    tag: 'LIVE · SERVICE AREAS',
    title: 'Interactive service-area graph',
    description:
      'How services connect to the communities served — one shared data source so every page agrees.',
    frame: 'browser',
    img: '/img/service-graph.webp',
    url: 'maineclean.co/service-areas',
    alt: 'Service-area relationship graph',
    objectPosition: 'center',
    stage: 'radial-gradient(120% 90% at 0% 0%, #2f6b6a 0%, #1f3a45 60%, #1c2538 100%)',
    href: links.serviceAreas,
  },
  {
    tag: 'M STUDIO · CLIENT WORK',
    title: 'Sites and tools for small businesses',
    description:
      'Client sites plus eight small browser tools for service businesses, including an instant quote that needs no signup.',
    frame: 'browser',
    img: '/img/mstudio-hero.webp',
    url: 'mlinx.studio',
    alt: 'M Studio website',
    objectPosition: 'left top',
    stage: 'radial-gradient(120% 90% at 0% 0%, #5a4a9a 0%, #2e2a55 60%, #1f2040 100%)',
    href: '/work/m-studio-tools/',
  },
  {
    tag: 'M LINX GUIDE · PRODUCT',
    title: 'Digital guest guides for rental hosts',
    description:
      'Guest guides for short-term rentals, with private details like door codes kept behind a key in the link.',
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
      'Rebuilt a commercial and industrial contractor’s site off Wix and moved it to Vercel, set up so the company can own the code outright.',
    img: '/img/client-nash.webp',
    url: 'nashconstructionnh.com',
    href: 'https://nashconstructionnh.com',
  },
  {
    name: 'The Remote Admin',
    tag: 'CLIENT · SOUTHERN NH',
    description:
      'A site for a virtual admin business serving contractors and small service companies, built to match its existing brand.',
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

export const turnoverSpotlight = {
  eyebrow: 'SPOTLIGHT · INSIDE BRIGHTBASE',
  heading: 'Guest checks out. The clean is already on the schedule.',
  body:
    "Rental hosts' Airbnb and VRBO booking calendars feed into BrightBase, and each guest checkout becomes a scheduled turnover visit. No one retypes bookings.",
  columns: { left: 'BOOKING CALENDAR', right: 'BRIGHTBASE SCHEDULE' },
  caption: 'Sample properties and dates.',
  /** Sample properties and dates — not real bookings. */
  rows: [
    { stay: 'Harbor Cottage · Airbnb', dates: 'Fri Jun 12 – Sun Jun 14', visit: 'Turnover · Sun', window: '10:00–3:00 · next guest 4:00' },
    { stay: 'Lakeside Loft · VRBO', dates: 'Sat Jun 13 – Tue Jun 16', visit: 'Turnover · Tue', window: '11:00–2:30 · same-day flip' },
    { stay: 'Pine Ridge House · Airbnb', dates: 'Sun Jun 14 – Sat Jun 20', visit: 'Turnover · Sat', window: '10:00–4:00 · open window' },
  ],
} as const;

/* --- More builds ------------------------------------------------------- */

export type Build = {
  title: string;
  tag: string;
  description: string;
  href?: string;
  pending?: boolean;
};

export const builds: readonly Build[] = [
  {
    title: 'Operations analytics dashboard',
    tag: 'PYTHON · DATA',
    description:
      'Revenue, visits, crew coverage and software spend, checked against Jobber exports and bank records.',
    href: '#data',
  },
  {
    title: 'USM academic progress',
    tag: 'POWER BI · PBIP ↗',
    description:
      'Degree progress, a Fall 2026 workload view over 73 deadlines, and a what-if parameter that recalculates terms remaining for any credit load.',
    href: links.powerbiUsm,
  },
  {
    title: 'Software stack: build vs buy',
    tag: 'POWER BI · PBIP ↗',
    description:
      'The 31 tools bought, outgrown and replaced by my own build, traced against the dependency files of 10 code projects.',
    href: links.powerbiStack,
  },
  {
    title: 'Twenty CRM build',
    tag: 'OPEN SOURCE · CRM',
    description: 'A second version of the system on the open-source Twenty CRM: custom objects for properties, quotes, jobs and visits, with bookings synced in as jobs.',
  },
  {
    title: 'Knowledge Extractor',
    tag: 'REPLIT',
    description: 'Filters exported AI conversations and organizes them into an Obsidian knowledge base.',
  },
];
