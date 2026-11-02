import { Container } from './ui';
import { hero, workIndex } from '@/content/site';

export function Hero() {
  return (
    <section className="pt-[clamp(40px,5vw,72px)] pb-12">
      <Container className="flex flex-wrap items-center gap-12">
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-7">
          <span className="inline-flex items-center gap-2 font-mono-ui text-[11.5px] tracking-[0.1em] text-neutral-300">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-cyan" />
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
                  {...('external' in link && link.external
                    ? { target: '_blank', rel: 'noopener' }
                    : {})}
                  className={`rule-link ${
                    'current' in link && link.current ? 'text-accent-soft' : 'text-ink'
                  } hover:text-white`}
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
        </div>

        <nav
          aria-label="Work index"
          className="flex min-w-0 flex-[1_1_420px] flex-col"
        >
          <p className="pb-3 font-mono-ui text-[11.5px] tracking-[0.12em] text-neutral-500">
            INDEX
          </p>
          {workIndex.map((item) => (
            <a
              key={item.n}
              href={item.href}
              className="grid grid-cols-[36px_minmax(0,1fr)_auto] items-baseline gap-4 border-t border-rule-inner py-[18px] text-ink hover:text-accent-300"
            >
              <span className="font-mono-ui text-[12px] text-accent-400">{item.n}</span>
              <span className="flex min-w-0 flex-col gap-[3px]">
                <span className="text-[19px] font-semibold tracking-[-0.01em]">
                  {item.title}
                </span>
                <span className="text-[13.5px] text-neutral-400">{item.description}</span>
              </span>
              <span className="font-mono-ui text-[12px] text-neutral-500">{item.year}</span>
            </a>
          ))}
        </nav>
      </Container>
    </section>
  );
}
