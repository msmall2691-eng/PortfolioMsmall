/**
 * Data section: KPIs, the three tabbed charts and the DAX sample.
 *
 * EVERY FIGURE HERE IS A COUNT FROM THE PUBLISHED MODELS, and that is the
 * whole point of the file.
 *
 * It did not start that way. The first version of this page showed visit
 * counts — a "visit mix" of 4,916 across five service lines, a "crew
 * coverage" trend citing a `Cleaner Assigned %` measure over 4,596 visits,
 * and "40 towns served". None of it is in the portfolio the page links to.
 * The four published models hold no visits table, no service line, no town,
 * and no measure by that name; the operations model counts INVOICES. So a
 * reader who followed "All four Power BI models ↗" to check a number found
 * a different subject entirely. The figures were presumably true of the
 * Jobber visit exports they came from, but those are not published, and a
 * citation nobody can follow is not a citation.
 *
 * This is the second time that trap has been sprung in this file. See the
 * note above `daxMeasure` about a "Rebook Rate" measure that never existed.
 *
 * What is here now is derived from the .pbip at
 *   github.com/msmall2691-eng/powerbi-portfolio @ 9b348ae
 * whose table partitions embed their own data inline (Base64 + Deflate CSV),
 * so anyone can decompress them and get these numbers back:
 *
 *   Operations / Invoices : 3,113 rows, 2023-03-11 .. 2026-10-22
 *   Operations / Clients  : 188 rows
 *   Software Stack / Tools: 31 rows
 *
 * Each chart below sums to its table's row count exactly — 3,113, 3,113 and
 * 31. If a future edit breaks that, the chart has stopped describing the
 * model. Check it before shipping.
 */

export const dataSection = {
  eyebrow: 'DATA MODELING · POWER BI · DAX',
  heading: 'Data & analytics',
  intro:
    'Three and a half years of invoices and client records from my cleaning company, cleaned, anonymized and modeled in Power BI. The software audit beside them became the requirements for BrightBase.',
  privacyNote:
    'No client names or addresses — every client is a key in the model. Each figure on this page is a row count from the published .pbip, so it can be checked against the repository.',
} as const;

export const kpis = [
  { value: '3,113', label: 'Invoices modeled · 2023–2026' },
  { value: '62.8%', label: 'Clients who came back' },
  { value: '31', label: 'Software tools audited' },
  { value: '68', label: 'DAX measures across 4 models' },
] as const;

export type ChartId = 'segment' | 'ticket' | 'tools';

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
   *
   * No chart uses 'percent' today. The branch stays because the bug it
   * prevents is one this page already shipped once: a percentage scaled
   * against the largest row renders 95.9% as a full bar and silently
   * overstates it.
   */
  scale: 'percent' | 'max';
  rows: readonly ChartRow[];
};

export const charts: readonly Chart[] = [
  {
    id: 'segment',
    label: 'Client mix',
    note: 'Invoices by client segment. Nine commercial clients account for 682 of them.',
    source: 'Invoices × Clients[Segment] · 3,113 invoices, Mar 2023 – Oct 2026',
    scale: 'max',
    rows: [
      { key: 'Residential', value: 1524, display: '1,524' },
      { key: 'Short-term rental', value: 907, display: '907' },
      { key: 'Commercial', value: 682, display: '682' },
    ],
  },
  {
    id: 'ticket',
    label: 'Ticket size',
    note: 'Invoices by ticket band — the small-job tail is what made billing worth automating.',
    source: 'Invoices[Ticket Size] · 3,113 invoices, Mar 2023 – Oct 2026',
    scale: 'max',
    rows: [
      { key: 'Under $150', value: 1974, display: '1,974' },
      { key: '$150–249', value: 499, display: '499' },
      { key: '$250–399', value: 380, display: '380' },
      { key: '$400–999', value: 247, display: '247' },
      { key: '$1,000+', value: 13, display: '13' },
    ],
  },
  {
    id: 'tools',
    label: 'Software audit',
    note: 'Every tool the business runs on or has dropped. Three were retired by something I built.',
    source: 'Tools[Status] · 31 tools, Software Stack model',
    scale: 'max',
    rows: [
      { key: 'In use', value: 19, display: '19' },
      { key: 'Setting up', value: 1, display: '1' },
      { key: 'Being replaced', value: 1, display: '1' },
      { key: 'Planned', value: 3, display: '3' },
      { key: 'Retired', value: 3, display: '3' },
      { key: 'Previously used', value: 3, display: '3' },
      { key: 'Not adopted', value: 1, display: '1' },
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
