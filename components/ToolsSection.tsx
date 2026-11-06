import Link from 'next/link';
import { Container, Eyebrow } from './ui';
import { toolsSection, toolGroups, toolHref, buildsSection, smallBuilds } from '@/content/tools';

export function ToolsSection() {
  const { eyebrow, heading, intro, allHref, featured } = toolsSection;
  return (
    <section id="tools" aria-labelledby="tools-h" className="section-anchor border-t border-rule-section">
      <Container className="flex flex-col gap-9 py-20">
        <div className="flex max-w-[680px] flex-col gap-3.5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="tools-h" className="text-[clamp(28px,3.6vw,40px)] leading-[1.1] font-semibold tracking-[-0.025em] text-balance">
            {heading}
          </h2>
          <p className="text-[16px] leading-[1.6] text-neutral-300 text-pretty">{intro}</p>
        </div>

        <div className="flex flex-wrap gap-10">
          <figure className="flex min-w-0 flex-[1_1_420px] flex-col gap-3">
            <a
              href={toolHref('quote')}
              target="_blank"
              rel="noopener"
              className="block overflow-hidden rounded-card border border-rule-inner bg-white shadow-[0_24px_60px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.img} alt={featured.alt} width={1200} height={750} loading="lazy" className="block h-auto w-full" />
            </a>
            <figcaption className="text-[13.5px] text-neutral-400">{featured.caption}</figcaption>
          </figure>

          <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-6">
            {toolGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-2">
                <p className="font-mono-ui text-[11.5px] tracking-[0.12em] text-neutral-500 uppercase">{group.label}</p>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-2.5">
                  {group.tools.map((tool) => (
                    <a
                      key={tool.id}
                      href={toolHref(tool.id)}
                      target="_blank"
                      rel="noopener"
                      className="group flex flex-col gap-1 rounded-[12px] border border-rule-inner bg-card p-4 text-ink transition-colors hover:border-accent"
                    >
                      <span className="flex items-baseline justify-between gap-2 text-[15.5px] font-semibold">
                        {tool.title}
                        <span className="text-[13px] text-neutral-500 group-hover:text-accent-soft">↗</span>
                      </span>
                      <span className="text-[13.5px] leading-[1.45] text-neutral-400">{tool.blurb}</span>
                      <span className="pt-1 font-mono-ui text-[10.5px] tracking-[0.04em] text-cyan">{tool.tech}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <a href={allHref} target="_blank" rel="noopener" className="self-start border-b-2 border-accent pb-0.5 text-[14.5px] font-semibold text-accent-soft hover:text-white">
              Open all eight on mlinx.studio ↗
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function SmallBuilds() {
  const { eyebrow, heading, intro } = buildsSection;
  return (
    <section id="builds" aria-labelledby="builds-h" className="section-anchor border-t border-rule-section">
      <Container className="flex flex-col gap-9 py-20">
        <div className="flex max-w-[680px] flex-col gap-3.5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="builds-h" className="text-[clamp(28px,3.6vw,40px)] leading-[1.1] font-semibold tracking-[-0.025em] text-balance">
            {heading}
          </h2>
          <p className="text-[16px] leading-[1.6] text-neutral-300 text-pretty">{intro}</p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] gap-5">
          {smallBuilds.map((b) => (
            <article key={b.title} className="flex flex-col overflow-hidden rounded-card border border-rule-inner bg-card">
              {b.img ? (
                <div className="relative h-[180px] overflow-hidden border-b border-rule-inner bg-[#f6f1e9]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.img.src} alt={b.img.alt} loading="lazy" className="absolute inset-x-0 top-[-38%] mx-auto block w-[62%]" />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col gap-2.5 p-5">
                <span className="font-mono-ui text-[11px] tracking-[0.1em] text-cyan">{b.tag}</span>
                <h3 className="text-[19px] leading-[1.25] font-semibold">{b.title}</h3>
                <p className="text-[14.5px] leading-[1.55] text-neutral-300">{b.summary}</p>
                <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[13.5px] leading-[1.45] text-neutral-400 marker:text-neutral-600">
                  {b.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <p className="mt-auto pt-2 font-mono-ui text-[11px] tracking-[0.03em] text-neutral-500">{b.stack}</p>
                {b.link ? (
                  b.link.href.startsWith('/') ? (
                    <Link href={b.link.href} className="self-start text-[14px] font-semibold text-accent-soft hover:text-white">
                      {b.link.label}
                    </Link>
                  ) : (
                    <a href={b.link.href} className="self-start text-[14px] font-semibold text-accent-soft hover:text-white">
                      {b.link.label}
                    </a>
                  )
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
