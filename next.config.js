/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

const { withContentlayer } = require('next-contentlayer');

module.exports = withContentlayer(nextConfig);
