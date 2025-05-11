import { IProject } from '@/models';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC, use } from 'react';
import styles from './Gallery.module.scss';

const { Grid, GridItem, ProjectImg, GridItemInner, GridItemTitle } = styles;

interface GalleryGridProps {
  data: Promise<IProject[]>;
  type?: string | null;
}

const GalleryGrid: FC<GalleryGridProps> = ({ data }) => {
  // debug:
  const delay = () =>
    new Promise((res) => {
      console.log('tick start');

      setTimeout(() => {
        console.log('tick end');
        res(null);
      }, 2000);
    });

  // const res = use(delay().then(() => data));

  const res = use(data);

  return (
    <>
      <div className={Grid}>
        {res.map((p) => {
          return (
            <Link
              key={p.slug.current}
              href={`/work/${p.slug.current}`}
              className={clsx(GridItem)}
            >
              <div className={clsx(GridItemInner)}>
                <h3 className={clsx(GridItemTitle)}>{p.title}</h3>
              </div>
              <Image
                src={p.previewUrl}
                fill
                alt={p.title}
                className={clsx(ProjectImg)}
                sizes='(max-width: 400px) 100vw, (max-width: 1000px) 50vw, 33vw'
              />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default GalleryGrid;
