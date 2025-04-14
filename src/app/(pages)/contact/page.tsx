import Footer from '@/components/footer/Footer';
import Icon from '@/components/Icon/Icon';
import { getContacts } from '@/data/contacts';
import { getSocials } from '@/models/contacts';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Contact | Polyrhythm 📽️',
  description: 'Contact me',
};

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const data = await getContacts();

  const email = data.email;

  const links = getSocials(data);

  const url = data.bgUrl;

  return (
    <>
      <main className={styles.Main}>
        <Image src={url} alt='' fill style={{ objectFit: 'cover' }} />
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
      <section className={styles.BlockMail}>
        <div className={styles.Mail}>
          <Link href={`mailto:${email}`}>{email}</Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
