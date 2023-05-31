import { Divider } from '@/components/Divider';
import type { Heading } from '@/utils/dom';
import classNames from 'classnames';
import { CgArrowUpR } from 'react-icons/cg';

const listConfig = {
  1: { ml: 'ml-2' },
  2: { ml: 'ml-2' },
  3: { ml: 'ml-4' },
  4: { ml: 'ml-6' },
  5: { ml: 'ml-8' },
  6: { ml: 'ml-10' },
};

interface Props {
  title?: string;
  headings: Heading[];
}

export function TOC({ title, headings }: Props) {
  return (
    <nav className="w-60 shrink-0 order-last hidden lg:block pl-6 pt-16">
      {headings.length !== 0 && (
        <div className="sticky top-10">
          <h2 className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-3">{title}</h2>
          <li className="flex flex-col gap-2">
            {headings.map(heading => {
              return (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={classNames(
                    'text-sm font-medium',
                    'text-gray-400 hover:text-gray-600',
                    'dark:text-gray-600 dark:hover:text-gray-400',
                    listConfig[heading.level].ml
                  )}
                >
                  {heading.text}
                </a>
              );
            })}
          </li>

          <Divider />

          <div className="">
            <a
              href="#"
              className={classNames(
                'text-sm font-medium flex gap-2 items-center',
                'text-gray-400 hover:text-gray-600',
                'dark:text-gray-600 dark:hover:text-gray-400'
              )}
            >
              <CgArrowUpR />
              <span className="text-sm">Scroll to top</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
