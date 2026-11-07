import { SiteHeader } from '@/components/SiteHeader';
import { HeaderOffset } from '@/components/HeaderOffset';
import { Intro, Projects, MoreWork, AboutContact } from '@/components/Home';
import { SiteFooter } from '@/components/SiteFooter';

export default function Page() {
  return (
    <div className="page-glow min-h-screen">
      <HeaderOffset />
      <SiteHeader />
      <main id="top">
        <Intro />
        <Projects />
        <MoreWork />
        <AboutContact />
        <SiteFooter />
      </main>
    </div>
  );
}
