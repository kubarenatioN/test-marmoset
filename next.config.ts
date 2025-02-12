import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {},
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
};

export default nextConfig;
