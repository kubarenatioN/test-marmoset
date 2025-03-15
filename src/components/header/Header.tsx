import '@/assets/styles/header.scss';
import MenuDesktop from '@/components/MenuDesktop/MenuDesktop';
import { isMobile } from '@/helpers/is-mobile';
import clsx from 'clsx';
import { FC } from 'react';
import MenuMobile from '../MenuMobile/MenuMobile';
import styles from './Header.module.scss';

interface HeaderProps {
  absolute?: boolean;
  mobile?: boolean;
}

const Header: FC<HeaderProps> = async ({ mobile = true }) => {
  mobile = await isMobile();

  return (
    <>
      {!mobile && (
        <header className={clsx('header', styles.HeaderDesktop)}>
          <MenuDesktop />
        </header>
      )}

      {mobile && <MenuMobile />}
    </>
  );
};

export default Header;
