import { FC } from 'react';
import { LuLoaderPinwheel } from 'react-icons/lu';
import styles from './Gallery.module.scss';

interface GallerySkeletonProps {}

const GallerySkeleton: FC<GallerySkeletonProps> = ({}) => {
  return (
    <div className={styles.Skeleton}>
      <div className={styles.Loader}>
        <LuLoaderPinwheel />
      </div>
    </div>
  );
};

export default GallerySkeleton;
