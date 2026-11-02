'use client';

import { useId, useState } from 'react';
import { Container, Eyebrow } from './ui';
import { profile } from '@/content/site';
import {
  resumeHeader,
  resumeCard,
  jobs,
  resumeProjects,
  education,
  contactRow,
} from '@/content/resume';

export function ResumeSection() {
  const [open, setOpen] = useState(false);
  const cardId = useId();

  return (
    <section
      id="resume"
      aria-labelledby="ct-h"
      className="section-anchor border-t border-rule-section bg-[linear-gradient(180deg,#2c3150_0%,#272b44_100%)]"
    >
      <Container id="contact" className="section-anchor flex flex-col gap-10 pt-22 pb-18">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-col gap-2.5">
            <Eyebrow>{resumeHeader.eyebrow}</Eyebrow>
            <h2
              id="ct-h"
              className="text-[clamp(30px,4vw,44px)] leading-[1.05] font-semibold tracking-[-0.03em]"
            >
              {resumeHeader.heading}
            </h2>
            <p className="text-[15.5px] text-neutral-300">{resumeHeader.line}</p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a
              href={profile.resumePath}
              download={profile.resumeFilename}
              className="rounded-[10px] bg-ink px-[18px] py-[11px] text-[14.5px] font-semibold text-ink-invert hover:bg-white"
            >
              Download PDF ↓
            </a>
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener"
              className="rounded-[10px] border border-rule-outline px-[18px] py-[11px] text-[14.5px] font-semibold text-ink hover:border-accent hover:text-white"
            >
              Open PDF ↗
            </a>
          </div>
        </div>

        {/* Collapsed to 620px with a bottom fade until expanded. */}
        <div
          className="relative overflow-hidden rounded-[18px] transition-[max-height] duration-300"
          style={{ maxHeight: open ? '4000px' : '620px' }}
        >
          <div
            id={cardId}
            className="flex flex-col gap-8 bg-paper p-[clamp(24px,5vw,56px)] text-paper-ink shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
          >
            <div className="flex flex-col gap-2 border-b border-paper-rule pb-6">
              <p className="text-[clamp(26px,3vw,34px)] font-bold tracking-[-0.02em]">
                {resumeCard.name}
              </p>
              <p className="text-[15px] font-medium text-paper-label">{resumeCard.title}</p>
              <p className="text-[13.5px] text-paper-muted">{resumeCard.contact}</p>
              <p className="max-w-[78ch] pt-2 text-[15px] leading-[1.65] text-neutral-800">
                {resumeCard.summary}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <p className="text-[11.5px] font-bold tracking-[0.14em] text-paper-soft">
                EXPERIENCE
              </p>
              {jobs.map((job) => (
                <div key={job.role} className="flex flex-wrap gap-x-8 gap-y-2">
                  <div className="flex flex-[1_1_220px] flex-col gap-0.5">
                    <span className="text-[15.5px] font-bold">{job.role}</span>
                    <span className="text-[13.5px] text-paper-muted">{job.org}</span>
                    <span className="font-mono-ui text-[12.5px] text-paper-soft">{job.when}</span>
                  </div>
                  <ul className="m-0 flex min-w-0 flex-[3_1_420px] list-disc flex-col gap-1.5 pl-[18px] text-[14.5px] leading-[1.55] text-neutral-800">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-7 border-t border-paper-rule pt-6">
              <div className="flex flex-col gap-3">
                <p className="text-[11.5px] font-bold tracking-[0.14em] text-paper-soft">
                  SELECTED PROJECTS
                </p>
                {resumeProjects.map((project) => (
                  <div key={project.title} className="flex flex-col gap-0.5">
                    <span className="text-[14.5px] font-bold">
                      {project.title}{' '}
                      <span className="font-normal text-paper-soft">· {project.sub}</span>
                    </span>
                    <span className="text-[14px] leading-[1.5] text-neutral-800">
                      {project.detail}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[11.5px] font-bold tracking-[0.14em] text-paper-soft">
                  EDUCATION AND TRAINING
                </p>
                {education.map((item) => (
                  <div key={item.title} className="flex flex-col gap-0.5">
                    <span className="text-[14.5px] font-bold">{item.title}</span>
                    <span className="text-[13.5px] text-paper-muted">{item.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!open ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[180px] bg-[linear-gradient(180deg,rgba(251,250,247,0)_0%,#fbfaf7_75%)]"
            />
          ) : null}
        </div>

        <div className="-mt-3 flex justify-center">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={cardId}
            onClick={() => setOpen((v) => !v)}
            className="cursor-pointer rounded-[10px] border border-rule-outline bg-surface-2 px-5 py-[11px] font-[inherit] text-[14.5px] font-semibold text-ink hover:border-accent"
          >
            {open ? 'Collapse résumé ↑' : 'Show full résumé ↓'}
          </button>
        </div>

        <div className="flex flex-col gap-1.5 pt-6">
          <p className="text-[18px] font-semibold">Get in touch</p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] border-t border-rule-inner">
            {contactRow.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
                className="flex flex-col gap-1 py-4 pr-5 text-ink hover:text-accent-300"
              >
                <span className="font-mono-ui text-[11.5px] tracking-[0.1em] text-neutral-500">
                  {item.label}
                </span>
                <span className="truncate text-[17px] font-medium">{item.value}</span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
