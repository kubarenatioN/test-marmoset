'use client';

import '@/assets/styles/fullpagejs.overrides.css';
import { requestTimeout } from '@/helpers/timeout';
import ReactFullpage from '@fullpage/react-fullpage';
import { FC, useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';

interface HomeFullpageProps {}

const _anchors = ['one', 'two', 'three'];

const HomeFullpage: FC<HomeFullpageProps> = ({}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [navigation, setNavigation] = useState<string[] | boolean>(false);
  // let cancelAppear: (() => void) | undefined;

  useEffect(() => {
    requestTimeout(() => {
      containerRef.current?.classList.add(styles.inited);
      setNavigation([..._anchors]);
    }, 1000);
  }, []);

  return (
    <>
      <div ref={containerRef} className={styles.Content}>
        <ReactFullpage
          licenseKey={'asd'}
          anchors={_anchors}
          navigation={Boolean(navigation)}
          navigationTooltips={_anchors}
          credits={{
            enabled: false,
            label: '',
          }}
          slideSelector={styles.Section}
          sectionsColor={['pink', 'orange', 'lime']}
          render={({ state, fullpageApi }) => {
            console.log(state);

            return (
              <ReactFullpage.Wrapper>
                <div className={`${styles.Section} section`}>
                  <div className={styles.SectionInner}>
                    {/* <Image src={'/images/img-1.jpg'} fill alt='Bubna' /> */}
                    <p>Section 1 (welcome to fullpage.js)</p>
                    <button onClick={() => fullpageApi.moveSectionDown()}>
                      Click me to move down
                    </button>
                  </div>
                </div>

                <div className={`${styles.Section} section`}>
                  <div className={styles.SectionInner}>
                    {/* <Image src={'/images/img-2.jpg'} fill alt='Bubna' /> */}

                    <p>Section 2</p>
                  </div>
                </div>

                <div className={`${styles.Section} section`}>
                  <div className={styles.SectionInner}>
                    {/* <Image src={'/images/img-3.jpg'} fill alt='Bubna' /> */}

                    <p>Section 3</p>
                  </div>
                </div>
              </ReactFullpage.Wrapper>
            );
          }}
        ></ReactFullpage>
      </div>
    </>
  );
};

export default HomeFullpage;
