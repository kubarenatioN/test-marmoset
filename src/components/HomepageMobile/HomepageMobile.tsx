import '@/assets/styles/fp-styles.css';
import { FpMedia } from '@/components/FullpageMedia/FullpageMedia';
import { IHomepageSlide } from '@/models';
import { clsx } from 'clsx';
import Link from 'next/link';
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
                <div className='fp-slide_inner'>
                  <h1 className='fp-slide_title'>{slide.title}</h1>
                  {slide.text && (
                    <p className='fp-slide_subtitle'>{slide.text}</p>
                  )}
                  {slide.project?.slug.current && (
                    <Link
                      className='fp-slide_cta'
                      href={`/work/${slide.project.slug.current}`}
                    >
                      Explore
                    </Link>
                  )}
                </div>
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
