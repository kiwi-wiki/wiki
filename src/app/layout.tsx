import { Navigation } from '@/components/Navigation';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import './global-styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kiwi',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="flex w-full h-full relative overflow-hidden max-w-screen-xl mx-auto">
          <div className="flex flex-col h-full w-72 p-4 gap-5">
            <Link href="/">
              <Image src="/logo.svg" width={130} height={70} alt="logo" />
            </Link>
            <Navigation />
          </div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
