import type { Route } from '@/types/navigation.type';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  route: Route;
}

export function NavItem({ route }: Props) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(route.href);

  return (
    <Link
      className={isActive ? 'text-gray-800 dark:text-gray-300 font-bold' : 'text-gray-500 dark:text-gray-600'}
      href={route.href}
    >
      <li className="transition-all py-2 hover:px-2 relative break-all overflow-hidden h-10">
        <div className="text-md">{route.name}</div>
      </li>
    </Link>
  );
}
