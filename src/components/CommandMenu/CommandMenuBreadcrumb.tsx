import { useCommandMenu } from '@/components/CommandMenu/CommandMenuContext';

export function CommandMenuBreadcrumb() {
  const { pages } = useCommandMenu();

  return (
    <nav className="space-x-2 text-xs text-gray-500 dark:text-gray-400 px-2 pt-2">
      {pages.map(page => (
        <div key={page} className="inline-flex bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          {page}
        </div>
      ))}
    </nav>
  );
}
