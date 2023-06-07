/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: process.env.API_URL,
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
    SITE_URL: process.env.SITE_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    SOCKET_URL: process.env.SOCKET_URL,
  },
  images: {
    domains: [
      'storage.googleapis.com',
      'book-image.s3-hcm-r1.longvan.net',
      'boxo-images.s3-hcm-r1.longvan.net',
      'lh3.googleusercontent.com',
      'books.google.com',
    ],
  },
  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
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
