import { FC } from 'react';
import MarmosetScene from './MarmosetScene';

interface ModelViewerSceneProps {
  modelUrl: string;
  onInit?: () => void;
}

const ModelViewerScene: FC<ModelViewerSceneProps> = ({ modelUrl, onInit }) => {
  return (
    <>
      <MarmosetScene url={modelUrl} onInit={onInit} />
    </>
  );
};

export default ModelViewerScene;
