import { pains, caseShots, requirement, rollout, whatsNext } from '@/content/work';

/** The expanded half of the case study. */
export function CaseDetail() {
  return (
    <>
      <div className="flex flex-col gap-3.5">
        <h3 className="text-[20px] font-semibold">Where it broke</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-3">
          {pains.map((pain) => (
            <div
              key={pain.title}
              className="flex flex-col gap-1.5 rounded-xl bg-surface p-4"
            >
              <span className="text-[15px] font-semibold">{pain.title}</span>
              <span className="text-[14px] leading-[1.5] text-neutral-400">
                {pain.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-5">
        {caseShots.map((shot) => (
          <figure key={shot.src} className="m-0 flex flex-col gap-2">
            <div className="aspect-16/10 overflow-hidden rounded-[14px] border border-rule-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
                className="block size-full object-cover object-left-top"
              />
            </div>
            <figcaption className="text-[13px] text-neutral-500">{shot.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div className="flex flex-col gap-3.5">
        <h3 className="text-[20px] font-semibold">{requirement.heading}</h3>
        <p className="max-w-[70ch] text-[15px] leading-[1.6] text-neutral-300">
          {requirement.intro}
        </p>
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {requirement.rules.map((rule) => (
            <li
              key={rule.id}
              className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 border-b border-rule-section py-2.5 text-[14.5px] leading-[1.5]"
            >
              <span className="pt-0.5 font-mono-ui text-[12px] text-accent-400">{rule.id}</span>
              <span className="text-neutral-300">{rule.text}</span>
            </li>
          ))}
        </ul>
        <p className="text-[13px] text-neutral-500">{requirement.note}</p>
      </div>

      <div className="flex flex-col gap-3.5">
        <h3 className="text-[20px] font-semibold">{rollout.heading}</h3>
        <p className="max-w-[70ch] text-[15px] leading-[1.6] text-neutral-300">{rollout.intro}</p>
        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(150px,1fr))] border-t border-rule-inner p-0">
          {rollout.phases.map((phase) => (
            <li
              key={phase.n}
              className="flex flex-col gap-1 pt-3 pr-3 text-[13.5px] leading-[1.45] text-neutral-300"
            >
              <span className="mr-1.5 font-mono-ui text-accent-400">{phase.n}</span>
              {phase.title}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-2.5 rounded-[14px] bg-surface px-5 py-[18px]">
        <h3 className="text-[16px] font-semibold">{whatsNext.heading}</h3>
        <p className="text-[14.5px] leading-[1.6] text-neutral-300">{whatsNext.body}</p>
      </div>
    </>
  );
}
