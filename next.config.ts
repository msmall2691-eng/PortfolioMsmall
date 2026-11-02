import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export — no backend needed. Produces ./out, which Vercel serves directly.
  output: 'export',
  images: {
    // next/image optimization needs a server; the static export uses plain <img>.
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
