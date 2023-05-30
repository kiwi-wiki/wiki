'use client';

import { CommandMenu } from '@/components/CommandMenu';
import { useBoolean } from '@/hooks/use-boolean';
import classNames from 'classnames';

export function SearchBar() {
  const [open, { toggle }] = useBoolean();

  return (
    <>
      <button
        onClick={toggle}
        className={classNames(
          'text-sm font-light border px-3 py-2 rounded-md flex justify-between',
          'text-gray-400 border-gray-200 hover:border-gray-300',
          'dark:text-gray-600 dark:border-gray-700 dark:hover:border-gray-600'
        )}
      >
        <span>Search...</span>
        <span>⌘K</span>
      </button>
      <CommandMenu open={open} onOpenChange={toggle} />
    </>
  );
}
