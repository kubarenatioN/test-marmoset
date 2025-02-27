import { PortableTextTypeComponentProps } from '@portabletext/react';
import { FC } from 'react';

interface VideoBlockProps {
  title?: string;
  url: string;
}

const VideoBlock: FC<PortableTextTypeComponentProps<VideoBlockProps>> = ({
  value,
  isInline,
}) => {
  return isInline ? (
    <video
      preload='metadata'
      controls={true}
      muted
      src={value.url}
      style={{
        display: 'inline-block',
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
      }}
    ></video>
  ) : (
    <div
      style={{
        marginBlock: '2rem',
      }}
    >
      <video
        preload='metadata'
        controls={true}
        muted
        src={value.url}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
        }}
      ></video>
    </div>
  );
};

export default VideoBlock;
