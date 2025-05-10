'use client';

import '@/assets/styles/header.scss';
import MenuDesktop from '@/components/MenuDesktop/MenuDesktop';
import { useDeviceType } from '@/helpers/useDeviceType';
import clsx from 'clsx';
import { FC, useEffect } from 'react';
import MenuMobile from '../MenuMobile/MenuMobile';
import styles from './styles.module.scss';

interface HeaderProps {
  mobile?: boolean; // remove
}

const Header: FC<HeaderProps> = ({}) => {
  const deviceType = useDeviceType();

  useEffect(() => {
    console.log('deviceType:', deviceType);
  }, [deviceType]);

  return (
    <>
      {deviceType === 'desktop' && (
        <header className={clsx('header', styles.HeaderDesktop)}>
          <MenuDesktop />
        </header>
      )}

      {deviceType === 'mobile' && <MenuMobile />}

      {!deviceType && (
        <MenuMobile />
        // <div style={{ visibility: 'hidden' }}>
        //   <MenuMobile />
        // </div>
      )}
    </>
  );
};

export default Header;
