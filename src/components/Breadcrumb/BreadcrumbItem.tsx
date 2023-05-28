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
    <li ref={ref} className={classNames('list-none flex items-center', isLastChild ? 'text-gray-800' : '')}>
      {!isLastChild && (
        <>
          <Link className="hover:text-rose-500" href={encodeURI(href)}>
            {decodeURI(text)}
          </Link>
          <span className="text-gray-400">{seperator}</span>
        </>
      )}
      {isLastChild && <span className="text-gray-800">{decodeURI(text)}</span>}
    </li>
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';
