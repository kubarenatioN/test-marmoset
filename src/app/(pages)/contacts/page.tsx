import Footer from '@/components/footer/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { FaPhoneVolume } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { PiMapPinLineFill } from 'react-icons/pi';
import styles from './page.module.scss';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const url =
    'https://res.cloudinary.com/dc2sdos71/image/upload/v1740332655/23232dd_matqn7.png';

  return (
    <>
      <main className={styles.Main}>
        <Image src={url} alt='' fill objectFit='cover' />
        <section className={styles.Section}>
          <ul className={styles.List}>
            <li>
              <IoMdMail size={20} />
              <Link href='/'>Contact 1</Link>
            </li>
            <li>
              <FaPhoneVolume size={20} />
              <Link href='/'>Contact 2</Link>
            </li>
            <li>
              <PiMapPinLineFill size={20} />
              <Link href='/'>Contact 3</Link>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
