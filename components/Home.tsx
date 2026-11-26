import Link from "next/link";
import { Container, sectionHeading } from './ui';
import { profile, links } from "@/content/site";
import { intro, projects, moreWork, github, aboutShort } from "@/content/home";

const label = "font-mono-ui text-[11px] tracking-[0.12em] text-neutral-500";
// Section heading size lives in ui.tsx as `sectionHeading`. See the note there.
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
          {/*
            This is a label over a list inside the intro, not a section heading.
            It was an <h2> carrying the 11px eyebrow style, which put an 11px
            entry -- smaller than body copy -- into a heading outline that
            otherwise runs 22 to 44px, and announced a section peer that does
            not exist. It is a <p> now, with the list pointed at it so the
            association a heading gave is kept.
          */}
          <p id="intro-experience" className={label}>EXPERIENCE</p>
          <ol aria-labelledby="intro-experience" className="m-0 flex list-none flex-col p-0">
            {intro.experience.map((e) => (
              <li
                key={e.what}
                className="grid grid-cols-[80px_minmax(0,1fr)] gap-x-2.5 border-t border-rule-inner py-2.5 first:border-t-0 first:pt-0 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-x-3 sm:py-3"
              >
                <span className="pt-0.5 font-mono-ui text-[12px] text-neutral-400">{e.when}</span>
                <span className="flex flex-col">
                  <span className="text-[14px] font-semibold leading-[1.35] sm:text-[15px]">{e.what}</span>
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
        {/*
          The caption sits UNDER the heading, not opposite it.
          It began as a right-hand item in a justify-between row, which put
          it on top of the artwork panel this section used to carry: 6.83:1
          median but a 2.88:1 minimum, with 2.3% of the text box below the
          4.5:1 AA floor -- text that renders perfectly and is unreadable in
          patches. The panel is gone now, but the heading-then-caption stack
          is also simply the clearer read, so it stays.
        */}
        <div className="flex flex-col gap-1.5">
          <h2 id="work-h" className={sectionHeading}>Projects</h2>
          <p className="max-w-[46ch] text-[14px] text-neutral-400">Each one links to a short case study.</p>
        </div>
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
          {featured.map((p) => (
            <li key={p.title} className="group relative flex flex-col overflow-hidden rounded-card border border-rule-inner bg-card transition-transform duration-150 hover:-translate-y-0.5">
              {/*
                The height is bounded, not an aspect ratio. With aspect-[16/9]
                the image grew with its column, so a two-up card on a desktop
                carried a 307px screenshot — the tallest block on the page, and
                all it bought was a second row of the same lead cards. A fixed
                height crops wider as the column widens instead, which is what
                you want from a screenshot. Raise it only at lg: the two-column
                grid starts at sm but the column is still ~350px at 768, where
                210px would be a crop TALLER than 16:9.
              */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                alt={p.alt}
                loading="lazy"
                className="block h-[170px] w-full border-b border-rule-inner object-cover lg:h-[210px]"
                style={{ objectPosition: p.position ?? "center" }}
              />
              <div className="flex flex-1 flex-col gap-1 p-3.5">
                <span className="font-mono-ui text-[11px] tracking-[0.08em] text-neutral-500 uppercase">{p.tag}</span>
                <h3 className="text-[16.5px] font-semibold">
                  <Link href={p.href} className="text-ink after:absolute after:inset-0 hover:text-accent-700">
                    {p.title}
                  </Link>
                </h3>
                <p className="text-[14.5px] leading-[1.5] text-neutral-300">{p.line}</p>
                {/*
                  The card title carries `after:inset-0`, a stretched link that
                  makes the whole card clickable. Anything given its own stacking
                  context sits ABOVE that overlay and stops being part of the card
                  link -- so `relative z-10` belongs on the secondary link alone,
                  never on this row. With it on the row, "Case study →" became the
                  one dead spot on the card: the element that looks most like the
                  link was the only place a click did nothing. Measured dead at
                  390, 768 and 1440 before this.
                */}
                <p className="mt-auto flex gap-4 pt-0.5 text-[14px]">
                  <span className="text-accent-soft">Case study →</span>
                  {p.extra ? (
                    <span className="relative z-10">
                      <Go href={p.extra.href}>{p.extra.label} ↗</Go>
                    </span>
                  ) : null}
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
                {/* Same stretched-link rule as the cards above. */}
                <span className="flex gap-4 pt-0.5 text-[14px]">
                  <span className="text-accent-soft">Case study →</span>
                  {p.extra ? (
                    <span className="relative z-10">
                      <Go href={p.extra.href}>{p.extra.label} ↗</Go>
                    </span>
                  ) : null}
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
          <h2 id="more-h" className={sectionHeading}>More work</h2>
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
          {/* An h3: this is a card inside #more, not a section of its own. */}
          <h3 className="text-[16.5px] font-semibold">On GitHub</h3>
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

/**
 * About and the contact card are two sections, not one.
 *
 * They used to be a single block at the foot of the page, which put "who is
 * this person" at 4,580px on a phone — past the work, past the data, past the
 * long tail. About now sits directly after Projects, so a reader meets the
 * person once the four cards have made the case and before the stats band
 * asks them to read numbers. Data & analytics and More work follow.
 *
 * The contact card did NOT travel with it. It is the page's one call to
 * action, and a call to action in the middle leaves the page ending on a list
 * of repositories with nothing to do next.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-h" className="section-anchor border-t border-rule-section">
      <Container className="grid gap-6 py-9 md:grid-cols-[180px_minmax(0,72ch)] md:gap-10 md:py-12">
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
          <h2 id="about-h" className={sectionHeading}>About</h2>
          {aboutShort.paragraphs.map((p) => (
            <p key={p} className="text-[15px] leading-[1.6] text-neutral-300 text-pretty">{p}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h" className="section-anchor border-t border-rule-section">
      <Container className="pt-9 pb-10 md:pt-12 md:pb-14">
        {/*
          gap-4 is load-bearing: at 768 the three links sit on one row beside
          the heading with very little room to spare, and widening this to
          gap-x-5 wrapped them onto a second row — a card 29px TALLER than the
          one this padding change was shrinking. Only the padding moves, and
          only on a phone.
        */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-rule-inner bg-card px-4 py-3.5 md:px-5 md:py-4">
          <p id="contact-h" className="text-[15.5px] font-semibold">Hiring for a systems role? Let&apos;s talk.</p>
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
