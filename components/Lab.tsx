'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Container, Eyebrow } from './ui';
import { lab, labTakes } from '@/content/lab';

/**
 * Generative-video experiment, with the two takes switchable.
 *
 * Playback rules, in priority order:
 *  1. prefers-reduced-motion wins over everything — no autoplay, ever, and a
 *     running clip is paused the moment the setting flips on.
 *  2. Otherwise the clip plays only while the panel is actually on screen, so
 *     it costs nothing on a page the visitor scrolls straight past.
 *  3. The visitor can always override with the play/pause button.
 *
 * `preload="none"` keeps both files off the wire until something asks to
 * play, so the section's cost on first paint is one 31–62 KB poster.
 */
export function Lab() {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const take = labTakes[active]!;

  /* Follow the OS motion setting, including a change made while open. */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  /* Play only while visible. Re-armed when the take or the motion pref changes. */
  useEffect(() => {
    const el = panelRef.current;
    const v = videoRef.current;
    if (!el || !v) return;

    if (reduced) {
      v.pause();
      setPlaying(false);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          v.play().then(
            () => setPlaying(true),
            () => setPlaying(false),
          );
        } else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, active]);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    } else {
      v.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <section
      id="lab"
      aria-labelledby="lab-h"
      className="section-anchor border-t border-rule-section"
    >
      <Container className="flex flex-col gap-7 py-20">
        <div className="flex flex-col gap-3">
          <Eyebrow>{lab.eyebrow}</Eyebrow>
          <h2
            id="lab-h"
            className="text-[clamp(26px,3vw,36px)] font-semibold tracking-[-0.02em]"
          >
            {lab.heading}
          </h2>
          <p className="max-w-[72ch] text-[15px] leading-[1.6] text-neutral-300 text-pretty">
            {lab.line}
          </p>
        </div>

        {/* Take switcher. Same tab semantics as the chart tabs in Data. */}
        <div
          role="tablist"
          aria-label="Which take to play"
          className="flex flex-wrap gap-2.5"
        >
          {labTakes.map((t, i) => {
            const selected = i === active;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`lab-tab-${t.id}`}
                aria-selected={selected}
                aria-controls="lab-panel"
                onClick={() => setActive(i)}
                className={`cursor-pointer rounded-[10px] border px-4 py-[10px] text-left font-[inherit] text-[14px] leading-[1.3] transition-colors ${
                  selected
                    ? 'border-accent bg-ink text-ink-invert'
                    : 'border-rule-outline text-ink hover:border-accent'
                }`}
              >
                <span className="block font-semibold">{t.label}</span>
                <span
                  className={`block text-[12.5px] ${
                    selected ? 'text-ink-invert/70' : 'text-neutral-400'
                  }`}
                >
                  {t.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* Capped: full container width reads as a hero, and this is a footnote. */}
        <figure className="m-0 flex max-w-[880px] flex-col gap-3">
          <div
            ref={panelRef}
            id="lab-panel"
            role="tabpanel"
            aria-labelledby={`lab-tab-${take.id}`}
            className="relative overflow-hidden rounded-panel border border-rule-inner bg-[#06121b]"
          >
            <video
              key={take.id}
              ref={videoRef}
              className="block aspect-16/9 w-full object-cover"
              src={take.src}
              poster={take.poster}
              aria-label={take.alt}
              muted
              loop
              playsInline
              preload="none"
              controls={false}
            />

            {/* Sits over the clip; the only control, so it stays visible. */}
            <button
              type="button"
              onClick={toggle}
              aria-pressed={playing}
              className="absolute right-3 bottom-3 cursor-pointer rounded-[10px] border border-white/25 bg-black/55 px-3.5 py-2 font-[inherit] text-[13.5px] font-semibold text-white backdrop-blur-sm hover:border-white/60"
            >
              {playing ? 'Pause ❙❙' : 'Play ▶'}
            </button>
          </div>

          <figcaption className="flex flex-col gap-1.5 text-[14px] leading-[1.6] text-neutral-400">
            <span className="text-neutral-300">{take.detail}</span>
            <span>
              Generated with Adobe Firefly · no audio · {reduced ? lab.reducedNote : lab.note}
            </span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
