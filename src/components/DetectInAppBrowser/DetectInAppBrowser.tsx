'use client';

import { usePathname } from 'next/navigation';
import { FC, useEffect } from 'react';

interface DetectInAppBrowserProps {}

const DetectInAppBrowser: FC<DetectInAppBrowserProps> = ({}) => {
  const path = usePathname();

  useEffect(() => {
    const ua = window.navigator.userAgent;

    if (ua.toLowerCase().includes('instagram')) {
      window.location.href = `https://thepolyrhythm.com${path}`;
    }
  }, []);

  return null;
};

export default DetectInAppBrowser;
