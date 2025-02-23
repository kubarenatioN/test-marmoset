import ModelViewerScene from '@/components/ModelViewerScene/ModelViewerScene';
import { PortableTextTypeComponentProps } from '@portabletext/react';
import { FC } from 'react';

interface ModelBlockProps {
  title?: string;
  url: string;
}

const ModelBlock: FC<PortableTextTypeComponentProps<ModelBlockProps>> = ({
  value,
  isInline,
}) => {
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
