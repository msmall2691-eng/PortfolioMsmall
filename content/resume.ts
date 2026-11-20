/**
 * The web résumé rendered on the paper card, plus the contact row.
 *
 * Keep this in step with public/Megan-Small-Resume.pdf — the page offers
 * both and a visitor will notice if they disagree.
 */
import { profile, links, YEARS_IN_BUSINESS_WORD } from './site';

export const resumeHeader = {
  eyebrow: 'RÉSUMÉ',
  heading: 'Experience and education',
  line: 'Open to business systems, implementation and front-end roles.',
} as const;

export const resumeCard = {
  name: profile.fullName,
  title: 'Business Systems Analyst · Implementation · Front-End Developer',
  contact: `${profile.locationShort} · ${profile.email} · ${links.studioLabel} · github.com/${links.githubLabel}`,
  summary: `${YEARS_IN_BUSINESS_WORD} years running a multi-crew cleaning company and every system behind it, from booking to payroll. When the apps we paid for didn’t fit how we worked, I designed and built BrightBase, the system the company runs on today. Now looking for a team where I can do this full-time: figure out how the work really flows, find where it breaks, and build the fix.`,
} as const;

export const jobs = [
  {
    role: 'Operations and Systems Manager (Owner)',
    org: 'The Maine Cleaning Company',
    when: '2018 – present',
    points: [
      'Collected $1M+ since 2023 (peak year 2024: $410K+) across 4,900+ residential, commercial and rental visits in 40+ Maine towns. 4.9-star Google rating, 63% of clients rebooked, and bad debt stayed under 0.1%.',
      'Got visits with a cleaner assigned from 74% to 96% and recurring work from 90% to 97% (2023–2025), with booked value per hour up 20%.',
      'Ran intake, quoting, scheduling, payroll and billing, including 500+ online booking requests, about 70% of which booked.',
      'Tested the big field-service and CRM apps, including Jobber, Housecall Pro, Connecteam and HubSpot. None fit, so I gathered requirements from the office and crews, documented the data model and built BrightBase.',
      'Led an audit that folded 12 of 28 paid subscriptions into one system.',
      'Rolled BrightBase out in phases, migrating and validating the data, until it ran scheduling, dispatch, invoicing, payments and subcontractor payouts.',
      'Tested every release against written acceptance criteria, with automated tests and user acceptance testing by the office and crews. Ran payroll in parallel for a full pay period and tested invoices and Stripe payments before billing real customers.',
      'Wrote the business rules for subcontractor payouts and fixed the sync errors that were creating duplicate jobs.',
      'Connected Stripe, Twilio, Google Calendar, Gmail, Airbnb and VRBO calendars and Facebook lead ads, with one intake path for every website form.',
      'Hired, trained and managed 50+ employees and subcontractors, and wrote the SOPs and training courses they used.',
    ],
  },
  {
    role: 'Freelance Web Developer',
    org: 'M Studio (mlinx.studio)',
    when: '2026 – present',
    points: [
      'Build and hand off websites and tools for small businesses, from scoping to launch. Clients own every account.',
      'Moved Nash Construction off Wix with 301 redirects and Search Console verification, and built and launched the site for The Remote Admin.',
      'Arrowhead Explorers: brand, website, a 16-page parent guide and a social calendar for a family childcare launch.',
      'Built eight free browser tools at mlinx.studio/tools, including an instant quote, a website checker and live Maine weather and tide data, plus a tide and water app for a lobsterman.',
      'Launched M Linx Guide, digital guest guides for rental hosts, with four themes, an intake questionnaire and private delivery of door codes. First paying client July 2026.',
    ],
  },
  {
    role: 'Lead Dental Assistant and Administrative Support',
    org: 'Southern Maine practices',
    when: '2014 – 2018',
    points: ['Scheduling, documentation, patient flow and staff training.'],
  },
  {
    role: 'Administrative Assistant',
    org: 'SMCC Office of the President',
    when: '2013 – 2014',
    points: ['Correspondence, scheduling and confidential records.'],
  },
] as const;

export const resumeProjects = [
  { title: 'BrightBase', sub: 'Python, FastAPI, React, PostgreSQL', detail: 'The operations system the company runs on. 4,100+ automated tests.' },
  { title: 'linx', sub: 'Python, FastAPI, React, PostgreSQL', detail: 'A marketplace app where rental owners post cleanings and vetted cleaners bid.' },
  { title: 'Agent Command Center', sub: 'React, FastAPI, Claude Agent SDK', detail: 'AI agents that draft the work and wait for my approval.' },
  { title: 'maineclean.co', sub: 'React, TypeScript', detail: 'Live booking site with instant prices that feed into BrightBase.' },
  { title: 'Power BI portfolio', sub: 'Power BI, DAX, Power Query', detail: 'Four reports built from real data: company operations, 26 code repositories, coursework and the software stack. Star-schema models with time-intelligence and retention measures, saved as Power BI projects in Git.' },
  { title: 'Twenty CRM build', sub: 'Twenty (open source)', detail: 'An earlier version with custom objects for properties, quotes and jobs.' },
] as const;

export const education = [
  {
    title: 'B.S. Business Analytics and AI',
    detail: 'University of Southern Maine · Minor in Computer Science · In progress',
  },
  {
    title: 'IBM Full Stack Software Developer',
    detail: 'Coursera Professional Certificate · Expected Dec 2026',
  },
  {
    title: 'Forage job simulations (completed)',
    detail: 'BCG GenAI — a rule-based financial chatbot in Python and pandas, reading 10-K and 10-Q data. Vista Equity Partners AI in Action — NPS survey feedback turned into executive-ready insights, with repeatable GenAI workflows · Feb 2026',
  },
] as const;

export const contactRow = [
  { label: 'EMAIL', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'LINKEDIN', value: links.linkedinLabel, href: links.linkedin },
  { label: 'GITHUB', value: links.githubLabel, href: links.github },
  { label: 'STUDIO', value: links.studioLabel, href: links.studio },
] as const;
