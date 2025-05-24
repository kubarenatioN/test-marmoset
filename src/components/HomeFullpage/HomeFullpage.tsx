'use client';

import '@/assets/styles/fp-styles.css';
import '@/assets/styles/fullpagejs.overrides.css';
import { requestTimeout } from '@/helpers/timeout';
import { IHomepageSlide } from '@/models';
import { IContacts } from '@/models/contacts';
import ReactFullpage, {
  fullpageApi as FullpageApi,
  Item,
} from '@fullpage/react-fullpage';
import { clsx } from 'clsx';
import Link from 'next/link';
import { FC, useRef, useState } from 'react';
import FooterContent from '../footer/FooterContent';
import { FpMedia } from '../FullpageMedia/FullpageMedia';
import styles from './style.module.scss';

const FOOTER_CLASS = 'pr-section-footer';
const HIDDEN_SLIDE = 'pr-fp-hidden';
const ACTIVE_SLIDE = 'pr-fp-active';
const ANIM_IN_CLASS = 'pr-animating-in';
const ANIM_OUT_CLASS = 'pr-animating-out';
const Z_INDEX_ABOVE = 2;
const Z_INDEX_BELOW = 1;

interface HomeFullpageProps {
  data: IHomepageSlide[];
  contacts: IContacts;
}

/**
 * Desktop only
 */
const HomeFullpage: FC<HomeFullpageProps> = ({ data, contacts }) => {
  const sectionIds = [...data.map((s, i) => String(i + 1)), 'footer'];

  const [activeSlide, setActiveSlide] = useState<string>(sectionIds[0]);

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
      // remove FP watermark
      document.querySelector('.fp-watermark')?.remove();

      containerRef.current?.classList.add(styles.inited);

      const active = _api.getActiveSection();
      const current = active.item;

      current.classList.add(ACTIVE_SLIDE);

      const { hash } = location;
      const clearHash = hash.replace('#', '');

      if (hash === '') {
        _api.moveTo(sectionIds[0]);
      } else {
        const isInSections = sectionIds.findIndex((s) => s === clearHash);

        if (isInSections) {
          _api.moveTo(hash);
        } else {
          _api.moveTo(sectionIds[0]);
        }
      }

      setActiveSlide(hash ? clearHash : sectionIds[0]);
    });
  };

  const onLeave = (origin: Item, dest: Item, dir: 'up' | 'down') => {
    if (isScrolling.current === true) {
      return false;
    }

    isScrolling.current = true;

    _slideLeave(origin, dest, dir);
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
      setActiveSlide(hash);
    } else if (hash === '') {
      _api.moveTo(1);
      setActiveSlide(sectionIds[0]);
    }
  };

  const _slideLeave = (origin: Item, dest: Item, dir: string) => {
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

      const isNextNotFooterSibling = origin.index - dest.index > 1;
      let footerSibling: HTMLElement = nextSlide;

      if (isNextNotFooterSibling) {
        const siblingIndex = origin.index - 1;
        const _p = origin.item.parentElement;
        footerSibling = _p?.children.item(siblingIndex) as HTMLElement;
      }

      // move back the slide right above footer
      footerSibling.style.transition = `transform 400ms`;
      footerSibling.style.transform = `translate3d(0, 0, 0)`;

      // move back footer (hide below the fold)
      currentSlide.style.transform = `translate3d(0, 0, 0)`;
      currentSlide.style.transition = `transform 400ms`;

      // handle end of transition
      const trEnd = () => {
        // reset styles and ccs classes
        footerSibling.style.transition = ``;
        footerSibling.style.transform = ``;
        currentSlide.style.bottom = ``;
        currentSlide.classList.remove(ACTIVE_SLIDE);

        if (isNextNotFooterSibling) {
          requestTimeout(() => {
            _api.moveTo(dest.anchor);
            _slideLeave({ item: footerSibling } as any, dest, 'up');
          }, 50);
        } else {
          onAnimationPhaseEnd();
        }
        _api.setLockAnchors(false);
        footerSibling.removeEventListener('transitionend', trEnd);
      };

      footerSibling.addEventListener('transitionend', trEnd);
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

  const onClickDot = (e: any) => {
    e.preventDefault();

    if (isScrolling.current) {
      return;
    }

    const href = (e.currentTarget as HTMLAnchorElement).href;

    const dest = new URL(href).hash;
    location.href = dest ? dest : '';
  };

  return (
    <>
      <main ref={containerRef} className={clsx(styles.Content, 'fp-root')}>
        <ReactFullpage
          licenseKey={'asd'}
          anchors={sectionIds}
          navigation={false}
          credits={{
            enabled: false,
            label: '',
          }}
          scrollingSpeed={400}
          afterRender={afterRender}
          onLeave={onLeave}
          render={({ state, fullpageApi }) => {
            _api = fullpageApi;

            return (
              <ReactFullpage.Wrapper>
                {data.map((slide, i, arr) => {
                  const last = arr.length - 1 === i;
                  const active = Number(activeSlide) - 1 === i;
                  const lastActive = last && active;

                  return (
                    <FpSection options={{ api: fullpageApi }} key={slide.title}>
                      <FpMedia slide={slide} lastActive={lastActive} />

                      {/* {i === 0 && (
                        <div className='section-content__wrapper'>
                          <div
                            className={clsx(
                              'section-content section-content-1'
                            )}
                          >
                            <Link
                              href={'/work'}
                              className='section-content-1__cta'
                            >
                              View more
                            </Link>
                            <nav>
                              <ul className='section-content-1__nav'>
                                {Object.entries(socials).map(([type, url]) => {
                                  return (
                                    <li key={type}>
                                      <Link
                                        href={url}
                                        target='_blank'
                                        className='section-content-1__link'
                                      >
                                        {socialsTypeToLabelMap[type]}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </nav>
                          </div>
                        </div>
                      )} */}
                      {i >= 0 && (
                        <div className='section-content__wrapper'>
                          <div className={clsx('section-content')}>
                            <div className='fp-slide_inner'>
                              <h1 className='fp-slide_title'>{slide.title}</h1>
                              {slide.text && (
                                <p className='fp-slide_subtitle'>
                                  {slide.text}
                                </p>
                              )}
                              {slide.project?.slug.current && (
                                <Link
                                  className='fp-slide_cta'
                                  href={`/work/${slide.project.slug.current}`}
                                >
                                  Explore
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </FpSection>
                  );
                })}

                <FpSection options={{ api: fullpageApi }} footer>
                  <footer className='pr-section-footer'>
                    <FooterContent contacts={contacts} />
                  </footer>
                </FpSection>
              </ReactFullpage.Wrapper>
            );
          }}
        ></ReactFullpage>
        <ul className={styles.NavList}>
          {sectionIds.slice(0, -1).map((s) => {
            return (
              <li key={s}>
                <a
                  className={clsx(
                    styles.NavLink,
                    activeSlide === s ? styles.NavLinkActive : ''
                  )}
                  href={'#' + s}
                  onClick={onClickDot}
                >
                  <span className={styles.NavDot}></span>
                </a>
              </li>
            );
          })}
        </ul>
      </main>
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

export default HomeFullpage;
