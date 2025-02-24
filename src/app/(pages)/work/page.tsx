import Footer from '@/components/footer/Footer';
import WorkBanner from '@/components/WorkBanner/WorkBanner';
import { client } from '@/helpers/sanity-client';
import { IPageBanner } from '@/models';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { getProjects } from './data';
import styles from './page.module.scss';

const {
  Banner,
  GridFilters,
  Grid,
  GridItem,
  ProjectImg,
  GridItemInner,
  GridItemTitle,
} = styles;

const bannerQuery = `*[_type == 'workBanner'][0]`;

interface PageProps {
  searchParams?: Promise<{
    type?: string;
  }>;
}

const Page: FC<PageProps> = async ({ searchParams }) => {
  const category = (await searchParams)?.type;

  const projects = await getProjects(category);

  const banner = await client.fetch<IPageBanner>(
    bannerQuery,
    {},
    { next: { revalidate: 10 } }
  );

  return (
    <>
      <section className={Banner}>
        <WorkBanner banner={banner} />
      </section>
      <section className={''}>
        <div className={GridFilters}>
          <Link href={'/work'} scroll={false}>
            All
          </Link>
          <Link
            href={{
              query: { type: '3d-models' },
            }}
            scroll={false}
          >
            3D Models
          </Link>
          <Link
            href={{
              query: { type: 'videos' },
            }}
            scroll={false}
          >
            Videos
          </Link>
          <Link
            href={{
              query: { type: 'stills' },
            }}
            scroll={false}
          >
            Stills
          </Link>
        </div>

        <div className={Grid}>
          {projects.map((p) => {
            return (
              <Link href={`/work/${p.slug.current}`} className={clsx(GridItem)}>
                <div className={clsx(GridItemInner)}>
                  <h3 className={clsx(GridItemTitle)}>{p.title}</h3>
                </div>
                <Image
                  src={p.previewUrl}
                  fill
                  alt={p.title}
                  className={clsx(ProjectImg)}
                />
              </Link>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Page;
