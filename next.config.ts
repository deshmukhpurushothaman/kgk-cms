import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'www.google.com',
      'static.hbo.com',
      'm.media-amazon.com',
      'unsplash.com',
    ],
  },
  async rewrites() {
    return [
      {
        source:
          'https://kgk-5crg15zms-deshmukhpurushothamangmailcoms-projects.vercel.app/:path*',
        destination: 'https://kgk-cms.vercel.app/',
      },
    ];
  },
};

export default nextConfig;
