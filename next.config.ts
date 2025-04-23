import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {},
  images: {
    remotePatterns: [
      {
        hostname: '**', // wildcard
      },
      {
        hostname: 'res.cloudinary.com',
      },
      {
        hostname: 'dl.dropboxusercontent.com',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
