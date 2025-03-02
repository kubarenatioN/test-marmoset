import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {},
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        hostname: 'res.cloudinary.com',
      },
      {
        hostname: 'dl.dropboxusercontent.com',
      },
      {
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
