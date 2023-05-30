import classNames from 'classnames';
import Link from 'next/link';

interface Props {
  href: string;
  title: string;
  description: string;
}

export function PostCard({ href, title, description }: Props) {
  return (
    <Link
      href={href}
      className={classNames(
        'block rounded-md border p-4 md:p-6 space-y-2 transition-colors duration-150',
        'border-gray-200 bg-gray-50 hover:bg-gray-100',
        'dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800'
      )}
    >
      <h3 className="text-md md:text-lg font-medium leading-snug truncate">{title}</h3>
      <p className="text-xs md:text-sm break-all text-gray-500 line-clamp-3 font-normal">{description}</p>
    </Link>
  );
}
