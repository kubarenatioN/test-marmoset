'use client';

import { useDeviceType } from '@/helpers/useDeviceType';
import { IProjectBanner } from '@/models';
import Image from 'next/image';
import { FC, useRef } from 'react';
import styles from './style.module.scss';

const { BannerImage, BannerVideo, BannerVideoWrapper } = styles;

interface ProjectBannerProps {
  banner: IProjectBanner;
  mobile?: boolean;
  // mobile: Promise<boolean>;
}

const ProjectBanner: FC<ProjectBannerProps> = ({ banner, mobile = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // const isMobile = mobile;
  const deviceType = useDeviceType();

  const { imgUrl, videoUrl, imgMobileUrl, videoMobileUrl, title } = banner;

  if (!deviceType) {
    return null;
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
            priority
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
      ) : imgMobileUrl ? (
        <Image
          className={BannerImage}
          fill
          src={imgMobileUrl}
          alt={title ?? ''}
          sizes='100vw'
          priority
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

export default ProjectBanner;
