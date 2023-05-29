import { Logo } from '@/assets/Logo';
import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed px-5 min-h-[50px] block md:hidden bg-white dark:bg-gray-900 w-full z-10 items-center">
      <Link href="/">
        <Logo width={60} height={50} />
      </Link>
    </header>
  );
}
