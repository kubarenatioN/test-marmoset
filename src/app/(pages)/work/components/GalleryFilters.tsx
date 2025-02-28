import { clsx } from 'clsx';
import Link from 'next/link';
import { FC } from 'react';
import { filters } from '../filters';
import styles from './Gallery.module.scss';

const { GridFilters, GridNavLink, GridNavLinkActive } = styles;

interface GalleryFiltersProps {
  type?: string | null;
}

const GalleryFilters: FC<GalleryFiltersProps> = ({ type = null }) => {
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
    </>
  );
};

export default GalleryFilters;
