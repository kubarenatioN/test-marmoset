import Footer from '@/components/footer/Footer';
import { getContacts } from '@/data/contacts';
import Image from 'next/image';
import Link from 'next/link';
import { FC, ReactElement } from 'react';
import { BsInstagram, BsTwitterX, BsVimeo } from 'react-icons/bs';
import { FaArtstation } from 'react-icons/fa';
import styles from './page.module.scss';

const iconsMap: {
  [key: string]: ReactElement;
} = {
  artstation: <FaArtstation />,
  instagram: <BsInstagram />,
  vimeo: <BsVimeo />,
  xcom: <BsTwitterX />,
};

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const data = await getContacts();

  const email = data.email;

  const links = {
    artstation: data.artstation,
    instagram: data.instagram,
    vimeo: data.vimeo,
    xcom: data.xcom,
  };

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
                    {iconsMap[type]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
      <section
        className={styles.BlockMail}
        style={{
          backgroundImage: `url('/images/stairs.png')`,
        }}
      >
        <div className={styles.Mail}>
          <Link href={`mailto:${email}`}>{email}</Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default page;
