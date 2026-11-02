import {
  dashStats,
  weekBars,
  todayJobs,
  phoneStats,
  propertyChips,
  propertyRows,
  phoneTabs,
} from '@/content/mock';
import { caseStudy } from '@/content/work';

/**
 * The composed product shot at the top of the case study: the office
 * dashboard beside the cleaner's phone app.
 *
 * Decorative as a whole — it carries one role="img" with a description,
 * so a screen reader gets the summary instead of every sample figure.
 * Every number inside is invented; the "sample data" badge says so.
 */
export function BrightBaseMock() {
  return (
    <div
      role="img"
      aria-label={caseStudy.mockAlt}
      className="relative overflow-hidden border-b border-rule-inner bg-[radial-gradient(900px_700px_at_105%_40%,#34467a_0%,#2e3d66_45%,transparent_46%),linear-gradient(160deg,#2a2f4c,#232842)] p-[clamp(20px,4vw,44px)]"
    >
      <div className="flex flex-wrap items-stretch justify-center gap-6">
        <OfficeDashboard />
        <CleanerPhone />
      </div>
    </div>
  );
}

function OfficeDashboard() {
  return (
    <div className="flex min-w-0 max-w-[720px] flex-[1_1_460px] flex-col gap-3">
      <div className="flex flex-1 flex-col overflow-hidden rounded-[14px] bg-mock-bg text-paper-ink shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
        {/* Window chrome */}
        <div className="flex gap-1.5 bg-mock-chrome px-3 py-2.5">
          <span className="size-[9px] rounded-full bg-[#ff5f57]" />
          <span className="size-[9px] rounded-full bg-[#febc2e]" />
          <span className="size-[9px] rounded-full bg-[#28c840]" />
        </div>

        <div className="flex flex-1 flex-col gap-3.5 px-5 pt-4 pb-5">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span className="text-[15px] font-semibold">Owner Dashboard</span>
            <span className="text-[12px] text-mock-muted">Trailing 90 days</span>
            <span className="ml-auto rounded-full bg-mock-chrome px-2 py-0.5 text-[10.5px] font-semibold text-paper-muted">
              sample data
            </span>
          </div>

          <div className="flex gap-4 border-b border-mock-rule text-[12.5px] text-mock-muted">
            <span className="pb-2">Home</span>
            <span className="pb-2">Schedule</span>
            <span className="border-b-2 border-paper-ink pb-2 font-semibold text-paper-ink">
              Owner
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {dashStats.map((stat) => (
              <div
                key={stat.key}
                className="flex min-w-0 flex-col gap-1 rounded-[10px] border border-mock-rule bg-white p-3"
              >
                <span className="text-[10px] font-semibold tracking-[0.06em] text-mock-muted">
                  {stat.key}
                </span>
                <span className="text-[20px] font-semibold tracking-[-0.01em]">
                  {stat.value}
                </span>
                <span className="text-[11px] text-mock-muted">{stat.sub}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 rounded-[10px] border border-mock-rule bg-white px-3.5 py-3">
            <span className="text-[12px] font-semibold">Visits this week</span>
            <div className="flex items-end gap-2">
              {weekBars.map((bar) => (
                <div key={bar.day} className="flex flex-1 flex-col items-center gap-1">
                  {/* Fixed-height track so each bar's percentage resolves
                      against the same baseline instead of being squashed
                      by the label sharing the flex column. */}
                  <div className="flex h-[72px] w-full items-end">
                    <span
                      className="w-full shrink-0 rounded-t"
                      style={{
                        height: `${bar.height}%`,
                        background: 'highlight' in bar && bar.highlight ? '#2f6bff' : '#c9d4f2',
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-mock-muted">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-1 rounded-[10px] border border-mock-rule bg-white px-3.5 py-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[12px] font-semibold">Today&apos;s jobs</span>
              <span className="text-[11px] text-mock-muted">Sat · 4 visits · 3 crews</span>
            </div>
            {todayJobs.map((job) => (
              <div
                key={job.time}
                className="grid grid-cols-[54px_minmax(0,1fr)_auto] items-center gap-2.5 border-t border-[#f0f0f4] py-[9px] text-[12px]"
              >
                <span className="font-mono-ui text-[11px] text-mock-muted">{job.time}</span>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate font-semibold">{job.place}</span>
                  <span className="text-[11px] text-mock-muted">{job.crew}</span>
                </span>
                <span
                  className="rounded-full px-2 py-[3px] text-[10.5px] font-semibold"
                  style={{ background: job.bg, color: job.fg }}
                >
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <span className="self-start rounded-full border border-[#2c3550] bg-white/6 px-3.5 py-[7px] text-[11.5px] font-semibold tracking-[0.08em] text-[#cfd3e5]">
        OFFICE WORKSPACE
      </span>
    </div>
  );
}

function CleanerPhone() {
  return (
    <div className="flex w-[min(100%,300px)] flex-[0_0_auto] flex-col items-center gap-3">
      <div className="w-full rounded-[34px] bg-[#0a0c14] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.55),0_0_0_1px_#2c3550]">
        <div className="flex flex-col overflow-hidden rounded-[27px] bg-[#f4f5f8] text-paper-ink">
          <div className="flex justify-between px-5 pt-2.5 pb-1 text-[11px] font-semibold">
            <span>9:41</span>
            <span>5G ▪▪▪</span>
          </div>

          <div className="flex flex-col gap-2.5 px-3.5 pt-2 pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="text-[16px] font-bold">Good morning, Alex</span>
                <span className="text-[11.5px] text-mock-muted">1 job today · leave by 9:20</span>
              </div>
              <span className="text-right text-[12px] leading-[1.3] font-semibold text-mock-slate">
                53°
                <br />
                <span className="text-[10.5px] font-normal text-mock-muted">rain 2pm</span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {phoneStats.map((stat) => (
                <div
                  key={stat.key}
                  className="flex flex-col gap-px rounded-[10px] border border-mock-rule bg-white p-2"
                >
                  <span className="text-[14px] font-bold">{stat.value}</span>
                  <span className="text-[10px] text-mock-muted">{stat.key}</span>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-[14px] border border-mock-rule bg-white">
              <div className="relative h-[132px] bg-[#dfe9f3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/house.webp"
                  alt=""
                  className="absolute inset-0 block size-full object-cover object-[center_40%]"
                />
                <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-[3px] text-[10px] font-bold text-[#0e7490]">
                  ● Turnover
                </span>
                <span className="absolute top-2 right-2 rounded-full bg-white/90 px-2 py-[3px] text-[10px] font-semibold text-mock-slate">
                  Sat 10:00–2:00
                </span>
              </div>

              <div className="flex flex-col gap-2 px-3 pt-2.5 pb-3">
                <div className="flex flex-col gap-px">
                  <span className="text-[14px] font-bold">Harbor Cottage</span>
                  <span className="text-[11px] text-mock-muted">
                    Wells, ME · Vacation rental · Guest out 10:00
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {propertyChips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-md bg-[#f0f1f5] px-[7px] py-[3px] text-[10px] font-semibold text-mock-slate"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-[5px]">
                  {propertyRows.map((row) => (
                    <div
                      key={row.key}
                      className="grid grid-cols-[62px_minmax(0,1fr)] gap-1.5 text-[10.5px] leading-[1.35]"
                    >
                      <span className="text-mock-muted">{row.key}</span>
                      <span className="font-medium text-paper-ink">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10.5px]">
                    <span className="font-semibold">Checklist</span>
                    <span className="text-mock-muted">0 of 14</span>
                  </div>
                  <span className="h-[5px] rounded-full bg-mock-rule" />
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <span className="rounded-[9px] bg-paper-ink p-2 text-center text-[11.5px] font-semibold text-white">
                    Start job
                  </span>
                  <span className="rounded-[9px] border border-[#d6d8e0] p-2 text-center text-[11.5px] font-semibold">
                    Directions
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 border-t border-mock-rule bg-white px-1.5 pt-2 pb-3">
            {phoneTabs.map((tab) => (
              <span
                key={tab.label}
                className="text-center text-[10px]"
                style={{
                  fontWeight: tab.active ? 700 : 500,
                  color: tab.active ? '#2f6bff' : '#6b6f7d',
                }}
              >
                {tab.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <span className="rounded-full bg-mock-blue px-3.5 py-[7px] text-[11.5px] font-semibold tracking-[0.08em] text-white">
        CLEANER WORKSPACE
      </span>
    </div>
  );
}
