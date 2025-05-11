'use client';

import { useDeviceType } from '@/helpers/useDeviceType';
import { IPageBanner } from '@/models';
import Image from 'next/image';
import { FC, useRef } from 'react';
import styles from './style.module.scss';

const { BannerVideoWrapper, BannerVideo, BannerVideoLoader } = styles;

interface WorkBannerProps {
  banner: IPageBanner;
  // banner: Promise<IPageBanner>;
}

const WorkBanner: FC<WorkBannerProps> = ({ banner }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { imageUrl, videoUrl, imageMobileUrl, videoMobileUrl, title } = banner;
  // const { imageUrl, videoUrl, imageMobileUrl, videoMobileUrl, title } =
  //   use(banner);

  const deviceType = useDeviceType();
  const mobile = deviceType === 'mobile';

  if (!deviceType) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <img src='/loader.svg' alt='Loader' />
      </div>
    );
  }

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
