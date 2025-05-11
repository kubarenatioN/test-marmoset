'use client';

import { useDeviceType } from '@/helpers/useDeviceType';
import { FC } from 'react';
import ModelBlockDesktop from './ModelBlockDesktop';
import ModelBlockMobile from './ModelBlockMobile';

export interface ModelBlockProps {
  title?: string;
  url: string;
}

const ModelBlock: FC<ModelBlockProps> = ({ url, title }) => {
  const deviceType = useDeviceType();

  if (!deviceType) {
    return null;
  }

  if (deviceType === 'mobile') {
    return <ModelBlockMobile value={{ url, title }} />;
  }

  return <ModelBlockDesktop url={url} />;
};

export default ModelBlock;
