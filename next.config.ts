import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  publicRuntimeConfig: {
    apiDomain: process.env.NEXT_PUBLIC_API_DOMAIN || '/api',
  },
};

export default nextConfig;
