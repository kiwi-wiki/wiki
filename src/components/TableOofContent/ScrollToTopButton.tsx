import classNames from 'classnames';
import { CgArrowUpR } from 'react-icons/cg';

export function ScrollToTopButton() {
  return (
    <div>
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
  );
}
