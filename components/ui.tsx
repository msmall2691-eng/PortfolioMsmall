import type { ReactNode } from 'react';

/** Page shell: 1160px max width, 24px side gutters. */
/**
 * THE SECTION HEADING SCALE. One definition, used by every <h2> that titles
 * a section. Import it; do not write a size next to an h2.
 *
 * There were three scales before this, and measured at 1440 the page ran
 * 42 (h1) · 22 · 22 · 22 · 22 · 22 · 36 · 36. Five sections at 22px sat
 * barely above the 15px body copy, while two sat at 36px, so nothing read
 * as one consistent level and the page had no visible ladder.
 *
 * The ladder now is 42 → 32 → 16.5 → 15: the h1 of Megan's name, section
 * headings, headings inside a card, body. Each step is a clear jump and
 * nothing outranks the h1.
 *
 * A heading INSIDE a card or panel is not a section heading. It is an <h3>
 * at 16.5px, like the skill-group titles. "On GitHub" used to be an <h2>
 * at section size inside a bordered card in the middle of another section,
 * which both looked wrong and told a screen reader the card was a peer of
 * Projects.
 */
/*
  The 24px floor is deliberate. The h1 clamps to 32px at narrow widths, so a
  26px floor here left only 6px between a section heading and the page's
  main heading -- the ladder collapsed exactly where the page is hardest to
  scan. 32 against 24 keeps the step visible on a phone.
*/
export const sectionHeading =
  'text-[clamp(24px,2.8vw,32px)] leading-[1.1] font-semibold tracking-[-0.02em]';

export function Container({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={`mx-auto w-full max-w-[1160px] px-6 ${className}`}>
      {children}
    </div>
  );
}

/** Mono eyebrow above a section heading. */
export function Eyebrow({
  children,
  tone = 'cyan',
  className = '',
}: {
  children: ReactNode;
  tone?: 'cyan' | 'muted' | 'faint';
  className?: string;
}) {
  const tones = {
    cyan: 'text-cyan',
    muted: 'text-neutral-300',
    faint: 'text-neutral-500',
  } as const;
  return (
    <p
      className={`font-mono-ui text-[12px] tracking-[0.12em] ${tones[tone]} ${className}`}
    >
      {children}
    </p>
  );
}

/** Small uppercase label used above sub-blocks inside a section. */
export function BlockLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-neutral-400">
      {children}
    </p>
  );
}

type SmartLinkProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
  download?: string;
  title?: string;
};

/**
 * Renders an anchor when there is somewhere to go, and a plain span when
 * there is not — so an entry with no destination never ships as a dead
 * link. Several builds deliberately have no href.
 *
 * External destinations open in a new tab with rel="noopener".
 */
export function SmartLink({
  href,
  children,
  className = '',
  download,
  ...rest
}: SmartLinkProps) {
  if (!href) {
    return (
      <span className={className} {...rest}>
        {children}
      </span>
    );
  }

  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      {...(download ? { download } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Does this entry have somewhere to link to? */
export function isReachable(href: string | undefined): boolean {
  return Boolean(href);
}
