'use client';

import ModelViewerScene from '@/components/ModelViewerScene/ModelViewerScene';
import clsx from 'clsx';
import {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  WheelEventHandler,
} from 'react';
import styles from './ModelBlock.module.scss';

interface ModelBlockDesktopProps {
  url: string;
}

const ModelBlockDesktop: FC<ModelBlockDesktopProps> = ({ url }) => {
  const [mac, setMac] = useState(false);
  const [hint, setHint] = useState(false);
  const [inited, setInited] = useState(false);
  const isShowHint = useRef(true);

  let timeoutId: any = null;

  useEffect(() => {
    const isMac = window ? /mac/i.test(window.navigator.userAgent) : false;
    setMac(isMac);
  }, []);

  const showHint = () => {
    setHint(true);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      setHint(false);
    }, 500);
  };

  // const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
  //   const isMeta = mac ? e.key === 'Meta' : e.key === 'Win';
  // };

  const onWheel: WheelEventHandler<HTMLDivElement> = useCallback((e) => {
    if (!e.ctrlKey) {
      e.stopPropagation();

      if (isShowHint.current) {
        showHint();
      }
    } else {
      // set flag to stop showing hint
      isShowHint.current = false;
    }
  }, []);

  return (
    <div
      onWheelCapture={onWheel}
      className={clsx(styles.Container, inited ? styles.Inited : '')}
    >
      <div className={clsx(styles.Hint, hint ? styles.HintActive : '')}>
        <div>
          <span>Press [{mac ? 'Ctrl' : 'Ctrl'}] to zoom</span>
        </div>
      </div>
      <ModelViewerScene
        modelUrl={url}
        onInit={() => {
          setInited(true);
        }}
      />
    </div>
  );
};

export default ModelBlockDesktop;
