import { IHomepageSlide } from '@/models';
import Image from 'next/image';
import { FC } from 'react';
import styles from './style.module.scss';

interface FullpageImageProps {
  slide: IHomepageSlide;
}

export const FpMedia: FC<FullpageImageProps> = ({ slide }) => {
  const { imgUrl, videoUrl, videoLoop } = slide;

  return (
    <>
      {/* Image */}
      {imgUrl && (
        <Image
          priority
          fill
          src={imgUrl}
          alt='Vanya loh'
          style={{
            objectFit: 'cover',
          }}
        />
      )}

      {/* Video */}
      {videoUrl && (
        <div className={styles.FpSlideVideoWrapper}>
          <video
            muted
            loop={Boolean(videoLoop)}
            autoPlay
            playsInline
            src={videoUrl}
            className={styles.FpSlideVideo}
          ></video>
        </div>
      )}
    </>
  );
};
