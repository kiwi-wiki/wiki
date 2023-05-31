'use client';

import { useHeadingObserver } from '@/hooks/use-heading-observer';
import type { Heading } from '@/types/dom.type';
import classNames from 'classnames';

interface Props {
  headings: Heading[];
}

const listConfig = {
  1: { ml: 'ml-2' },
  2: { ml: 'ml-2' },
  3: { ml: 'ml-4' },
  4: { ml: 'ml-6' },
  5: { ml: 'ml-8' },
  6: { ml: 'ml-10' },
};

export function ContentList({ headings }: Props) {
  const { activeId } = useHeadingObserver({
    levels: [1, 2, 3],
  });

  return (
    <li className="flex flex-col gap-2">
      {headings.map(heading => {
        return (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={classNames(
              'text-sm font-medium transition-all duration-100',
              activeId === heading.id ? 'text-gray-600' : 'text-gray-400 hover:text-gray-600',
              activeId === heading.id ? 'dark:text-gray-400' : 'dark:text-gray-600 dark:hover:text-gray-400',
              listConfig[heading.level].ml
            )}
          >
            {heading.text}
          </a>
        );
      })}
    </li>
  );
}
