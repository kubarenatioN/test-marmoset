'use client';

import Script from 'next/script';
import { FC, useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    marmoset: any;
  }
}

export type Marmoset = any;

interface MarmosetSceneProps {
  url: string;
  onInit?: (marmoset: Marmoset) => void;
}

const MarmosetScene: FC<MarmosetSceneProps> = ({ url, onInit }) => {
  const [marmoset, setMarmoset] = useState<null | Marmoset>(null);
  const marmRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window && window.marmoset) {
      setMarmoset(window.marmoset as Marmoset);
    }
  }, []);

  useEffect(() => {
    if (marmoset && marmRef.current) {
      initScene(marmoset, marmRef.current);
    }
  }, [marmoset]);

  const initScene = (m: Marmoset, container: HTMLDivElement) => {
    const { clientWidth: w, clientHeight: h } = container;

    const viewer = new m.WebViewer(w, h, url);

    viewer.onLoad = () => {
      onInit?.(marmoset);
    };

    // console.log(marmoset, viewer);

    container.append(viewer.domRoot);
  };

  return (
    <div
      className='marmoset-container'
      ref={marmRef}
      style={{
        position: 'absolute',
        inset: 0,
      }}
    >
      <Script
        src='https://viewer.marmoset.co/main/marmoset.js'
        strategy='afterInteractive'
        onLoad={() => {
          setMarmoset(window.marmoset);
        }}
      ></Script>
    </div>
  );
};

export default MarmosetScene;
