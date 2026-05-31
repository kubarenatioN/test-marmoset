'use client';

import Image from 'next/image';
import { FC, useContext } from 'react';
import { LightBoxContext } from '../PostWrapper';

interface ImageBlockClientProps {
  url: string;
}

const ImageBlockInlineClient: FC<ImageBlockClientProps> = ({ url }) => {
  const { update } = useContext(LightBoxContext);

  return (
    <>
      <Image
        src={url}
        width={1600}
        height={900}
        alt=''
        className='pointer article-image article-image--inline'
        sizes='(max-width: 768px) 100vw, 600px'
        onClick={() => {
          update(url);
        }}
      />
    </>
  );
};

export default ImageBlockInlineClient;
