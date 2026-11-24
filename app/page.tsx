import { SiteHeader } from '@/components/SiteHeader';
import { HeaderOffset } from '@/components/HeaderOffset';
import { Intro, Projects, MoreWork, About } from '@/components/Home';
import { Toolkit } from '@/components/Toolkit';
import { DataSection } from '@/components/DataSection';
import { Lab } from '@/components/Lab';
import { ResumeSection } from '@/components/ResumeSection';
import { SiteFooter } from '@/components/SiteFooter';

export default function Page() {
  return (
    <div className="page-glow min-h-screen">
      <HeaderOffset />
      <SiteHeader />
      <main id="top">
        <Intro />
        <Projects />
        <About />
        <Toolkit />
        <DataSection />
        <MoreWork />
        <Lab />
        <ResumeSection />
        <SiteFooter />
      </main>
    </div>
  );
}
