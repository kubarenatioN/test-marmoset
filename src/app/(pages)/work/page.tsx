import WorkBanner from '@/components/WorkBanner/WorkBanner';
import Footer from '@/components/footer/Footer';
import { client } from '@/helpers/sanity-client';
import { IPageBanner } from '@/models';
import { Metadata } from 'next';
import { FC } from 'react';
import Gallery from './components/Gallery';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Work | Polyrhythm',
  description: `Discover my 3D modeling and texturing portfolio, showcasing realistic, high-quality visuals crafted with precision and creativity`,
};

interface PageProps {
  searchParams?: Promise<{
    type?: string;
  }>;
}

const Page: FC<PageProps> = async ({ searchParams }) => {
  const banner = await client.fetch<IPageBanner>(
    `*[_type == 'workBanner'][0]`,
    {},
    { cache: 'default', next: { tags: ['work-banner'] } }
  );

  return (
    <>
      <section className={styles.Banner}>
        <WorkBanner banner={banner} />
      </section>
      <main>
        <Gallery searchParams={searchParams} />
      </main>
      <Footer />
    </>
  );
};

export default Page;
