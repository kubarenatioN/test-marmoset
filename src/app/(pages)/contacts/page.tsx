import Footer from '@/components/footer/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { BsInstagram, BsTwitterX, BsVimeo } from 'react-icons/bs';
import { FaArtstation } from 'react-icons/fa';
import styles from './page.module.scss';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const url =
    'https://res.cloudinary.com/dc2sdos71/image/upload/v1740332655/23232dd_matqn7.png';

  return (
    <>
      <main className={styles.Main}>
        <Image src={url} alt='' fill style={{ objectFit: 'cover' }} />
        <section className={styles.Section}>
          <ul className={styles.List}>
            <li>
              <Link href={'/'}>
                <FaArtstation />
              </Link>
            </li>
            <li>
              <Link href={'/'}>
                <BsTwitterX />
              </Link>
            </li>
            <li>
              <Link href={'/'}>
                <BsInstagram />
              </Link>
            </li>
            <li>
              <Link href={'/'}>
                <BsVimeo />
              </Link>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
