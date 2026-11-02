import { Container } from './ui';
import { nav, iconLinks, profile } from '@/content/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-rule-section bg-[rgba(33,37,57,0.85)] backdrop-blur-[10px]">
      <Container className="flex flex-wrap items-center gap-x-6 gap-y-3 py-3.5">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-[16px] font-semibold text-ink"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/meg-headshot.webp"
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-full object-cover object-[center_30%]"
          />
          {profile.name}
        </a>

        <nav
          aria-label="Sections"
          className="order-last -mx-6 flex w-[calc(100%+48px)] gap-[22px] overflow-x-auto px-6 text-[14px] whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:order-none sm:mx-0 sm:ml-auto sm:w-auto sm:overflow-visible sm:px-0"
        >
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-neutral-300 hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex gap-1.5 sm:ml-0">
          {iconLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener"
              aria-label={link.label}
              title={link.label}
              className="grid size-9 place-items-center rounded-[10px] border border-rule-inner text-[12.5px] font-bold text-ink transition-colors hover:border-accent hover:text-accent-soft"
            >
              {link.glyph}
            </a>
          ))}
        </div>

        <a
          href={profile.resumePath}
          download={profile.resumeFilename}
          className="rounded-[10px] bg-ink px-4 py-[9px] text-[14px] font-semibold text-ink-invert hover:bg-white hover:text-ink-invert"
        >
          Download résumé ↓
        </a>
      </Container>
    </header>
  );
}
