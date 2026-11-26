/**
 * Toolkit: nine skill groups and the credentials grid.
 *
 * Tools render as one dot-separated line per group — deliberately not
 * chips or pills.
 */
import { YEARS_IN_BUSINESS_WORD } from './site';

export const toolkit = {
  heading: 'Skills',
  intro: 'From the data model to the screen.',
} as const;

export type SkillGroup = {
  n: string;
  name: string;
  sub: string;
  tools: readonly string[];
};

/**
 * THERE WAS A NINE-COLOUR RAIL HERE — a pastel bar across the top of each
 * card and the same colour behind its number — and it is gone.
 *
 * It was positional decoration, carrying no meaning: nothing told a reader
 * what pink or amber signified, because they signified nothing. On the dark
 * ground nine pastels read as a palette. Skills is a LIGHT band now, and
 * nine pastels on white read as nine unrelated tags, which is the opposite
 * of the restraint the rest of the page keeps to. The numbers stay — they
 * are the index, and they are the one accent.
 *
 * Ordered to lead with building and modelling, then the design work, then
 * the analysis and operations grounding underneath it. Numbers are derived
 * from position below, so changing this order is the only edit a reorder
 * needs.
 */
const GROUPS: readonly Omit<SkillGroup, 'n'>[] = [
  {
    name: 'Back end & data',
    sub: 'Models, APIs and numbers',
    tools: [
      'Python', 'FastAPI', 'SQLAlchemy', 'Alembic migrations', 'SQL', 'PostgreSQL', 'SQLite',
      'Data modeling', 'Row-level security', 'pandas', 'KPI & revenue reporting',
      'Power BI', 'DAX', 'Star schemas',
    ],
  },
  {
    name: 'Front end',
    sub: 'Interfaces that ship',
    tools: [
      'React', 'TypeScript', 'JavaScript', 'Next.js', 'Vite', 'Tailwind CSS', 'HTML & CSS',
      'Responsive layout', 'Offline support',
    ],
  },
  {
    name: 'Workflow & UX',
    sub: 'Screens people actually use',
    tools: [
      'Mobile-first field apps', 'Client portals', 'Booking & intake flows', 'Information architecture',
      'Wireframing', 'Design systems', 'Accessibility', 'Usability testing',
    ],
  },
  {
    name: 'Integrations',
    sub: 'Making systems talk',
    tools: [
      'REST APIs', 'GraphQL', 'Webhooks', 'OAuth 2.0', 'Stripe & Stripe Connect', 'Twilio SMS & voice',
      'Google Calendar & Gmail APIs', 'iCal / Airbnb / VRBO', 'Facebook Lead Ads',
    ],
  },
  {
    name: 'Business analysis',
    sub: 'Find it, map it, write it down',
    tools: [
      'Requirements gathering', 'Stakeholder interviews', 'Process mapping', 'Current & future state',
      'Fit-gap analysis', 'Functional specifications', 'User stories', 'Acceptance criteria',
      'System evaluation', 'UAT', 'Go-live & cutover', 'Data migration & validation',
      'Change management', 'Agile', 'Training',
    ],
  },
  {
    name: 'Delivery',
    sub: 'Safe, repeatable releases',
    tools: [
      'pytest', 'Vitest', 'Automated testing & CI', 'GitHub Actions', 'Git & GitHub', 'Docker',
      'Railway', 'Vercel', 'Supabase', 'Google Cloud', 'Role-based access',
    ],
  },
  {
    name: 'AI',
    sub: 'Agents that draft, people who approve',
    tools: [
      'Claude API', 'Claude Agent SDK', 'Claude Code', 'Gemini API', 'Prompt design',
      'AI-assisted development',
    ],
  },
  {
    name: 'Platforms',
    sub: 'Used, tested, configured and migrated',
    tools: [
      'Jobber', 'Housecall Pro', 'Connecteam', 'Maidily', 'Turno', 'Breezeway', 'BookingKoala',
      'HubSpot', 'HighLevel', 'Attio', 'Twenty CRM', 'Airtable', 'Zapier', 'Make', 'AppSheet', 'Google Apps Script',
      'Bubble', 'Noloco', 'Softr', 'Adalo', 'Glide', 'Base44', 'Replit', 'monday.com', 'Jira', 'QuickBooks', 'Square',
      'Square Payroll', 'OpenPhone', 'Lodgify', 'Wix', 'Notion', 'Excel', 'Google Workspace', 'Microsoft 365',
    ],
  },
  {
    name: 'Operations',
    sub: `${YEARS_IN_BUSINESS_WORD} years running the business`,
    tools: [
      'Hiring & training', 'SOPs & checklists', 'Scheduling & dispatch', 'Pricing & quoting',
      'Invoicing & collections', 'Payroll & 1099s', 'Vendor management', 'Customer service',
    ],
  },
];

export const skillGroups: readonly SkillGroup[] = GROUPS.map((group, i) => ({
  ...group,
  n: String(i + 1).padStart(2, '0'),
}));

export const credentials = [
  {
    tag: 'DEGREE',
    title: 'B.S. Business Analytics & AI',
    detail: 'University of Southern Maine · CS minor · Expected Dec 2028',
  },
  {
    tag: 'COURSEWORK',
    title: 'Relevant USM courses',
    detail: 'Economics, writing, linguistics, marketing, business law',
  },
  {
    tag: 'CERTIFICATE · IN PROGRESS',
    title: 'IBM Full Stack Software Developer',
    detail: 'Coursera · Expected Dec 2026',
  },
  {
    tag: 'JOB SIMULATION',
    title: 'Vista Equity Partners: AI in Action',
    detail: 'Forage · Feb 2026',
  },
  {
    tag: 'JOB SIMULATION',
    title: 'BCG: GenAI',
    detail: 'Forage · Feb 2026',
  },
] as const;
