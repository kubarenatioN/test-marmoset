import { FC } from 'react';
import MarmosetScene from './MarmosetScene';

interface ModelViewerSceneProps {
  modelUrl: string;
}

const ModelViewerScene: FC<ModelViewerSceneProps> = ({ modelUrl }) => {
  return (
    <>
      <MarmosetScene url={modelUrl} />
    </>
  );
};

export default ModelViewerScene;
