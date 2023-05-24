'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  navLinks: { name: string; href: string }[];
}

export function Navigation({ navLinks }) {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map(link => {
        const isActive = pathname.startsWith(link.href);

        return (
          <Link className={isActive ? 'text-blue' : 'text-black'} href={link.href} key={link.name}>
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
