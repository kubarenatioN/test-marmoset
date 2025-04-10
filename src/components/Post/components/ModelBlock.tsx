import ModelViewerScene from '@/components/ModelViewerScene/ModelViewerScene';
import { isMobile } from '@/helpers/is-mobile';
import { PortableTextTypeComponentProps } from '@portabletext/react';
import { FC } from 'react';
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

  return (
    <div
      style={{
        marginBlock: '2rem',
        position: 'relative',
        width: '100%',
        height: 'auto',
        aspectRatio: 16 / 9,
      }}
    >
      <ModelViewerScene modelUrl={value.url} />
    </div>
  );
};

export default ModelBlock;
