'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface MenuDesktopProps {}

const MenuDesktop: FC<MenuDesktopProps> = ({}) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.slice(1) === path ? 'active' : '';
  };

  return (
    <header className={clsx('header--desktop')}>
      <nav>
        <ul className={clsx('header-menu__list layout-grid')}>
          <li className='header-menu__start'>
            <ul>
              <li>
                <Link className={clsx(isActive('work'))} href={'/work'}>
                  Work
                </Link>
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
                <Link className={clsx(isActive('contact'))} href={'/contact'}>
                  Contact
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MenuDesktop;
