'use client';

import { CommandMenu } from '@/lib/cmdk';
import classNames from 'classnames';
import { useState } from 'react';

export function SearchBar() {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = () => {
    setOpen(open => !open);
  };

  return (
    <>
      <button
        onClick={handleOpenChange}
        className={classNames(
          'text-sm font-light border px-3 py-2 rounded-md flex justify-between',
          'text-gray-400 border-gray-200 hover:border-gray-300',
          'dark:text-gray-600 dark:border-gray-700 dark:hover:border-gray-600'
        )}
      >
        <span>Search...</span>
        <span>⌘K</span>
      </button>
      <CommandMenu open={open} onOpenChange={handleOpenChange} />
    </>
  );
}
