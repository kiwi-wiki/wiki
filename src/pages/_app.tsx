import Layout from '@/pages/layout';
import '@/styles/cmdk.css';
import '@/styles/global-styles.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
