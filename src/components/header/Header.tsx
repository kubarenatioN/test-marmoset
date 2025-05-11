'use client';

import '@/assets/styles/header.scss';
import MenuDesktop from '@/components/MenuDesktop/MenuDesktop';
import { useDeviceType } from '@/helpers/useDeviceType';
import { FC } from 'react';
import MenuMobile from '../MenuMobile/MenuMobile';

interface HeaderProps {
  mobile?: boolean; // remove
}

const Header: FC<HeaderProps> = ({}) => {
  const deviceType = useDeviceType();

  return (
    <>
      {deviceType === 'desktop' && <MenuDesktop />}

      {deviceType === 'mobile' && <MenuMobile />}

      {!deviceType && (
        <div style={{ display: 'none' }}>
          <MenuMobile />
        </div>
      )}
    </>
  );
};

export default Header;
