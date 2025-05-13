import Footer from '@/components/footer/Footer';
import WorkBanner from '@/components/WorkBanner/WorkBanner';
import { FC } from 'react';
import { getBanner } from '../data';
import styles from './page.module.scss';

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = async ({ children }) => {
  const banner = await getBanner();

  return (
    <>
      <section className={styles.Banner}>
        <WorkBanner banner={banner} />
      </section>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default layout;
