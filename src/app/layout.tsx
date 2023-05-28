import { Navigation } from '@/components/Navigation';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import './global-styles.css';

const notoSansKR = Noto_Sans_KR({
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
      <body className={notoSansKR.className}>
        <div className="relative max-w-screen-xl px-4 py-10 mx-auto md:flex md:py-10 md:flex-row">
          <div className="gap-5 hidden md:flex w-72 md:shrink-0 sticky top-10 h-[calc(100vh-121px)] md:flex-col md:justify-between">
            <Link href="/">
              <Image src="/logo.svg" width={130} height={70} alt="logo" />
            </Link>
            <Navigation />
          </div>
          <main className="w-full h-full overflow-x-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}
