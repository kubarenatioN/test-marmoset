'use client';

import { IProjectBanner } from '@/models';
import Image from 'next/image';
import { FC, useRef } from 'react';
import styles from './style.module.scss';

const { BannerImage, BannerVideo, BannerVideoWrapper } = styles;

interface ProjectBannerProps {
  banner: IProjectBanner;
}

const ProjectBanner: FC<ProjectBannerProps> = ({ banner }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      {banner.imgUrl && (
        <Image
          className={BannerImage}
          fill
          src={banner.imgUrl}
          alt={banner.title ?? ''}
          sizes='100vw'
        />
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
      {/* {banner.modelUrl && <ModelViewerScene modelUrl={banner.modelUrl} />} */}
    </>
  );
};

export default ProjectBanner;
