import { SiteHeader } from '@/components/SiteHeader';
import { HeaderOffset } from '@/components/HeaderOffset';
import { Intro, Projects, MoreWork, About } from '@/components/Home';
import { Toolkit } from '@/components/Toolkit';
import { DataSection } from '@/components/DataSection';
import { Ambient } from '@/components/Ambient';
import { ResumeSection } from '@/components/ResumeSection';
import { SiteFooter } from '@/components/SiteFooter';

export default function Page() {
  return (
    <div className="page-glow min-h-screen">
      <HeaderOffset />
      <SiteHeader />
      <main id="top">
        <Ambient />
        <Intro />
        <Projects />
        <About />
        <Toolkit />
        <DataSection />
        <MoreWork />
        <ResumeSection />
        <SiteFooter />
      </main>
    </div>
  );
}
