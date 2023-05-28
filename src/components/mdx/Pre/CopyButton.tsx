'use client';

import classNames from 'classnames';
import { FiCopy } from 'react-icons/fi';

interface Props {
  onClick?: () => void;
}

export function CopyButton({ onClick }: Props) {
  return (
    <button
      className={classNames(
        'transition-all rounded-md p-2',
        'text-gray-400 hover:bg-gray-100 active:bg-gray-200',
        'text-gray-500 dark:hover:bg-gray-600 dark:active:bg-gray-700'
      )}
      onClick={onClick}
    >
      <FiCopy />
    </button>
  );
}
