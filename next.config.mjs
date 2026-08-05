import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/es',
        destination: '/en',
        permanent: true
      },
      {
        source: '/nl',
        destination: '/en',
        permanent: true
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          }
        ]
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve('./src');
    return config;
  }
};

export default nextConfig;
