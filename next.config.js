/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // or remove this line completely
  images: {
    domains: ['via.placeholder.com', 'cdn.architect.io'],
    remotePatterns: [
      {
        hostname: "via.placeholder.com",
        protocol: "https",
        port: "",
        pathname: "/account123/**",
      },
      {
        hostname: "cdn.architect.io",
        protocol: "https",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
};

module.exports = nextConfig;
