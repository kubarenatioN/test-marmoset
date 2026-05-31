'use client';

import { FC } from 'react';

interface VideoBlockProps {
  value: {
    title?: string;
    url: string;
  };
  isInline: boolean;
}

const VideoBlock: FC<VideoBlockProps> = ({ value, isInline }) => {
  const onPlay = () => {
    if (window && window.ym) {
      window.ym(101022621, 'reachGoal', 'article-video-on-play');
    }
  };

  return isInline ? (
    <video
      data-pr-post-video-inline
      preload='metadata'
      controls={true}
      muted
      src={value.url}
      onPlay={onPlay}
      className='article-video article-video--inline'
    ></video>
  ) : (
    <div
      style={{
        marginBlock: '2rem',
      }}
    >
      <video
        data-pr-post-video-block
        preload='metadata'
        controls={true}
        muted
        src={value.url}
        onPlay={onPlay}
        className='article-video article-video--block'
      ></video>
    </div>
  );
};

export default VideoBlock;
