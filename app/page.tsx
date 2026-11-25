import { Drift } from '@/components/Drift';
import { homeDrift } from '@/content/drift';
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
    <div className="page-glow relative min-h-screen">
      <Drift items={homeDrift} />
      <HeaderOffset />
      <SiteHeader />
      <RevealOnScroll />
      <main id="top" className="relative z-10">
        <HeaderFootage />
        <div data-reveal>
          <Intro />
        </div>
        <div data-reveal>
          <Projects />
        </div>
        <div data-reveal>
          <About />
        </div>
        <div data-reveal>
          <Toolkit />
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
          <ResumeSection />
        </div>
        <SiteFooter />
      </main>
    </div>
  );
}
