import { Container } from './ui';
import { footer } from '@/content/site';

export function SiteFooter() {
  return (
    <footer className="pb-8">
      <Container className="flex flex-wrap justify-between gap-2 text-[12.5px] text-neutral-500">
        <span>{footer.left}</span>
        <span>{footer.right}</span>
      </Container>
      <Container className="pt-1.5 text-[12.5px] text-neutral-500">
        <span>{footer.footage}</span>
      </Container>
    </footer>
  );
}
