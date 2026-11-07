import Link from "next/link";
import { Container } from "./ui";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section className="pt-[clamp(48px,6vw,88px)] pb-16">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 font-mono-ui text-[11.5px] tracking-[0.1em] text-neutral-400">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-cyan" />
            {hero.eyebrow}
          </span>

          <h1 className="max-w-[20ch] text-[clamp(38px,5.2vw,64px)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance">
            {hero.headlinePlain}
            <span className="text-accent">{hero.headlineAccent}</span>
          </h1>
        </div>

        <ol className="m-0 grid list-none gap-0 border-t border-ink p-0 md:grid-cols-3">
          {hero.story.map((col, i) => (
            <li
              key={col.label}
              className={`flex flex-col gap-2 py-6 md:pr-8 ${
                i > 0
                  ? "border-t border-rule-inner md:border-t-0 md:border-l md:pl-8"
                  : ""
              }`}
            >
              <span className="font-mono-ui text-[11.5px] tracking-[0.12em] text-accent">
                {String(i + 1).padStart(2, "0")} · {col.label.toUpperCase()}
              </span>
              <h2 className="text-[19px] font-semibold tracking-[-0.01em]">
                {col.title}
              </h2>
              <p className="text-[15.5px] leading-[1.6] text-neutral-300 text-pretty">
                {col.body}
              </p>
              {col.proof.length ? (
                <p className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[14px] font-medium">
                  {col.proof.map((item) =>
                    item.href.startsWith("/") ? (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="inline-flex min-h-8 items-center text-accent-soft hover:text-accent-700"
                      >
                        {item.label} →
                      </Link>
                    ) : (
                      <a
                        key={item.label}
                        href={item.href}
                        className="inline-flex min-h-8 items-center text-accent-soft hover:text-accent-700"
                      >
                        {item.label} →
                      </a>
                    ),
                  )}
                </p>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-rule-inner pt-6">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2.5 text-[15.5px] font-medium">
            {hero.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`rule-link ${
                  "current" in link && link.current ? "text-accent-soft" : "text-ink"
                } hover:text-accent-700`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="flex items-center gap-2 text-[13.5px] text-neutral-400">
            <span aria-hidden="true" className="size-[7px] rounded-full bg-status" />
            {hero.status}
          </p>
        </div>
      </Container>
    </section>
  );
}
