'use client';

import { IProjectBanner } from '@/models';
import Image from 'next/image';
import { FC, use, useRef } from 'react';
import styles from './style.module.scss';

const { BannerImage, BannerVideo, BannerVideoWrapper } = styles;

interface ProjectBannerProps {
  banner: IProjectBanner;
  mobile: Promise<boolean>;
}

const ProjectBanner: FC<ProjectBannerProps> = ({ banner, mobile }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const isMobile = use(mobile);

  const { imgUrl, videoUrl, imgMobileUrl, videoMobileUrl, title } = banner;

  return (
    <>
      {!isMobile ? (
        imgUrl ? (
          <Image
            className={BannerImage}
            fill
            src={imgUrl}
            alt={title ?? ''}
            sizes='100vw'
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
