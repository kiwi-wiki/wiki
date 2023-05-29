'use client';

import type { Heading } from '@/utils/dom';
import { getHeadings } from '@/utils/dom';
import { useEffect, useState } from 'react';

const listConfig = {
  1: { ml: 'ml-0' },
  2: { ml: 'ml-0' },
  3: { ml: 'ml-2' },
  4: { ml: 'ml-4' },
  5: { ml: 'ml-6' },
  6: { ml: 'ml-8' },
};

export function TOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const headings = getHeadings({ target: document.querySelector('article'), levels: [1, 2, 3] });
    setHeadings(headings);
  }, []);

  return (
    <nav className="w-56 shrink-0 order-last hidden lg:block p-5">
      <div className="sticky top-10">
        {headings.length !== 0 && <h2 className="text-sm font-bold text-gray-500 mb-3">Contents</h2>}

        <li className="flex flex-col gap-2">
          {headings.map(heading => {
            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={`text-sm font-medium text-gray-400 hover:text-gray-600
                ${listConfig[heading.level].ml}
                `}
              >
                {heading.text}
              </a>
            );
          })}
        </li>
      </div>
    </nav>
  );
}
