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
    role: 'Founder and Technical Operations Lead',
    org: 'The Maine Cleaning Company',
    when: '2018 – present',
    points: [
      'Grew the company to $1M+ collected since 2023 (peak year $414K) across 4,900+ visits in 40+ Maine towns. 63% of clients rebooked; bad debt stayed under 0.1%.',
      'Got visits with a cleaner assigned from 74% to 96% and recurring work from 90% to 97% (2023–2025), with booked value per hour up 20%.',
      'Tested the big field-service and CRM apps, including Jobber, Housecall Pro, Connecteam and HubSpot. None fit, so I gathered requirements with the office and crews and built BrightBase.',
      'Rolled BrightBase out in phases until it ran scheduling, dispatch, invoicing, payments and subcontractor payouts.',
      'Connected Stripe, Twilio, Google Calendar, Gmail, Airbnb and VRBO calendars and Facebook lead ads, with one intake path for every website form.',
      'Hired, trained and managed 50+ employees and subcontractors, and wrote the standards that kept teams consistent.',
    ],
  },
  {
    role: 'Freelance Web Developer',
    org: 'M Studio (mlinx.studio)',
    when: '2026 – present',
    points: [
      'Build and hand off websites and tools for small businesses, including Nash Construction and The Remote Admin. Clients own every account.',
      'Built eight free browser tools at mlinx.studio/tools, including an instant quote and a website checker.',
      'Launched M Linx Guide, a digital guest guide for rental hosts. First paying client July 2026.',
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
  { title: 'Power BI portfolio', sub: 'Power BI, DAX', detail: 'Four reports on real business, code and school data.' },
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
    detail: 'BCG: GenAI; Vista Equity Partners: AI in Action · Feb 2026',
  },
] as const;

export const contactRow = [
  { label: 'EMAIL', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'LINKEDIN', value: links.linkedinLabel, href: links.linkedin },
  { label: 'GITHUB', value: links.githubLabel, href: links.github },
  { label: 'STUDIO', value: links.studioLabel, href: links.studio },
] as const;
