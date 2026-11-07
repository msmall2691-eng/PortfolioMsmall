import { Container, Eyebrow } from "./ui";
import { about, timeline } from "@/content/site";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-h"
      className="section-anchor border-t border-rule-section pt-20 pb-22"
    >
      <Container className="flex flex-wrap items-center gap-12">
        <div className="mx-auto min-w-0 flex-[0_1_340px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/meg-headshot.webp"
            alt="Megan Small"
            width={680}
            height={850}
            className="block aspect-4/5 w-full rounded-[18px] object-cover object-[center_30%] shadow-[0_24px_60px_rgba(28,30,50,0.10)]"
          />
        </div>

        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-5">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2
            id="about-h"
            className="text-[clamp(30px,4vw,44px)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance"
          >
            {about.heading}
          </h2>
          <p className="max-w-[58ch] text-[17px] leading-[1.65] text-neutral-200 text-pretty">
            {about.paragraphs[0]}
          </p>
          <p className="max-w-[58ch] text-[16px] leading-[1.65] text-neutral-300 text-pretty">
            {about.paragraphs[1]}
          </p>

          <div className="flex flex-col gap-3 border-t border-rule-inner pt-5">
            <h3 className="font-mono-ui text-[11.5px] tracking-[0.12em] text-neutral-500">
              MY PATH
            </h3>
            <ol className="grid gap-x-4 gap-y-4 sm:grid-cols-5">
              {timeline.map((step, i) => (
                <li
                  key={step.year}
                  className="relative flex gap-3 sm:flex-col sm:gap-2"
                >
                  <span className="flex items-center gap-2 sm:w-full">
                    <span
                      aria-hidden="true"
                      className={`size-2.5 shrink-0 rounded-full ${i === timeline.length - 1 ? "bg-status" : "bg-accent"}`}
                    />
                    <span
                      aria-hidden="true"
                      className="hidden h-px flex-1 bg-rule-inner sm:block"
                    />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="font-mono-ui text-[12px] text-cyan">
                      {step.year}
                    </span>
                    <span className="text-[14px] leading-[1.35] font-semibold">
                      {step.title}
                    </span>
                    <span className="text-[12.5px] leading-[1.35] text-neutral-400">
                      {step.where}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
