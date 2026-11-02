import type { ReactNode } from 'react';
import { PENDING_LINKS_ARE_PUBLIC } from '@/content/site';

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
  /** True when the destination is not publicly reachable yet. */
  pending?: boolean;
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
  download?: string;
  title?: string;
};

/**
 * Renders an anchor when the destination is reachable, and a plain span
 * otherwise — so an unpublished link never ships as a dead one.
 *
 * External destinations open in a new tab with rel="noopener".
 */
export function SmartLink({
  href,
  pending = false,
  children,
  className = '',
  download,
  ...rest
}: SmartLinkProps) {
  const blocked = pending && !PENDING_LINKS_ARE_PUBLIC;

  if (!href || blocked) {
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

/** Is this destination currently reachable by a signed-out visitor? */
export function isReachable(href: string | undefined, pending?: boolean): boolean {
  if (!href) return false;
  return !(pending && !PENDING_LINKS_ARE_PUBLIC);
}
