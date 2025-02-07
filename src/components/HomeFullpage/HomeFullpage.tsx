'use client';

import '@/assets/styles/fullpagejs.overrides.css';
import { requestTimeout } from '@/helpers/timeout';
import ReactFullpage, {
  fullpageApi as FullpageApi,
  Item,
} from '@fullpage/react-fullpage';
import { clsx } from 'clsx';
import { FC, useRef, useState } from 'react';
import styles from './style.module.scss';

const scaleDownFrom = 'scale-down-from';
const scaleDownTo = 'scale-down-to';
// const scaleDown = styles['scale-down'];

interface HomeFullpageProps {}

const _anchors = ['one', 'two', 'three', 'footer'];

const HomeFullpage: FC<HomeFullpageProps> = ({}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canMove = useRef<boolean>(false);

  const [ready, setReady] = useState(false);

  let _api: FullpageApi;

  // const _moveTo = (target: string) => {
  //   _api.moveTo(target);
  // };

  let updateAfterLoad: () => void = () => {};

  const beforeLeave = (origin: Item, destination: Item, direction: string) => {
    if (!ready) {
      return true;
    }

    if (canMove.current === false) {
      canMove.current = true;

      containerRef.current?.classList.add('move', `move-${direction}`);
      origin.item.classList.add(scaleDownFrom);
      // destination.item.classList.add(scaleDownTo);

      requestTimeout(() => {
        const id = String(destination.anchor);
        console.log('move', id);
        _api.moveTo(id);
      }, 600);

      updateAfterLoad = () => {
        origin.item.classList.remove(scaleDownFrom);
        containerRef.current?.classList.remove('move', `move-${direction}`);

        // origin.item.classList.remove(scaleDownFrom);
        // origin.item.classList.remove('scale-down-from-fixed');

        // destination.item.classList.remove(scaleDownTo);
      };

      return false;
    }

    console.log('before');

    return true;
  };

  const onLeave = (origin: Item, destination: Item) => {
    // origin.item.classList.add('scale-down-from-fixed');
  };

  const afterLoad = () => {
    if (!ready) {
      return;
    }

    canMove.current = false;

    updateAfterLoad();
  };

  return (
    <>
      <div ref={containerRef} className={clsx(styles.Content, 'fp-root')}>
        <ReactFullpage
          licenseKey={'asd'}
          anchors={_anchors}
          navigation={ready}
          navigationTooltips={_anchors}
          credits={{
            enabled: false,
            label: '',
          }}
          sectionsColor={['pink', 'orange', 'salmon']}
          scrollingSpeed={600}
          afterRender={() => {
            requestAnimationFrame(() => {
              requestTimeout(() => {
                containerRef.current?.classList.add(styles.inited);
                setReady(true);
              }, 1000);
            });
          }}
          beforeLeave={beforeLeave}
          afterLoad={afterLoad}
          onLeave={onLeave}
          render={({ state, fullpageApi }) => {
            _api = fullpageApi;
            console.log('render');

            return (
              <ReactFullpage.Wrapper>
                <FpSection options={{ api: fullpageApi }}>
                  {/* <Image src={'/images/img-1.jpg'} fill alt='Bubna' /> */}

                  <p>Section 1</p>
                </FpSection>

                <FpSection options={{ api: fullpageApi }}>
                  {/* <Image src={'/images/img-2.jpg'} fill alt='Bubna' /> */}

                  <p>Section 2</p>
                </FpSection>

                <FpSection options={{ api: fullpageApi }}>
                  {/* <Image src={'/images/img-3.jpg'} fill alt='Bubna' /> */}

                  <p>Section 3</p>
                </FpSection>

                <div className={clsx('section', 'fp-auto-height')}>
                  <h1>Hello I'm Autoheight</h1>
                </div>
              </ReactFullpage.Wrapper>
            );
          }}
        ></ReactFullpage>
      </div>
    </>
  );
};

interface FullpageSectionProps {
  children: React.ReactNode;
  options: {
    api: FullpageApi;
  };
}

const FpSection: FC<FullpageSectionProps> = ({ options, children }) => {
  const { api } = options;

  return (
    <div className={`${styles.Section} section`}>
      <div className={styles.SectionInner}>
        {/*  */}
        {children}
      </div>
    </div>
  );
};

export default HomeFullpage;
