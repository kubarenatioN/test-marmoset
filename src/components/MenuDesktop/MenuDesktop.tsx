import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface MenuDesktopProps {}

const MenuDesktop: FC<MenuDesktopProps> = ({}) => {
  return (
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
              <Link href={'/contact'}>Contact</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default MenuDesktop;
