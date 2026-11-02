/**
 * Toolkit: eight skill groups and the credentials grid.
 *
 * Tools render as one dot-separated line per group — deliberately not
 * chips or pills. The group's accent colour is used for the rail and the
 * numbered badge.
 */
import { YEARS_IN_BUSINESS_WORD } from './site';

export const toolkit = {
  heading: 'Toolkit',
  intro: 'From the office floor to production code — the skills behind the work above.',
} as const;

export type SkillGroup = {
  n: string;
  name: string;
  sub: string;
  color: string;
  tools: readonly string[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    n: '01',
    name: 'Business analysis',
    sub: 'Find it, map it, write it down',
    color: '#b5abfc',
    tools: [
      'Requirements gathering', 'Stakeholder interviews', 'Process mapping', 'Current & future state',
      'User stories', 'Acceptance criteria', 'Gap analysis', 'System evaluation', 'UAT',
      'Cutover planning', 'Data migration',
    ],
  },
  {
    n: '02',
    name: 'Workflow & UX',
    sub: 'Screens people actually use',
    color: '#5fc4d6',
    tools: [
      'Mobile-first field apps', 'Client portals', 'Booking & intake flows', 'Information architecture',
      'Wireframing', 'Design systems', 'Accessibility', 'Usability testing',
    ],
  },
  {
    n: '03',
    name: 'Front end',
    sub: 'Interfaces that ship',
    color: '#8fd3a8',
    tools: [
      'React', 'TypeScript', 'JavaScript', 'Next.js', 'Vite', 'Tailwind CSS', 'HTML & CSS',
      'Responsive layout', 'Offline support',
    ],
  },
  {
    n: '04',
    name: 'Back end & data',
    sub: 'Models, APIs and numbers',
    color: '#f2c47a',
    tools: [
      'Python', 'FastAPI', 'SQLAlchemy', 'Alembic migrations', 'SQL', 'PostgreSQL', 'SQLite',
      'Data modeling', 'pandas', 'KPI & revenue reporting', 'Power BI',
    ],
  },
  {
    n: '05',
    name: 'Integrations',
    sub: 'Making systems talk',
    color: '#f29e8e',
    tools: [
      'REST APIs', 'GraphQL', 'Webhooks', 'OAuth 2.0', 'Stripe & Stripe Connect', 'Twilio SMS & voice',
      'Google Calendar & Gmail APIs', 'iCal / Airbnb / VRBO', 'Facebook Lead Ads',
    ],
  },
  {
    n: '06',
    name: 'Platforms',
    sub: 'Configured, evaluated, migrated',
    color: '#9db8f5',
    tools: [
      'Jobber', 'Connecteam', 'Airtable', 'Twenty CRM', 'HubSpot', 'Housecall Pro', 'Zapier', 'Bubble',
      'Adalo · Glide · Softr', 'QuickBooks', 'Square Payroll', 'Google Workspace',
    ],
  },
  {
    n: '07',
    name: 'Delivery',
    sub: 'Safe, repeatable releases',
    color: '#d7a6f0',
    tools: [
      'pytest', 'Automated testing & CI', 'GitHub Actions', 'Git & GitHub', 'Docker', 'Railway',
      'Vercel', 'Supabase', 'Row-level security', 'Role-based access',
    ],
  },
  {
    n: '08',
    name: 'Operations',
    sub: `${YEARS_IN_BUSINESS_WORD} years running the business`,
    color: '#cfd3e5',
    tools: [
      'Hiring & training', 'SOPs & checklists', 'Scheduling & dispatch', 'Pricing & quoting',
      'Invoicing & collections', 'Payroll & 1099s', 'Vendor management', 'Customer service',
    ],
  },
];

export const credentials = [
  {
    tag: 'DEGREE',
    title: 'B.S. Business Analytics & AI',
    detail: 'University of Southern Maine · CS minor · Expected Dec 2028',
  },
  {
    tag: 'CERTIFICATE · IN PROGRESS',
    title: 'IBM Full Stack Software Developer',
    detail: 'Coursera Professional Certificate · Expected Dec 2026',
  },
  {
    tag: 'JOB SIMULATION',
    title: 'Vista Equity Partners: AI in Action',
    detail: 'Forage · Feb 2026 · Structured prompts, output review, repeatable AI workflows',
  },
  {
    tag: 'JOB SIMULATION',
    title: 'BCG: GenAI',
    detail: 'Forage · Feb 2026 · Financial data extraction and a question-answering chatbot',
  },
] as const;
