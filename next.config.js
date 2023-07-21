/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.architect.io", "via.placeholder.com"],
    remotePatterns: [
      {
        hostname: "via.placeholder.com",
        protocol: 'https',
        port: '',
        pathname: '/account123/**',
      },
    ],
  },
};

module.exports = {
  reactStrictMode: false, // or remove this line completely
};
