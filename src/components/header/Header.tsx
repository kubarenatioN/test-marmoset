'use client';

import '@/assets/styles/header.scss';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './Header.module.scss';

interface HeaderProps {
  onHomepage?: boolean;
}

const Header: FC<HeaderProps> = ({ onHomepage = false }) => {
  return (
    <header
      className={clsx(styles.Header, 'header', onHomepage ? 'homepage' : '')}
    >
      <nav className={styles.Menu}>
        <ul className={clsx(styles.MenuList, 'header-menu__list')}>
          {/* <li>
            <Link
              href={'/'}
              onClick={() => {
                requestTimeout(() => {
                  window.location.hash = '';
                }, 10);
              }}
            >
              Home
            </Link>
          </li> */}
          <li>
            <Link href={'/work'}>Work</Link>
          </li>
          <li>
            <Link href={'/'} className='logo-link'>
              <Image
                className='logo'
                src={'/images/logo.svg'}
                alt='Polyrhythm'
                width={200}
                height={30}
              />
            </Link>
          </li>
          <li>
            <Link href={'/contacts'}>Contacts</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
