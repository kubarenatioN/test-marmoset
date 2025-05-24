'use client';

import { IHomepageSlide } from '@/models';
import Image from 'next/image';
import { FC, useEffect } from 'react';
import styles from './style.module.scss';

interface FullpageImageProps {
  slide: IHomepageSlide;
  mobile?: boolean;
  lastActive?: boolean;
}

export const FpMedia: FC<FullpageImageProps> = ({
  slide,
  mobile,
  lastActive,
}) => {
  const { title, imgUrl, imgMobileUrl, videoUrl, videoMobileUrl, videoLoop } =
    slide;

  useEffect(() => {
    if (!lastActive) {
      const sections = document.querySelectorAll(`.fp-section`);
      const beforeFooter = sections.item(sections.length - 2);
      beforeFooter?.querySelector('video')?.pause();
    }
  }, [lastActive]);

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
            /* need to fix when footer is active and prev slide video gets paused  */
            data-keepplaying={lastActive ? true : undefined}
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
            /* need to fix when footer is active and prev slide video gets paused  */
            data-keepplaying={lastActive ? true : undefined}
            src={videoUrl}
            className={styles.FpSlideVideo}
          ></video>
        </div>
      )}
    </>
  );
};
