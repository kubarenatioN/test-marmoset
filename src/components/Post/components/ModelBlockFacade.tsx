import { PortableTextTypeComponentProps } from '@portabletext/react';
import { FC } from 'react';
import ModelBlock from './ModelBlock';

interface ModelBlockFacadeProps {
  title?: string;
  url: string;
}

const ModelBlockFacade: FC<
  PortableTextTypeComponentProps<ModelBlockFacadeProps>
> = async ({ value }) => {
  return <ModelBlock url={value.url} title={value.title} />;
};

export default ModelBlockFacade;
