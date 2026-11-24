import { Drift } from '@/components/Drift';
import { homeDrift } from '@/content/drift';
import { SiteHeader } from '@/components/SiteHeader';
import { HeaderOffset } from '@/components/HeaderOffset';
import { Intro, Projects, MoreWork, About } from '@/components/Home';
import { Toolkit } from '@/components/Toolkit';
import { DataSection } from '@/components/DataSection';
import { Ambient } from '@/components/Ambient';
import { DiveHeader } from '@/components/DiveHeader';
import { ResumeSection } from '@/components/ResumeSection';
import { SiteFooter } from '@/components/SiteFooter';

export default function Page() {
  return (
    <div className="page-glow relative min-h-screen">
      <Drift items={homeDrift} />
      <HeaderOffset />
      <SiteHeader />
      <main id="top" className="relative z-10">
        <DiveHeader />
        <Intro />
        <Projects />
        <About />
        <Toolkit />
        <DataSection />
        <MoreWork />
        <Ambient />
        <ResumeSection />
        <SiteFooter />
      </main>
    </div>
  );
}
