/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: './',
  experimental: {
    images: {
      unoptimized: true
    }
  }
}

module.exports = nextConfig
