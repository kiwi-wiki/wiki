import { Logo } from '@/assets/Logo';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import '@/styles/global-styles.css';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import Link from 'next/link';

const notoSans = Noto_Sans({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: 'normal',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Kiwi',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={notoSans.className}>
        <Header />
        <div className="relative max-w-screen-xl px-4 pt-14 pb-10 mx-auto md:flex md:py-10 md:flex-row">
          <div className="gap-5 p-4 hidden md:flex w-64 md:shrink-0 sticky top-10 h-full md:flex-col md:justify-between text-black dark:text-white">
            <Link href="/">
              <Logo width={100} height={50} />
            </Link>
            <Navigation />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
