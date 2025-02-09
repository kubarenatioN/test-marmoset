'use client';

import '@/assets/styles/fullpagejs.overrides.css';
import { requestTimeout } from '@/helpers/timeout';
import ReactFullpage, {
  fullpageApi as FullpageApi,
  Item,
} from '@fullpage/react-fullpage';
import { clsx } from 'clsx';
import { FC, useRef } from 'react';
import styles from './style.module.scss';

const HIDDEN_SLIDE = 'pr-fp-hidden';
const ACTIVE_SLIDE = 'pr-fp-active';
const ANIM_IN_CLASS = 'pr-animating-in';
const ANIM_OUT_CLASS = 'pr-animating-out';
const Z_INDEX_ABOVE = 2;
const Z_INDEX_BELOW = 1;

interface HomeFullpageProps {}

const _anchors = ['one', 'two', 'three', 'footer'];

const HomeFullpage: FC<HomeFullpageProps> = ({}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef<boolean>(false);

  let _api: FullpageApi;

  const afterRender = () => {
    window.addEventListener('hashchange', () => {
      requestTimeout(() => {
        checkHashNavigation();
      }, 200);
    });

    requestAnimationFrame(() => {
      containerRef.current?.classList.add(styles.inited);
      const current = _api.getActiveSection().item;
      // console.log(_api);

      // show by default first slide
      current.classList.add(ACTIVE_SLIDE);
      if (location.hash === '') {
        current.classList.add(ANIM_IN_CLASS);
        current.style.animationName = 'moveFromTop';
        current.style.zIndex = String(Z_INDEX_ABOVE);
      }
    });
  };

  const onLeave = (origin: Item, dest: Item, dir: 'up' | 'down') => {
    if (isScrolling.current === true) {
      return false;
    }

    isScrolling.current = true;

    slideLeave(origin, dest, dir);
  };

  const onAnimationPhaseEnd = () => {
    requestTimeout(() => {
      isScrolling.current = false;
    }, 100);
  };

  const checkHashNavigation = () => {
    const hash = window.location.hash.replace('#', '');

    if (hash !== '' && hash !== 'footer') {
      _api.moveTo(hash);
    } else if (hash === '') {
      _api.moveTo(1);
    }

    console.log(_api.getActiveSection().anchor);
  };

  const slideLeave = (origin: Item, dest: Item, dir: string) => {
    const currentSlide = origin.item;
    const nextSlide = dest.item;
    const footerQuery = '.' + styles.SectionFooter;
    // const isNextFooter = false;
    // const isFooter = false;
    const isNextFooter = Boolean(dest.item.querySelector(footerQuery));
    const isFooter = Boolean(origin.item.querySelector(footerQuery));

    // console.log(currentSlide, nextSlide);

    let animIn = '';
    let animOut = '';

    if (dir === 'up') {
      animIn = 'moveFromTop';
    } else {
      animIn = 'moveFromBottom';
    }
    animOut = animIn + 'Out';

    if (isNextFooter) {
      _api.setLockAnchors(true);
      nextSlide.classList.add(ACTIVE_SLIDE);
      // const container = nextSlide.parentElement;
      const fH = nextSlide.clientHeight;

      currentSlide.style.transition = `transform 400ms`;
      currentSlide.style.transform = `translate3d(0, -${fH}px, 0)`;

      nextSlide.style.bottom = `-${fH}px`;
      nextSlide.style.transform = `translate3d(0, -100%, 0)`;
      nextSlide.style.transition = `transform 400ms`;

      const trEnd = () => {
        onAnimationPhaseEnd();
        currentSlide.removeEventListener('transitionend', trEnd);
        _api.setLockAnchors(false);
      };
      currentSlide.addEventListener('transitionend', trEnd);
    } else if (isFooter) {
      _api.setLockAnchors(true);
      // const fH = currentSlide.clientHeight;

      nextSlide.style.transition = `transform 400ms`;
      nextSlide.style.transform = `translate3d(0, 0, 0)`;

      currentSlide.style.transform = `translate3d(0, 0, 0)`;
      currentSlide.style.transition = `transform 400ms`;

      const trEnd = () => {
        nextSlide.style.transition = ``;
        nextSlide.style.transform = ``;
        currentSlide.style.bottom = ``;
        currentSlide.classList.remove(ACTIVE_SLIDE);

        onAnimationPhaseEnd();
        nextSlide.removeEventListener('transitionend', trEnd);
        _api.setLockAnchors(false);
      };

      nextSlide.addEventListener('transitionend', trEnd);
    } else {
      nextSlide.classList.add(ANIM_IN_CLASS, ACTIVE_SLIDE);
      nextSlide.style.animationName = animIn;
      nextSlide.style.zIndex = String(Z_INDEX_ABOVE);

      nextSlide.onanimationend = (event) => {
        const { animationName } = event;

        if (animationName === animIn) {
          currentSlide.classList.remove(ACTIVE_SLIDE);

          // reset animations for both items after next slide animation complete
          currentSlide.style.animationName = '';
          nextSlide.style.animationName = '';

          onAnimationPhaseEnd();
        }
      };

      currentSlide.classList.add(ANIM_OUT_CLASS);
      currentSlide.style.animationName = animOut;
      currentSlide.style.zIndex = String(Z_INDEX_BELOW);

      currentSlide.onanimationend = () => {};
    }
  };

  return (
    <>
      <div ref={containerRef} className={clsx(styles.Content, 'fp-root')}>
        <ReactFullpage
          licenseKey={'asd'}
          anchors={_anchors}
          navigation={false}
          navigationTooltips={_anchors}
          credits={{
            enabled: false,
            label: '',
          }}
          // scrollBar={false}
          sectionsColor={['pink', 'orange', 'salmon', 'bisque']}
          scrollingSpeed={400}
          afterRender={afterRender}
          onLeave={onLeave}
          render={({ state, fullpageApi }) => {
            _api = fullpageApi;

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

                <FpSection options={{ api: fullpageApi }} footer>
                  <footer className={clsx(styles.Footer)}>
                    <h1>Hello I'm Footer</h1>
                  </footer>
                </FpSection>
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
  footer?: boolean;
}

const FpSection: FC<FullpageSectionProps> = ({ options, children, footer }) => {
  const { api } = options;

  return (
    <div
      className={clsx(
        styles.Section,
        'section',
        'fp-auto-height',
        HIDDEN_SLIDE
      )}
    >
      <div
        className={clsx(
          styles.SectionInner,
          footer ? styles.SectionFooter : ''
        )}
      >
        {/*  */}
        {children}
      </div>
    </div>
  );
};

export default HomeFullpage;
