/**
 * Data section: KPIs, the three tabbed charts and the DAX sample.
 *
 * Bar widths are computed from the raw figures so the numbers and the
 * bars can never disagree — each chart scales to its own largest row.
 */

export const dataSection = {
  eyebrow: 'DATA · POWER BI · PYTHON · SQL',
  heading: 'Data & analytics',
  intro:
    '3.5 years of job and bank records, cleaned, anonymized and modeled in Power BI. The software audit became the requirements for BrightBase.',
  privacyNote:
    'No client names or addresses. Published dollar totals are scaled for privacy; percentages and trends are exact.',
} as const;

export const kpis = [
  { value: '95.9%', label: 'Visits with a cleaner assigned (2025)' },
  { value: '62.9%', label: 'Clients who rebooked' },
  { value: '40', label: 'Towns served' },
  { value: '68', label: 'DAX measures across 4 models' },
] as const;

export type ChartId = 'crew' | 'mix' | 'tools';

type ChartRow = { key: string; value: number; display: string };

export type Chart = {
  id: ChartId;
  label: string;
  note: string;
  source: string;
  /**
   * How bar widths are scaled.
   * 'percent' — the values ARE percentages, so the track is a full 100%
   *   and 95.9% must read as 95.9% of the track, not as a full bar.
   * 'max' — counts, scaled against the chart's own largest row.
   */
  scale: 'percent' | 'max';
  rows: readonly ChartRow[];
};

export const charts: readonly Chart[] = [
  {
    id: 'crew',
    label: 'Crew coverage',
    note: 'Share of visits with a cleaner assigned, by year.',
    source: 'Cleaner Assigned % · 4,596 visits, 2023–2025',
    scale: 'percent',
    rows: [
      { key: '2023', value: 74.4, display: '74.4%' },
      { key: '2024', value: 88.9, display: '88.9%' },
      { key: '2025', value: 95.9, display: '95.9%' },
    ],
  },
  {
    id: 'mix',
    label: 'Visit mix',
    note: 'Completed visits by service line.',
    source: 'Visits by service · 4,916 visits, Feb 2023 – Oct 2026',
    scale: 'max',
    rows: [
      { key: 'Commercial', value: 2428, display: '2,428' },
      { key: 'Residential', value: 1349, display: '1,349' },
      { key: 'STR turnover', value: 956, display: '956' },
      { key: 'Other', value: 108, display: '108' },
      { key: 'Deep / move-out', value: 64, display: '64' },
    ],
  },
  {
    id: 'tools',
    label: 'Software audit',
    note: 'Service apps paid for before BrightBase, by spend (a floor).',
    source: 'Bank records, Mar 2025 – Jan 2026 · partial',
    scale: 'max',
    rows: [
      { key: 'Jobber', value: 1855, display: '' },
      { key: 'Bubble', value: 637, display: '' },
      { key: 'Housecall Pro', value: 431, display: '' },
      { key: 'OpenPhone', value: 270, display: '' },
      { key: 'Zappter', value: 150, display: '' },
      { key: 'Connecteam', value: 129, display: '' },
      { key: 'Airtable', value: 116, display: '' },
      { key: 'BookingKoala', value: 114, display: '' },
      { key: 'Noloco', value: 105, display: '' },
      { key: 'HighLevel', value: 97, display: '' },
      { key: 'HubSpot', value: 80, display: '' },
      { key: 'Zapier', value: 60, display: '' },
    ],
  },
];

/**
 * Bar width for one row.
 *
 * Percentage charts measure against a full 100% track so the bar length
 * matches the figure printed beside it. Count charts measure against the
 * chart's own largest row.
 */
export function barWidth(chart: Chart, row: ChartRow): string {
  const denominator =
    chart.scale === 'percent' ? 100 : Math.max(...chart.rows.map((r) => r.value));
  if (denominator <= 0) return '0%';
  const pct = Math.max(0, Math.min(100, (row.value / denominator) * 100));
  return `${pct}%`;
}

/**
 * A real measure, copied from the published model so anyone can check it:
 * github.com/msmall2691-eng/powerbi-portfolio @ 9b348ae
 *   Maine-Cleaning-Co-Operations/…/SemanticModel/definition/tables/
 *
 * Reformatted across lines for reading — TMDL stores each measure on one
 * line. The logic is unchanged.
 *
 * Earlier drafts of this page showed a "Rebook Rate" measure that does not
 * exist under that name in the model. Keep whatever is shown here copied
 * verbatim from a measure that is actually published.
 */
export const daxMeasure = {
  title: 'Top 10 Client Share measure',
  code: `Top 10 Client Share =
DIVIDE (
    SUMX (
        TOPN (
            10,
            VALUES ( Invoices[Client Key] ),
            [Revenue]
        ),
        [Revenue]
    ),
    [Revenue]
)`,
} as const;
