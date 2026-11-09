import Link from "next/link";
import { Container } from "./ui";
import { profile, links } from "@/content/site";
import { intro, projects, moreWork, github, aboutShort } from "@/content/home";

const label = "font-mono-ui text-[11px] tracking-[0.12em] text-neutral-500";
const h2 = "text-[22px] font-semibold tracking-[-0.015em]";
const linkCls = "font-medium text-accent-soft hover:text-accent-700";

function Go({ href, children }: { href: string; children: React.ReactNode }) {
  return href.startsWith("/") ? (
    <Link href={href} className={linkCls}>
      {children}
    </Link>
  ) : (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className={linkCls}>
      {children}
    </a>
  );
}

export function Intro() {
  return (
    <section className="pt-[clamp(36px,5vw,64px)] pb-12">
      <Container className="grid gap-7 md:gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start">
        <div className="flex flex-col gap-4">
          <h1 className="text-[clamp(32px,3.6vw,42px)] leading-[1.1] font-semibold tracking-[-0.025em]">
            {intro.name}
          </h1>
          <p className="text-[17px] font-medium text-accent">{intro.role}</p>
          <p className="max-w-[48ch] text-[16px] leading-[1.6] text-neutral-300 text-pretty">
            {intro.line}
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <a
              href={profile.resumePath}
              download={profile.resumeFilename}
              className="rounded-[9px] bg-ink px-4 py-2.5 text-[14px] font-semibold text-ink-invert hover:bg-accent"
            >
              Résumé (PDF) ↓
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-[9px] border border-rule-outline px-4 py-2.5 text-[14px] font-semibold text-ink hover:border-accent hover:text-accent-700"
            >
              Email me
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener"
              className="rounded-[9px] border border-rule-outline px-4 py-2.5 text-[14px] font-semibold text-ink hover:border-accent hover:text-accent-700"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className={label}>EXPERIENCE</h2>
          <ol className="m-0 flex list-none flex-col p-0">
            {intro.experience.map((e) => (
              <li
                key={e.what}
                className="grid grid-cols-[96px_minmax(0,1fr)] gap-3 border-t border-rule-inner py-3 first:border-t-0 first:pt-0"
              >
                <span className="pt-0.5 font-mono-ui text-[12px] text-neutral-400">{e.when}</span>
                <span className="flex flex-col">
                  <span className="text-[15px] font-semibold leading-[1.35]">{e.what}</span>
                  <span className="text-[13.5px] text-neutral-400">{e.where}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/**
 * The first four projects carry a screenshot; the rest are text rows.
 *
 * Six image cards stacked on a phone put 2,350px between the hero and
 * anything else — the screenshots are the proof, but only for the work
 * worth leading with. The rest keep their case-study pages and read as
 * a list, which is also what gives the section a top four at all.
 */
const FEATURED_COUNT = 4;

export function Projects() {
  const featured = projects.slice(0, FEATURED_COUNT);
  const rest = projects.slice(FEATURED_COUNT);
  return (
    <section id="work" aria-labelledby="work-h" className="section-anchor border-t border-rule-section">
      <Container className="flex flex-col gap-5 py-9 md:gap-6 md:py-12">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="work-h" className={h2}>Projects</h2>
          <p className="text-[14px] text-neutral-400">Each one links to a short case study.</p>
        </div>
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
          {featured.map((p) => (
            <li key={p.title} className="group relative flex flex-col overflow-hidden rounded-card border border-rule-inner bg-card transition-transform duration-150 hover:-translate-y-0.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                alt={p.alt}
                loading="lazy"
                className="block aspect-[16/9] w-full border-b border-rule-inner object-cover"
                style={{ objectPosition: p.position ?? "center" }}
              />
              <div className="flex flex-1 flex-col gap-1.5 p-4">
                <span className="font-mono-ui text-[11px] tracking-[0.08em] text-neutral-500 uppercase">{p.tag}</span>
                <h3 className="text-[17px] font-semibold">
                  <Link href={p.href} className="text-ink after:absolute after:inset-0 hover:text-accent-700">
                    {p.title}
                  </Link>
                </h3>
                <p className="text-[14.5px] leading-[1.5] text-neutral-300">{p.line}</p>
                <p className="relative z-10 mt-auto flex gap-4 pt-1 text-[14px]">
                  <span className="text-accent-soft">Case study →</span>
                  {p.extra ? <Go href={p.extra.href}>{p.extra.label} ↗</Go> : null}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {rest.length ? (
          <ul className="m-0 flex list-none flex-col p-0">
            {rest.map((p) => (
              <li key={p.title} className="group relative flex flex-col gap-1 border-t border-rule-inner py-3.5">
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <h3 className="text-[15.5px] font-semibold">
                    <Link href={p.href} className="text-ink after:absolute after:inset-0 hover:text-accent-700">
                      {p.title}
                    </Link>
                  </h3>
                  <span className="font-mono-ui text-[11px] tracking-[0.08em] text-neutral-500 uppercase">{p.tag}</span>
                </span>
                <span className="text-[14px] leading-[1.5] text-neutral-400">{p.line}</span>
                <span className="relative z-10 flex gap-4 pt-0.5 text-[14px]">
                  <span className="text-accent-soft">Case study →</span>
                  {p.extra ? <Go href={p.extra.href}>{p.extra.label} ↗</Go> : null}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  );
}

export function MoreWork() {
  return (
    <section id="more" aria-labelledby="more-h" className="section-anchor border-t border-rule-section">
      <Container className="grid gap-7 py-9 md:gap-10 md:py-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3">
          <h2 id="more-h" className={h2}>More work</h2>
          <ul className="m-0 flex list-none flex-col p-0">
            {moreWork.map((row) => (
              <li key={row.title} className="flex flex-col gap-1 border-t border-rule-inner py-3.5 first:border-t-0">
                <span className="text-[15.5px] font-semibold">{row.title}</span>
                <span className="text-[14px] leading-[1.5] text-neutral-400">{row.line}</span>
                {row.thumbs ? (
                  <span className="grid max-w-[420px] grid-cols-2 gap-2.5 pt-1.5">
                    {row.thumbs.map((t) => (
                      <a key={t.src} href={t.href} target="_blank" rel="noopener" className="block overflow-hidden rounded-[8px] border border-rule-inner">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t.src} alt={t.alt} loading="lazy" width={1280} height={720} className="block aspect-[16/9] w-full object-cover object-top" />
                      </a>
                    ))}
                  </span>
                ) : null}
                {row.links.length ? (
                  <span className="flex flex-wrap gap-x-4 gap-y-1 text-[14px]">
                    {row.links.map((l) => (
                      <Go key={l.label} href={l.href}>{l.label}</Go>
                    ))}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div id="github" className="section-anchor flex flex-col gap-3 self-start rounded-card border border-rule-inner bg-card p-5">
          <h2 className={h2}>On GitHub</h2>
          <p className="text-[14px] leading-[1.5] text-neutral-300">{github.stats}</p>
          <ul className="m-0 flex list-none flex-col p-0">
            {github.repos.map((r) => (
              <li key={r.label} className="flex flex-col border-t border-rule-inner py-2.5">
                <Go href={r.href}>{r.label} ↗</Go>
                <span className="text-[13.5px] text-neutral-400">{r.line}</span>
              </li>
            ))}
          </ul>
          <p className="text-[13px] leading-[1.5] text-neutral-400">{github.privateNote}</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-[14px]">
            <Go href={links.github}>Profile ↗</Go>
            <Go href="/wrapped/">My 2026 in code →</Go>
          </p>
        </div>
      </Container>
    </section>
  );
}

export function AboutContact() {
  return (
    <section id="about" aria-labelledby="about-h" className="section-anchor border-t border-rule-section">
      <Container className="grid gap-7 py-9 md:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)] md:gap-10 md:py-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/meg-headshot.webp"
          alt="Megan Small"
          width={680}
          height={850}
          loading="lazy"
          className="block aspect-4/5 w-[120px] rounded-[14px] object-cover object-[center_30%] md:w-full"
        />
        <div className="flex flex-col gap-3">
          <h2 id="about-h" className={h2}>About</h2>
          {aboutShort.paragraphs.map((p) => (
            <p key={p} className="text-[15px] leading-[1.6] text-neutral-300 text-pretty">{p}</p>
          ))}
        </div>
        <div id="skills" className="section-anchor flex flex-col gap-3">
          <h2 className={h2}>Skills</h2>
          <dl className="m-0 flex flex-col gap-2.5">
            {aboutShort.skills.map((s) => (
              <div key={s.name} className="flex flex-col">
                <dt className="text-[13px] font-semibold">{s.name}</dt>
                <dd className="m-0 text-[13.5px] leading-[1.5] text-neutral-400">{s.items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <Container id="contact" className="section-anchor pb-10 md:pb-14">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-rule-inner bg-card px-5 py-4">
          <p className="text-[15.5px] font-semibold">Hiring for a systems role? Let&apos;s talk.</p>
          <p className="flex flex-wrap gap-x-5 gap-y-1 text-[14px]">
            <a href={profile.resumePath} download={profile.resumeFilename} className={linkCls}>Résumé (PDF) ↓</a>
            <a href={`mailto:${profile.email}`} className={linkCls}>{profile.email}</a>
            <Go href={links.linkedin}>LinkedIn ↗</Go>
          </p>
        </div>
      </Container>
    </section>
  );
}
