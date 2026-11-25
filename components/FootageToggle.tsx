/**
 * The pause control for a footage band.
 *
 * This is NOT optional decoration. WCAG 2.2.2 requires that motion which
 * plays automatically for more than five seconds can be paused, and both
 * bands loop forever. It can be small and quiet — it cannot be absent.
 *
 * It used to be a labelled button on a grey strip under the video, with the
 * credit beside it. That strip read as clutter directly under the header,
 * so the control moved onto the footage as an icon and the credit moved to
 * the site footer. Same obligations, far less furniture:
 *
 *  - still keyboard reachable, with a visible focus ring
 *  - still announced, via aria-label and aria-pressed
 *  - still always visible, not hidden behind a hover — a control that only
 *    appears on hover does not exist on a touchscreen
 *
 * Sits bottom-right, inside the video box, over the part of every clip that
 * is darkest.
 */
export function FootageToggle({
  playing,
  onToggle,
  pauseLabel,
  playLabel,
}: {
  playing: boolean;
  onToggle: () => void;
  pauseLabel: string;
  playLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? pauseLabel : playLabel}
      title={playing ? pauseLabel : playLabel}
      className="absolute right-3 bottom-3 z-10 grid size-9 cursor-pointer place-items-center rounded-full border border-white/25 bg-black/45 text-white/85 backdrop-blur-sm transition hover:border-white/60 hover:text-white focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none"
    >
      {playing ? (
        <svg width="11" height="12" viewBox="0 0 11 12" aria-hidden="true" fill="currentColor">
          <rect x="0" y="0" width="3.5" height="12" rx="1" />
          <rect x="7.5" y="0" width="3.5" height="12" rx="1" />
        </svg>
      ) : (
        <svg width="11" height="12" viewBox="0 0 11 12" aria-hidden="true" fill="currentColor">
          <path d="M0 0.8v10.4a.8.8 0 0 0 1.22.68l8.5-5.2a.8.8 0 0 0 0-1.36L1.22.12A.8.8 0 0 0 0 .8Z" />
        </svg>
      )}
    </button>
  );
}
