import Footer from '@/components/footer/Footer';
import Icon from '@/components/Icon/Icon';
import { getContacts } from '@/data/contacts';
import { getSocials } from '@/models/contacts';
import { Metadata } from 'next';
import { getImageProps } from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Contact | Polyrhythm',
  description: `Discover my 3D modeling and texturing portfolio, showcasing realistic, high-quality visuals crafted with precision and creativity`,
};

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const data = await getContacts();
  // const mobile = await isMobile();

  const email = data.email;

  const links = getSocials(data);

  const { bgUrl, bgMobileUrl } = data;
  const common = { fill: true, sizes: '100vw', alt: '' };

  const img = bgUrl
    ? getImageProps({
        ...common,
        src: bgUrl,
      })
    : null;

  const mobileImg = bgMobileUrl
    ? getImageProps({
        ...common,
        src: bgMobileUrl,
      })
    : null;

  // const imgUrl = mobile && bgMobileUrl ? bgMobileUrl : bgUrl;

  return (
    <>
      <main className={styles.Main}>
        <picture>
          {img?.props && (
            <source media='(min-width: 600px)' srcSet={img.props.srcSet} />
          )}
          {mobileImg?.props && (
            <img {...mobileImg.props} className={styles.BgImg} />
          )}
        </picture>
        {/* {imgUrl ? (
          <Image src={imgUrl} alt='' fill style={{ objectFit: 'cover' }} />
        ) : null} */}

        <section className={styles.Section}>
          <ul className={styles.List}>
            {Object.entries(links).map(([type, url]) => {
              return (
                <li key={type}>
                  <Link target='_blank' href={url}>
                    <Icon name={type} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
      {/* <section className={styles.BlockMail}>
        <div className={styles.Mail}>
          <Link href={`mailto:${email}`}>{email}</Link>
        </div>
      </section> */}
      <Footer />
    </>
  );
};

export default page;
