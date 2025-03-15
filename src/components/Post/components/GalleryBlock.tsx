import { PortableTextComponentProps } from '@portabletext/react';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { SlideImage } from 'yet-another-react-lightbox';
import styles from './GalleryBlock.module.scss';

const LightBoxWrapper = dynamic(
  () => import('@/components/LightBoxWrapper/LightBoxWrapper')
);

interface GalleryBlockProps {
  items: {
    url: string;
    descr?: string;
  }[];
}

const GalleryBlock: FC<PortableTextComponentProps<GalleryBlockProps>> = ({
  value,
}) => {
  const data: SlideImage[] = value.items.map((el) => ({
    src: el.url,
    alt: el.descr ?? '',
  }));

  return (
    <div className={styles.Container}>
      <LightBoxWrapper items={data} />
    </div>
  );
};

export default GalleryBlock;
