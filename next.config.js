/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const basePath = repo ? `/${repo}` : '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

