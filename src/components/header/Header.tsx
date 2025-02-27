'use client';

import '@/assets/styles/header.scss';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface HeaderProps {
  absolute?: boolean;
}

const Header: FC<HeaderProps> = ({ absolute = true }) => {
  return (
    <header className={clsx('header', absolute ? 'absolute' : '')}>
      <nav>
        <ul className={clsx('header-menu__list layout-grid')}>
          <li className='header-menu__start'>
            <ul>
              <li>
                <Link href={'/work'}>Work</Link>
              </li>
            </ul>
          </li>
          <li className='header-menu__center'>
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
          <li className='header-menu__end'>
            <ul>
              <li>
                <Link href={'/contacts'}>Contacts</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
