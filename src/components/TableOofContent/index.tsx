import { Divider } from '@/components/Divider';
import { ContentList } from '@/components/TableOofContent/ContentList';
import { ScrollToTopButton } from '@/components/TableOofContent/ScrollToTopButton';
import type { Heading } from '@/types/dom.type';

interface Props {
  title?: string;
  headings: Heading[];
}

export function TableOfContent({ title, headings }: Props) {
  return (
    <nav className="w-60 shrink-0 order-last hidden lg:block pl-6 pt-16">
      {headings.length !== 0 && (
        <div className="sticky top-10">
          <h2 className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-3">{title}</h2>
          <ContentList headings={headings} />
          <Divider />
          <ScrollToTopButton />
        </div>
      )}
    </nav>
  );
}
