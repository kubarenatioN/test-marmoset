'use client';

import { IPageBanner } from '@/models';
import Image from 'next/image';
import { FC, use, useRef } from 'react';
import styles from './style.module.scss';

const { BannerVideoWrapper, BannerVideo, BannerVideoLoader } = styles;

interface WorkBannerProps {
  banner: Promise<IPageBanner>;
}

const WorkBanner: FC<WorkBannerProps> = ({ banner }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const data = use(banner);

  return (
    <>
      {data.imageUrl && <Image src={data.imageUrl} alt={data.title ?? ''} />}

      {data.videoUrl && (
        <div className={BannerVideoWrapper}>
          <video
            ref={videoRef}
            src={data.videoUrl}
            controls={false}
            autoPlay={true}
            playsInline
            loop={true}
            muted
            className={BannerVideo}
          ></video>
        </div>
      )}
    </>
  );
};

export default WorkBanner;
