import { FC } from 'react';
import { LuLoaderPinwheel } from 'react-icons/lu';
import styles from './Gallery.module.scss';

interface GallerySkeletonProps {}

const GallerySkeleton: FC<GallerySkeletonProps> = ({}) => {
  return (
    <div
      style={{
        minHeight: 300,
        position: 'relative',
      }}
    >
      <div className={styles.Loader}>
        <LuLoaderPinwheel />
      </div>
    </div>
  );
};

export default GallerySkeleton;
