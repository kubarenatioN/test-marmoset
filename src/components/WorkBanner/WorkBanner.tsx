'use client';

import { IPageBanner } from '@/models';
import Image from 'next/image';
import { FC, use, useRef, useState } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import styles from './style.module.scss';

const { BannerVideoWrapper, BannerVideo, BannerVideoLoader } = styles;

interface WorkBannerProps {
  banner: Promise<IPageBanner>;
}

const WorkBanner: FC<WorkBannerProps> = ({ banner }) => {
  const [videoLoading, setVideoLoading] = useState(true);

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
            style={{
              visibility: videoLoading ? 'hidden' : 'visible',
            }}
            muted
            onLoadedData={() => {
              setVideoLoading(false);
            }}
            className={BannerVideo}
          ></video>

          {videoLoading && (
            <div className={BannerVideoLoader}>
              <div>
                <BiLoaderCircle />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default WorkBanner;
