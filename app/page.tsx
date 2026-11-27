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

export default function Page() {
  return (
    <div className="relative min-h-screen">
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
      */}
      <main id="top" className="relative z-10">
        <HeaderFootage />
        <div data-reveal>
          <Intro />
        </div>
        <div data-reveal>
          <Projects />
        </div>
        <div data-reveal>
          <DataSection />
        </div>
        <div data-reveal>
          <MoreWork />
        </div>
        <div data-reveal>
          <FootageBand />
        </div>
        <div data-reveal>
          <Toolkit />
        </div>
        <div data-reveal>
          <About />
        </div>
        <div data-reveal>
          <ResumeSection />
        </div>
        {/* Two clips render on this page, so the credit belongs here. */}
        <SiteFooter footage />
      </main>
    </div>
  );
}
