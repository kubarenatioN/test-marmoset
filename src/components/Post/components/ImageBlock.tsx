import { PortableTextTypeComponentProps } from '@portabletext/react';
import Image from 'next/image';
import { FC } from 'react';

interface ImageBlockProps {
  title?: string;
  url: string;
}

const ImageBlock: FC<PortableTextTypeComponentProps<ImageBlockProps>> = ({
  value,
  isInline,
}) => {
  return isInline ? (
    <Image
      src={value.url}
      width={1600}
      height={900}
      alt=''
      style={{
        objectFit: 'cover',
        width: '100%',
        height: 'auto',
      }}
      sizes='(max-width: 768px) 100vw, 600px'
    />
  ) : (
    <div
      style={{
        marginBlock: '2rem',
      }}
    >
      <Image
        src={value.url}
        width={1600}
        height={900}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: 'auto',
        }}
        alt=''
        sizes='(max-width: 768px) 100vw, 1000px'
      />
    </div>
  );
};

export default ImageBlock;
