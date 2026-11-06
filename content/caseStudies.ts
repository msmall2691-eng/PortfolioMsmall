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
};

export type CaseSection =
  | { kind: 'prose'; eyebrow: string; heading: string; paragraphs: readonly string[] }
  | { kind: 'flow'; eyebrow: string; heading: string; steps: readonly { title: string; detail: string }[]; note?: string }
  | { kind: 'decisions'; eyebrow: string; heading: string; items: readonly Decision[] }
  | { kind: 'boxes'; eyebrow: string; heading: string; intro?: string; facts?: readonly { value: string; label: string }[]; boxes: readonly { title: string; items: readonly string[] }[]; note?: string };

export const caseStudies: readonly CaseStudy[] = [
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
