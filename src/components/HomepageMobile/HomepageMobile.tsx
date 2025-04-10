import { FpMedia } from '@/components/FullpageMedia/FullpageMedia';
import { IHomepageSlide } from '@/models';
import { clsx } from 'clsx';
import { FC } from 'react';
import Footer from '../footer/Footer';
import styles from './style.module.scss';

interface HomepageMobileProps {
  data: IHomepageSlide[];
}

const HomepageMobile: FC<HomepageMobileProps> = ({ data }) => {
  return (
    <main className={''}>
      {data.map((slide, i) => {
        return (
          <section key={slide.title} className={styles.Section}>
            <FpMedia slide={slide} mobile />

            <div className={clsx(styles.SectionBlock)}>
              <div className={clsx(styles.BlockContent)}>
                <h1>{slide.title}</h1>
              </div>
            </div>
          </section>
        );
      })}

      <Footer />
    </main>
  );
};

export default HomepageMobile;
