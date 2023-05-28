'use client';

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
    <Link className={isActive ? 'text-gray-800 font-bold' : 'text-gray-500'} href={route.href}>
      <li className="transition-all py-2 hover:px-2 relative break-all overflow-hidden h-10">
        <div className="text-lg">{route.name}</div>
        <div className="absolute inset-y-0 right-0 w-12 z-10 bg-gradient-to-l from-white" />
      </li>
    </Link>
  );
}
