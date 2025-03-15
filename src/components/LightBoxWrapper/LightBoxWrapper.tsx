'use client';

import Image from 'next/image';
import { FC, useState } from 'react';
import Lightbox, { SlideImage } from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Inline from 'yet-another-react-lightbox/plugins/inline';

import 'yet-another-react-lightbox/styles.css';

interface LightBoxWrapperProps {
  items: SlideImage[];
}

const LightBoxWrapper: FC<LightBoxWrapperProps> = ({ items }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const toggleOpen = (state: boolean) => () => setOpen(state);
  const updateIndex = ({ index: current }: { index: number }) =>
    setIndex(current);

  const slides = items.map((it) => {
    return it;
  });

  return (
    <>
      <Lightbox
        index={index}
        slides={slides}
        plugins={[Inline, Fullscreen]}
        render={{
          slide: ({ slide, rect, offset }) => {
            const wRatio = Math.ceil((rect.width / window.innerWidth) * 100);

            return (
              <div
                data-polyrhytm-img
                style={{
                  position: 'relative',
                  width: rect.width,
                  height: rect.height,
                }}
              >
                <Image
                  alt={slide.alt ?? ''}
                  src={slide.src}
                  fill
                  loading='eager'
                  draggable={false}
                  style={{
                    objectFit: 'contain',
                    cursor: 'pointer',
                  }}
                  sizes={`${wRatio}vw`}
                  onClick={offset === 0 ? toggleOpen(true) : undefined}
                />
              </div>
            );
          },
        }}
        on={{
          view: updateIndex,
          click: toggleOpen(true),
        }}
        carousel={{
          padding: 12,
          spacing: 0,
          imageFit: 'contain',
        }}
        animation={{ swipe: 300 }}
        inline={{
          style: {
            width: '100%',
            maxWidth: '100%',
            height: '100%',
          },
        }}
      />

      <Lightbox
        index={index}
        slides={slides}
        on={{
          view: updateIndex,
        }}
        animation={{ fade: 200, swipe: 200 }}
        open={open}
        close={toggleOpen(false)}
        render={{
          slide: ({ slide, rect, offset }) => {
            const wRatio = Math.ceil((rect.width / window.innerWidth) * 100);

            return (
              <div
                data-polyrhytm-img-fullscreen
                style={{
                  position: 'relative',
                  width: rect.width,
                  height: rect.height,
                }}
              >
                <Image
                  alt={slide.alt ?? ''}
                  src={slide.src}
                  fill
                  loading='eager'
                  draggable={false}
                  style={{
                    objectFit: 'contain',
                  }}
                  sizes={`${wRatio}vw`}
                />
              </div>
            );
          },
        }}
      />
    </>
  );
};

export default LightBoxWrapper;
