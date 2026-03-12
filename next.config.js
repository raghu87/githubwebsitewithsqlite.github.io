/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Keep sql.js as a Node.js external so webpack doesn't mangle its WASM loader
  serverExternalPackages: ['sql.js'],
  webpack: (config) => {
    // Ignore WASM file loading warnings
    config.ignoreWarnings = [
      { module: /node_modules\/sql\.js/ },
    ];
    return config;
  },
};

module.exports = nextConfig;
