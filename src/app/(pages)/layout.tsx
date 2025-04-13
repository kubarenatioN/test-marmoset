import Header from '@/components/header/Header';
import Script from 'next/script';
import { FC } from 'react';

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}

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
    </>
  );
};

export default layout;
