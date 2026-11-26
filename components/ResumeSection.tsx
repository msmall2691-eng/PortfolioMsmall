import { Container, Eyebrow, sectionHeading } from './ui';
import { profile } from '@/content/site';
import { resumeHeader, resumeCard, jobs, education, contactRow } from '@/content/resume';

/**
 * Résumé and contact.
 *
 * THIS SECTION WAS ALREADY THE LIGHT ONE — a white sheet on `bg-surface-3`,
 * the only light surface on an otherwise dark page. It is now the last of
 * four light bands, so the lift has to come from somewhere other than "this
 * is the light bit": the band is the desk (`--color-paper-band`), the card
 * is still `--color-paper`, and a hairline plus a soft shadow separate them.
 * The `bg-surface-3` ground and the artwork panel behind it are both gone —
 * the band provides the ground, and the artwork panels did not survive a
 * light one (the About section in components/Home.tsx says why).
 *
 * CONTACT COMES FIRST, and it carries `id="contact"`. Both of those are
 * deliberate and both were bugs.
 *
 * The id used to sit on the <Container> wrapping this whole section, so the
 * nav's "Contact" link scrolled to 5541px while the email and LinkedIn row
 * was at 6534px -- 993px, more than a full screen, further down. The single
 * link a hiring manager is most likely to use was pointing at the résumé
 * heading. Now the id is on the thing it names, and that thing is the first
 * thing in the section.
 *
 * THE CARD IS A SUMMARY, NOT THE WHOLE RÉSUMÉ. It used to render every
 * bullet of every role: 721 words, of which 379 were those bullets. They
 * were also collapsed behind a 620px fade, so most of them were invisible
 * until you clicked -- a click to reveal text that a second click downloads
 * in better form. The PDF is offered four times on this page and it is the
 * artefact people actually keep.
 *
 * So the card now carries the summary, the roles with their dates, and
 * education. `jobs[].points` stays in content/resume.ts because the PDF
 * build uses it; it is simply not rendered here. If you put the bullets
 * back, put the collapse back with them.
 */
export function ResumeSection() {
  return (
    <section
      id="resume"
      aria-labelledby="ct-h"
      className="section-anchor relative overflow-hidden"
    >
      <Container className="band-y section-anchor relative z-10 flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-col gap-2.5">
            <Eyebrow>{resumeHeader.eyebrow}</Eyebrow>
            <h2
              id="ct-h"
              className={sectionHeading}
            >
              {resumeHeader.heading}
            </h2>
            <p className="text-[15.5px] text-neutral-300">{resumeHeader.line}</p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a
              href={profile.resumePath}
              download={profile.resumeFilename}
              className="rounded-[10px] bg-ink px-[18px] py-[11px] text-[14.5px] font-semibold text-ink-invert hover:bg-accent"
            >
              Download PDF ↓
            </a>
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener"
              className="rounded-[10px] border border-rule-outline px-[18px] py-[11px] text-[14.5px] font-semibold text-ink hover:border-accent hover:text-accent-700"
            >
              Open PDF ↗
            </a>
          </div>
        </div>

        {/* The nav's "Contact" target. Keep this id here and keep this first. */}
        <div id="contact" className="section-anchor flex flex-col gap-1.5">
          <p className="text-[18px] font-semibold">Get in touch</p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,170px),1fr))] border-t border-rule-inner">
            {contactRow.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
                className="flex flex-col gap-1 py-4 pr-5 text-ink hover:text-accent-300"
              >
                <span className="font-mono-ui text-[11.5px] tracking-[0.1em] text-neutral-500">
                  {item.label}
                </span>
                {/*
                  No `truncate` here. At 768 the grid resolved to 3x240px and
                  the LinkedIn value clipped to "in/megan-small-75b806..." --
                  a contact detail cut off mid-string. The 170px minimum lets
                  it wrap to its own row instead of being cut.
                */}
                <span className="text-[17px] font-medium break-words">{item.value}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-[18px] border border-paper-rule bg-paper p-[clamp(24px,5vw,56px)] text-paper-ink shadow-[0_18px_44px_rgba(40,44,58,0.08)]">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 border-b border-paper-rule pb-6">
              <p className="text-[clamp(26px,3vw,34px)] font-bold tracking-[-0.02em]">
                {resumeCard.name}
              </p>
              <p className="text-[15px] font-medium text-paper-label">{resumeCard.title}</p>
              {/*
                resumeCard.contact is not rendered. It is the same email,
                studio and GitHub as the contact row directly above this card.
              */}
              <p className="max-w-[78ch] pt-2 text-[15px] leading-[1.65] text-paper-body">
                {resumeCard.summary}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-[11.5px] font-bold tracking-[0.14em] text-paper-soft">EXPERIENCE</p>
              {jobs.map((job) => (
                <div key={job.role} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <span className="text-[15.5px] font-bold">{job.role}</span>
                  <span className="text-[13.5px] text-paper-muted">{job.org}</span>
                  <span className="font-mono-ui text-[12.5px] text-paper-soft">{job.when}</span>
                </div>
              ))}
              <p className="text-[14px] text-paper-soft">
                Full detail for each role is in the PDF above.
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-paper-rule pt-6">
              <p className="text-[11.5px] font-bold tracking-[0.14em] text-paper-soft">
                EDUCATION AND TRAINING
              </p>
              {education.map((item) => (
                <div key={item.title} className="flex flex-col gap-0.5">
                  <span className="text-[14.5px] font-bold">{item.title}</span>
                  <span className="text-[13.5px] text-paper-muted">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
