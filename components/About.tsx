import { Container, Eyebrow } from './ui';
import { about } from '@/content/site';

export function About() {
  return (
    <section id="about" aria-labelledby="about-h" className="section-anchor pt-6 pb-22">
      <Container className="flex flex-wrap items-center gap-12">
        <div className="mx-auto min-w-0 flex-[0_1_340px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/meg-headshot.webp"
            alt="Megan Small"
            width={680}
            height={850}
            className="block aspect-4/5 w-full rounded-[18px] object-cover object-[center_30%] shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
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

          <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] border-t border-rule-inner">
            {about.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1 pt-4 pr-4">
                <dt className="text-[24px] font-semibold tracking-[-0.02em]">{fact.value}</dt>
                <dd className="m-0 text-[13px] text-neutral-400">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
