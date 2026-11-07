import { Container, Eyebrow, BlockLabel, SmartLink, isReachable } from './ui';
import { BrightBaseMock } from './BrightBaseMock';
import { CaseExpand } from './CaseExpand';
import { CaseDetail } from './CaseDetail';
import {
  caseStudy,
  beforeAfter,
  glanceStats,
  reviews,
  steps,
  selectedWork,
  phoneShots,
  builds,
  clientSites,
} from '@/content/work';

export function Work() {
  return (
    <section id="work" aria-labelledby="work-h" className="section-anchor pt-6 pb-20">
      <Container className="flex flex-col gap-7">
        <Eyebrow>{caseStudy.eyebrow}</Eyebrow>

        <article className="flex flex-col overflow-hidden rounded-panel border border-rule-inner bg-card">
          <BrightBaseMock />

          <div className="flex flex-col gap-8 p-[clamp(24px,4vw,44px)]">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-8">
              <div className="flex flex-col gap-3.5">
                <h2
                  id="work-h"
                  className="text-[clamp(28px,3.4vw,40px)] leading-[1.1] font-semibold tracking-[-0.025em] text-balance"
                >
                  {caseStudy.heading}
                </h2>
                <p className="text-[17px] leading-[1.6] text-neutral-300 text-pretty">
                  {caseStudy.summary}
                </p>
                <p className="text-[13.5px] leading-[1.55] text-neutral-400">
                  {caseStudy.credit}
                </p>
                <p className="font-mono-ui text-[12px] text-neutral-500">{caseStudy.stack}</p>
              </div>

              <div className="flex flex-col gap-2.5">
                <BlockLabel>Before → after</BlockLabel>
                {beforeAfter.map((row) => (
                  <div
                    key={row.before}
                    className="grid grid-cols-[minmax(0,1fr)_20px_minmax(0,1fr)] items-center gap-2.5 rounded-xl bg-surface px-3.5 py-3 text-[14px] leading-[1.45]"
                  >
                    <span className="text-neutral-400">{row.before}</span>
                    <span aria-hidden="true" className="text-center text-cyan">
                      →
                    </span>
                    <span className="font-medium text-ink">{row.after}</span>
                  </div>
                ))}
              </div>
            </div>

            <CaseExpand>
              <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 rounded-[14px] bg-surface px-[22px] py-5">
              <BlockLabel>{glanceStats.label}</BlockLabel>
              <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-5">
                {glanceStats.items.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <dt className="order-2 text-[13px] text-neutral-400">{stat.label}</dt>
                    <dd className="m-0 text-[26px] font-semibold tracking-[-0.02em]">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-col gap-3.5">
              <BlockLabel>{reviews.label}</BlockLabel>
              {reviews.items.map((review) => (
                <figure
                  key={review.who}
                  className="m-0 flex flex-col gap-2 border-t border-rule-inner pt-4"
                >
                  <blockquote className="m-0 text-[15px] leading-[1.55] text-neutral-200 text-pretty">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <figcaption className="text-[12.5px] text-neutral-400">
                    {review.who} · <span className="text-cyan">{review.when}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3 p-0">
              {steps.map((step) => (
                <li
                  key={step.n}
                  className="flex flex-col gap-1.5 rounded-[14px] border border-rule-inner p-[18px]"
                >
                  <span className="font-mono-ui text-[12px] text-accent-400">{step.n}</span>
                  <span className="text-[16px] font-semibold">{step.title}</span>
                  <span className="text-[14px] leading-[1.5] text-neutral-400">
                    {step.description}
                  </span>
                </li>
              ))}
            </ol>

                <CaseDetail />
              </div>
            </CaseExpand>
          </div>
        </article>

        <SelectedWork />
        <ClientSites />
        <MoreBuilds />
      </Container>
    </section>
  );
}

function SelectedWork() {
  return (
    <div id="more" className="flex section-anchor flex-col gap-4 pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-[clamp(26px,3vw,36px)] font-semibold tracking-[-0.02em]">
          Selected work
        </h2>
        <span className="font-mono-ui text-[12px] text-neutral-500">
          {String(selectedWork.length).padStart(2, '0')} PROJECTS
        </span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-5">
        {selectedWork.map((project) => {
          const live = isReachable(project.href);
          return (
            <SmartLink
              key={project.title}
              href={project.href}
              className={`flex flex-col overflow-hidden rounded-panel border border-rule-inner bg-card text-ink transition-[transform,box-shadow] duration-300 ${
                live ? 'hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(0,0,0,0.4)]' : ''
              }`}
            >
              <div
                role="img"
                aria-label={project.alt}
                className="relative aspect-4/3 overflow-hidden border-b border-rule-inner"
                style={{ background: project.stage }}
              >
                {project.frame === 'browser' && project.img ? (
                  <div className="absolute top-[11%] right-[-4%] bottom-[-6%] left-[9%] flex flex-col overflow-hidden rounded-tl-xl border border-white/14 bg-[#0f1220] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                    <div className="flex items-center gap-1.5 bg-white/6 px-2.5 py-2">
                      <span className="size-[7px] rounded-full bg-white/30" />
                      <span className="size-[7px] rounded-full bg-white/30" />
                      <span className="size-[7px] rounded-full bg-white/30" />
                      <span className="ml-2 font-mono-ui text-[10px] text-white/55">
                        {project.url}
                      </span>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.img}
                      alt=""
                      loading="lazy"
                      className="block min-h-0 w-full flex-1 object-cover"
                      style={{ objectPosition: project.objectPosition }}
                    />
                  </div>
                ) : null}

                {project.frame === 'image' && project.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.img}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 block size-full object-cover"
                    style={{ objectPosition: project.objectPosition }}
                  />
                ) : null}

                {project.frame === 'phones' ? (
                  <div className="absolute inset-0 flex items-center justify-center gap-[4%] pt-[6%]">
                    {phoneShots.map((shot) => (
                      <div
                        key={shot.src}
                        className="aspect-9/19 w-[27%] rounded-[18px] bg-[#0a0c14] p-1 shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
                        style={{
                          transform: `translateY(${shot.lift}%) rotate(${shot.rotate}deg)`,
                          zIndex: shot.z,
                        }}
                      >
                        <div className="size-full overflow-hidden rounded-[14px] bg-white">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={shot.src}
                            alt=""
                            loading="lazy"
                            className="block size-full object-cover object-top"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-2 px-6 pt-[22px] pb-6">
                <span className="font-mono-ui text-[11px] tracking-[0.1em] text-cyan">
                  {project.tag}
                </span>
                <span className="text-[21px] font-semibold tracking-[-0.01em]">
                  {project.title}
                </span>
                <span className="text-[14.5px] leading-[1.55] text-neutral-400">
                  {project.description}
                </span>
                {live ? (
                  <span className="mt-1.5 self-start border-b-2 border-accent pb-0.5 text-[14px] font-semibold text-accent-soft">
                    View project ↗
                  </span>
                ) : null}
              </div>
            </SmartLink>
          );
        })}
      </div>
    </div>
  );
}

function ClientSites() {
  return (
    <div className="flex flex-col gap-3.5 pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-[20px] font-semibold">Client sites</h3>
        <span className="font-mono-ui text-[12px] text-neutral-500">LIVE · BUILT AND HOSTED BY ME</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-5">
        {clientSites.map((site) => (
          <a
            key={site.name}
            href={site.href}
            target="_blank"
            rel="noopener"
            className="group flex flex-col overflow-hidden rounded-card border border-rule-inner bg-card text-ink transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(0,0,0,0.4)] sm:flex-row"
          >
            <div className="relative aspect-16/10 shrink-0 overflow-hidden border-b border-rule-inner sm:aspect-auto sm:w-[46%] sm:border-r sm:border-b-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.img} alt={`${site.name} website`} loading="lazy" className="absolute inset-0 block size-full object-cover object-left-top" />
            </div>
            <div className="flex flex-col gap-1.5 p-5">
              <span className="font-mono-ui text-[11px] tracking-[0.1em] text-cyan">{site.tag}</span>
              <span className="text-[18px] font-semibold">{site.name}</span>
              <span className="text-[14px] leading-[1.5] text-neutral-400">{site.description}</span>
              <span className="mt-auto pt-2 text-[13.5px] font-semibold text-accent-soft group-hover:text-white">{site.url} ↗</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function MoreBuilds() {
  return (
    <div className="flex flex-col gap-3.5 pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-[20px] font-semibold">More builds</h3>
        <span className="font-mono-ui text-[12px] text-neutral-500">
          SMALLER TOOLS · AUTOMATIONS
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-x-10 border-t border-rule-inner">
        {builds.map((build) => (
          <SmartLink
            key={build.title}
            href={build.href}
            className={`grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 border-b border-rule-section py-4 text-ink ${
              isReachable(build.href) ? 'hover:text-accent-soft' : ''
            }`}
          >
            <span className="text-[16px] font-semibold">{build.title}</span>
            <span className="font-mono-ui text-[11.5px] text-cyan">{build.tag}</span>
            <span className="col-span-full text-[14px] leading-[1.5] text-neutral-400">
              {build.description}
            </span>
          </SmartLink>
        ))}
      </div>
    </div>
  );
}
