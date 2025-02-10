'use client';

import { requestTimeout } from '@/helpers/timeout';
import Link from 'next/link';
import { FC } from 'react';
import styles from './Header.module.scss';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className={styles.Header}>
      <nav className={styles.Menu}>
        <ul className={styles.MenuList}>
          <li>
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
          </li>
          {/* <li>
            <Link href={'/portfolio'}>Portfolio</Link>
          </li> */}
          <li>
            <Link href={'/ness'}>Ness</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
