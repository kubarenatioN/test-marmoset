import Footer from '@/components/footer/Footer';
import WorkBanner from '@/components/WorkBanner/WorkBanner';
import { client } from '@/helpers/sanity-client';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './page.module.scss';

const {
  Banner,
  Grid,
  GridItem,
  ProjectImg,
  BannerVideo,
  BannerVideoWrapper,
  BannerVideoActions,
} = styles;

const dataQuery = `*[_type == 'project'] | order(_createdAt asc)`;

const bannerQuery = `*[_type == 'workBanner']`;

interface PageProps {}

export interface IProject {
  title: string;
  slug: { current: string };
  previewUrl: string;
}

export interface Banner {
  title?: string;
  imageUrl: string;
  videoUrl: string;
}

const Page: FC<PageProps> = async () => {
  const projects = await client.fetch<IProject[]>(
    dataQuery,
    {},
    { next: { revalidate: 10 } }
  );

  const [banner] = await client.fetch<Banner[]>(
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
              <h3>{p.title}</h3>
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
