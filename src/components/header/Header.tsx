import '@/assets/styles/header.scss';
import MenuDesktop from '@/components/MenuDesktop/MenuDesktop';
import { FC } from 'react';
import MenuMobile from '../MenuMobile/MenuMobile';

interface HeaderProps {
  mobile?: boolean; // remove
}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <>
      <MenuDesktop />

      <MenuMobile />
    </>
  );
};

export default Header;
