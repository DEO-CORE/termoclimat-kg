import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',      // статический сайт в папке out/
  trailingSlash: true,   // /about/ -> about/index.html (работает на любом хостинге)
  images: { unoptimized: true },
};

export default nextConfig;
