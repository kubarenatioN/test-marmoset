'use client';

import { useDeviceType } from '@/helpers/useDeviceType';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { FaArrowUpLong } from 'react-icons/fa6';
import styles from './styles.module.scss';

interface PageUpBtnProps {}

const PageUpBtn: FC<PageUpBtnProps> = ({}) => {
  const [show, setShow] = useState(false);
  const deviceType = useDeviceType();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const listenScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      console.log(y);
    };

    listenScroll();

    window.addEventListener('scroll', listenScroll);

    return () => {
      window.removeEventListener('scroll', listenScroll);
    };
  }, []);

  useEffect(() => {
    if (deviceType === 'desktop' && scrollY >= 1000) {
      setShow(true);
    } else if (deviceType === 'mobile' && scrollY >= 800) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [deviceType, scrollY]);

  return (
    <>
      {show ? (
        <button className={clsx('btn-reset', styles.ToPageTopBtn)}>
          <FaArrowUpLong />
        </button>
      ) : null}
    </>
  );
};

export default PageUpBtn;
