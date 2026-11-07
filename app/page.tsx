import { SiteHeader } from '@/components/SiteHeader';
import { HeaderOffset } from '@/components/HeaderOffset';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Work } from '@/components/Work';
import { DataSection } from '@/components/DataSection';
import { ToolsSection } from '@/components/ToolsSection';
import { CodeYear } from '@/components/CodeYear';
import { Toolkit } from '@/components/Toolkit';
import { ResumeSection } from '@/components/ResumeSection';
import { SiteFooter } from '@/components/SiteFooter';

export default function Page() {
  return (
    <div className="page-glow min-h-screen">
      <HeaderOffset />
      <SiteHeader />
      <main id="top">
        <Hero />
        <Work />
        <ToolsSection />
        <DataSection />
        <CodeYear />
        <About />
        <Toolkit />
        <ResumeSection />
        <SiteFooter />
      </main>
    </div>
  );
}
