import { PortableTextTypeComponentProps } from '@portabletext/react';
import { FC } from 'react';
import VideoBlock from './VideoBlock';

interface VideoBlockProps {
  title?: string;
  url: string;
}

const VideoBlockFacade: FC<PortableTextTypeComponentProps<VideoBlockProps>> = ({
  value,
  isInline,
}) => {
  return <VideoBlock value={value} isInline={isInline} />;
};

export default VideoBlockFacade;
