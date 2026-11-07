/**
 * Toolkit: eight skill groups and the credentials grid.
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
  color: string;
  tools: readonly string[];
};

/**
 * Rail colours in display order. They are positional decoration, not
 * identity, so reordering the groups below keeps this sequence intact.
 */
const RAIL_COLORS = [
  '#b5abfc',
  '#5fc4d6',
  '#8fd3a8',
  '#f2c47a',
  '#f29e8e',
  '#9db8f5',
  '#d7a6f0',
  '#cfd3e5',
] as const;

/**
 * Ordered to lead with building and modelling, then the design work, then
 * the analysis and operations grounding underneath it.
 *
 * Numbers and rail colours are derived from position below, so changing
 * this order is the only edit a reorder needs.
 */
const GROUPS: readonly Omit<SkillGroup, 'n' | 'color'>[] = [
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
      'User stories', 'Acceptance criteria', 'Gap analysis', 'System evaluation', 'UAT',
      'Cutover planning', 'Data migration',
    ],
  },
  {
    name: 'Delivery',
    sub: 'Safe, repeatable releases',
    tools: [
      'pytest', 'Vitest', 'Automated testing & CI', 'GitHub Actions', 'Git & GitHub', 'Docker',
      'Railway', 'Vercel', 'Supabase', 'Role-based access',
    ],
  },
  {
    name: 'Platforms',
    sub: 'Used, tested, configured and migrated',
    tools: [
      'Jobber', 'Housecall Pro', 'Connecteam', 'Maidily', 'Turno', 'Breezeway', 'BookingKoala',
      'HubSpot', 'HighLevel', 'Attio', 'Twenty CRM', 'Airtable', 'Zapier', 'AppSheet', 'Google Apps Script',
      'Bubble', 'Noloco', 'Softr', 'Adalo', 'Glide', 'Base44', 'Replit', 'monday.com', 'QuickBooks', 'Square',
      'Square Payroll', 'OpenPhone', 'Lodgify', 'Wix', 'Notion', 'Google Workspace', 'Microsoft 365',
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
  color: RAIL_COLORS[i % RAIL_COLORS.length]!,
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
