import Link from "next/link";
import { Container, Eyebrow } from "./ui";
import {
  toolsSection,
  tools,
  toolHref,
  buildsSection,
  smallBuilds,
} from "@/content/tools";

function SectionHead({
  id,
  eyebrow,
  heading,
  intro,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  intro?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className="text-[clamp(26px,3.2vw,36px)] leading-[1.1] font-semibold tracking-[-0.025em]"
      >
        {heading}
      </h2>
      {intro ? <p className="text-[16px] text-neutral-400">{intro}</p> : null}
    </div>
  );
}

export function ToolsSection() {
  const { eyebrow, heading, intro, allHref } = toolsSection;
  return (
    <section
      id="tools"
      aria-labelledby="tools-h"
      className="section-anchor border-t border-rule-section"
    >
      <Container className="flex flex-col gap-8 py-20">
        <SectionHead
          id="tools-h"
          eyebrow={eyebrow}
          heading={heading}
          intro={intro}
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {tools.map((tool) => (
            <a
              key={tool.id}
              href={toolHref(tool.id)}
              target="_blank"
              rel="noopener"
              className="group flex flex-col gap-1 rounded-[12px] border border-rule-inner bg-card px-4 py-3.5 text-ink transition-colors hover:border-accent"
            >
              <span className="flex items-baseline justify-between gap-2 text-[15px] font-semibold">
                {tool.title}
                <span className="text-[12px] text-neutral-500 group-hover:text-accent-soft">
                  ↗
                </span>
              </span>
              <span className="text-[13.5px] text-neutral-400">
                {tool.blurb}
              </span>
            </a>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link
            href={toolsSection.caseStudy}
            className="inline-flex min-h-11 items-center text-[14.5px] font-semibold text-accent-soft hover:text-white"
          >
            Case study →
          </Link>
          <a
            href={allHref}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center text-[14.5px] font-semibold text-accent-soft hover:text-white"
          >
            Open the tools on mlinx.studio ↗
          </a>
        </div>
      </Container>
    </section>
  );
}

export function SmallBuilds() {
  const { heading } = buildsSection;
  return (
    <div className="flex flex-col gap-3 pt-6">
      <h3 className="text-[20px] font-semibold">{heading}</h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
        {smallBuilds.map((b) => (
          <article
            key={b.title}
            className="flex flex-col gap-2 rounded-card border border-rule-inner bg-card p-5"
          >
            <h4 className="text-[16.5px] font-semibold">{b.title}</h4>
            <p className="text-[14.5px] leading-[1.55] text-neutral-400">
              {b.summary}
            </p>
            <div className="mt-auto flex items-center justify-between gap-3 pt-2">
              <span className="font-mono-ui text-[11px] text-cyan">
                {b.stack}
              </span>
              {b.link ? (
                <Link
                  href={b.link.href}
                  className="inline-flex min-h-8 items-center text-[13.5px] font-semibold text-accent-soft hover:text-white"
                >
                  {b.link.label}
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
