import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Polyrhythm 📽️',
  description: 'Digital Artist',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <!-- Yandex.Metrika counter --> */}
        <Script src='/meta/ym.js' type='text/javascript'></Script>
        <noscript>
          <div>
            <img
              src='https://mc.yandex.ru/watch/101022621'
              style={{ position: 'absolute', left: '-9999px;' }}
              alt=''
            />
          </div>
        </noscript>
        {/* <!-- /Yandex.Metrika counter --> */}
        {children}
      </body>
    </html>
  );
}
