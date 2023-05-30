import { Logo } from '@/assets/Logo';
import { Navigation } from '@/components/Navigation';
import { SearchBar } from '@/components/SearchBar';
import Link from 'next/link';

export function SideBar() {
  return (
    <div className="gap-5 p-4 hidden md:flex w-72 md:shrink-0 sticky top-10 h-full md:flex-col text-black dark:text-gray-100">
      <Link href="/">
        <Logo width={100} height={50} />
      </Link>
      <div className="flex flex-col w-full gap-2">
        <SearchBar />
        <Navigation />
      </div>
    </div>
  );
}
