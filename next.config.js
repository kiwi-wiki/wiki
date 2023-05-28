/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
};

const { withContentlayer } = require('next-contentlayer');

module.exports = withContentlayer(nextConfig);
