'use client';

import { clsx } from 'clsx';
import { Roboto_Mono } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useReducer, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { SlMenu } from 'react-icons/sl';
import { pageScrollReducer } from './helpers';
import styles from './style.module.scss';

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

const OPEN_MENU_CLASS = 'open-menu';

const menu = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Work',
    url: '/work',
  },
  {
    label: 'Contact',
    url: '/contact',
  },
];

interface MenuMobileProps {}

const MenuMobile: FC<MenuMobileProps> = ({}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const [scrollState, dispatchScrollState] = useReducer(pageScrollReducer, {
    start: true,
    scrolledDown: false,
    y: 0,
  });

  const [time, setTime] = useState<Date | null>(null);
  const [rgbPart, setRgbPart] = useState(0);

  const tick = () => {
    setTime(new Date());

    const t = Date.now();
    const part = Math.floor((t / 3000) % 3);
    setRgbPart(part);
  };

  useEffect(() => {
    const abort = new AbortController();

    const windowScrollHandler = (e: Event) => {
      if (open) {
        return;
      }

      const scrollY = window.scrollY;
      dispatchScrollState({ y: scrollY });
    };

    window.addEventListener('scroll', windowScrollHandler, {
      signal: abort.signal,
      passive: true,
    });

    return () => {
      abort.abort();
    };
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.classList.add(OPEN_MENU_CLASS);
      document.querySelector('html')?.classList.add(OPEN_MENU_CLASS);
    } else {
      document.body.classList.remove(OPEN_MENU_CLASS);
      document.querySelector('html')?.classList.remove(OPEN_MENU_CLASS);
    }
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  const isUp = `${!scrollState.start && scrollState.scrolledDown ? 'up' : ''}`;
  const isStart = scrollState.start;

  return (
    <>
      <header
        className={clsx(
          styles.Header,
          isUp ? styles.HeaderUp : '',
          isStart ? styles.HeaderStart : ''
        )}
      >
        <Link href={'/'} className={clsx(styles.Logo)}>
          <Image
            className='logo'
            src={'/images/logo.svg'}
            alt='Polyrhythm'
            style={{
              aspectRatio: 200 / 30,
              // height: 24,
              width: '100%',
            }}
            width={200}
            height={30}
          />
        </Link>

        <div
          style={{
            justifySelf: 'flex-end',
            padding: '0.8rem',
          }}
        >
          <button
            className={clsx('btn-reset', styles.OpenBtn)}
            onClick={() => setOpen((prev) => !prev)}
          >
            {/* {!open ? <SlMenu size={32} /> : <CgClose size={32} />} */}
            <SlMenu size={32} />
          </button>
        </div>

        <div
          className={clsx(
            styles.MenuWrapper,
            open ? styles.MenuWrapperOpen : ''
          )}
        >
          <div>
            <Link
              onClick={closeMenu}
              href={'/'}
              className={clsx(styles.Logo)}
              style={{
                display: 'inline-block',
              }}
            >
              <Image
                className='logo'
                src={'/images/logo.svg'}
                alt='Polyrhythm'
                style={{
                  aspectRatio: 200 / 30,
                  height: 24,
                  width: '100%',
                }}
                width={200}
                height={30}
              />
            </Link>
          </div>

          <nav className={clsx(styles.Nav)}>
            <ul className={clsx(styles.Menu)}>
              {menu.map((el) => {
                return (
                  <li className={clsx()} key={el.label}>
                    <Link
                      href={el.url}
                      className={clsx(
                        styles.Link,
                        pathname === el.url ? styles.LinkActive : ''
                      )}
                    >
                      {el.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div>
            {/* <div
              data-step={
                rgbPart === 0 ? 'red' : rgbPart === 1 ? 'green' : 'blue'
              }
              className={clsx(styles.Timeline, robotoMono.variable)}
            >
              <div style={{ position: 'relative' }}>
                <span>{time && time.toLocaleString()}</span>
                <span>{time && time.toLocaleString()}</span>
              </div>
            </div> */}
          </div>

          <div>
            <button
              className={clsx('btn-reset', styles.CloseBtn)}
              onClick={closeMenu}
            >
              <IoClose size={36} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default MenuMobile;
