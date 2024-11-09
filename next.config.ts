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
  async headers() {
    return [
      {
        // matching all API routes
        source:
          'https://kgk-5crg15zms-deshmukhpurushothamangmailcoms-projects.vercel.app/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
