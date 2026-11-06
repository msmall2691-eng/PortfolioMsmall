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
        facts: [
          { value: '900+', label: 'automated tests' },
          { value: '14', label: 'database tables' },
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
