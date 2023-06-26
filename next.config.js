/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  ignoreBuildErrors: true,
};

module.exports = nextConfig;
