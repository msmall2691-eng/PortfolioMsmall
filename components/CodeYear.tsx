import { Container, Eyebrow } from "./ui";

/**
 * Counted from `git log` across nine of Meg's repos, Jan 1 to Nov 7, 2026.
 * Includes commits made with Claude Code (her workflow, stated in the case
 * studies); dependabot, Vercel, Railway and other bots are excluded.
 * Regenerate public/wrapped/ and these numbers together.
 */
const stats = [
  { value: "2,084", label: "commits" },
  { value: "166", label: "days with commits" },
  { value: "22 days", label: "longest streak" },
  { value: "9", label: "repositories" },
] as const;

export function CodeYear() {
  return (
    <section
      id="code-year"
      aria-labelledby="code-year-h"
      className="section-anchor border-t border-rule-section"
    >
      <Container className="flex flex-col gap-7 py-16">
        <div className="flex max-w-[640px] flex-col gap-3">
          <Eyebrow>2026 IN CODE</Eyebrow>
          <h2
            id="code-year-h"
            className="text-[clamp(26px,3vw,34px)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance"
          >
            A year of building, from my git history
          </h2>
          <p className="text-[16px] leading-[1.6] text-neutral-300 text-pretty">
            Counted across nine of my repos this year, including the work I do
            with Claude Code. Bots excluded.
          </p>
        </div>

        <dl className="m-0 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 rounded-card border border-rule-inner bg-card px-5 py-4"
            >
              <dt className="order-2 text-[13.5px] text-neutral-400">{s.label}</dt>
              <dd className="m-0 text-[clamp(24px,2.6vw,30px)] font-semibold tracking-[-0.02em]">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <a
          href="/wrapped/"
          className="self-start rounded-[10px] bg-ink px-4 py-[10px] text-[14.5px] font-semibold text-ink-invert hover:bg-accent hover:text-ink-invert"
        >
          Play my 2026 Wrapped →
        </a>
      </Container>
    </section>
  );
}
