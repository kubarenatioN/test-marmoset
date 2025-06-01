'use client';

import ModelViewerScene from '@/components/ModelViewerScene/ModelViewerScene';
import { FC, useState } from 'react';
import { HiOutlineCubeTransparent } from 'react-icons/hi';
import Lightbox from 'yet-another-react-lightbox';
import styles from './GalleryBlock.module.scss';
import { ModelBlockProps } from './ModelBlock';

interface ModelBlockMobileProps {
  value: ModelBlockProps;
}

const ModelBlockMobile: FC<ModelBlockMobileProps> = ({ value }) => {
  const [open, setOpen] = useState(false);
  const { url, title } = value;

  const openPreview = () => {
    setOpen(true);

    // Send YM event
    if (window && window.ym) {
      const code = 101022621;
      window.ym(code, 'reachGoal', 'click-view-3d-model-mobile');
    }
  };

  return (
    <>
      <div>
        <button
          className={styles.MobilePreviewBtn}
          onClick={openPreview}
          type='button'
        >
          <HiOutlineCubeTransparent
            size={25}
            style={{ verticalAlign: 'bottom', marginInlineEnd: 7 }}
          />
          <span>Click to view 3D model</span>
        </button>
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        carousel={{
          finite: true,
          padding: 8,
        }}
        slides={[
          {
            src: url,
          },
        ]}
        styles={{
          navigationNext: {
            display: 'none',
          },
          navigationPrev: {
            display: 'none',
          },
          toolbar: {
            marginRight: 0,
          },
        }}
        render={{
          slide: ({ slide, rect, offset }) => {
            return (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                }}
              >
                <ModelViewerScene modelUrl={url} />
              </div>
            );
          },
        }}
      />
    </>
  );
};

export default ModelBlockMobile;
