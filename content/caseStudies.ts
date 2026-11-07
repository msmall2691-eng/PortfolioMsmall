/**
 * Case-study pages at /work/<slug>/.
 *
 * These replace the two claude.ai artifacts the Selected-work cards used to
 * point at, so every link on the site stays on megan.mlinx.studio.
 */

export type Decision = { title: string; why: string; cost: string };

export type CaseStudy = {
  slug: string;
  title: string;
  lede: string;
  metaDescription: string;
  meta: readonly { label: string; value: string }[];
  sections: readonly CaseSection[];
  liveUrl?: { href: string; label: string };
  /** Optional figure shown under the hero. */
  image?: { src: string; alt: string; caption: string; width: number; height: number };
};

export type CaseSection =
  | { kind: 'prose'; eyebrow: string; heading: string; paragraphs: readonly string[] }
  | { kind: 'flow'; eyebrow: string; heading: string; steps: readonly { title: string; detail: string }[]; note?: string }
  | { kind: 'decisions'; eyebrow: string; heading: string; items: readonly Decision[] }
  | { kind: 'beforeAfter'; eyebrow: string; heading: string; rows: readonly { before: string; after: string }[] }
  | { kind: 'boxes'; eyebrow: string; heading: string; intro?: string; facts?: readonly { value: string; label: string }[]; boxes: readonly { title: string; items: readonly string[] }[]; note?: string };

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: 'brightbase',
    title: 'BrightBase',
    lede: 'The software my cleaning company runs on. Scheduling, a crew phone app, rental turnovers, billing and payouts, in one place.',
    metaDescription:
      'Case study: BrightBase, the operations system Megan Small designed and built for The Maine Cleaning Co., now in daily use by the office and crews.',
    meta: [
      { label: 'Role', value: 'Requirements, build and rollout, with Claude Code' },
      { label: 'Stack', value: 'Python · FastAPI · React · PostgreSQL' },
      { label: 'Status', value: 'In daily use · 4,100+ tests' },
    ],
    image: {
      src: '/img/bb-schedule.webp',
      alt: 'BrightBase office schedule, color-coded by service type, client names removed',
      caption: 'The office schedule, color-coded by service type. Client names removed.',
      width: 1400,
      height: 854,
    },
    sections: [
      {
        kind: 'beforeAfter',
        eyebrow: 'THE PROBLEM',
        heading: 'Too many apps, too much retyping',
        rows: [
          { before: 'Separate apps for jobs, CRM, phone and booking', after: 'One system' },
          { before: 'Subcontractor pay typed into the bank by hand', after: 'Every payout tracked, with 1099 totals' },
          { before: '74% of visits had a cleaner recorded (2023)', after: '96% (2025)' },
          { before: 'Website requests made duplicate clients', after: 'One intake path with duplicate checks' },
        ],
      },
      {
        kind: 'flow',
        eyebrow: 'HOW I BUILT IT',
        heading: 'Four steps',
        steps: [
          { title: 'Map', detail: 'Followed a job from request to paid with the office and crews' },
          { title: 'Find', detail: 'Used bank and visit records to see where data got retyped' },
          { title: 'Specify', detail: 'Wrote rules and acceptance criteria, each tied to a test' },
          { title: 'Roll out', detail: 'Shipped in phases beside the old tools until they matched' },
        ],
      },
      {
        kind: 'decisions',
        eyebrow: 'DECISIONS',
        heading: 'Three choices and their trade-offs',
        items: [
          {
            title: 'Paid per job, not per hour',
            why: 'Subcontractor payouts come only from completed work and move one way: due, sent, paid.',
            cost: 'Hourly staff needed a separate path.',
          },
          {
            title: 'Turnovers from booking calendars',
            why: 'Airbnb and VRBO checkouts become scheduled cleans automatically.',
            cost: 'Calendars refresh every 15 minutes, not instantly.',
          },
          {
            title: 'Each business walled off',
            why: 'Database-level security keeps every company’s data separate, so it can serve other businesses.',
            cost: 'Every new table needs a security rule and a test.',
          },
        ],
      },
      {
        kind: 'boxes',
        eyebrow: 'STATUS',
        heading: 'Where it stands',
        facts: [
          { value: '4,100+', label: 'automated tests' },
          { value: '96%', label: 'visits with a cleaner assigned (2025)' },
          { value: '5', label: 'phases to roll out the crew app' },
        ],
        boxes: [
          { title: 'In use', items: ['Scheduling and dispatch', 'Crew phone app, works offline', 'Invoices, payments and payouts'] },
          { title: 'Next', items: ['Retire Jobber after one billing cycle', 'Settings so other businesses can use it'] },
        ],
      },
    ],
  },
  {
    slug: 'linx',
    title: 'linx',
    lede: 'A marketplace for rental turnovers: owners post the clean between guests, vetted cleaners bid, the owner hires one.',
    metaDescription:
      'Case study: linx, a marketplace for rental turnover cleanings with vetting, bidding and Stripe Connect payouts. Built by Megan Small.',
    meta: [
      { label: 'Role', value: 'Solo, with an AI coding agent' },
      { label: 'Stack', value: 'FastAPI · PostgreSQL · React · Stripe Connect' },
      { label: 'Status', value: 'Launch ready · 900+ tests' },
    ],
    image: {
      src: '/img/linx-flow.webp',
      alt: 'Diagram of one turnover moving from posted to bids, awarded, done and paid',
      caption: 'One turnover, start to finish.',
      width: 1200,
      height: 900,
    },
    sections: [
      {
        kind: 'decisions',
        eyebrow: 'DECISIONS',
        heading: 'Three choices and their trade-offs',
        items: [
          {
            title: 'Address hidden until hired',
            why: 'Bidders see the area, not the house or the gate code.',
            cost: 'Cleaners price without the exact address.',
          },
          {
            title: 'One winner, guaranteed',
            why: 'A database lock means two owners accepting at once can’t both win.',
            cost: 'Awards on the same job wait their turn.',
          },
          {
            title: 'One Stripe charge',
            why: 'Pays the cleaner and takes the fee together, safe to retry.',
            cost: 'Every cleaner finishes Stripe setup first.',
          },
        ],
      },
      {
        kind: 'boxes',
        eyebrow: 'STATUS',
        heading: 'Where it stands',
        // Counted against msmall2691-eng/linx @ a9780d6 (7 Nov 2026):
        //   905 backend pytest functions across 46 files
        //   17 __tablename__ declarations
        //   UserRole enum = exactly OWNER, CLEANER, ADMIN
        facts: [
          { value: '900+', label: 'automated tests' },
          { value: '17', label: 'database tables' },
          { value: '3', label: 'roles: owner, cleaner, admin' },
        ],
        boxes: [
          { title: 'Built', items: ['Posting, bidding and hiring', 'Cleaner vetting queue', 'Payments, refunds and reviews'] },
          { title: 'Before launch', items: ['Turn on Stripe tax reporting', 'Open the first region'] },
        ],
      },
    ],
  },
  {
    slug: 'agent-command-center',
    title: 'Agent Command Center',
    lede: 'One console for AI agents that help with the business, code and school. They draft; I approve anything that changes something.',
    metaDescription:
      'Case study: an AI agent command center with three crews and an approval step on every change. Built by Megan Small on Claude.',
    meta: [
      { label: 'Role', value: 'Design and build, solo' },
      { label: 'Stack', value: 'React · FastAPI · Claude Agent SDK' },
      { label: 'Rule', value: 'Nothing sends, pays or deploys without a tap' },
    ],
    image: {
      src: '/img/acc-console.webp',
      alt: 'The Agent Command Center: a roster of agents on the left and the Lead Intake agent open on the right',
      caption: 'The roster on the left, an agent on the right. Shown with sample agents.',
      width: 1400,
      height: 875,
    },
    sections: [
      {
        kind: 'boxes',
        eyebrow: 'THE CREWS',
        heading: 'Three crews, each with its own rules',
        boxes: [
          { title: 'Field', items: ['Crew briefings', 'Lead intake from Gmail', 'Follow-ups and reminders'] },
          { title: 'Build', items: ['Building and debugging', 'Security review', 'Safe database changes'] },
          { title: 'School', items: ['Plain-English tutoring', 'Study guides', 'Quiz-me practice'] },
        ],
      },
      {
        kind: 'decisions',
        eyebrow: 'DECISIONS',
        heading: 'Three choices and their trade-offs',
        items: [
          {
            title: 'Reads run, writes wait',
            why: 'Searching runs on its own; editing files or running commands waits for approval.',
            cost: 'Big build tasks mean many taps.',
          },
          {
            title: 'Read-only connections',
            why: 'Agents can pull from Gmail, Calendar and Drive but never send or pay.',
            cost: 'The final send is still done by hand.',
          },
          {
            title: 'Rules belong to the crew',
            why: 'New agents inherit their crew’s rules automatically.',
            cost: 'One rule change affects the whole crew.',
          },
        ],
      },
    ],
  },
  {
    slug: 'maineclean',
    title: 'maineclean.co',
    lede: 'The cleaning company’s website. Customers get an instant price and book, and the request lands in BrightBase.',
    metaDescription:
      'Case study: maineclean.co, a booking website with instant estimates that feeds BrightBase. Built by Megan Small.',
    meta: [
      { label: 'Role', value: 'Design and build, solo' },
      { label: 'Stack', value: 'React · TypeScript · PostgreSQL' },
      { label: 'Status', value: 'Live' },
    ],
    liveUrl: { href: 'https://www.maineclean.co', label: 'Visit maineclean.co ↗' },
    image: {
      src: '/img/tmcc-estimate.webp',
      alt: 'The instant estimate form on maineclean.co',
      caption: 'The instant estimate: property type and size in, a price out.',
      width: 1400,
      height: 762,
    },
    sections: [
      {
        kind: 'flow',
        eyebrow: 'HOW IT WORKS',
        heading: 'From visit to booked job',
        steps: [
          { title: 'Price', detail: 'Pick the property type, size and how often' },
          { title: 'Request', detail: 'Send the booking request in one form' },
          { title: 'Intake', detail: 'It lands in BrightBase as one clean record' },
          { title: 'Follow up', detail: 'The office quotes and schedules from there' },
        ],
      },
      {
        kind: 'decisions',
        eyebrow: 'DECISIONS',
        heading: 'Three choices and their trade-offs',
        items: [
          {
            title: 'Price before contact',
            why: 'Visitors see an estimate without calling or emailing first.',
            cost: 'The estimate is a starting point, confirmed later.',
          },
          {
            title: 'One intake path',
            why: 'Every form goes through the same duplicate check before it reaches BrightBase.',
            cost: 'Each new form has to use that path.',
          },
          {
            title: 'Service areas from one source',
            why: 'Towns and services come from shared data, so every page agrees.',
            cost: 'Adding a town means updating the data, not a page.',
          },
        ],
      },
    ],
  },
  {
    slug: 'm-studio-tools',
    title: 'M Studio Tools',
    lede: 'Eight small browser tools for service businesses. Each answers one question, with no signup.',
    metaDescription:
      'Case study: eight no-signup browser tools for service businesses, including an instant quote estimator. Built by Megan Small.',
    meta: [
      { label: 'Role', value: 'Design and build, solo' },
      { label: 'Stack', value: 'Next.js · TypeScript · Tailwind' },
      { label: 'Live at', value: 'mlinx.studio/tools' },
    ],
    liveUrl: { href: 'https://mlinx.studio/tools', label: 'Try the tools ↗' },
    image: {
      src: '/img/mstudio-hero.webp',
      alt: 'The mlinx.studio homepage',
      caption: 'mlinx.studio, where the tools live.',
      width: 1400,
      height: 575,
    },
    sections: [
      {
        kind: 'decisions',
        eyebrow: 'DECISIONS',
        heading: 'Three choices and their trade-offs',
        items: [
          {
            title: 'No signup',
            why: 'Anyone can see a result before giving an email.',
            cost: 'No lead capture on first use, on purpose.',
          },
          {
            title: 'Result beside the inputs',
            why: 'Change a field and the answer updates right there.',
            cost: 'On small phones it means more scrolling.',
          },
          {
            title: 'Quotes as a range',
            why: 'Matches how real quotes work.',
            cost: 'Some people want one number.',
          },
        ],
      },
      {
        kind: 'boxes',
        eyebrow: 'STATUS',
        heading: 'Done and still to do',
        boxes: [
          { title: 'Done', items: ['Eight tools live', 'Responsive on phone and desktop'] },
          { title: 'Still to do', items: ['Automated tests', 'Pricing checked against real jobs', 'Accessibility audit'] },
        ],
      },
    ],
  },
  {
    slug: 'm-linx-guide',
    title: 'M Linx Guide',
    lede: 'A phone-friendly guest guide for rentals, with door codes shown only to guests holding the right link.',
    metaDescription:
      'Case study: a digital guest guide for rental hosts, with private details kept behind a key in the link. Built by Megan Small.',
    meta: [
      { label: 'Role', value: 'Design and build, solo' },
      { label: 'Stack', value: 'Next.js · Supabase · Vercel' },
      { label: 'Status', value: 'Live · first paying client July 2026' },
    ],
    image: {
      src: '/img/gg-strip.webp',
      alt: 'Three screens from a guest guide on a phone',
      caption: 'A guest guide on a phone.',
      width: 1400,
      height: 820,
    },
    sections: [
      {
        kind: 'flow',
        eyebrow: 'HOW IT WORKS',
        heading: 'From host questions to guest page',
        steps: [
          { title: 'Intake', detail: 'Host answers a short questionnaire' },
          { title: 'Build', detail: 'The guide is made from a template' },
          { title: 'Share', detail: 'Guests open a link or QR code' },
          { title: 'Unlock', detail: 'Private details need the key' },
        ],
      },
      {
        kind: 'decisions',
        eyebrow: 'DECISIONS',
        heading: 'Three choices and their trade-offs',
        items: [
          {
            title: 'The key lives in the link',
            why: 'It sits after the #, so it never reaches the server or its logs.',
            cost: 'Lose the full link and the private part is gone until resent.',
          },
          {
            title: 'Its own database',
            why: 'Separate from every other product, with row-level security.',
            cost: 'One more project to maintain.',
          },
          {
            title: 'Four themes',
            why: 'Hosts match the guide to the property without a custom build.',
            cost: 'More styles to keep consistent.',
          },
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
