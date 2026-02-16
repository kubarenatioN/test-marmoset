import type { Metadata, Viewport } from 'next';
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
  title: 'Polyrhythm',
  description: `Discover my 3D modeling and texturing portfolio, showcasing realistic, high-quality visuals crafted with precision and creativity`,
  keywords: [
    '3D modeling',
    '3D artist',
    '3D generalist',
    'portfolio',
    'digital art',
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
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
        {children}

        {/* <!-- Yandex.Metrika counter --> */}
        <Script src='/meta/ym.js' type='text/javascript'></Script>
        <noscript>
          <div>
            <img
              src='https://mc.yandex.ru/watch/101022621'
              style={{ position: 'absolute', left: '-9999px' }}
              alt=''
            />
          </div>
        </noscript>
        {/* <!-- /Yandex.Metrika counter --> */}

        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-EG0ZRB92LK'
          type='text/javascript'
        ></Script>
        <Script id='google-analytics-data-layer'>
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-EG0ZRB92LK');`}
        </Script>
        {/* <!-- /Google tag (gtag.js) --> */}
      </body>
    </html>
  );
}
