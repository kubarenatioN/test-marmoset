'use client';

import Image from 'next/image';
import { FC, useContext } from 'react';
import { LightBoxContext } from '../PostWrapper';

interface ImageBlockClientProps {
  url: string;
}

const ImageBlockClient: FC<ImageBlockClientProps> = ({ url }) => {
  const { update } = useContext(LightBoxContext);

  return (
    <>
      <Image
        src={url}
        width={1600}
        height={900}
        className='pointer'
        style={{
          objectFit: 'cover',
          width: '100%',
          height: 'auto',
        }}
        alt=''
        sizes='(max-width: 768px) 100vw, 1000px'
        onClick={() => {
          update(url);
        }}
      />
    </>
  );
};

export default ImageBlockClient;
