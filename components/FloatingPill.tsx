import { profile } from '@/content/site';

/** Fixed bottom-right pill: jump to the résumé, or download it. */
export function FloatingPill() {
  return (
    <div className="fixed right-5 bottom-5 z-30 flex gap-1 rounded-full bg-[rgba(35,37,50,0.92)] p-[5px] shadow-[0_0_0_1px_#3f424d,0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-[8px]">
      <a
        href="#contact"
        className="rounded-full px-3.5 py-[9px] text-[13.5px] font-semibold text-ink hover:text-white"
      >
        Résumé
      </a>
      <a
        href={profile.resumePath}
        download={profile.resumeFilename}
        aria-label="Download résumé PDF"
        className="rounded-full bg-accent px-3.5 py-[9px] text-[13.5px] font-semibold text-ink-invert hover:bg-accent-400"
      >
        Download ↓
      </a>
    </div>
  );
}
