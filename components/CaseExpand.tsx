'use client';

import { useId, useState, type ReactNode } from 'react';

/**
 * Toggle for the full case study.
 *
 * The detail stays mounted and is hidden with the `hidden` attribute so
 * `aria-controls` always points at a real element.
 */
export function CaseExpand({
  defaultOpen = false,
  children,
}: {
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="border-t border-neutral-800 pt-2">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex cursor-pointer items-center gap-2.5 border-0 bg-transparent py-3 font-[inherit] text-[15px] font-semibold text-accent-300 hover:text-white"
      >
        {open ? 'Hide the full case ↑' : 'Read the full case ↓'}
      </button>
      <div id={panelId} hidden={!open} className="flex flex-col gap-9 pt-3">
        {children}
      </div>
    </div>
  );
}
