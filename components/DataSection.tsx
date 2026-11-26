'use client';

import { useState } from 'react';
import { Container, Eyebrow, SmartLink, isReachable, sectionHeading } from './ui';
import {
  dataSection,
  kpis,
  charts,
  barWidth,
  daxMeasure,
  type ChartId,
} from '@/content/data';
import { links } from '@/content/site';
import { Drift } from './Drift';
import { dataDrift } from '@/content/drift';

type SectionLink = { href: string; label: string };

const sectionLinks: readonly SectionLink[] = [
  // Public: four .pbip projects, model and measures readable in Git.
  { href: links.powerbi, label: 'All four Power BI models ↗' },
  { href: links.powerbiUsm, label: 'USM academic progress ↗' },
  { href: links.powerbiStack, label: 'Software stack: build vs buy ↗' },
];

// Section heading size lives in ui.tsx as `sectionHeading`. See the note there.

export function DataSection() {
  const [active, setActive] = useState<ChartId>('segment');
  const chart = charts.find((c) => c.id === active) ?? charts[0]!;

  const visibleLinks = sectionLinks.filter((l) => isReachable(l.href));

  /**
   * Every chart currently prints a figure per row, so this is always true
   * today. It stays because `display` is a plain string and a chart author
   * can still leave it empty — the software-audit chart did, until its
   * unpublished dollar figures were replaced by tool counts. Without the
   * guard that author silently gets a 48px empty column on a 342px phone,
   * taken straight out of the bar.
   */
  const hasValues = chart.rows.some((r) => r.display !== '');

  return (
    <section
      id="data"
      aria-labelledby="data-h"
      className="section-anchor relative overflow-hidden"
    >
      {/* A DARK band: no background of its own, so `.page-glow` and this
          layer show through. See content/drift.ts. */}
      <Drift items={dataDrift} />
      <Container className="band-y relative z-10 flex flex-col gap-6 md:gap-9">
        <div className="flex max-w-[680px] flex-col gap-3">
          <Eyebrow>{dataSection.eyebrow}</Eyebrow>
          <h2 id="data-h" className={sectionHeading}>
            {dataSection.heading}
          </h2>
          <p className="text-[15px] leading-[1.6] text-neutral-300 text-pretty">
            {dataSection.intro}
          </p>
          {visibleLinks.length > 0 ? (
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 pt-0.5 text-[14px] font-semibold">
              {visibleLinks.map((link) => (
                <SmartLink
                  key={link.label}
                  href={link.href}
                  className="border-b-2 border-accent pb-0.5 text-accent-soft hover:text-accent-700"
                >
                  {link.label}
                </SmartLink>
              ))}
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] border-y border-rule-inner">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="flex flex-col gap-1 py-3 pr-4 md:py-3.5">
              <span className="text-[24px] font-semibold tracking-[-0.03em] md:text-[30px]">
                {kpi.value}
              </span>
              <span className="text-[13px] leading-[1.35] text-neutral-400">{kpi.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-7 md:gap-10">
          <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-4">
            {/*
              Plain buttons with aria-pressed, not role="tab". A tablist
              promises arrow-key navigation between tabs and a matching
              tabpanel; this has three filter buttons and one region, and
              claiming the richer pattern without implementing it is worse
              for a screen reader than not claiming it.
            */}
            <div
              role="group"
              aria-label="Choose a chart"
              className="flex gap-5 border-b border-rule-section"
            >
              {charts.map((c) => {
                const on = c.id === active;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(c.id)}
                    className={`-mb-px cursor-pointer border-0 border-b-2 bg-transparent pb-2.5 font-[inherit] text-[14px] font-semibold ${
                      on ? 'border-accent text-ink' : 'border-transparent text-neutral-400'
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            {/* min-h holds the height steady as the note changes with the chart */}
            <p
              aria-live="polite"
              className="min-h-10 text-[14px] leading-[1.5] text-neutral-300"
            >
              {chart.note}
            </p>

            <div className="flex flex-col gap-2.5">
              {chart.rows.map((row) => (
                <div
                  key={row.key}
                  className={`grid items-center gap-x-2.5 sm:gap-x-3.5 ${
                    hasValues
                      ? 'grid-cols-[104px_minmax(0,1fr)_48px] sm:grid-cols-[150px_minmax(0,1fr)_64px]'
                      : 'grid-cols-[104px_minmax(0,1fr)] sm:grid-cols-[150px_minmax(0,1fr)]'
                  }`}
                >
                  <span className="text-[13.5px] leading-[1.3] text-neutral-300 sm:text-[14px]">
                    {row.key}
                  </span>
                  <span className="h-[18px] overflow-hidden rounded-[3px] bg-surface sm:h-[22px]">
                    <span
                      className="block h-full rounded-[3px] bg-accent transition-[width] duration-300"
                      style={{ width: barWidth(chart, row) }}
                    />
                  </span>
                  {hasValues ? (
                    <span className="text-right font-mono-ui text-[12.5px] sm:text-[13px]">
                      {row.display}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            <p className="font-mono-ui text-[11.5px] leading-[1.4] text-neutral-500">
              {chart.source}
            </p>
          </div>

          <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-3">
            <p className="text-[14px] font-semibold">{daxMeasure.title}</p>
            {/*
              Capped and scrollable on a phone only. Twelve lines of DAX is
              297px of a screen that is 342px wide, and it already scrolls
              sideways there; letting it scroll both ways keeps the measure
              on the page instead of making it the page.
            */}
            <pre className="m-0 max-h-[160px] overflow-auto rounded-lg border border-rule-section bg-code p-4 font-mono-ui text-[12px] leading-[1.6] whitespace-pre text-[#e4e7f5] md:max-h-none md:p-5 md:text-[12.5px]">
              {daxMeasure.code}
            </pre>
            <p className="text-[13px] leading-[1.5] text-neutral-400">
              {dataSection.privacyNote}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
