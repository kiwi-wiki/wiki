import { Header } from '@/components/Header';
import { SideBar } from '@/components/SideBar';

import { Noto_Sans } from 'next/font/google';

const notoSans = Noto_Sans({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: 'normal',
  subsets: ['latin'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={notoSans.className}>
      <Header />
      <div className="relative max-w-screen-xl px-4 pt-14 pb-10 mx-auto md:flex md:py-10 md:flex-row">
        <SideBar />
        {children}
      </div>
    </div>
  );
}
