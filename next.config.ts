import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Other config options here */
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
        source: '/api/:path*', // Only match API routes
        destination: 'https://kgk-cms.vercel.app/api/:path*', // Forward only specific API paths
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply these headers to all API routes
        source: '/api/:path*', // Apply to your API routes
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // Change '*' to your specific frontend origin for better security
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
