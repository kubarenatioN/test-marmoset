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
      {
        hostname: 'media.thepolyrhythm.com',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async headers() {
    return [
      {
        source: '/:path*', // applies to all routes
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, stale-while-revalidate=5',
          },
          {
            key: 'Netlify-CDN-Cache-Control',
            value: 'public, max-age=60',
          },
          {
            key: 'X-PR-Test',
            value: 'Ivanfimoz',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
