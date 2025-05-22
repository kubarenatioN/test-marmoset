'use client';

import { useDeviceType } from '@/helpers/useDeviceType';
import { IProjectBanner } from '@/models';
import Image from 'next/image';
import { FC } from 'react';
import styles from './style.module.scss';

const { BannerImage, BannerVideo, BannerVideoWrapper } = styles;

interface ProjectBannerProps {
  banner: IProjectBanner;
  mobile?: boolean;
}

const ProjectBanner: FC<ProjectBannerProps> = ({ banner }) => {
  const deviceType = useDeviceType();

  const { imgUrl, videoUrl, imgMobileUrl, videoMobileUrl, title } = banner;

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
      {deviceType === 'desktop' ? (
        imgUrl ? (
          <Image
            className={BannerImage}
            fill
            src={imgUrl}
            alt={title ?? ''}
            sizes='100vw'
            loading='eager'
          />
        ) : videoUrl ? (
          <div className={BannerVideoWrapper}>
            <video
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
      ) : imgMobileUrl ? (
        <Image
          className={BannerImage}
          fill
          src={imgMobileUrl}
          alt={title ?? ''}
          sizes='100vw'
          loading='eager'
        />
      ) : videoMobileUrl ? (
        <div className={BannerVideoWrapper}>
          <video
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

export default ProjectBanner;
