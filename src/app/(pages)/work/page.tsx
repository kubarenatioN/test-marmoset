import Footer from '@/components/footer/Footer';
import WorkBanner from '@/components/WorkBanner/WorkBanner';
import { client } from '@/helpers/sanity-client';
import { IPageBanner, IProject } from '@/models';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './page.module.scss';

const { Banner, Grid, GridItem, ProjectImg, GridItemInner, GridItemTitle } =
  styles;

const dataQuery = `*[_type == 'project'] | order(_createdAt asc)`;

const bannerQuery = `*[_type == 'workBanner'][0]`;

interface PageProps {}

const Page: FC<PageProps> = async () => {
  const projects = await client.fetch<IProject[]>(
    dataQuery,
    {},
    { next: { revalidate: 10 } }
  );

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
      <section className={Grid}>
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
      </section>
      <Footer />
    </>
  );
};

export default Page;
