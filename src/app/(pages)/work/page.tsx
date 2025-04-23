import Footer from '@/components/footer/Footer';
import WorkBanner from '@/components/WorkBanner/WorkBanner';
import { isMobile } from '@/helpers/is-mobile';
import { client } from '@/helpers/sanity-client';
import { IPageBanner } from '@/models';
import { Metadata } from 'next';
import { FC, Suspense } from 'react';
import Gallery from './components/Gallery';
import GalleryFilters from './components/GalleryFilters';
import GallerySkeleton from './components/GallerySkeleton';
import { getProjects } from './data';
import styles from './page.module.scss';

const { Banner } = styles;

export const metadata: Metadata = {
  title: 'Work | Polyrhythm 📽️',
  description: 'Explore portfolio',
};

const bannerQuery = `*[_type == 'workBanner'][0]`;

// export const revalidate = 0;
// export const fetchCache = 'force-no-store';

interface PageProps {
  searchParams?: Promise<{
    type?: string;
  }>;
}

const Page: FC<PageProps> = async ({ searchParams }) => {
  const type = (await searchParams)?.type;
  const _mobile = await isMobile();

  const projects = getProjects(type);

  const banner = client.fetch<IPageBanner>(
    bannerQuery,
    {},
    { cache: 'default', next: { tags: ['work-banner'] } }
  );

  return (
    <>
      <section className={Banner}>
        <WorkBanner banner={banner} mobile={_mobile} />
      </section>
      <section className={''}>
        <GalleryFilters type={type} />

        <Suspense
          key={`gallery-${type ?? 'all'}`}
          fallback={<GallerySkeleton />}
        >
          <Gallery data={projects} />
        </Suspense>
      </section>
      <Footer />
    </>
  );
};

export default Page;
