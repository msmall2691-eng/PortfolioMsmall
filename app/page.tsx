import { SiteHeader } from '@/components/SiteHeader';
import { HeaderOffset } from '@/components/HeaderOffset';
import { Intro, Projects, MoreWork, About, Contact } from '@/components/Home';
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
        <About />
        <MoreWork />
        <Contact />
        <SiteFooter />
      </main>
    </div>
  );
}
