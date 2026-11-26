import { SiteHeader } from '@/components/SiteHeader';
import { HeaderOffset } from '@/components/HeaderOffset';
import { Intro, Projects, MoreWork, About } from '@/components/Home';
import { Toolkit } from '@/components/Toolkit';
import { DataSection } from '@/components/DataSection';
import { FootageBand } from '@/components/FootageBand';
import { HeaderFootage } from '@/components/HeaderFootage';
import { ResumeSection } from '@/components/ResumeSection';
import { SiteFooter } from '@/components/SiteFooter';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Seam } from '@/components/Seam';

export default function Page() {
  return (
    <div className="page-glow relative min-h-screen">
      <HeaderOffset />
      <SiteHeader />
      <RevealOnScroll />
      {/*
        PAGE ORDER, and the reasoning, because this was reordered on purpose.

        A hiring manager wants proof before biography, so everything that IS
        the work now runs together -- Projects, then the Power BI models,
        then the smaller builds -- instead of being split by About and Skills
        the way it was. Skills follows, because by then there is evidence
        behind the claims. About (55 words) comes after the case is made.
        The résumé and contact details close it.

        FootageBand stays. It sits between the work block and Skills as the
        one breather in the middle of the page. It is decorative and the page
        reads identically without it, but Megan wants movement through the
        page and this is where there is room for it.

        ALTERNATING BANDS. The page was dark end to end, which made eight
        sections read as one long scroll. It now alternates:

          dark   header footage + intro
          LIGHT  Projects
          dark   Data & analytics
          LIGHT  More work
          dark   the ropes footage
          LIGHT  Skills
          dark   About
          LIGHT  Résumé and contact, down to the footer

        A light band is one `band-light` wrapper (see app/globals.css) placed
        OUTSIDE the `[data-reveal]` element, never on it. On it, the ground
        would start at opacity 0 and fade in with the content — a full-bleed
        flash at every junction. Outside it, the ground is already correct
        when the content arrives.

        Dark bands paint no background of their own. They let `.page-glow`
        and the drifting sea life show through, which is what keeps the dark
        scenes feeling like one continuous body of water rather than eight
        panels of flat navy.

        <Seam> handles every junction except the two around the footage —
        that clip dissolves into the light at both of its own edges, so a
        seam there would be a second dissolve on top of the first. See
        components/Seam.tsx and components/FootageBand.tsx.
      */}
      <main id="top" className="relative z-10">
        <HeaderFootage />
        <div data-reveal>
          <Intro />
        </div>

        <Seam to="light" />
        <div className="band-light">
          <div data-reveal>
            <Projects />
          </div>
        </div>

        <Seam to="dark" />
        <div data-reveal>
          <DataSection />
        </div>

        <Seam to="light" />
        <div className="band-light">
          <div data-reveal>
            <MoreWork />
          </div>
          <div data-reveal>
            <FootageBand />
          </div>
          <div data-reveal>
            <Toolkit />
          </div>
        </div>

        <Seam to="dark" />
        <div data-reveal>
          <About />
        </div>

        <Seam to="light" />
        {/*
          The résumé band runs to the bottom of the document, footer
          included. A dark footer strip under a light section would put a
          hard edge at the very end of the page, which is the one junction
          a seam cannot soften because there is nothing after it.
        */}
        <div className="band-light">
          <div data-reveal>
            <ResumeSection />
          </div>
          <SiteFooter />
        </div>
      </main>
    </div>
  );
}
