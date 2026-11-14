import { SiteHeader } from '@/components/SiteHeader';
import { HeaderOffset } from '@/components/HeaderOffset';
import { Intro, Projects, MoreWork, AboutContact } from '@/components/Home';
import { DataSection } from '@/components/DataSection';
import { SiteFooter } from '@/components/SiteFooter';

export default function Page() {
  return (
    <div className="page-glow min-h-screen">
      <HeaderOffset />
      <SiteHeader />
      <main id="top">
        <Intro />
        <Projects />
        <DataSection />
        <MoreWork />
        <AboutContact />
        <SiteFooter />
      </main>
    </div>
  );
}
