import { Container } from "./ui";
import { hero, offers, heroStats } from "@/content/site";

export function Hero() {
  return (
    <section className="pt-[clamp(40px,5vw,72px)] pb-12">
      <Container className="flex flex-wrap items-center gap-12">
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-7">
          <span className="inline-flex items-center gap-2 font-mono-ui text-[11.5px] tracking-[0.1em] text-neutral-300">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-cyan"
            />
            {hero.eyebrow}
          </span>

          <h1 className="max-w-[15ch] text-[clamp(40px,5.4vw,68px)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance">
            {hero.headlinePlain}
            <span className="text-gradient">{hero.headlineAccent}</span>
          </h1>

          <p className="max-w-[58ch] text-[clamp(17px,1.6vw,20px)] leading-[1.6] text-neutral-300 text-pretty">
            {hero.lede}
          </p>

          <div className="flex flex-col gap-3.5 pt-1">
            <div className="flex flex-wrap items-center gap-x-7 gap-y-2.5 text-[15.5px] font-medium">
              {hero.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...("external" in link && link.external
                    ? { target: "_blank", rel: "noopener" }
                    : {})}
                  className={`rule-link ${
                    "current" in link && link.current
                      ? "text-accent-soft"
                      : "text-ink"
                  } hover:text-white`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="flex items-center gap-2 text-[13.5px] text-neutral-400">
              <span
                aria-hidden="true"
                className="size-[7px] rounded-full bg-status"
              />
              {hero.status}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3">
          <p className="font-mono-ui text-[11.5px] tracking-[0.12em] text-neutral-500">
            WHAT I DO
          </p>
          {offers.map((offer) => (
            <div
              key={offer.title}
              className="flex flex-col gap-2 rounded-card border border-rule-inner bg-card px-5 py-4"
            >
              <h2 className="text-[18px] font-semibold tracking-[-0.01em]">
                {offer.title}
              </h2>
              <p className="text-[14.5px] leading-[1.5] text-neutral-400">
                {offer.line}
              </p>
              <p className="flex flex-wrap gap-x-4 gap-y-1 text-[13.5px] font-medium">
                {offer.proof.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="inline-flex min-h-8 items-center text-accent-soft hover:text-white"
                  >
                    {item.label} →
                  </a>
                ))}
              </p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="pt-12">
        <dl className="m-0 grid grid-cols-2 gap-y-5 border-y border-rule-inner py-6 md:grid-cols-4">
          {heroStats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="order-2 text-[13.5px] text-neutral-400">
                {stat.label}
              </dt>
              <dd className="m-0 text-[clamp(26px,3vw,34px)] font-semibold tracking-[-0.025em]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
