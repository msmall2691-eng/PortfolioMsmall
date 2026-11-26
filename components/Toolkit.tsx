import { Container, sectionHeading } from './ui';
import { toolkit, skillGroups, credentials } from "@/content/skills";

export function Toolkit() {
  return (
    <section
      id="skills"
      aria-labelledby="sk-h"
      className="section-anchor border-t border-rule-section"
    >
      <Container className="flex flex-col gap-7 py-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2
            id="sk-h"
            className={sectionHeading}
          >
            {toolkit.heading}
          </h2>
          <p className="max-w-[52ch] text-[14.5px] text-neutral-400">
            {toolkit.intro}
          </p>
        </div>

        <div className="group/sk flex flex-col gap-4">
          <input id="sk-more" type="checkbox" className="peer sr-only" />
          {/*
            `items-start` matters. Without it the grid stretches every card to
            the tallest in its row, and the groups hold between 6 and 35 items
            -- so "AI" carried 148px of empty card below its six tools, 47% of
            a 315px card, and four more cards carried 50-124px each. Nearly
            500px of blank card interior in total, which is the cheapest-
            looking thing a dense page can do.
          */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] items-start gap-4">
            {skillGroups.map((group, i) => (
              <div
                key={group.n}
                className={`flex-col gap-3.5 rounded-[18px] border border-rule-inner bg-card p-[22px] ${
                  // lg, not sm. At sm the collapse switched off but the grid
                  // was still two columns, so 768 rendered all nine cards at
                  // 1782px -- the tallest section on the page, and TALLER than
                  // the same section at 390px (1530px). The toggle now stays
                  // until the three-column layout can absorb them.
                  i < 3 ? "flex" : "hidden group-has-[:checked]/sk:flex lg:flex"
                }`}
              >
                {/*
                  NINE COLOURS REMOVED, ON PURPOSE. Each card used to carry a
                  3px bar in its own pastel plus a badge filled with the same
                  colour, driven by `group.color` in content/skills.ts. On the
                  dark page they were the only thing separating nine
                  near-identical cards. On a warm off-white page nine pastels
                  at card scale is the loudest thing on the site, and it
                  fights the one accent the rest of the page uses.

                  The badge stays — a mono number in a hairline box is enough
                  to index the grid — and `group.color` stays in the content
                  file. Nothing here reads it any more.
                */}
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-[34px] place-items-center rounded-[10px] border border-rule-outline font-mono-ui text-[12px] font-semibold text-neutral-400"
                  >
                    {group.n}
                  </span>
                  {/*
                    An <h3>, not a <span>. Nine group names rendered as plain
                    spans is why 408 words of skills sat under exactly one
                    heading -- nothing to scan, nothing for a screen reader to
                    jump between.
                  */}
                  <h3 className="text-[16.5px] font-semibold">{group.name}</h3>
                </div>
                {/*
                  Every group has had a `sub` written in content/skills.ts
                  from the start and this component never rendered one. Nine
                  one-line descriptors, already written, free.
                */}
                <p className="-mt-2 text-[13px] text-neutral-400">{group.sub}</p>
                {/* One dot-separated line per group — deliberately not chips. */}
                <p className="text-[14px] leading-[1.75] text-neutral-300">
                  {group.tools.join("  ·  ")}
                </p>
              </div>
            ))}
          </div>

          <label
            htmlFor="sk-more"
            className="inline-flex min-h-11 cursor-pointer items-center self-center rounded-[10px] border border-rule-outline px-4 text-[14.5px] font-semibold text-ink group-has-[:checked]/sk:hidden lg:hidden"
          >
            Show all skills ↓
          </label>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4">
          {credentials.map((cred) => (
            <div
              key={cred.title}
              /* Flat accent tint, not a two-stop gradient. The gradient was
                 mixing the old violet and cyan accents; there is one accent
                 now, and a flat tint reads cleaner at this size. */
              className="flex flex-col gap-1 rounded-[14px] border border-accent-800 bg-accent-100 px-[18px] py-4"
            >
              <span className="font-mono-ui text-[11px] tracking-[0.1em] text-accent-400">
                {cred.tag}
              </span>
              <span className="text-[15px] font-semibold">{cred.title}</span>
              <span className="text-[13px] text-neutral-400">
                {cred.detail}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
