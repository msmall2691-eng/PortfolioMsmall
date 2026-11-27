import { Container } from './ui';
import { footer } from '@/content/site';

/**
 * The site footer.
 *
 * `footage` controls the AI-generation credit, and it defaults to OFF.
 *
 * That line was unconditional, so it appeared on all six case-study pages —
 * none of which contain a single <video> element. A disclosure pointing at
 * something that is not on the page is not a harmless extra: those pages are
 * full of real product screenshots and real diagrams, and a line saying the
 * background was AI-generated invites a reader to assume the rest was too.
 * The credit is an honesty measure, so it has to be accurate about its scope.
 *
 * Pass `footage` wherever a clip actually renders. Today that is the home
 * page, which has two.
 */
export function SiteFooter({ footage = false }: { footage?: boolean }) {
  return (
    <footer className="pb-8">
      <Container className="flex flex-wrap justify-between gap-2 text-[12.5px] text-neutral-500">
        <span>{footer.left}</span>
        <span>{footer.right}</span>
      </Container>
      {footage ? (
        <Container className="pt-1.5 text-[12.5px] text-neutral-500">
          <span>{footer.footage}</span>
        </Container>
      ) : null}
    </footer>
  );
}
