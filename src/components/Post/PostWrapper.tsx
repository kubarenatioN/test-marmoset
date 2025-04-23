'use client';

import Image from 'next/image';
import { createContext, FC, ReactNode, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

interface PostWrapperProps {
  children: ReactNode;
}

const PostWrapper: FC<PostWrapperProps> = ({ children }) => {
  const [lb, setLightbox] = useState<string | null>(null);

  return (
    <LightBoxContext.Provider
      value={{
        lb,
        update: setLightbox,
      }}
    >
      {children}

      {lb && (
        <Lightbox
          slides={[{ src: lb }]}
          carousel={{
            finite: true,
            padding: 8,
          }}
          open={true}
          close={() => setLightbox(null)}
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
            slide: ({ slide, rect }) => {
              return (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  <Image
                    src={slide.src}
                    alt=''
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes='100vw'
                  />
                </div>
              );
            },
          }}
        />
      )}
    </LightBoxContext.Provider>
  );
};

export default PostWrapper;

export const LightBoxContext = createContext<{
  lb: string | null;
  update: (value: string) => void;
}>({
  lb: null,
  update: () => {},
});
