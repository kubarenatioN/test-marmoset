'use client';

import { IPageBanner } from '@/models';
import Image from 'next/image';
import { FC, use, useRef } from 'react';
import styles from './style.module.scss';

const { BannerVideoWrapper, BannerVideo, BannerVideoLoader } = styles;

interface WorkBannerProps {
  banner: Promise<IPageBanner>;
  mobile?: boolean;
}

const WorkBanner: FC<WorkBannerProps> = ({ banner, mobile }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { imageUrl, videoUrl, imageMobileUrl, videoMobileUrl, title } =
    use(banner);

  return (
    <>
      {!mobile ? (
        imageUrl ? (
          <Image
            fill
            src={imageUrl}
            alt={title ?? ''}
            style={{ objectFit: 'cover' }}
          />
        ) : videoUrl ? (
          <div className={BannerVideoWrapper}>
            <video
              ref={videoRef}
              src={videoUrl}
              controls={false}
              autoPlay={true}
              playsInline
              loop={true}
              muted
              className={BannerVideo}
            ></video>
          </div>
        ) : null
      ) : imageMobileUrl ? (
        <Image
          fill
          src={imageMobileUrl}
          alt={title ?? ''}
          style={{ objectFit: 'cover' }}
        />
      ) : videoMobileUrl ? (
        <div className={BannerVideoWrapper}>
          <video
            ref={videoRef}
            src={videoMobileUrl}
            controls={false}
            autoPlay={true}
            playsInline
            loop={true}
            muted
            className={BannerVideo}
          ></video>
        </div>
      ) : null}
    </>
  );
};

export default WorkBanner;
