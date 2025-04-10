import { IHomepageSlide } from '@/models';
import Image from 'next/image';
import { FC } from 'react';
import styles from './style.module.scss';

interface FullpageImageProps {
  slide: IHomepageSlide;
  mobile?: boolean;
}

export const FpMedia: FC<FullpageImageProps> = ({ slide, mobile }) => {
  const { title, imgUrl, imgMobileUrl, videoUrl, videoMobileUrl, videoLoop } =
    slide;

  if (mobile) {
    if (imgMobileUrl) {
      /* Mobile Image */
      return (
        <Image
          priority
          fill
          src={imgMobileUrl}
          alt={title}
          style={{
            objectFit: 'cover',
          }}
          sizes='100vw'
        />
      );
    } else if (videoMobileUrl) {
      /* Video */
      return (
        <div className={styles.FpSlideVideoWrapper}>
          <video
            muted
            loop={Boolean(videoLoop)}
            autoPlay
            playsInline
            src={videoMobileUrl}
            className={styles.FpSlideVideo}
          ></video>
        </div>
      );
    }
  }

  return (
    <>
      {/* Image */}
      {imgUrl && (
        <Image
          priority
          fill
          src={imgUrl}
          alt={title}
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
