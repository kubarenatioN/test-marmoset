import { PortableTextTypeComponentProps } from '@portabletext/react';
import { FC } from 'react';
import ImageBlockClient from './ImageBlockClient';
import ImageBlockInlineClient from './ImageBlockInlineClient';

interface ImageBlockProps {
  title?: string;
  url: string;
}

const ImageBlock: FC<PortableTextTypeComponentProps<ImageBlockProps>> = ({
  value,
  isInline,
}) => {
  return isInline ? (
    <ImageBlockInlineClient url={value.url} />
  ) : (
    <div
      style={{
        marginBlock: '2rem',
      }}
    >
      <ImageBlockClient url={value.url} />
    </div>
  );
};

export default ImageBlock;
