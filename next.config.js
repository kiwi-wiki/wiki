/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/wiki',
  images: {
    unoptimized: true,
  },

  // 현재 swc 컴파일러 사용시 cmdk 쪽에서 JSON.parse 한글과 관련된 에러 발생
  swcMinify: false,
};

const { withContentlayer } = require('next-contentlayer');

module.exports = withContentlayer(nextConfig);
