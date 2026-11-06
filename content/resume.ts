/**
 * The web résumé rendered on the paper card, plus the contact row.
 *
 * Keep this in step with public/Megan-Small-Resume.pdf — the page offers
 * both and a visitor will notice if they disagree.
 */
import { profile, links, YEARS_IN_BUSINESS_WORD } from './site';

export const resumeHeader = {
  eyebrow: 'RÉSUMÉ',
  heading: 'Experience, education and skills',
  line: 'Open to business systems and front-end development roles.',
} as const;

export const resumeCard = {
  name: profile.fullName,
  title: profile.discipline,
  contact: `${profile.locationShort} · ${profile.email} · ${links.studioLabel} · github.com/${links.githubLabel}`,
  summary: `Business systems builder moving from running a company into a full-time systems role on a team. ${YEARS_IN_BUSINESS_WORD} years running a multi-crew service company and owning every system behind it, from booking to payroll. When off-the-shelf service apps fell short, designed and built BrightBase, the operations system the company runs on.`,
} as const;

export const jobs = [
  {
    role: 'Founder and Technical Operations Lead',
    org: 'The Maine Cleaning Company',
    when: '2018 – present',
    points: [
      'Built a residential, commercial and short-term rental cleaning business to $1M+ collected since 2023 across 4,900+ visits in 40+ Maine towns.',
      'Raised visits with a cleaner assigned from 74% to 96% (2023–2025) and recurring work from 90% to 97% of visits.',
      'Tested many field-service, scheduling and CRM apps; when none fit, defined the requirements and data model for BrightBase and moved the office and crews onto it.',
      'Integrated Stripe, Google Calendar and Gmail, Twilio, Airbnb/VRBO calendars and Facebook lead ads into one workflow.',
      'Hired, trained and managed 50+ employees and subcontractors.',
    ],
  },
  {
    role: 'Freelance Web Developer',
    org: 'M Studio (mlinx.studio)',
    when: '2026 – present',
    points: [
      'Scope, build and support websites and business tools for small businesses, from intake through deployment and handoff.',
      'Client work includes Nash Construction and The Remote Admin; launched M Linx Guide, a digital guest guide for rental hosts.',
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
  {
    title: 'BrightBase',
    sub: 'Operations platform',
    detail: 'Affordable system built in-house: turnover scheduling from booking calendars, client texts, one lead inbox, Google Workspace. Python, FastAPI, React, PostgreSQL.',
  },
  {
    title: 'Power BI portfolio',
    sub: 'Four reports on real data',
    detail: 'Business, code and school data in star-schema models with time-intelligence and retention measures, versioned in Git.',
  },
  {
    title: 'linx',
    sub: 'Two-sided marketplace',
    detail: 'Owners post cleanings, vetted cleaners bid; Stripe Connect payouts.',
  },
  {
    title: 'maineclean.co',
    sub: 'Live customer site',
    detail: 'Instant estimates and booking requests that land in BrightBase as clean records.',
  },
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
