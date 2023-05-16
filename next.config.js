/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
    SITE_URL: process.env.SITE_URL,
  },
  images: {
    domains: ['storage.googleapis.com', 'book-image.s3-hcm-r1.longvan.net'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    //webpack will need this in order to render 'fs' modules
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },
};

module.exports = nextConfig;
