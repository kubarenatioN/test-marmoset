import { isMobile } from '@/helpers/is-mobile';
import { PortableTextTypeComponentProps } from '@portabletext/react';
import { FC } from 'react';
import ModelBlockDesktop from './ModelBlockDesktop';
import ModelBlockMobile from './ModelBlockMobile';

export interface ModelBlockProps {
  title?: string;
  url: string;
}

const ModelBlock: FC<PortableTextTypeComponentProps<ModelBlockProps>> = async ({
  value,
  isInline,
}) => {
  const mobile = await isMobile();

  if (mobile) {
    return <ModelBlockMobile value={value} />;
  }

  return <ModelBlockDesktop url={value.url} />;
};

export default ModelBlock;
