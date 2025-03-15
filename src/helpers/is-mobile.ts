'server-only';

import { headers } from 'next/headers';
import { userAgent } from 'next/server';

export const isMobile = async () => {
  const ua = userAgent({ headers: await headers() });
  return ua.device.type === 'mobile';
};
