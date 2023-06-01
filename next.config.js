/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: 'wiki',
  images: {
    unoptimized: true,
  },
};

const { withContentlayer } = require('next-contentlayer');

module.exports = withContentlayer(nextConfig);
