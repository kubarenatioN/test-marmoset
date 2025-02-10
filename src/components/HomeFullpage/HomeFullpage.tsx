'use client';

import '@/assets/styles/fp-styles.css';
import '@/assets/styles/fullpagejs.overrides.css';
import { requestTimeout } from '@/helpers/timeout';
import ReactFullpage, {
  fullpageApi as FullpageApi,
  Item,
} from '@fullpage/react-fullpage';
import { clsx } from 'clsx';
import Image from 'next/image';
import { FC, useRef } from 'react';
import { mainSectionLinks } from './sections.config';
import styles from './style.module.scss';

const FOOTER_CLASS = 'pr-section-footer';
const HIDDEN_SLIDE = 'pr-fp-hidden';
const ACTIVE_SLIDE = 'pr-fp-active';
const ANIM_IN_CLASS = 'pr-animating-in';
const ANIM_OUT_CLASS = 'pr-animating-out';
const Z_INDEX_ABOVE = 2;
const Z_INDEX_BELOW = 1;

interface HomeFullpageProps {}

const sectionIds = ['one', 'two', 'three', 'four', 'footer'];

const imagesDir = '/images/fullpage';

const HomeFullpage: FC<HomeFullpageProps> = ({}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef<boolean>(false);

  const withImages = true;
  let _api: FullpageApi;

  const afterRender = () => {
    window.addEventListener('hashchange', () => {
      requestTimeout(() => {
        checkHashNavigation();
      }, 200);
    });

    requestAnimationFrame(() => {
      // remove FP watermark
      document.querySelector('.fp-watermark')?.remove();

      containerRef.current?.classList.add(styles.inited);
      const current = _api.getActiveSection().item;

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

    // console.log(_api.getActiveSection().anchor);
  };

  const slideLeave = (origin: Item, dest: Item, dir: string) => {
    const currentSlide = origin.item;
    const nextSlide = dest.item;
    const footerQuery = `.${FOOTER_CLASS}`;
    const isNextFooter = Boolean(dest.item.querySelector(footerQuery));
    const isFooter = Boolean(origin.item.querySelector(footerQuery));

    let animIn = '';
    let animOut = '';

    if (dir === 'up') {
      animIn = 'moveFromTop';
    } else {
      animIn = 'moveFromBottom';
    }
    animOut = animIn + 'Out';

    // if next slide is going to be footer...
    if (isNextFooter) {
      _api.setLockAnchors(true);
      const fH = nextSlide.clientHeight;

      // set transformations for current slide
      // lift up last major slide to release space for footer
      currentSlide.style.transition = `transform 400ms`;
      currentSlide.style.transform = `translate3d(0, -${fH}px, 0)`;

      // set transformations for next slide (footer block)
      // initially it will be below the fold, then it would show up
      nextSlide.classList.add(ACTIVE_SLIDE);
      nextSlide.style.bottom = `-${fH}px`;
      nextSlide.style.transform = `translate3d(0, -100%, 0)`;
      nextSlide.style.transition = `transform 400ms`;

      // handle end of transition
      const trEnd = () => {
        onAnimationPhaseEnd();
        currentSlide.removeEventListener('transitionend', trEnd);
        _api.setLockAnchors(false);
      };
      // listen end of transition
      currentSlide.addEventListener('transitionend', trEnd);
    }
    // if current slide is footer and we go up
    else if (isFooter) {
      _api.setLockAnchors(true);

      // move back the slide right above footer
      nextSlide.style.transition = `transform 400ms`;
      nextSlide.style.transform = `translate3d(0, 0, 0)`;

      // move back footer (hide below the fold)
      currentSlide.style.transform = `translate3d(0, 0, 0)`;
      currentSlide.style.transition = `transform 400ms`;

      // handle end of transition
      const trEnd = () => {
        // reset styles and ccs classes
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
          anchors={sectionIds}
          navigation={false}
          credits={{
            enabled: false,
            label: '',
          }}
          sectionsColor={
            withImages ? undefined : ['pink', 'orange', 'salmon', 'bisque']
          }
          scrollingSpeed={400}
          afterRender={afterRender}
          onLeave={onLeave}
          render={({ state, fullpageApi }) => {
            _api = fullpageApi;

            return (
              <ReactFullpage.Wrapper>
                <FpSection options={{ api: fullpageApi }}>
                  <FpImage src={`${imagesDir}/1.png`} />

                  <div className='section-content__wrapper'>
                    <div className={clsx('section-content section-content-1')}>
                      <a
                        href='x.com'
                        target='_blank'
                        className='section-content-1__cta'
                      >
                        View more
                      </a>
                      <nav>
                        <ul className='section-content-1__nav'>
                          {mainSectionLinks.map((l) => {
                            return (
                              <li key={l.label}>
                                <a href={l.url} target='_blank'>
                                  {l.label}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </nav>
                    </div>
                  </div>
                </FpSection>

                <FpSection options={{ api: fullpageApi }}>
                  <FpImage src={`${imagesDir}/2.png`} />

                  <div className='section-content__wrapper'>
                    <div className={clsx('section-content')}>
                      <h1>Section 2</h1>
                    </div>
                  </div>
                </FpSection>

                <FpSection options={{ api: fullpageApi }}>
                  <FpImage src={`${imagesDir}/3.png`} />

                  <div className='section-content__wrapper'>
                    <div className={clsx('section-content')}>
                      <h1>Section 3</h1>
                    </div>
                  </div>
                </FpSection>

                <FpSection options={{ api: fullpageApi }}>
                  <FpImage src={`${imagesDir}/4.png`} />

                  <div className='section-content__wrapper'>
                    <div className={clsx('section-content')}>
                      <h1>Section 4</h1>
                    </div>
                  </div>
                </FpSection>

                <FpSection options={{ api: fullpageApi }} footer>
                  <footer className='pr-section-footer'>
                    <div className={'section-content'}>
                      <div>
                        <h1 className={clsx(styles.FooterLogo)}>Polyrhythm</h1>
                      </div>
                      <div>
                        <a href='https://x.com' target='_blank'>
                          X.com
                        </a>
                      </div>
                    </div>
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
      {/*  */}
      {children}
    </div>
  );
};

interface FullpageImageProps {
  src: string;
}

const FpImage: FC<FullpageImageProps> = ({ src }) => {
  return (
    <Image
      priority
      fill
      src={src}
      alt='Bubna'
      style={{
        objectFit: 'cover',
      }}
    />
  );
};

export default HomeFullpage;
