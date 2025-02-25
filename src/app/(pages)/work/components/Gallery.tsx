import { IProject } from '@/models';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC, use } from 'react';
import styles from './Gallery.module.scss';
import { filters } from './filters';

const {
  Grid,
  GridItem,
  ProjectImg,
  GridItemInner,
  GridItemTitle,
  GridFilters,
  GridNavLink,
  GridNavLinkActive,
} = styles;

interface GalleryProps {
  data: Promise<IProject[]>;
  type?: string | null;
}

const Gallery: FC<GalleryProps> = ({ data, type = null }) => {
  const res = use(data);

  return (
    <>
      <div className={GridFilters}>
        {filters.map((item) => {
          return (
            <Link
              className={clsx(
                GridNavLink,
                item.type === type ? GridNavLinkActive : ''
              )}
              key={item.label}
              href={
                item.type
                  ? {
                      query: { type: item.type },
                    }
                  : '/work'
              }
              scroll={false}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

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
                sizes='(max-width: 768px) 100vw, 33vw'
              />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Gallery;
