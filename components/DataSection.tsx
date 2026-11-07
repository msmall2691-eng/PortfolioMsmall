'use client';

import { useState } from 'react';
import { Container, Eyebrow, SmartLink, isReachable } from './ui';
import {
  dataSection,
  kpis,
  charts,
  barWidth,
  daxMeasure,
  type ChartId,
} from '@/content/data';
import { links } from '@/content/site';

type SectionLink = { href: string; label: string };

const sectionLinks: readonly SectionLink[] = [
  // Public: four .pbip projects, model and measures readable in Git.
  { href: links.powerbi, label: 'All four Power BI models ↗' },
  { href: links.powerbiUsm, label: 'USM academic progress ↗' },
  { href: links.powerbiStack, label: 'Software stack: build vs buy ↗' },
];

export function DataSection() {
  const [active, setActive] = useState<ChartId>('crew');
  const chart = charts.find((c) => c.id === active) ?? charts[0]!;

  const visibleLinks = sectionLinks.filter((l) => isReachable(l.href));

  return (
    <section
      id="data"
      aria-labelledby="data-h"
      className="section-anchor border-t border-rule-section"
    >
      <Container className="flex flex-col gap-9 py-20">
        <div className="flex max-w-[680px] flex-col gap-3.5">
          <Eyebrow>{dataSection.eyebrow}</Eyebrow>
          <h2
            id="data-h"
            className="text-[clamp(28px,3.6vw,40px)] leading-[1.1] font-semibold tracking-[-0.025em] text-balance"
          >
            {dataSection.heading}
          </h2>
          <p className="text-[16px] leading-[1.6] text-neutral-300 text-pretty">
            {dataSection.intro}
          </p>
          {visibleLinks.length > 0 ? (
            <div className="flex flex-wrap gap-[22px] pt-1 text-[14.5px] font-semibold">
              {visibleLinks.map((link) => (
                <SmartLink
                  key={link.label}
                  href={link.href}
                  className="border-b-2 border-accent pb-0.5 text-accent-soft hover:text-white"
                >
                  {link.label}
                </SmartLink>
              ))}
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] border-y border-rule-inner">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="flex flex-col gap-1.5 py-[22px] pr-5">
              <span className="text-[34px] font-semibold tracking-[-0.03em]">{kpi.value}</span>
              <span className="text-[13.5px] text-neutral-400">{kpi.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-14">
          <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-[22px]">
            <div
              role="tablist"
              aria-label="Operations chart"
              className="flex gap-6 border-b border-rule-section"
            >
              {charts.map((c) => {
                const on = c.id === active;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(c.id)}
                    className={`-mb-px cursor-pointer border-0 border-b-2 bg-transparent pb-3 font-[inherit] text-[14.5px] font-semibold ${
                      on ? 'border-accent text-ink' : 'border-transparent text-neutral-400'
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            <p className="min-h-11 text-[14.5px] leading-[1.55] text-neutral-300">
              {chart.note}
            </p>

            <div className="flex flex-col gap-3.5">
              {chart.rows.map((row) => (
                <div
                  key={row.key}
                  className="grid grid-cols-[150px_minmax(0,1fr)_64px] items-center gap-3.5"
                >
                  <span className="text-[14px] text-neutral-300">{row.key}</span>
                  <span className="h-[22px] overflow-hidden rounded-[3px] bg-surface">
                    <span
                      className="block h-full rounded-[3px] bg-accent transition-[width] duration-300"
                      style={{ width: barWidth(chart, row) }}
                    />
                  </span>
                  <span className="text-right font-mono-ui text-[13px]">{row.display}</span>
                </div>
              ))}
            </div>

            <p className="font-mono-ui text-[11.5px] text-neutral-500">{chart.source}</p>
          </div>

          <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-4">
            <p className="text-[14.5px] font-semibold">{daxMeasure.title}</p>
            <pre className="m-0 overflow-x-auto rounded-lg border border-rule-section bg-code p-5 font-mono-ui text-[12.5px] leading-[1.7] whitespace-pre text-neutral-200">
              {daxMeasure.code}
            </pre>
            <p className="text-[13.5px] leading-[1.55] text-neutral-400">
              {dataSection.privacyNote}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
