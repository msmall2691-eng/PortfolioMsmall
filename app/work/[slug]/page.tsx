import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Eyebrow } from '@/components/ui';
import { SiteFooter } from '@/components/SiteFooter';
import { caseStudies, getCaseStudy, type CaseSection } from '@/content/caseStudies';
import { profile } from '@/content/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  const title = `${study.title} — case study · ${profile.name}`;
  const path = `/work/${study.slug}/`;
  return {
    title,
    description: study.metaDescription,
    alternates: { canonical: path },
    openGraph: { title, description: study.metaDescription, url: path, type: 'article' },
    twitter: { title, description: study.metaDescription },
  };
}

function SectionBody({ section }: { section: CaseSection }) {
  switch (section.kind) {
    case 'prose':
      return (
        <div className="flex max-w-[680px] flex-col gap-4 text-[16px] leading-[1.65] text-neutral-300">
          {section.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      );
    case 'flow':
      return (
        <div className="flex flex-col gap-4">
          <ol className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
            {section.steps.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-1.5 rounded-[12px] border border-rule-inner bg-card p-4">
                <span className="font-mono-ui text-[11.5px] text-cyan">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[15px] font-semibold">{step.title}</span>
                <span className="text-[13.5px] leading-[1.45] text-neutral-400">{step.detail}</span>
              </li>
            ))}
          </ol>
          {section.note ? <p className="max-w-[680px] text-[14px] text-neutral-400">{section.note}</p> : null}
        </div>
      );
    case 'decisions':
      return (
        <div className="flex flex-col gap-3">
          {section.items.map((d) => (
            <div
              key={d.title}
              className="grid gap-x-8 gap-y-2 rounded-[12px] border border-rule-inner bg-card p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]"
            >
              <h3 className="text-[16.5px] leading-[1.3] font-semibold">{d.title}</h3>
              <div className="flex flex-col gap-2">
                <p className="text-[15px] leading-[1.55] text-neutral-200">{d.why}</p>
                <p className="text-[14px] leading-[1.5] text-neutral-400">
                  <span className="mr-2 font-mono-ui text-[11px] tracking-[0.08em] text-cyan">COST</span>
                  {d.cost}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    case 'boxes':
      return (
        <div className="flex flex-col gap-5">
          {section.intro ? (
            <p className="max-w-[680px] text-[16px] leading-[1.65] text-neutral-300">{section.intro}</p>
          ) : null}
          {section.facts ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] border-y border-rule-inner">
              {section.facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-1 py-5 pr-5">
                  <span className="text-[30px] font-semibold tracking-[-0.03em]">{f.value}</span>
                  <span className="text-[13.5px] text-neutral-400">{f.label}</span>
                </div>
              ))}
            </div>
          ) : null}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
            {section.boxes.map((box) => (
              <div key={box.title} className="rounded-[12px] border border-rule-inner bg-card p-5">
                <h3 className="mb-3 text-[15.5px] font-semibold">{box.title}</h3>
                <ul className="flex list-disc flex-col gap-2 pl-5 text-[14.5px] leading-[1.5] text-neutral-300 marker:text-neutral-500">
                  {box.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {section.note ? <p className="max-w-[680px] text-[13.5px] text-neutral-400">{section.note}</p> : null}
        </div>
      );
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  const others = caseStudies.filter((c) => c.slug !== study.slug);

  return (
    <div className="page-glow min-h-screen">
      <header className="sticky top-0 z-20 border-b border-rule-section bg-[rgba(33,37,57,0.85)] backdrop-blur-[10px]">
        <Container className="flex flex-wrap items-center gap-x-6 gap-y-3 py-3.5">
          <Link href="/" className="flex items-center gap-2.5 text-[16px] font-semibold text-ink">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/meg-headshot.webp" alt="" width={32} height={32} className="size-8 rounded-full object-cover object-[center_30%]" />
            {profile.name}
          </Link>
          <Link href="/#more" className="ml-auto text-[14px] text-neutral-300 hover:text-white">
            ← All work
          </Link>
          <a
            href={profile.resumePath}
            download={profile.resumeFilename}
            className="rounded-[10px] bg-ink px-4 py-[9px] text-[14px] font-semibold text-ink-invert hover:bg-white hover:text-ink-invert"
          >
            Download résumé ↓
          </a>
        </Container>
      </header>

      <main>
        <Container className="flex flex-col gap-6 pt-16 pb-10">
          <Eyebrow>CASE STUDY · 2026</Eyebrow>
          <h1 className="text-[clamp(40px,7vw,68px)] leading-[1.02] font-semibold tracking-[-0.035em]">{study.title}</h1>
          <p className="max-w-[680px] text-[clamp(17px,2.2vw,20px)] leading-[1.5] text-neutral-300">{study.lede}</p>
          <dl className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-7 gap-y-5">
            {study.meta.map((m) => (
              <div key={m.label} className="border-t border-rule-inner pt-3">
                <dt className="mb-1.5 font-mono-ui text-[11px] tracking-[0.1em] text-cyan uppercase">{m.label}</dt>
                <dd className="text-[14.5px] leading-[1.5] text-neutral-200">{m.value}</dd>
              </div>
            ))}
          </dl>
          {study.liveUrl ? (
            <div className="pt-2">
              <a
                href={study.liveUrl.href}
                target="_blank"
                rel="noopener"
                className="border-b-2 border-accent pb-0.5 text-[15px] font-semibold text-accent-soft hover:text-white"
              >
                {study.liveUrl.label}
              </a>
            </div>
          ) : null}
        </Container>

        {study.sections.map((section) => (
          <section key={section.heading} className="border-t border-rule-section">
            <Container className="flex flex-col gap-5 py-14">
              <Eyebrow>{section.eyebrow}</Eyebrow>
              <h2 className="-mt-1 text-[clamp(24px,3.2vw,34px)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance">
                {section.heading}
              </h2>
              <SectionBody section={section} />
            </Container>
          </section>
        ))}

        <section className="border-t border-rule-section">
          <Container className="flex flex-wrap items-center justify-between gap-4 py-12">
            <div className="flex flex-col gap-1">
              <Eyebrow tone="faint">MORE WORK</Eyebrow>
              {others.map((o) => (
                <Link key={o.slug} href={`/work/${o.slug}/`} className="text-[18px] font-semibold text-ink hover:text-accent-soft">
                  {o.title} case study →
                </Link>
              ))}
            </div>
            <Link href="/#work" className="text-[15px] font-semibold text-accent-soft hover:text-white">
              Read the BrightBase case study →
            </Link>
          </Container>
        </section>
        <SiteFooter />
      </main>
    </div>
  );
}
