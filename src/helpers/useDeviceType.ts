import { useEffect, useState } from 'react';

export type DeviceType = 'mobile' | 'desktop';

export const useDeviceType = (
  mediaQ = `(max-width: 768px)`
): DeviceType | null => {
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia(mediaQ);

    const updateDeviceType = () => {
      setDeviceType(mobileQuery.matches ? 'mobile' : 'desktop');
    };

    // Initial check
    updateDeviceType();

    // Listen for resize or screen change
    mobileQuery.addEventListener('change', updateDeviceType);

    return () => {
      mobileQuery.removeEventListener('change', updateDeviceType);
    };
  }, []);

  return deviceType;
};
