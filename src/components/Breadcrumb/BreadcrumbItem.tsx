import classNames from 'classnames';
import Link from 'next/link';
import { forwardRef } from 'react';

interface Props {
  href: string;
  text?: string;
  isLastChild?: boolean;
  seperator?: React.ReactNode;
}

export const BreadcrumbItem = forwardRef<HTMLLIElement, Props>((props, ref) => {
  const { href, text = '', isLastChild = false, seperator = '/' } = props;

  return (
    <li
      ref={ref}
      className={classNames(
        'list-none flex items-center',
        'text-gray-400 hover:text-gray-500',
        'dark:text-gray-700 dark:hover:text-gray-600'
      )}
    >
      {!isLastChild && (
        <>
          <Link href={href}>{decodeURI(text)}</Link>
          <span>{seperator}</span>
        </>
      )}
      {isLastChild && <span className="text-gray-800 dark:text-gray-300">{decodeURI(text)}</span>}
    </li>
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';
