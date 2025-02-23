'use client';

import { IPageBanner } from '@/models';
import Image from 'next/image';
import { FC, useRef } from 'react';
import styles from './style.module.scss';

const { BannerVideoWrapper, BannerVideo, BannerVideoActions } = styles;

interface WorkBannerProps {
  banner: IPageBanner;
}

const WorkBanner: FC<WorkBannerProps> = ({ banner }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      {banner.imageUrl && (
        <Image src={banner.imageUrl} alt={banner.title ?? ''} />
      )}
      {banner.videoUrl && (
        <div className={BannerVideoWrapper}>
          <video
            ref={videoRef}
            src={banner.videoUrl}
            controls={false}
            autoPlay={true}
            playsInline
            loop={true}
            muted
            className={BannerVideo}
          />
        </div>
      )}
    </>
  );
};

export default WorkBanner;
