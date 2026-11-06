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
  | { kind: 'boxes'; eyebrow: string; heading: string; intro?: string; facts?: readonly { value: string; label: string }[]; boxes: readonly { title: string; items: readonly string[] }[]; note?: string };

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: 'linx',
    title: 'linx',
    lede: 'A two-sided marketplace for short-term rental turnovers. Owners post the clean between one guest and the next, vetted local cleaners bid, and the owner awards the job.',
    metaDescription:
      'Case study: linx, a two-sided marketplace for rental turnover cleanings with vetting, bidding, row-locked awards and Stripe Connect payouts. Built by Megan Small.',
    meta: [
      { label: 'Role', value: 'Requirements, data model and build, solo, with an AI coding agent' },
      { label: 'Status', value: 'Launch readiness' },
      { label: 'Stack', value: 'FastAPI, SQLAlchemy 2.0, Alembic, PostgreSQL, React 18, Vite, Tailwind, Stripe Connect' },
      { label: 'Tests', value: '900+ automated tests gate every change' },
    ],
    image: {
      src: '/img/linx-flow.webp',
      alt: 'Diagram of one turnover moving from posted to bids, awarded, done and paid',
      caption: 'How one turnover moves through linx, and what each of the three roles can do.',
      width: 1200,
      height: 900,
    },
    sections: [
      {
        kind: 'prose',
        eyebrow: 'THE IDEA',
        heading: 'A standing relationship, not a one-off lead',
        paragraphs: [
          'Rental hosts need a reliable cleaner in the window between checkout and the next check-in, and local cleaners want steady work without paying for leads. linx keeps it to one category and one region at launch: owners post turnovers, cleared cleaners bid, and the owner hires.',
          'It is a separate codebase from BrightBase on purpose. Nothing imports from or depends on the cleaning company’s system.',
        ],
      },
      {
        kind: 'flow',
        eyebrow: 'HOW IT WORKS',
        heading: 'One turnover, start to finish',
        steps: [
          { title: 'Post', detail: 'The owner sets checkout and the next check-in for a property' },
          { title: 'Bench', detail: 'Urgency is worked out on the server from the gap between guests' },
          { title: 'Bid', detail: 'Vetted cleaners within their own service radius name a price' },
          { title: 'Award', detail: 'The owner hires one cleaner; the address opens up to them only' },
          { title: 'Pay', detail: 'The owner pays on Stripe’s page and the cleaner’s share transfers' },
          { title: 'Review', detail: 'Both sides review; neither sees the other’s until both are in' },
        ],
      },
      {
        kind: 'decisions',
        eyebrow: 'DECISIONS',
        heading: 'Five choices and what each cost',
        items: [
          {
            title: 'Address withheld until the award',
            why: 'Open jobs show the area, not the street address or access notes. Those open to the hired cleaner and close again the moment the award ends.',
            cost: 'Cleaners bid knowing the area and the job, not the exact house.',
          },
          {
            title: 'Awards taken under a row lock',
            why: 'The check and the write happen under one database lock, so two owners accepting at the same moment cannot both win.',
            cost: 'Awards on the same job wait their turn, a fair trade at this volume.',
          },
          {
            title: 'The bidding gate lives in Postgres',
            why: 'Whether a cleaner can take jobs is computed by the database from the vetting and background-check statuses. No screen or API call can override it.',
            cost: 'Changing the rule is a migration, not a settings toggle.',
          },
          {
            title: 'One Stripe charge settles both sides',
            why: 'A destination charge pays the cleaner’s Stripe Express account and takes the platform fee in the same transaction. Every Stripe call carries an idempotency key from a database id, and the attempt is written down before the call.',
            cost: 'Every cleaner has to finish Stripe onboarding before their first payout.',
          },
          {
            title: 'A closed list of notifications',
            why: 'Fifteen events, each recorded in the same transaction as the change that caused it, with a unique key so a retry can never send twice.',
            cost: 'Adding an event takes a migration and a failing test, which is the point.',
          },
        ],
      },
      {
        kind: 'boxes',
        eyebrow: 'STATUS',
        heading: 'Where it stands',
        facts: [
          { value: '900+', label: 'automated tests' },
          { value: '14', label: 'tables, built by migrations' },
          { value: '15', label: 'notification events' },
        ],
        boxes: [
          {
            title: 'Built',
            items: [
              'Owner, cleaner and admin roles enforced on the server',
              'Properties, turnovers, bidding and awards',
              'Admin vetting queue with ID, reference and background check',
              'Cancellations and no-shows that put the job back on the bench',
              'Stripe Connect payments, admin-only refunds and mutual reviews',
            ],
          },
          {
            title: 'Before launch',
            items: [
              'A launch runbook of decisions only a person can make',
              'Stripe Connect tax reporting switched on before the first live payout',
              'Opening the first region to real owners and cleaners',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'agent-command-center',
    title: 'Agent Command Center',
    lede: 'One console for a team of AI agents, grouped into crews for the business, for code and for school. Every agent hands back a draft, and a person approves anything that changes something.',
    metaDescription:
      'Case study: an AI agent command center with three crews, read-only connectors and an approval gate on every write. Built by Megan Small on Claude and the Claude Agent SDK.',
    meta: [
      { label: 'Role', value: 'Design and build, solo' },
      { label: 'Versions', value: 'A browser version that runs inside Claude, and a local version on the Claude Agent SDK' },
      { label: 'Stack', value: 'React, Vite, FastAPI, WebSockets, Claude Agent SDK' },
      { label: 'Rule', value: 'Drafts first. Nothing sends, pays or deploys without a person’s tap' },
    ],
    image: {
      src: '/img/acc-console.webp',
      alt: 'The Agent Command Center: a roster of agents on the left and the Lead Intake agent open on the right',
      caption: 'The browser version, shown with its built-in sample roster. The Lead Intake agent reads Gmail but cannot send.',
      width: 1400,
      height: 875,
    },
    sections: [
      {
        kind: 'prose',
        eyebrow: 'THE IDEA',
        heading: 'Different work needs different rules',
        paragraphs: [
          'Business tasks, code changes and coursework each need their own instructions and their own limits. A dispatch briefing can read the schedule but should never message a customer. A build agent can edit code, but not without someone looking first. A tutor should explain and quiz, not do the work.',
          'So each agent belongs to a crew, and the crew decides the rules. Shared business context and the crew’s rules are added to every agent automatically, including agents created later in the editor.',
        ],
      },
      {
        kind: 'flow',
        eyebrow: 'HOW A REQUEST MOVES',
        heading: 'Reads run, writes wait',
        steps: [
          { title: 'Pick', detail: 'Choose an agent from the roster and brief it' },
          { title: 'Context', detail: 'Its instructions, crew rules and any connectors are attached' },
          { title: 'Read', detail: 'Reading and searching files or the web runs on its own' },
          { title: 'Pause', detail: 'Writing a file or running a command waits for approval' },
          { title: 'Decide', detail: 'Approve or deny each step from the console, even from a phone' },
        ],
      },
      {
        kind: 'decisions',
        eyebrow: 'DECISIONS',
        heading: 'Four choices and what each cost',
        items: [
          {
            title: 'Rules belong to the crew',
            why: 'Field, Build and School each carry one rule set that every agent in the crew inherits, so a new agent starts out safe without anyone remembering to add it.',
            cost: 'Changing a crew rule changes every agent in that crew at once.',
          },
          {
            title: 'An approval gate on every change',
            why: 'In the local version, reading and searching tools are auto-approved. Writing files, editing them and running shell commands, git included, go through a gate that waits for a tap.',
            cost: 'A build task with many edits means many taps.',
          },
          {
            title: 'Connectors are read-only',
            why: 'Agents can pull from Gmail, Calendar, Drive and other connected tools to work with real information, but they are told never to send, reply, pay or delete through them.',
            cost: 'The last step, like actually sending the reply, is still done by hand.',
          },
          {
            title: 'Runs on a machine I control',
            why: 'The local version runs as a background service on one computer and is reached over a private network, never the open internet, because anyone who can reach it can drive the build agents.',
            cost: 'It needs a computer left on, and setup is not one click.',
          },
        ],
      },
      {
        kind: 'boxes',
        eyebrow: 'THE CREWS',
        heading: 'Three crews, fifteen agents to start',
        boxes: [
          {
            title: 'Field crew',
            items: [
              'Dispatch briefings a cleaner can run from a phone',
              'Lead intake: structured fields plus a reply draft',
              'Quote follow-ups and invoice reminders',
              'A one-screen weekly owner’s report',
            ],
          },
          {
            title: 'Build crew',
            items: [
              'Full-stack building and systematic debugging',
              'Security and access-control review',
              'Schema design and migrations safe for live data',
              'OAuth and integration setup, with secrets never printed',
            ],
          },
          {
            title: 'School crew',
            items: [
              'Tutors that explain in plain English first, then the formal version',
              'Printable study guides with practice questions',
              'Active-recall quizzes that check each answer',
            ],
          },
        ],
        note: 'The roster is editable in the console: add an agent, pick its crew and connectors, and it inherits the draft-first rule.',
      },
    ],
  },
  {
    slug: 'm-studio-tools',
    title: 'M Studio Tools',
    lede: 'Eight small browser tools for service businesses. Each one answers a question a customer or owner has, with no signup to try it.',
    metaDescription:
      'Case study: eight no-signup browser tools for service businesses, including an instant quote estimator. Built solo by Megan Small.',
    meta: [
      { label: 'Role', value: 'Product, design and development, solo' },
      { label: 'Live at', value: 'mlinx.studio/tools' },
      { label: 'Stack', value: 'Next.js, TypeScript, Tailwind, Vercel' },
      { label: 'Tools', value: 'Eight, including an instant quote and an invoice maker' },
    ],
    liveUrl: { href: 'https://mlinx.studio/tools', label: 'Try the tools ↗' },
    sections: [
      {
        kind: 'prose',
        eyebrow: 'THE IDEA',
        heading: 'Let people try the thing before they talk to anyone',
        paragraphs: [
          'Most small-business sites ask for a name and email before they show anything useful. I built these tools the other way around: open the page, fill in a few details, see a result right away.',
          'They also work as samples of what I build for clients, so each one had to be small, fast and clear on a phone.',
        ],
      },
      {
        kind: 'boxes',
        eyebrow: 'EXAMPLE',
        heading: 'The instant quote tool',
        intro:
          'You enter the home size, visit frequency and extras. The estimate appears beside the inputs as a range, with each line item explained, so it reads as a considered number rather than a guess.',
        boxes: [
          {
            title: 'Sample results',
            items: [
              '4 bed / 3 bath, biweekly: $189 to $222',
              '5 bed, biweekly: $204 to $239',
              'With inside oven: $229 to $268',
            ],
          },
          {
            title: 'Why a range',
            items: [
              'Honest about what can change on site',
              'Each line item says what it covers',
              'No signup needed to see it',
            ],
          },
        ],
        note: 'The sample figures are placeholders used to test the layout, not validated prices.',
      },
      {
        kind: 'decisions',
        eyebrow: 'DECISIONS',
        heading: 'Three choices and what each cost',
        items: [
          {
            title: 'Result beside the inputs',
            why: 'Changing a field updates the number on the same screen, so people see cause and effect.',
            cost: 'On small phones the result sits below the form, which takes more scrolling.',
          },
          {
            title: 'No signup to try',
            why: 'Nobody has to hand over an email to see value.',
            cost: 'No lead capture on first use. That is a trade I made on purpose.',
          },
          {
            title: 'A range instead of one price',
            why: 'Matches how real quotes work.',
            cost: 'Some people want a single number and may read a range as vague.',
          },
        ],
      },
      {
        kind: 'boxes',
        eyebrow: 'STATUS',
        heading: 'What is done and what is not',
        boxes: [
          {
            title: 'Done',
            items: [
              'Eight tools published at mlinx.studio/tools',
              'Quote estimator with explained line items',
              'Responsive layout built with Tailwind',
            ],
          },
          {
            title: 'Still to do',
            items: [
              'Automated tests',
              'Pricing validation against real jobs',
              'Keyboard and screen-reader audit',
              'Mobile device testing pass',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'm-linx-guide',
    title: 'M Linx Guide',
    lede: 'A guest guide for short-term rentals. Hosts stop answering the same questions about wifi, parking and check-out, and guests get one page that works on a phone.',
    metaDescription:
      'Case study: a digital guest guide for short-term rental hosts, with private details kept behind a key in the link. Built solo by Megan Small.',
    meta: [
      { label: 'Role', value: 'Product, design and full-stack development, solo' },
      { label: 'Status', value: 'Live. First paying client in July 2026' },
      { label: 'Stack', value: 'Next.js, Supabase (Postgres + row-level security), Vercel' },
      { label: 'Price', value: '$125 per property founding rate, plus an optional Care Plan' },
    ],
    sections: [
      {
        kind: 'prose',
        eyebrow: 'THE PROBLEM',
        heading: 'Guests ask the same ten questions',
        paragraphs: [
          'Short-term rental hosts get the same messages before and during every stay: the wifi password, where to park, how the thermostat works, when check-out is. A PDF or a binder in the kitchen does not get read, and private details like door codes should not sit on a public page anyone can find.',
          'I wanted a guide a host could set up in an afternoon, that a guest could open from a link, and that kept the sensitive parts out of public reach.',
        ],
      },
      {
        kind: 'flow',
        eyebrow: 'HOW IT WORKS',
        heading: 'From host questionnaire to guest page',
        steps: [
          { title: 'Intake', detail: 'An interactive questionnaire collects the property details' },
          { title: 'Build', detail: 'The guide is generated from a shared template' },
          { title: 'Theme', detail: 'The host picks one of four themes' },
          { title: 'Share', detail: 'The guest opens a link or QR code' },
          { title: 'Unlock', detail: 'Private info appears only with the right key' },
        ],
        note: 'The template came from the first guide I built, for a single rental property. I turned its structure into something reusable for every new property.',
      },
      {
        kind: 'decisions',
        eyebrow: 'DECISIONS',
        heading: 'Four choices and what each cost',
        items: [
          {
            title: 'Private info behind a fragment key',
            why: 'Door codes and similar details show only when the link carries a key after the # in the URL. Fragments are not sent to the server, so they stay out of server logs.',
            cost: 'A guest who loses the full link loses the private section until the host resends it.',
          },
          {
            title: 'Separate Supabase project with row-level security',
            why: 'The guide has its own database and access rules instead of sharing the BrightBase one.',
            cost: 'Another project to maintain, but a mistake in one product cannot expose the other’s data.',
          },
          {
            title: 'Google Form for email capture',
            why: 'Lead capture goes to a Google Form rather than a custom endpoint.',
            cost: 'Less control over the data and the look, but nothing new to secure or host.',
          },
          {
            title: 'Four switchable themes',
            why: 'Hosts match the guide to the property without a custom build for each one.',
            cost: 'More CSS to keep consistent across themes.',
          },
        ],
      },
      {
        kind: 'boxes',
        eyebrow: 'RESULT',
        heading: 'What exists today',
        facts: [
          { value: '1', label: 'paying client, July 2026' },
          { value: '4', label: 'themes' },
          { value: '$125', label: 'founding rate per property' },
        ],
        boxes: [
          {
            title: 'In use',
            items: [
              'Live guides with a private section behind a key',
              'Interactive intake questionnaire',
              'Animated demo on the marketing page',
            ],
          },
          {
            title: 'Not done yet',
            items: ['More paying clients beyond the first', 'A full accessibility and mobile audit'],
          },
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
