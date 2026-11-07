import type { ReactNode } from 'react';

/** Page shell: 1160px max width, 24px side gutters. */
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
