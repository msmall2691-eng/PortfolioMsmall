import { Container, Eyebrow, SmartLink, isReachable } from "./ui";
import { BrightBaseMock } from "./BrightBaseMock";
import Link from "next/link";
import { SmallBuilds } from "./ToolsSection";
import {
  caseStudy,
  selectedWork,
  type SelectedWork as SelectedWorkItem,
  phoneShots,
  clientSites,
} from "@/content/work";

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-h"
      className="section-anchor pt-6 pb-20"
    >
      <Container className="flex flex-col gap-7">
        <div className="flex max-w-[62ch] flex-col gap-3">
          <Eyebrow>{caseStudy.eyebrow}</Eyebrow>
          <h2
            id="work-h"
            className="text-[clamp(28px,3.4vw,40px)] leading-[1.1] font-semibold tracking-[-0.025em] text-balance"
          >
            {caseStudy.heading}
          </h2>
          <p className="text-[17px] leading-[1.6] text-neutral-300 text-pretty">
            {caseStudy.summary}
          </p>
        </div>

        <article className="flex flex-col overflow-hidden rounded-panel border border-rule-inner bg-card">
          <BrightBaseMock />

          <div className="flex flex-wrap items-center justify-between gap-6 p-[clamp(20px,3vw,32px)]">
            <div className="flex flex-col gap-3.5">
              <Link
                href={caseStudy.href}
                className="mt-1 self-start rounded-[10px] bg-ink px-4 py-[10px] text-[14.5px] font-semibold text-ink-invert hover:bg-accent hover:text-ink-invert"
              >
                Read the BrightBase case study →
              </Link>
            </div>

            <dl className="m-0 grid grid-cols-3 gap-6">
              {caseStudy.facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-1">
                  <dt className="order-2 text-[13px] leading-[1.4] text-neutral-400">
                    {f.label}
                  </dt>
                  <dd className="m-0 text-[24px] font-semibold tracking-[-0.02em]">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </article>

        <nav aria-label="Kinds of work" className="flex flex-wrap gap-2 pt-6">
          {[
            { href: "#systems", label: "Systems & apps" },
            { href: "#websites", label: "Websites" },
            { href: "#tools", label: "Free tools" },
            { href: "#data", label: "Data & analytics" },
          ].map((chip) => (
            <a
              key={chip.href}
              href={chip.href}
              className="inline-flex min-h-11 items-center rounded-full border border-rule-inner bg-card px-4 text-[14.5px] font-medium text-ink hover:border-accent hover:text-accent-700"
            >
              {chip.label}
            </a>
          ))}
        </nav>

        <ProjectGroup
          id="systems"
          title="Systems & apps"
          intro="Software that runs real operations."
          items={selectedWork.filter((p) => p.group === "systems")}
        >
          <SmallBuilds />
        </ProjectGroup>

        <ProjectGroup
          id="websites"
          title="Websites"
          intro="Sites for my own businesses and for clients."
          items={selectedWork.filter((p) => p.group === "websites")}
        >
          <ClientSites />
        </ProjectGroup>
      </Container>
    </section>
  );
}

function ProjectGroup({
  id,
  title,
  intro,
  items,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  items: readonly SelectedWorkItem[];
  children?: React.ReactNode;
}) {
  return (
    <div id={id} className="flex section-anchor flex-col gap-4 pt-12">
      <div className="flex flex-col gap-1">
        <h2 className="text-[clamp(26px,3vw,36px)] font-semibold tracking-[-0.02em]">
          {title}
        </h2>
        <p className="text-[15.5px] text-neutral-400">{intro}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {items.map((project, i) => {
          const live = isReachable(project.href);
          const spanLast = i === items.length - 1 && items.length % 2 === 1;
          return (
            <SmartLink
              key={project.title}
              href={project.href}
              className={`flex flex-col overflow-hidden rounded-panel border border-rule-inner bg-card text-ink transition-[transform,box-shadow] duration-300 ${spanLast ? "md:col-span-2 md:flex-row" : ""} ${
                live
                  ? "hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(28,30,50,0.10)]"
                  : ""
              }`}
            >
              <div
                role="img"
                aria-label={project.alt}
                className={`relative aspect-4/3 overflow-hidden border-b border-rule-inner ${spanLast ? "md:w-1/2 md:shrink-0 md:border-r md:border-b-0" : ""}`}
                style={{ background: project.stage }}
              >
                {project.frame === "browser" && project.img ? (
                  <div className="absolute top-[11%] right-[-4%] bottom-[-6%] left-[9%] flex flex-col overflow-hidden rounded-tl-xl border border-[#d9d6ce] bg-white shadow-[0_20px_44px_rgba(28,30,50,0.14)]">
                    <div className="flex items-center gap-1.5 border-b border-[#e7e4dc] bg-[#f4f2ec] px-2.5 py-2">
                      <span className="size-[7px] rounded-full bg-[#cfcbc1]" />
                      <span className="size-[7px] rounded-full bg-[#cfcbc1]" />
                      <span className="size-[7px] rounded-full bg-[#cfcbc1]" />
                      <span className="ml-2 font-mono-ui text-[10px] text-[#7a7d88]">
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

                {project.frame === "image" && project.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.img}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 block size-full object-cover"
                    style={{ objectPosition: project.objectPosition }}
                  />
                ) : null}

                {project.frame === "phones" ? (
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

              <div
                className={`flex flex-col gap-2 px-6 pt-[22px] pb-6 ${spanLast ? "md:justify-center md:px-10" : ""}`}
              >
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
                    Case study →
                  </span>
                ) : null}
              </div>
            </SmartLink>
          );
        })}
      </div>
      {children}
    </div>
  );
}

function ClientSites() {
  return (
    <div className="flex flex-col gap-3.5 pt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-[20px] font-semibold">Client sites</h3>
        <span className="font-mono-ui text-[12px] text-neutral-500">
          LIVE · BUILT AND HOSTED BY ME
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-5">
        {clientSites.map((site) => (
          <a
            key={site.name}
            href={site.href}
            target="_blank"
            rel="noopener"
            className="group flex flex-col overflow-hidden rounded-card border border-rule-inner bg-card text-ink transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(28,30,50,0.10)] sm:flex-row"
          >
            <div className="relative aspect-16/10 shrink-0 overflow-hidden border-b border-rule-inner sm:aspect-auto sm:w-[46%] sm:border-r sm:border-b-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.img}
                alt={`${site.name} website`}
                loading="lazy"
                className="absolute inset-0 block size-full object-cover object-left-top"
              />
            </div>
            <div className="flex flex-col gap-1.5 p-5">
              <span className="font-mono-ui text-[11px] tracking-[0.1em] text-cyan">
                {site.tag}
              </span>
              <span className="text-[18px] font-semibold">{site.name}</span>
              <span className="text-[14px] leading-[1.5] text-neutral-400">
                {site.description}
              </span>
              <span className="mt-auto pt-2 text-[13.5px] font-semibold text-accent-soft group-hover:text-accent-700">
                {site.url} ↗
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
